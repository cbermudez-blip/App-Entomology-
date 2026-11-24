(function() {
  const { useState, useEffect, useRef } = React;
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1;i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function MultipleChoice({ exercise, locked, onReady, registerGrader }) {
    const [selected, setSelected] = useState(null);
    useEffect(() => {
      registerGrader(() => selected === exercise.answer);
      onReady(selected !== null);
    }, [selected]);
    return /* @__PURE__ */ React.createElement("div", {
      className: "options"
    }, exercise.options.map((opt, i) => {
      let cls = "option";
      if (locked) {
        if (i === exercise.answer)
          cls += " correct";
        else if (i === selected)
          cls += " wrong";
      } else if (i === selected) {
        cls += " selected";
      }
      return /* @__PURE__ */ React.createElement("button", {
        key: i,
        className: cls,
        disabled: locked,
        onClick: () => setSelected(i)
      }, opt);
    }));
  }
  function FillBlank({ exercise, locked, onReady, registerGrader }) {
    const [value, setValue] = useState("");
    const normalize = (s) => s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    useEffect(() => {
      const accepted = (exercise.accepted || [exercise.answer]).map(normalize);
      registerGrader(() => accepted.includes(normalize(value)));
      onReady(value.trim().length > 0);
    }, [value]);
    return /* @__PURE__ */ React.createElement("input", {
      className: "blank-input",
      placeholder: "Escribe tu respuesta…",
      value,
      disabled: locked,
      autoFocus: true,
      onChange: (e) => setValue(e.target.value)
    });
  }
  function Match({ exercise, locked, onReady, registerGrader }) {
    const lefts = useRef(exercise.pairs.map((p) => p.left)).current;
    const rights = useRef(shuffle(exercise.pairs.map((p) => p.right))).current;
    const [activeLeft, setActiveLeft] = useState(null);
    const [links, setLinks] = useState({});
    const correctMap = {};
    exercise.pairs.forEach((p) => correctMap[p.left] = p.right);
    useEffect(() => {
      registerGrader(() => exercise.pairs.every((p) => links[p.left] === p.right));
      onReady(Object.keys(links).length === exercise.pairs.length);
    }, [links]);
    const chosenRights = Object.values(links);
    function pickLeft(l) {
      if (locked)
        return;
      setActiveLeft(activeLeft === l ? null : l);
    }
    function pickRight(r) {
      if (locked || activeLeft === null)
        return;
      setLinks((prev) => {
        const next = {};
        for (const [k, v] of Object.entries(prev)) {
          if (k === activeLeft)
            continue;
          if (v === r)
            continue;
          next[k] = v;
        }
        next[activeLeft] = r;
        return next;
      });
      setActiveLeft(null);
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: "match-grid"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "match-col"
    }, lefts.map((l) => {
      let cls = "match-item";
      if (activeLeft === l)
        cls += " selected";
      else if (links[l])
        cls += " matched";
      return /* @__PURE__ */ React.createElement("button", {
        key: l,
        className: cls,
        disabled: locked,
        onClick: () => pickLeft(l)
      }, l, links[l] && /* @__PURE__ */ React.createElement("span", {
        style: { color: "#c17d00" }
      }, " ✔"));
    })), /* @__PURE__ */ React.createElement("div", {
      className: "match-col"
    }, rights.map((r) => {
      let cls = "match-item";
      if (chosenRights.includes(r))
        cls += " matched";
      return /* @__PURE__ */ React.createElement("button", {
        key: r,
        className: cls,
        disabled: locked,
        onClick: () => pickRight(r)
      }, r);
    })));
  }
  function OrderExercise({ exercise, locked, onReady, registerGrader }) {
    const [items, setItems] = useState(() => {
      let s = shuffle(exercise.items);
      if (JSON.stringify(s) === JSON.stringify(exercise.items))
        s = shuffle(exercise.items);
      return s;
    });
    useEffect(() => {
      registerGrader(() => JSON.stringify(items) === JSON.stringify(exercise.items));
      onReady(true);
    }, [items]);
    function move(index, dir) {
      if (locked)
        return;
      const target = index + dir;
      if (target < 0 || target >= items.length)
        return;
      setItems((prev) => {
        const next = [...prev];
        [next[index], next[target]] = [next[target], next[index]];
        return next;
      });
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: "order-list"
    }, items.map((it, i) => {
      let style = {};
      if (locked) {
        const ok = exercise.items[i] === it;
        style = { borderColor: ok ? "var(--green)" : "var(--red)" };
      }
      return /* @__PURE__ */ React.createElement("div", {
        key: it,
        className: "order-item",
        style
      }, /* @__PURE__ */ React.createElement("span", {
        className: "rank"
      }, i + 1), /* @__PURE__ */ React.createElement("span", null, it), /* @__PURE__ */ React.createElement("div", {
        className: "order-controls"
      }, /* @__PURE__ */ React.createElement("button", {
        disabled: locked || i === 0,
        onClick: () => move(i, -1)
      }, "↑"), /* @__PURE__ */ React.createElement("button", {
        disabled: locked || i === items.length - 1,
        onClick: () => move(i, 1)
      }, "↓")));
    }));
  }
  const KIND_LABEL = {
    "multiple-choice": "Opción múltiple",
    "fill-blank": "Completa el espacio",
    match: "Empareja",
    order: "Ordena la secuencia"
  };
  function ExerciseRenderer(props) {
    switch (props.exercise.type) {
      case "multiple-choice":
        return /* @__PURE__ */ React.createElement(MultipleChoice, {
          ...props
        });
      case "fill-blank":
        return /* @__PURE__ */ React.createElement(FillBlank, {
          ...props
        });
      case "match":
        return /* @__PURE__ */ React.createElement(Match, {
          ...props
        });
      case "order":
        return /* @__PURE__ */ React.createElement(OrderExercise, {
          ...props
        });
      default:
        return /* @__PURE__ */ React.createElement("p", null, "Tipo de ejercicio no soportado: ", props.exercise.type);
    }
  }
  window.ExerciseRenderer = ExerciseRenderer;
  window.KIND_LABEL = KIND_LABEL;
})();
