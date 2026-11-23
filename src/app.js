const { useState, useEffect, useRef, useCallback } = React;
const UNIT = window.COURSE.units[0];
const SAVE_KEY = "entomovia:progress:v1";
function loadProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw)
      return JSON.parse(raw);
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
        const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
        streak = prev.lastDay === yesterday ? prev.streak + 1 : 1;
      }
      return {
        ...prev,
        xp: prev.xp + xpGained,
        streak,
        lastDay: today,
        completed: { ...prev.completed, [lessonId]: true }
      };
    });
  }, []);
  return { state, completeLesson };
}
function TopBar({ xp, streak, hearts }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "topbar"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "brand"
  }, "\uD83D\uDC1B EntomoVía"), /* @__PURE__ */ React.createElement("span", {
    className: "stat streak"
  }, "\uD83D\uDD25 ", streak), /* @__PURE__ */ React.createElement("span", {
    className: "stat xp"
  }, "⭐ ", xp), /* @__PURE__ */ React.createElement("span", {
    className: "stat hearts"
  }, "❤️".repeat(hearts) || "\uD83D\uDC94"));
}
function Home({ progress, onStart }) {
  const lessons = UNIT.lessons;
  return /* @__PURE__ */ React.createElement("div", {
    className: "home"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "unit-header"
  }, /* @__PURE__ */ React.createElement("h1", null, UNIT.title), /* @__PURE__ */ React.createElement("p", null, UNIT.subtitle)), /* @__PURE__ */ React.createElement("div", {
    className: "path"
  }, lessons.map((lesson, i) => {
    const done = progress.completed[lesson.id];
    const prevDone = i === 0 || progress.completed[lessons[i - 1].id];
    const locked = !done && !prevDone;
    let cls = "lesson-node";
    if (done)
      cls += " done";
    else if (locked)
      cls += " locked";
    return /* @__PURE__ */ React.createElement("div", {
      className: "node-row",
      key: lesson.id
    }, /* @__PURE__ */ React.createElement("button", {
      className: cls,
      disabled: locked,
      title: locked ? "Completa la lección anterior" : lesson.title,
      onClick: () => !locked && onStart(i)
    }, locked ? "\uD83D\uDD12" : done ? "✓" : lesson.icon), /* @__PURE__ */ React.createElement("span", {
      className: "lesson-label"
    }, lesson.title), i < lessons.length - 1 && /* @__PURE__ */ React.createElement("div", {
      className: "connector"
    }));
  })));
}
function Lesson({ lessonIndex, hearts, setHearts, onFinish, onQuit }) {
  const lesson = UNIT.lessons[lessonIndex];
  const total = lesson.exercises.length;
  const [step, setStep] = useState(0);
  const [locked, setLocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const graderRef = useRef(() => false);
  const registerGrader = useCallback((fn) => graderRef.current = fn, []);
  const onReady = useCallback((v) => setReady(v), []);
  const exercise = lesson.exercises[step];
  function check() {
    const ok = graderRef.current();
    setLocked(true);
    setLastCorrect(ok);
    if (ok)
      setCorrectCount((c) => c + 1);
    else
      setHearts((h) => Math.max(0, h - 1));
  }
  function next() {
    const isLast = step + 1 >= total;
    if (isLast || hearts <= 0) {
      onFinish({
        correct: correctCount,
        total,
        xp: correctCount * 10,
        passed: hearts > 0
      });
      return;
    }
    setStep((s) => s + 1);
    setLocked(false);
    setReady(false);
    setLastCorrect(null);
  }
  useEffect(() => {
    if (hearts <= 0 && locked) {
      const t = setTimeout(() => {
        onFinish({
          correct: correctCount,
          total,
          xp: correctCount * 10,
          passed: false
        });
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [hearts, locked]);
  const progressPct = step / total * 100;
  return /* @__PURE__ */ React.createElement("div", {
    className: "lesson"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "progress-wrap"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "close-btn",
    onClick: onQuit,
    title: "Salir"
  }, "✕"), /* @__PURE__ */ React.createElement("div", {
    className: "progress-bar"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "progress-fill",
    style: { width: progressPct + "%" }
  })), /* @__PURE__ */ React.createElement("span", {
    className: "stat hearts"
  }, "❤️".repeat(hearts) || "\uD83D\uDC94")), /* @__PURE__ */ React.createElement("div", {
    className: "exercise-kind"
  }, window.KIND_LABEL[exercise.type]), /* @__PURE__ */ React.createElement("div", {
    className: "question"
  }, exercise.prompt), React.createElement(window.ExerciseRenderer, {
    key: lesson.id + "-" + step,
    exercise,
    locked,
    onReady,
    registerGrader
  }), /* @__PURE__ */ React.createElement("div", {
    className: "footer"
  }, locked && /* @__PURE__ */ React.createElement("div", {
    className: "feedback " + (lastCorrect ? "ok" : "no")
  }, /* @__PURE__ */ React.createElement("h4", null, lastCorrect ? "¡Correcto! \uD83C\uDF89" : "No del todo…"), /* @__PURE__ */ React.createElement("p", null, exercise.explanation)), !locked ? /* @__PURE__ */ React.createElement("button", {
    className: "btn check",
    disabled: !ready,
    onClick: check
  }, "Verificar") : /* @__PURE__ */ React.createElement("button", {
    className: "btn",
    onClick: next
  }, step + 1 >= total ? "Finalizar" : "Continuar")));
}
function Result({ summary, onHome }) {
  const pct = Math.round(summary.correct / summary.total * 100);
  const great = summary.passed && pct >= 60;
  return /* @__PURE__ */ React.createElement("div", {
    className: "result"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "emoji"
  }, great ? "\uD83C\uDFC6" : "\uD83D\uDC1B"), /* @__PURE__ */ React.createElement("h2", null, great ? "¡Lección completada!" : "¡Sigue practicando!"), /* @__PURE__ */ React.createElement("p", {
    style: { color: "var(--muted)" }
  }, great ? "Dominaste este tema de Diptera." : "Te quedaste sin corazones o faltó precisión. Reinténtalo."), /* @__PURE__ */ React.createElement("div", {
    className: "score-cards"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "score-card"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "big"
  }, "+", summary.xp), /* @__PURE__ */ React.createElement("div", {
    className: "lbl"
  }, "XP ganada")), /* @__PURE__ */ React.createElement("div", {
    className: "score-card"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "big"
  }, summary.correct, "/", summary.total), /* @__PURE__ */ React.createElement("div", {
    className: "lbl"
  }, "Aciertos")), /* @__PURE__ */ React.createElement("div", {
    className: "score-card"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "big"
  }, pct, "%"), /* @__PURE__ */ React.createElement("div", {
    className: "lbl"
  }, "Precisión"))), /* @__PURE__ */ React.createElement("button", {
    className: "btn",
    onClick: onHome
  }, "Volver al mapa"));
}
const MAX_HEARTS = 5;
function App() {
  const { state, completeLesson } = useProgress();
  const [screen, setScreen] = useState("home");
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
  return /* @__PURE__ */ React.createElement("div", {
    className: "app"
  }, /* @__PURE__ */ React.createElement(TopBar, {
    xp: state.xp,
    streak: state.streak,
    hearts
  }), screen === "home" && /* @__PURE__ */ React.createElement(Home, {
    progress: state,
    onStart: startLesson
  }), screen === "lesson" && /* @__PURE__ */ React.createElement(Lesson, {
    lessonIndex,
    hearts,
    setHearts,
    onFinish: finishLesson,
    onQuit: () => setScreen("home")
  }), screen === "result" && /* @__PURE__ */ React.createElement(Result, {
    summary,
    onHome: () => setScreen("home")
  }));
}
function mount() {
  if (!window.ExerciseRenderer || !window.KIND_LABEL) {
    setTimeout(mount, 30);
    return;
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
}
mount();
