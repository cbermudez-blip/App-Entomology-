// =============================================================================
// APP PRINCIPAL — EntomoVía
// Pantallas: Home (mapa de lecciones) · Lesson (ejercicios) · Result
// Gamificación: XP, racha diaria, corazones. Persistencia en localStorage.
// =============================================================================

// Envuelto en IIFE para aislar el scope (ver nota en exercises.jsx).
(function () {
  const { useState, useEffect, useRef, useCallback } = React;
  const UNIT = window.COURSE.units[0];

  // ----------------------------------------------------------------- persistencia
  const SAVE_KEY = "entomovia:progress:v1";

  function loadProgress() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { xp: 0, streak: 0, lastDay: null, completed: {} };
  }

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function useProgress() {
    const [state, setState] = useState(loadProgress);

    useEffect(() => {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    }, [state]);

    const completeLesson = useCallback((lessonId, xpGained) => {
      setState((prev) => {
        const today = todayStr();
        let streak = prev.streak;
        if (prev.lastDay !== today) {
          const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .slice(0, 10);
          streak = prev.lastDay === yesterday ? prev.streak + 1 : 1;
        }
        return {
          ...prev,
          xp: prev.xp + xpGained,
          streak,
          lastDay: today,
          completed: { ...prev.completed, [lessonId]: true },
        };
      });
    }, []);

    return { state, completeLesson };
  }

  // ----------------------------------------------------------------- Top bar
  function TopBar({ xp, streak, hearts }) {
    return (
      <div className="topbar">
        <span className="brand">🐛 EntomoVía</span>
        <span className="stat streak">🔥 {streak}</span>
        <span className="stat xp">⭐ {xp}</span>
        <span className="stat hearts">{"❤️".repeat(hearts) || "💔"}</span>
      </div>
    );
  }

  // ----------------------------------------------------------------- Home
  function Home({ progress, onStart }) {
    const lessons = UNIT.lessons;
    return (
      <div className="home">
        <div className="unit-header">
          <h1>{UNIT.title}</h1>
          <p>{UNIT.subtitle}</p>
        </div>
        <div className="path">
          {lessons.map((lesson, i) => {
            const done = progress.completed[lesson.id];
            const prevDone = i === 0 || progress.completed[lessons[i - 1].id];
            const locked = !done && !prevDone;
            let cls = "lesson-node";
            if (done) cls += " done";
            else if (locked) cls += " locked";
            return (
              <div className="node-row" key={lesson.id}>
                <button
                  className={cls}
                  disabled={locked}
                  title={locked ? "Completa la lección anterior" : lesson.title}
                  onClick={() => !locked && onStart(i)}
                >
                  {locked ? "🔒" : done ? "✓" : lesson.icon}
                </button>
                <span className="lesson-label">{lesson.title}</span>
                {i < lessons.length - 1 && <div className="connector" />}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------- Lesson
  function Lesson({ lessonIndex, hearts, setHearts, onFinish, onQuit }) {
    const lesson = UNIT.lessons[lessonIndex];
    const total = lesson.exercises.length;

    const [step, setStep] = useState(0);
    const [locked, setLocked] = useState(false);
    const [ready, setReady] = useState(false);
    const [lastCorrect, setLastCorrect] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);

    const graderRef = useRef(() => false);
    const registerGrader = useCallback((fn) => (graderRef.current = fn), []);
    const onReady = useCallback((v) => setReady(v), []);

    const exercise = lesson.exercises[step];

    function check() {
      const ok = graderRef.current();
      setLocked(true);
      setLastCorrect(ok);
      if (ok) setCorrectCount((c) => c + 1);
      else setHearts((h) => Math.max(0, h - 1));
    }

    function next() {
      const isLast = step + 1 >= total;
      if (isLast || hearts <= 0) {
        onFinish({
          correct: correctCount,
          total,
          xp: correctCount * 10,
          passed: hearts > 0,
        });
        return;
      }
      setStep((s) => s + 1);
      setLocked(false);
      setReady(false);
      setLastCorrect(null);
    }

    // Sin corazones → termina la lección como fallida
    useEffect(() => {
      if (hearts <= 0 && locked) {
        const t = setTimeout(() => {
          onFinish({
            correct: correctCount,
            total,
            xp: correctCount * 10,
            passed: false,
          });
        }, 1200);
        return () => clearTimeout(t);
      }
    }, [hearts, locked]);

    const progressPct = (step / total) * 100;

    return (
      <div className="lesson">
        <div className="progress-wrap">
          <button className="close-btn" onClick={onQuit} title="Salir">
            ✕
          </button>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: progressPct + "%" }}
            />
          </div>
          <span className="stat hearts">{"❤️".repeat(hearts) || "💔"}</span>
        </div>

        <div className="exercise-kind">{window.KIND_LABEL[exercise.type]}</div>
        <div className="question">{exercise.prompt}</div>

        {React.createElement(window.ExerciseRenderer, {
          key: lesson.id + "-" + step,
          exercise: exercise,
          locked: locked,
          onReady: onReady,
          registerGrader: registerGrader,
        })}

        <div className="footer">
          {locked && (
            <div className={"feedback " + (lastCorrect ? "ok" : "no")}>
              <h4>{lastCorrect ? "¡Correcto! 🎉" : "No del todo…"}</h4>
              <p>{exercise.explanation}</p>
            </div>
          )}
          {!locked ? (
            <button className="btn check" disabled={!ready} onClick={check}>
              Verificar
            </button>
          ) : (
            <button className="btn" onClick={next}>
              {step + 1 >= total ? "Finalizar" : "Continuar"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------- Result
  function Result({ summary, onHome }) {
    const pct = Math.round((summary.correct / summary.total) * 100);
    const great = summary.passed && pct >= 60;
    return (
      <div className="result">
        <div className="emoji">{great ? "🏆" : "🐛"}</div>
        <h2>{great ? "¡Lección completada!" : "¡Sigue practicando!"}</h2>
        <p style={{ color: "var(--muted)" }}>
          {great
            ? "Dominaste este tema de Diptera."
            : "Te quedaste sin corazones o faltó precisión. Reinténtalo."}
        </p>
        <div className="score-cards">
          <div className="score-card">
            <div className="big">+{summary.xp}</div>
            <div className="lbl">XP ganada</div>
          </div>
          <div className="score-card">
            <div className="big">
              {summary.correct}/{summary.total}
            </div>
            <div className="lbl">Aciertos</div>
          </div>
          <div className="score-card">
            <div className="big">{pct}%</div>
            <div className="lbl">Precisión</div>
          </div>
        </div>
        <button className="btn" onClick={onHome}>
          Volver al mapa
        </button>
      </div>
    );
  }

  // ----------------------------------------------------------------- Root
  const MAX_HEARTS = 5;

  function App() {
    const { state, completeLesson } = useProgress();
    const [screen, setScreen] = useState("home"); // home | lesson | result
    const [lessonIndex, setLessonIndex] = useState(0);
    const [hearts, setHearts] = useState(MAX_HEARTS);
    const [summary, setSummary] = useState(null);

    function startLesson(i) {
      setLessonIndex(i);
      setHearts(MAX_HEARTS);
      setScreen("lesson");
    }

    function finishLesson(result) {
      setSummary(result);
      if (result.passed && result.correct / result.total >= 0.6) {
        completeLesson(UNIT.lessons[lessonIndex].id, result.xp);
      }
      setScreen("result");
    }

    return (
      <div className="app">
        <TopBar xp={state.xp} streak={state.streak} hearts={hearts} />
        {screen === "home" && <Home progress={state} onStart={startLesson} />}
        {screen === "lesson" && (
          <Lesson
            lessonIndex={lessonIndex}
            hearts={hearts}
            setHearts={setHearts}
            onFinish={finishLesson}
            onQuit={() => setScreen("home")}
          />
        )}
        {screen === "result" && (
          <Result summary={summary} onHome={() => setScreen("home")} />
        )}
      </div>
    );
  }

  // Espera a que exercises.jsx haya definido ExerciseRenderer (Babel transpila
  // los scripts de forma asíncrona, sin garantía de orden) y luego monta la app.
  function mount() {
    if (!window.ExerciseRenderer || !window.KIND_LABEL) {
      setTimeout(mount, 30);
      return;
    }
    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  }
  mount();
})();
