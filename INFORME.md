# Informe del proyecto — EntomoVía

### Una herramienta interactiva para el estudio del Orden Diptera

**Fase 1 — Prototipo funcional**

---

## 1. Introducción

Aprender a identificar y clasificar insectos no es sencillo. El Orden Diptera
(las moscas y zancudos verdaderos) reúne decenas de familias, cada una con
caracteres diagnósticos propios, hábitos distintos e importancia agrícola,
médica o ecológica. Estudiar todo eso solo con presentaciones, un libro de
referencia y las grabaciones de clase funciona, pero exige mucho esfuerzo de
memorización y ofrece poca práctica activa.

La idea de este proyecto nació de una pregunta simple: **¿y si estudiar
entomología se pareciera más a usar Duolingo?** Es decir, lecciones cortas,
ejercicios variados, retroalimentación inmediata y una pizca de juego (puntos,
rachas, vidas) que motive a volver cada día.

**EntomoVía** es la respuesta a esa pregunta. Es una aplicación web pensada como
una herramienta de apoyo al estudio del Orden Diptera. En lugar de leer de forma
pasiva, el estudiante practica: responde preguntas, empareja familias con sus
caracteres, completa frases clave y ordena la clasificación taxonómica. Cada
respuesta recibe una explicación, de modo que el error se convierte en
aprendizaje.

El contenido no es genérico. Se construyó a partir del material real del curso,
respetando la estructura temática de la presentación **12Diptera.pptx** (de los
profesores Javier Martínez y Francisco Serna) y complementándola con los
caracteres diagnósticos del libro de referencia (Borror, capítulo *Order
Diptera — Flies*).

Este informe documenta la **primera fase** del proyecto: qué se hizo, cómo se
hizo, qué resultó y qué sigue.

---

## 2. Metodología

El desarrollo de esta primera fase siguió cuatro pasos ordenados, pensados para
avanzar con seguridad y validar la idea sin complicaciones innecesarias.

### 2.1. Definición del contenido (la base conceptual)

Antes de programar nada, lo primero fue decidir **qué se iba a enseñar**. Se tomó
como columna vertebral la presentación `12Diptera.pptx`, porque es la que define
qué temas entran en el curso y en qué orden. A partir de ahí, el contenido se
organizó en cuatro grandes bloques, que se convirtieron en las cuatro lecciones
de la app:

1. **Generalidades y hábitos tróficos** — qué define a Diptera (un solo par de
   alas, halterios) y cómo se agrupan por su alimentación (fitófagos, zoófagos,
   sapro-necrófagos).
2. **Morfología diagnóstica** — los caracteres que permiten distinguir grupos
   (antenas, caliptras, sutura ptilinal, etc.).
3. **Suborden Nematocera** — las familias de antenas largas (Tipulidae,
   Culicidae, Cecidomyiidae, Sciaridae…).
4. **Ordenar la clasificación** — ejercicios para dominar la jerarquía
   taxonómica (Orden → Suborden → Infraorden → Familia).

El libro de Borror se usó para precisar los caracteres diagnósticos, y cada
ejercicio incluye una explicación breve que refuerza el concepto.

### 2.2. Elección de la mecánica de aprendizaje

Se definieron **cuatro tipos de ejercicio**, elegidos porque cubren distintas
formas de aprender:

- **Opción múltiple** — para reconocer conceptos y caracteres.
- **Completar el espacio** — para fijar términos clave (acepta variantes y
  tolera acentos, para no penalizar un tilde olvidado).
- **Emparejar** — para relacionar, por ejemplo, una familia con su hábito o su
  carácter diagnóstico.
- **Ordenar la secuencia** — para practicar la jerarquía de la clasificación.

A esto se sumó una capa de **gamificación** inspirada en Duolingo: puntos de
experiencia (XP), racha diaria (los días seguidos que se estudia), corazones o
vidas (se pierde uno al fallar) y una barra de progreso dentro de cada lección.
El avance del estudiante se guarda en su propio navegador, de modo que al volver
no empieza de cero.

### 2.3. Elección de la tecnología

Para esta primera fase se priorizó algo que **funcionara pronto y fuera fácil de
publicar**, sin montar servidores ni bases de datos. Se usó:

- **HTML, CSS y React** para construir la interfaz (React es una herramienta muy
  extendida para crear aplicaciones web interactivas).
- Una organización de archivos que separa claramente **el contenido** (en un solo
  archivo editable) de **la lógica** (los ejercicios y las pantallas), para que
  ampliar el temario sea sencillo en el futuro.

Todo el contenido vive en un único archivo (`src/data/diptera.js`), pensado así a
propósito: quien quiera añadir una lección o una familia nueva solo edita ese
archivo, sin tocar la programación.

### 2.4. Publicación

El último paso de esta fase fue **poner la app a disposición de todos**. Para
ello se usó **GitHub**, una plataforma donde se guarda el proyecto y su
historial de cambios, y **GitHub Pages**, un servicio gratuito que convierte el
proyecto en una página web pública con una dirección (enlace) que cualquiera
puede abrir desde su teléfono o computador.

---

## 3. Resultados

La primera fase produjo una **aplicación web funcional y pública**. Estos son los
resultados concretos:

### 3.1. La aplicación funciona

EntomoVía carga en el navegador (de computador o celular) y muestra:

- Un **mapa de lecciones** al estilo Duolingo, donde las lecciones se van
  desbloqueando en orden a medida que se completan.
- Los **cuatro tipos de ejercicio** operativos, con **retroalimentación
  inmediata**: al responder, la app indica si es correcto y muestra una
  explicación del tema.
