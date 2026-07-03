import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benvenuti — Casa con Vista, Porto Recanati",
  robots: { index: false, follow: false },
};

export default function BenvenutiPage() {
  return (
    <main className="min-h-screen bg-schiuma-50">

      {/* Hero */}
      <div className="bg-adriatico-950 text-schiuma-50 px-6 py-16 sm:py-24 text-center">
        <p className="text-xs uppercase tracking-widest2 text-schiuma-100/60 mb-4">
          Casa con Vista · Porto Recanati
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight text-schiuma-50 mb-6">
          La vostra guida per un<br className="hidden sm:block" /> soggiorno perfetto
        </h1>
        <p className="text-lg text-schiuma-100/80 max-w-md mx-auto">
          Siamo felici di avervi qui. Godetevi il vostro soggiorno a Porto Recanati.
        </p>
        <a
          href="https://wa.me/393351672597"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white h-11 px-6 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
            <path d="M19.11 17.39c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.54-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.84.14.18 1.94 2.97 4.71 4.16.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.52-.32zM16.02 6.18c-5.42 0-9.83 4.41-9.83 9.83 0 1.92.56 3.79 1.61 5.41l-1.06 3.86 3.97-1.04a9.81 9.81 0 0 0 5.31 1.55h.01c5.42 0 9.83-4.41 9.83-9.83a9.78 9.78 0 0 0-2.88-6.95 9.78 9.78 0 0 0-6.96-2.83zm0 17.91h-.01a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3.07.81.82-2.99-.2-.31a8.13 8.13 0 0 1-1.25-4.35c0-4.51 3.67-8.17 8.18-8.17 2.18 0 4.23.85 5.78 2.4a8.12 8.12 0 0 1 2.39 5.78c0 4.51-3.67 8.17-8.18 8.17z" />
          </svg>
          Per qualsiasi necessità: 335 167 2597
        </a>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 space-y-20">

        {/* Regole */}
        <Block eyebrow="Prima di tutto" title="Le nostre semplici regole">
          <p className="text-pietra-600 leading-relaxed mb-8">
            Ciao e benvenuti nella nostra casa! Questo non è solo un appartamento in affitto,
            ma il luogo che chiamiamo "casa" per gran parte dell'anno. È pieno di cose che amiamo
            e di ricordi, e siamo entusiasti di condividere questo spazio con voi. Vi auguriamo
            di sentirvi a vostro agio e di vivere una vacanza indimenticabile, proprio come se
            foste a casa vostra.
          </p>
          <ul className="space-y-4">
            {[
              ["🚭", "Vietato fumare all'interno", "Potete farlo liberamente sul balcone, usando gli appositi posacenere."],
              ["🐾", "Animali domestici", "Ci dispiace, ma non sono ammessi."],
              ["🎉", "Feste ed eventi", "L'appartamento è pensato per il relax, non sono consentite feste o eventi."],
              ["🌙", "Orari di silenzio", "Per rispettare i vicini, vi chiediamo di mantenere il silenzio dalle 23:00 alle 7:00."],
              ["❄️", "Aria condizionata", "Per essere efficienti e rispettosi dell'ambiente, ricordate di tenere le finestre chiuse quando il condizionatore è in funzione."],
            ].map(([emoji, label, desc]) => (
              <li key={label} className="flex gap-4 p-4 rounded-xl bg-white ring-1 ring-pietra-100">
                <span className="text-xl shrink-0 mt-0.5">{emoji}</span>
                <div>
                  <p className="font-medium text-pietra-950">{label}</p>
                  <p className="text-sm text-pietra-600 mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Block>

        <Divider />

        {/* Comfort */}
        <Block eyebrow="Tutto quello che vi serve" title="Comfort e istruzioni utili">
          <div className="space-y-8">
            <InfoCard icon="📶" title="Wi-Fi">
              Nome rete: <strong className="text-pietra-950">CASA CON VISTA WIFI</strong><br />
              La password è sul cartellino accanto al router.
            </InfoCard>
            <InfoCard icon="🌬️" title="Climatizzazione">
              Ci sono due split — uno in soggiorno, uno nel corridoio — che si accendono con lo stesso telecomando.
              Per attivarli entrambi puntate il telecomando verso ognuno.<br /><br />
              <span className="text-pietra-500 text-sm italic">Consiglio: l'appartamento si riscalda di più la mattina — accendete il condizionatore in quelle ore. Dal primo pomeriggio entra la brezza del mare.</span>
            </InfoCard>
            <InfoCard icon="🫧" title="Lavatrice & Bucato">
              La lavatrice è in bagno, le capsule di detersivo le trovate lì. Usatela solo di giorno per non disturbare i vicini.<br /><br />
              <strong className="text-pietra-950">Stendino:</strong> il filo è fuori dalle finestre di cucina e bagno.
              Fate attenzione a non far cadere nulla: sotto c'è una pensilina e gli oggetti caduti non sono recuperabili.
            </InfoCard>
          </div>
        </Block>

        <Divider />

        {/* Caffè */}
        <Block eyebrow="Istruzioni" title="Il caffè perfetto">
          <p className="text-pietra-600 leading-relaxed mb-6">
            Come usare la macchina <em className="text-pietra-950">Didiesse Frog</em>:
          </p>
          <ol className="space-y-4">
            {[
              ["Accensione", "Collegate la macchina, premete il tasto grande e aspettate che la spia verde si spenga. I due tasti piccoli non servono."],
              ["Acqua", "Inserite il tubicino trasparente direttamente in una bottiglia d'acqua."],
              ["Preparazione", "Aprite la leva superiore, inserite una cialda (non c'è un verso giusto o sbagliato), abbassate la leva. Mettete la tazzina e premete il pulsante centrale."],
            ].map(([step, desc], i) => (
              <li key={step} className="flex gap-4 items-start">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-adriatico-950 text-schiuma-50 text-sm font-medium">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <p className="font-medium text-pietra-950">{step}</p>
                  <p className="text-sm text-pietra-600 mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-xl bg-amber-50 ring-1 ring-amber-200 p-4 flex gap-3">
            <span className="text-xl shrink-0">⚠️</span>
            <div>
              <p className="font-medium text-amber-900">Dopo il caffè — importante!</p>
              <p className="text-sm text-amber-800 mt-0.5">
                Rimuovete subito la cialda usata. Se si secca può rompersi e spargere il caffè macinato.
                Se succede: abbassate la leva e premete il pulsante di erogazione per inumidirla.
              </p>
            </div>
          </div>
        </Block>

        <Divider />

        {/* Raccolta differenziata */}
        <Block eyebrow="Raccolta porta a porta" title="Guida alla raccolta differenziata">
          <p className="text-pietra-600 leading-relaxed mb-6">
            È importantissimo rispettare giorni e orari. Vi forniamo noi tutti i sacchetti necessari.
          </p>
          <div className="overflow-x-auto rounded-2xl ring-1 ring-pietra-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-pietra-50 border-b border-pietra-200">
                  <th className="text-left px-5 py-3 text-[11px] uppercase tracking-widest2 text-pietra-500 font-medium">Sacchetto</th>
                  <th className="text-left px-5 py-3 text-[11px] uppercase tracking-widest2 text-pietra-500 font-medium">Cosa contiene</th>
                  <th className="text-left px-5 py-3 text-[11px] uppercase tracking-widest2 text-pietra-500 font-medium">Giorno</th>
                  <th className="text-left px-5 py-3 text-[11px] uppercase tracking-widest2 text-pietra-500 font-medium">Orario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pietra-100 bg-white">
                {[
                  ["🔵", "Blu", "Plastica, lattine, barattoli", "Mercoledì e Sabato", "7:00 – 9:00"],
                  ["📄", "Carta", "Carta, cartoncini, giornali, Tetra Pak", "Martedì", "7:00 – 9:00"],
                  ["🟡", "Giallo", "Tutto ciò che non è differenziabile", "Lunedì", "7:00 – 9:00"],
                  ["🟤", "Umido", "Avanzi di cibo, tovaglioli, fondi di caffè", "Contenitori marroni in strada", "Sempre"],
                  ["🟢", "Vetro", "Bottiglie, bicchieri, barattoli", "Contenitori verdi in strada", "Sempre"],
                ].map(([emoji, name, content, day, time]) => (
                  <tr key={name}>
                    <td className="px-5 py-3 font-medium text-pietra-950">{emoji} {name}</td>
                    <td className="px-5 py-3 text-pietra-600">{content}</td>
                    <td className="px-5 py-3 text-pietra-800">{day}</td>
                    <td className="px-5 py-3 text-adriatico-800 font-medium">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Block>

        <Divider />

        {/* Cura */}
        <Block eyebrow="Vi chiediamo" title="Trattiamo la casa con cura">
          <p className="text-pietra-600 leading-relaxed mb-6">
            Questa è la nostra casa. Ogni cosa, dai libri alla credenza, ha una sua storia e un suo
            valore per noi. Vi preghiamo di trattarla con la stessa cura che mettereste nel vostro.
            Se qualcosa dovesse danneggiarsi, avvisateci subito: troveremo una soluzione in modo
            sereno. La vostra onestà è un gesto di grande rispetto.
          </p>
          <div className="rounded-xl bg-white ring-1 ring-pietra-100 p-5 space-y-3">
            <p className="text-sm text-pietra-700">📚 I libri e le riviste sono a vostra disposizione per la lettura — rimetteteli al loro posto.</p>
            <p className="text-sm text-pietra-700 font-medium">🚫 La credenza sopra la TV non va aperta, né forzata. Grazie.</p>
          </div>
        </Block>

        <Divider />

        {/* Playlist */}
        <Block eyebrow="Per il tramonto" title="Per un'atmosfera perfetta">
          <p className="text-pietra-600 leading-relaxed mb-6">
            Se cercate la colonna sonora ideale per godervi un tramonto indimenticabile dal balcone,
            vi consigliamo questa playlist:
          </p>
          <a
            href="https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[#1DB954] text-white h-11 px-6 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            A LA SALA su Spotify
          </a>
        </Block>

        {/* CTA finale */}
        <div className="rounded-2xl bg-adriatico-950 text-schiuma-50 p-8 sm:p-12 text-center">
          <p className="text-xs uppercase tracking-widest2 text-schiuma-100/60 mb-3">Sempre disponibile</p>
          <h2 className="font-serif text-3xl sm:text-4xl text-schiuma-50 mb-3">
            Hai bisogno di qualcosa?
          </h2>
          <p className="text-schiuma-100/70 mb-8 max-w-sm mx-auto">
            Scrivimi su WhatsApp e ti rispondo al più presto.
          </p>
          <a
            href="https://wa.me/393351672597"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white h-12 px-8 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden>
              <path d="M19.11 17.39c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.54-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.84.14.18 1.94 2.97 4.71 4.16.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.12-.25-.18-.52-.32zM16.02 6.18c-5.42 0-9.83 4.41-9.83 9.83 0 1.92.56 3.79 1.61 5.41l-1.06 3.86 3.97-1.04a9.81 9.81 0 0 0 5.31 1.55h.01c5.42 0 9.83-4.41 9.83-9.83a9.78 9.78 0 0 0-2.88-6.95 9.78 9.78 0 0 0-6.96-2.83zm0 17.91h-.01a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3.07.81.82-2.99-.2-.31a8.13 8.13 0 0 1-1.25-4.35c0-4.51 3.67-8.17 8.18-8.17 2.18 0 4.23.85 5.78 2.4a8.12 8.12 0 0 1 2.39 5.78c0 4.51-3.67 8.17-8.18 8.17z" />
            </svg>
            Scrivimi su WhatsApp
          </a>
        </div>

      </div>
    </main>
  );
}

function Block({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="text-xs uppercase tracking-widest2 text-adriatico-700/80 mb-3">{eyebrow}</p>
      <h2 className="font-serif text-3xl sm:text-4xl text-pietra-950 leading-tight mb-8">{title}</h2>
      {children}
    </section>
  );
}

function InfoCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white ring-1 ring-pietra-100 p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-serif text-xl text-pietra-950">{title}</h3>
      </div>
      <p className="text-sm text-pietra-600 leading-relaxed">{children}</p>
    </div>
  );
}

function Divider() {
  return <hr className="border-pietra-200" />;
}
