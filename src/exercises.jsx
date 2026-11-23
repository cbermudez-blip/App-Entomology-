// =============================================================================
// COMPONENTES DE EJERCICIOS
// Cada componente recibe:
//   - exercise: el objeto del ejercicio (de data/diptera.js)
//   - locked:   true cuando ya se verificó la respuesta (deshabilita la edición)
//   - onReady(isComplete): informa al padre si hay una respuesta lista para verificar
//   - registerGrader(fn): registra una función que devuelve true/false al verificar
// =============================================================================

const { useState, useEffect, useRef } = React;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------- Opción múltiple
function MultipleChoice({ exercise, locked, onReady, registerGrader }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    registerGrader(() => selected === exercise.answer);
    onReady(selected !== null);
  }, [selected]);

  return (
    <div className="options">
      {exercise.options.map((opt, i) => {
        let cls = "option";
        if (locked) {
          if (i === exercise.answer) cls += " correct";
          else if (i === selected) cls += " wrong";
        } else if (i === selected) {
          cls += " selected";
        }
        return (
          <button
            key={i}
            className={cls}
            disabled={locked}
            onClick={() => setSelected(i)}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------- Completar espacio
function FillBlank({ exercise, locked, onReady, registerGrader }) {
  const [value, setValue] = useState("");

  const normalize = (s) =>
    s
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  useEffect(() => {
    const accepted = (exercise.accepted || [exercise.answer]).map(normalize);
    registerGrader(() => accepted.includes(normalize(value)));
    onReady(value.trim().length > 0);
  }, [value]);

  return (
    <input
      className="blank-input"
      placeholder="Escribe tu respuesta…"
      value={value}
      disabled={locked}
      autoFocus
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

// ---------------------------------------------------------------- Emparejar
function Match({ exercise, locked, onReady, registerGrader }) {
  const lefts = useRef(exercise.pairs.map((p) => p.left)).current;
  const rights = useRef(shuffle(exercise.pairs.map((p) => p.right))).current;

  const [activeLeft, setActiveLeft] = useState(null);
  const [links, setLinks] = useState({}); // left -> right

  const correctMap = {};
  exercise.pairs.forEach((p) => (correctMap[p.left] = p.right));

  useEffect(() => {
    registerGrader(() =>
      exercise.pairs.every((p) => links[p.left] === p.right),
    );
    onReady(Object.keys(links).length === exercise.pairs.length);
  }, [links]);

  const chosenRights = Object.values(links);

  function pickLeft(l) {
    if (locked) return;
    setActiveLeft(activeLeft === l ? null : l);
  }
  function pickRight(r) {
    if (locked || activeLeft === null) return;
    setLinks((prev) => {
      const next = {};
      // quita cualquier vínculo previo a este right o este left
      for (const [k, v] of Object.entries(prev)) {
        if (k === activeLeft) continue;
        if (v === r) continue;
        next[k] = v;
      }
      next[activeLeft] = r;
      return next;
    });
    setActiveLeft(null);
  }

  return (
    <div className="match-grid">
      <div className="match-col">
        {lefts.map((l) => {
          let cls = "match-item";
          if (activeLeft === l) cls += " selected";
          else if (links[l]) cls += " matched";
          return (
            <button
              key={l}
              className={cls}
              disabled={locked}
              onClick={() => pickLeft(l)}
            >
              {l}
              {links[l] && <span style={{ color: "#c17d00" }}> ✔</span>}
            </button>
          );
        })}
      </div>
      <div className="match-col">
        {rights.map((r) => {
          let cls = "match-item";
          if (chosenRights.includes(r)) cls += " matched";
          return (
            <button
              key={r}
              className={cls}
              disabled={locked}
              onClick={() => pickRight(r)}
            >
              {r}
            </button>
          );
        })}
      </div>
    </div>
  );
}
// ---------------------------------------------------------------- Ordenar
function OrderExercise({ exercise, locked, onReady, registerGrader }) {
  const [items, setItems] = useState(() => {
    let s = shuffle(exercise.items);
    // garantiza que no empiece ya ordenado
    if (JSON.stringify(s) === JSON.stringify(exercise.items))
      s = shuffle(exercise.items);
    return s;
  });

  useEffect(() => {
    registerGrader(
      () => JSON.stringify(items) === JSON.stringify(exercise.items),
    );
    onReady(true);
  }, [items]);

  function move(index, dir) {
    if (locked) return;
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div className="order-list">
      {items.map((it, i) => {
        let style = {};
        if (locked) {
          const ok = exercise.items[i] === it;
          style = { borderColor: ok ? "var(--green)" : "var(--red)" };
        }
        return (
          <div key={it} className="order-item" style={style}>
            <span className="rank">{i + 1}</span>
            <span>{it}</span>
            <div className="order-controls">
              <button disabled={locked || i === 0} onClick={() => move(i, -1)}>
                ↑
              </button>
              <button
                disabled={locked || i === items.length - 1}
                onClick={() => move(i, 1)}
              >
                ↓
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const KIND_LABEL = {
  "multiple-choice": "Opción múltiple",
  "fill-blank": "Completa el espacio",
  match: "Empareja",
  order: "Ordena la secuencia",
};

// Dispatcher: elige el componente según el tipo
function ExerciseRenderer(props) {
  switch (props.exercise.type) {
    case "multiple-choice":
      return <MultipleChoice {...props} />;
    case "fill-blank":
      return <FillBlank {...props} />;
    case "match":
      return <Match {...props} />;
    case "order":
      return <OrderExercise {...props} />;
    default:
      return <p>Tipo de ejercicio no soportado: {props.exercise.type}</p>;
  }
}

window.ExerciseRenderer = ExerciseRenderer;
window.KIND_LABEL = KIND_LABEL;
