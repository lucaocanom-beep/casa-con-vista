import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La guida di Porto Recanati e delle Marche — Casa con Vista",
  robots: { index: false, follow: false },
};

const sections = [
  {
    title: "Le spiagge che conosco bene",
    items: [
      {
        h: "La spiaggia sotto casa",
        p: "A 50 metri da Casa con Vista: sabbia fine, fondale basso, perfetta con bambini. Arriva presto in alta stagione per il lettino in prima fila.",
      },
      {
        h: "Scossicci",
        p: "Verso Numana, ciottoli e acqua trasparente con il Conero alle spalle. Ci vado quando voglio il mare \"vero\", meno affollato del lungomare cittadino.",
      },
      {
        h: "Spiaggiola di Porto Recanati",
        p: "Piccola insenatura più tranquilla, ottima al tramonto per una passeggiata senza folla.",
      },
    ],
  },
  {
    title: "Dove mangio io",
    items: [
      {
        h: "Brodetto alla recanatese",
        p: "Il piatto simbolo della costa: zafferano al posto del pomodoro o dell'aceto delle altre versioni adriatiche. Chiedi sempre dove lo fanno \"come una volta\" — non in tutti i ristoranti turistici lo trovi fatto bene.",
      },
      {
        h: "Mercato del pesce al porto",
        p: "Al mattino presto vale la pena fare un giro tra le barche: qui si capisce cosa finirà nei piatti la sera.",
      },
      {
        h: "Le osterie del centro",
        p: "Lontano dal lungomare, nelle vie dietro Corso Matteotti, si mangia meglio e si spende meno.",
      },
    ],
  },
  {
    title: "Il centro e le sere d'estate",
    items: [
      {
        h: "Corso Matteotti e Galleria Bitocchi",
        p: "Il cuore dello shopping e delle passeggiate serali, a due passi da Casa con Vista.",
      },
      {
        h: "Villa Colloredo Mels",
        p: "Il parco e il museo della città, una pausa fresca e tranquilla nelle ore più calde.",
      },
      {
        h: "Eventi estivi",
        p: "Tra giugno e settembre il lungomare si anima con mercatini serali, musica dal vivo e sagre di paese: chiedi in struttura cosa c'è in programma durante il tuo soggiorno.",
      },
    ],
  },
  {
    title: "Le Marche, fuori porta",
    items: [
      {
        h: "Riviera del Conero (20 km)",
        p: "Le spiagge più scenografiche della regione: Sirolo, Numana, la Spiaggia delle Due Sorelle raggiungibile in barca. Da fare in giornata.",
      },
      {
        h: "Recanati (15 km)",
        p: "Il borgo di Leopardi, arroccato sulla collina con vista sul mare e sui Sibillini nelle giornate limpide.",
      },
      {
        h: "Loreto (10 km)",
        p: "Il Santuario della Santa Casa, una delle mete di pellegrinaggio più importanti d'Italia, e una bella vista sulla vallata.",
      },
      {
        h: "Sibillini e entroterra",
        p: "Più lontano, ma se hai un giorno libero e l'auto, vale il viaggio: borghi medievali, tartufo e montagne anche d'estate.",
      },
    ],
  },
];

export default function GuidaPage() {
  return (
    <main className="min-h-screen bg-schiuma-50">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <p className="text-[11px] uppercase tracking-widest2 text-adriatico-700 mb-3">
          Guida gratuita
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl text-pietra-950 leading-tight mb-4">
          Porto Recanati e le Marche, secondo chi ci vive
        </h1>
        <p className="text-lg text-pietra-600 leading-relaxed mb-12 max-w-prose">
          Niente liste copiate da internet: solo i posti che consiglierei a un amico in visita.
          Aggiorniamo questa guida ogni stagione.
        </p>

        <div className="space-y-14">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-2xl text-pietra-950 mb-6 pb-2 border-b border-pietra-200">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.h}>
                    <h3 className="font-serif text-lg text-pietra-950 mb-1">{item.h}</h3>
                    <p className="text-pietra-600 leading-relaxed">{item.p}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-adriatico-800 text-schiuma-50 p-8 sm:p-10">
          <h2 className="font-serif text-2xl mb-2">Hai domande sul tuo soggiorno?</h2>
          <p className="text-schiuma-100/90 mb-6">
            Scrivici, ti rispondiamo con consigli su misura per il periodo in cui vieni.
          </p>
          <a
            href="/it#contatti"
            className="inline-flex items-center justify-center rounded-full bg-schiuma-50 text-adriatico-900 h-11 px-6 text-sm font-medium hover:bg-schiuma-100 transition-colors"
          >
            Contattaci →
          </a>
        </div>
      </div>
    </main>
  );
}
