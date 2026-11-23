// =============================================================================
// CONTENIDO DEL CURSO — ORDEN DIPTERA
// Fuente: presentación 12Diptera.pptx (Profs. Javier Martínez y Francisco Serna)
// articulada con Borror & DeLong, cap. "34 Order Diptera - Flies".
//
// Este archivo es la ÚNICA fuente de contenido. Está diseñado para migrar
// directamente a filas de una base de datos (Supabase/PostgreSQL) en la Fase 2.
// Cada "lección" es una lista ordenada de ejercicios de tipos distintos.
// =============================================================================

const COURSE = {
  id: "entomologia-agricola",
  title: "Entomología",
  units: [
    {
      id: "diptera",
      order: "Diptera",
      title: "Orden Diptera — Las moscas verdaderas",
      subtitle: "Estructura de 12Diptera.pptx complementada con Borror",
      color: "#2e7d32",
      lessons: [
        // ---------------------------------------------------------------------
        {
          id: "diptera-generalidades",
          title: "Generalidades y hábitos tróficos",
          icon: "🪰",
          exercises: [
            {
              type: "multiple-choice",
              prompt:
                "¿Cuál es el atributo morfológico fundamental que define al orden Diptera?",
              options: [
                "Un solo par de alas funcionales; las posteriores reducidas a halterios",
                "Dos pares de alas membranosas de igual tamaño",
                "Alas anteriores endurecidas en élitros",
                "Ausencia total de alas",
              ],
              answer: 0,
              explanation:
                "Diptera = 'dos alas'. El par anterior es funcional y el posterior se reduce a halterios o balancines, órganos de equilibrio en vuelo.",
            },
            {
              type: "multiple-choice",
              prompt:
                "¿Cómo se denomina el par de alas posteriores reducido, característico de Diptera?",
              options: [
                "Tégminas",
                "Élitros",
                "Halterios o balancines",
                "Hemélitros",
              ],
              answer: 2,
              explanation:
                "Los halterios (o balancines) son estructuras giroscópicas derivadas del segundo par de alas.",
            },
            {
              type: "fill-blank",
              prompt:
                "Se estiman alrededor de 125.000 a 150.000 especies descritas de dípteros en cerca de ___ familias a nivel mundial.",
              answer: "150",
              accepted: ["150", "ciento cincuenta"],
              explanation:
                "Según la presentación y Borror, el orden abarca cerca de 150 familias.",
            },
            {
              type: "match",
              prompt:
                "Empareja cada familia con su hábito trófico según la matriz funcional del curso.",
              pairs: [
                {
                  left: "Agromyzidae",
                  right: "Fitófago filófago (minador de hojas)",
                },
                {
                  left: "Culicidae",
                  right: "Zoófago hematófago (vector biológico)",
                },
                {
                  left: "Syrphidae",
                  right: "Zoófago depredador (larvas afidófagas)",
                },
                { left: "Calliphoridae", right: "Sapro-necrófago (miasis)" },
              ],
              explanation:
                "La matriz trófica de Diptera cubre fitófagos, zoófagos y sapro-necrófagos; cada familia se asocia a un gremio dominante.",
            },
            {
              type: "multiple-choice",
              prompt:
                "El género Forcipomyia (Ceratopogonidae) es relevante en agricultura tropical porque es:",
              options: [
                "Vector de la malaria",
                "Polinizador obligado y exclusivo del cacao (Theobroma cacao)",
                "Minador de hojas de papa",
                "Parasitoide de Lepidoptera",
              ],
              answer: 1,
              explanation:
                "Forcipomyia sp. es el polinizador obligado del cacao, en contraste con los Culicoides hematófagos de la misma familia.",
            },
          ],
        },
        // ---------------------------------------------------------------------
        {
          id: "diptera-morfologia",
          title: "Morfología diagnóstica",
          icon: "🔬",
          exercises: [
            {
              type: "multiple-choice",
              prompt:
                "¿Qué carácter de las antenas separa al suborden Nematocera de Brachycera?",
              options: [
                "Nematocera: antenas con más de 5 segmentos (largas)",
                "Nematocera: antenas siempre plumosas en ambos sexos",
                "Nematocera: antenas ausentes",
                "Nematocera: antenas con arista dorsal",
              ],
              answer: 0,
              explanation:
                "Nematocera ('longecornios') presenta antenas largas de más de 5 segmentos; Brachycera ('brevicornios') las tiene cortas, ≤ 3–5 segmentos.",
            },
            {
              type: "fill-blank",
              prompt:
                "En Cyclorrhapha el adulto emerge rompiendo el pupario mediante una vesícula frontal eversible llamada ___.",
              answer: "ptilinum",
              accepted: ["ptilinum", "ptilino"],
              explanation:
                "El ptilinum deja una cicatriz (sutura ptilinal) que define a las Schizophora.",
            },
            {
              type: "multiple-choice",
              prompt:
                "La presencia de sutura ptilinal (frontal) distingue dentro de Cyclorrhapha a:",
              options: [
                "Aschiza (con sutura) de Schizophora (sin sutura)",
                "Schizophora (con sutura) de Aschiza (sin sutura)",
                "Nematocera de Brachycera",
                "Calyptratae de Acalyptratae por el tamaño del ala",
              ],
              answer: 1,
              explanation:
                "Schizophora posee sutura ptilinal; Aschiza carece de ella (p. ej. Syrphidae, Phoridae).",
            },
            {
              type: "match",
              prompt:
                "Empareja el grupo con su carácter diagnóstico de las caliptras / segmento antenal.",
              pairs: [
                {
                  left: "Calyptratae",
                  right:
                    "Caliptras grandes; sutura longitudinal en 2.º segmento antenal",
                },
                {
                  left: "Acalyptratae",
                  right:
                    "Caliptras reducidas; 2.º segmento antenal sin sutura longitudinal",
                },
              ],
              explanation:
                "El desarrollo de las caliptras y la sutura del segundo segmento antenal separan ambos grupos de Schizophora.",
            },
          ],
        },
        // ---------------------------------------------------------------------
        {
          id: "diptera-nematocera",
          title: "Suborden Nematocera",
          icon: "🦟",
          exercises: [
            {
              type: "multiple-choice",
              prompt: "¿Qué tipo de pupa caracteriza al suborden Nematocera?",
              options: [
                "Pupa obtecta",
                "Pupa en pupario (coarctada)",
                "Pupa exarada libre",
                "No tienen pupa",
              ],
              answer: 0,
              explanation:
                "Nematocera presenta pupa obtecta; las larvas son eucéfalas o hemicéfalas con mandíbulas que se oponen en plano horizontal.",
            },
            {
              type: "match",
              prompt:
                "Empareja cada familia de Nematocera con su rasgo o importancia distintiva.",
              pairs: [
                {
                  left: "Tipulidae",
                  right: "Patas larguísimas; sutura en 'V' en el mesonoto",
                },
                {
                  left: "Culicidae",
                  right:
                    "Escamas sobre las venas alares; vectores de malaria y dengue",
                },
                {
                  left: "Cecidomyiidae",
                  right:
                    "Venación muy reducida (<7 venas); inductoras de agallas",
                },
                {
                  left: "Sciaridae",
                  right:
                    "Puente ocular dorsal (eye bridge) sobre las bases antenales",
                },
              ],
              explanation:
                "Cada familia de Nematocera tiene caracteres de venación, patas u ojos que permiten su identificación.",
            },
            {
              type: "multiple-choice",
              prompt:
                "Mayetiola destructor (la 'mosca de Hesse' del trigo) pertenece a la familia:",
              options: [
                "Tipulidae",
                "Bibionidae",
                "Cecidomyiidae",
                "Simuliidae",
              ],
              answer: 2,
              explanation:
                "Mayetiola destructor es un cecidómido, plaga de importancia económica en trigo.",
            },
            {
              type: "fill-blank",
              prompt:
                "Las antenas de Nematocera suelen tener más de ___ segmentos articulados.",
              answer: "5",
              accepted: ["5", "cinco"],
              explanation:
                "Más de 5 segmentos (usualmente 6 o más flagelómeros libres) definen al grupo de antenas largas.",
            },
          ],
        },
        // ---------------------------------------------------------------------
        {
          id: "diptera-taxonomia",
          title: "Ordenar la clasificación",
          icon: "🧬",
          exercises: [
            {
              type: "order",
              prompt:
                "Ordena los niveles jerárquicos de Diptera, del más general (arriba) al más particular (abajo).",
              items: [
                "Orden Diptera",
                "Suborden Brachycera",
                "Infraorden Muscomorpha (Cyclorrhapha)",
                "Sección Schizophora",
                "Familia Tachinidae",
              ],
              explanation:
                "La ruta va: Orden → Suborden → Infraorden → Sección → Familia. Tachinidae es una familia de Oestroidea dentro de Calyptratae.",
            },
            {
              type: "order",
              prompt:
                "Ordena estos clados de Cyclorrhapha según su anidamiento, del más amplio al más restringido.",
              items: [
                "Cyclorrhapha",
                "Schizophora",
                "Calyptratae",
                "Superfamilia Oestroidea",
                "Calliphoridae",
              ],
              explanation:
                "Cyclorrhapha ⊃ Schizophora ⊃ Calyptratae ⊃ Oestroidea ⊃ Calliphoridae.",
            },
            {
              type: "multiple-choice",
              prompt:
                "Dentro de Acalyptratae, ¿qué familia agrupa a las 'verdaderas moscas de la fruta' (Anastrepha, Ceratitis, Rhagoletis)?",
              options: [
                "Drosophilidae",
                "Tephritidae",
                "Agromyzidae",
                "Chloropidae",
              ],
              answer: 1,
              explanation:
                "Tephritidae (superfamilia Tephritoidea) reúne a las verdaderas moscas de la fruta de gran importancia económica.",
            },
          ],
        },
      ],
    },
  ],
};

// Exponer globalmente para el runtime de Babel-in-browser (prototipo).
// Al migrar a Vite/React Native, reemplaza esto por `export { COURSE };`.
if (typeof window !== "undefined") {
  window.COURSE = COURSE;
}