- La **gamificación completa**: XP, racha diaria, corazones y barra de progreso,
  más una pantalla final con el resumen de aciertos y precisión.
- **Progreso guardado** en el navegador del usuario.

### 3.2. Contenido real de Diptera

Las cuatro lecciones contienen preguntas basadas en el material del curso, no en
relleno genérico. Se cubren generalidades, hábitos tróficos, morfología
diagnóstica, el suborden Nematocera y la jerarquía taxonómica, con familias
concretas como Tipulidae, Culicidae, Cecidomyiidae, Syrphidae, Tephritidae,
Calliphoridae y Tachinidae, entre otras.

### 3.3. Objetivo específico cumplido: la app está publicada en GitHub y es visible para todos

El **objetivo específico de esta primera fase era subir la aplicación al
repositorio y lograr que el enlace fuera visible y accesible para cualquier
persona, empleando GitHub. Este objetivo se cumplió.**

- El proyecto completo está **alojado en GitHub**, en el repositorio
  `cbermudez-blip/App-Entomology-`, con todo su código y su historial de cambios.
- La aplicación está **publicada con GitHub Pages** y disponible mediante un
  **enlace público** que cualquiera puede abrir sin instalar nada:

  **https://cbermudez-blip.github.io/App-Entomology-/**

Durante la publicación surgieron algunos problemas técnicos (la app se quedaba en
"Cargando…"), que se identificaron y corrigieron uno a uno hasta dejarla
funcionando de forma estable. Esto, más allá del percance, dejó la app más
robusta: ahora, si algo fallara, muestra un mensaje claro en lugar de quedarse en
blanco.

### 3.4. Base lista para crecer

El proyecto quedó organizado de forma que **ampliar el contenido no requiere
saber programar**: todo el temario está en un solo archivo, con una estructura
clara y repetible. Añadir más familias, más lecciones o incluso otro orden de
insectos es cuestión de seguir el mismo patrón.

---

## 4. Conclusiones

- Se logró construir, en una primera fase, un **prototipo funcional y real** de
  una herramienta de estudio del Orden Diptera, con la lógica de aprendizaje
  interactivo inspirada en Duolingo.
- El contenido está **anclado al material del curso** (presentación 12Diptera +
  Borror), lo que hace que la herramienta sea pertinente y no un simple ejercicio
  genérico.
- Se **cumplió el objetivo específico** de la fase: la aplicación está subida a
  GitHub y disponible públicamente mediante un enlace que cualquiera puede abrir.
- La experiencia confirma que la idea es **viable y útil**: convertir el temario
  en práctica activa con retroalimentación inmediata ayuda a estudiar de una
  forma más dinámica que la lectura pasiva.
- El prototipo también sirvió como **validación de la mecánica**: ahora sabemos
  que el enfoque funciona y vale la pena invertir en una versión más completa.

En resumen, la Fase 1 entrega una base sólida: una herramienta que ya se puede
usar, que es pública y que está preparada para crecer.

---

## 5. Proyección: Fase 2 y refinamiento de la base conceptual

El objetivo de fondo del proyecto es ofrecer una **herramienta seria para el
estudio del Orden Diptera**. El prototipo actual es el punto de partida; la
segunda fase busca convertirlo en una herramienta más completa, precisa y
accesible.

### 5.1. Refinamiento de la base conceptual (el contenido)

La prioridad es **enriquecer y afinar el contenido**, que es el corazón de la
herramienta:

- **Completar la clasificación.** Esta fase cubrió las generalidades, la
  morfología, el suborden Nematocera y la jerarquía general. Falta desarrollar a
  fondo el suborden **Brachycera** (incluyendo Orthorrhapha, Aschiza,
  Acalyptratae y Calyptratae) con sus superfamilias y familias.
- **Integrar las grabaciones de audio** de clase como complemento: fragmentos
  cortos que amplíen una explicación o aclaren un concepto difícil.
- **Añadir imágenes reales** de los insectos y de sus caracteres diagnósticos.
  Esto abre un tipo de ejercicio muy valioso para la identificación:
  **emparejar imagen con nombre** (reconocer una familia a partir de una foto).
- **Revisión por un experto.** Que un entomólogo valide las preguntas y
  explicaciones para garantizar el rigor científico de cada ítem.
- **Más variedad de ejercicios** dentro de cada tema, para permitir repaso sin
  repetir siempre las mismas preguntas.

### 5.2. Evolución técnica (la herramienta)

Para dar el salto de prototipo a herramienta de uso continuado, se proyecta:

- **Llevar la app al teléfono (iOS y Android), además de la web**, para que se
  pueda estudiar desde cualquier dispositivo con una sola aplicación.
- **Cuentas de usuario**, para que cada estudiante guarde su progreso y pueda
  continuarlo desde cualquier dispositivo, no solo en un navegador.
- **Una base de datos** que almacene el contenido, las imágenes y los audios de
  forma ordenada, facilitando que crezca el temario y se sumen nuevos órdenes de
  insectos en el futuro.
- **Herramientas para docentes**: por ejemplo, la posibilidad de ver el avance de
  un grupo o de agregar preguntas sin depender de un programador.

### 5.3. Una meta a mayor plazo

Si la herramienta demuestra su utilidad con Diptera, el mismo enfoque puede
**extenderse a otros órdenes de insectos**, hasta convertirse en un apoyo
general para el estudio de la entomología. La estructura del proyecto ya se
diseñó pensando en esa posibilidad.

---

*Enlace de la aplicación:* **https://cbermudez-blip.github.io/App-Entomology-/**
*Repositorio del proyecto:* **https://github.com/cbermudez-blip/App-Entomology-**
