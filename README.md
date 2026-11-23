# 🐛 EntomoVía — Aprende entomología al estilo Duolingo

Prototipo web (Fase 1) de una app de aprendizaje de entomología con mecánica
tipo Duolingo. La primera unidad cubre el **Orden Diptera**, con contenido real
derivado de la presentación `12Diptera.pptx` (Profs. Javier Martínez y Francisco
Serna) articulada con el libro de Borror (_cap. 34, Order Diptera — Flies_).

## ✨ Qué incluye

- **Mapa de lecciones** estilo Duolingo (nodos que se desbloquean en orden).
- **4 tipos de ejercicio:**
  - Opción múltiple
  - Completar el espacio (acepta variantes y tolera acentos)
  - Emparejar (familia ↔ carácter/hábito)
  - Ordenar la clasificación taxonómica
- **Gamificación:** XP, racha diaria (🔥), corazones/vidas (❤️), barra de progreso.
- **Progreso persistente** en `localStorage` (XP, racha y lecciones completadas).
- **Contenido real de Diptera:** generalidades y hábitos tróficos, morfología
  diagnóstica, suborden Nematocera y jerarquía taxonómica.

## ▶️ Cómo ejecutarlo

La app usa React, ReactDOM y Babel cargados desde un CDN (unpkg) y transpila el
JSX en el navegador, así que **no requiere `npm install`**. Solo necesitas
servirla por HTTP (abrir el archivo con `file://` no funciona por las reglas de
seguridad del navegador).

Con Python (ya instalado en la mayoría de sistemas):

```bash
cd /ruta/al/proyecto
python3 -m http.server 5500
```

Con Node (alternativa):

```bash
npx serve . -l 5500
```

Luego abre: **http://localhost:5500**

> La primera carga descarga React y Babel desde internet; después quedan en
> caché del navegador.

## 🗂️ Estructura

```
index.html              # Punto de entrada: carga React/Babel y los scripts
src/
├── styles.css          # Estilos (tema verde entomológico, mobile-first)
├── data/
│   └── diptera.js       # CONTENIDO del curso (única fuente de verdad)
├── exercises.jsx        # Componentes de cada tipo de ejercicio + dispatcher
└── app.jsx              # Pantallas (Home / Lesson / Result) y gamificación
```

## 📈 Cómo crece el contenido

Todo el contenido vive en `src/data/diptera.js`. Para añadir una lección, agrega
un objeto al array `lessons` de la unidad; para una unidad nueva (otro orden de
insectos), agrega un objeto al array `units`. Cada ejercicio declara su `type`
(`multiple-choice`, `fill-blank`, `match`, `order`) y el motor hace el resto.

## 🚀 Siguiente fase (plan acordado)

Fase 2: migrar a **React Native + Expo** (iOS, Android y web con un solo código)
y **Supabase** (PostgreSQL + Auth + Storage) para:

- Cuentas de usuario y sincronización de progreso entre dispositivos.
- Imágenes reales de insectos (ejercicios de imagen-nombre) y audios de clase.
- Modelar la taxonomía jerárquica en tablas relacionales.

La lógica de ejercicios y la estructura de datos de esta fase están pensadas
para migrar casi sin cambios: `diptera.js` se convierte en filas de base de
datos y `exercises.jsx` en componentes React Native.
