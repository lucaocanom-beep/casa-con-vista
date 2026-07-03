import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benvenuti — Casa con Vista, Porto Recanati",
  robots: { index: false, follow: false },
};

export default function BenvenutiPage() {
  return (
    <main className="min-h-screen bg-[#f5f0eb]" style={{ fontFamily: "Georgia, serif" }}>

      {/* Header */}
      <div className="bg-pietra-950 text-schiuma-50 text-center py-3 text-sm tracking-wide">
        Per qualsiasi necessità contattami su WhatsApp:{" "}
        <a href="https://wa.me/393351672597" className="underline font-medium">
          335 167 2597
        </a>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-14">

        {/* Benvenuto */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-pietra-950 leading-tight mb-6">
            La vostra guida per un soggiorno perfetto
          </h1>
          <p className="text-xl text-pietra-700 font-medium">
            Siamo felici di avervi qui!<br />Godetevi il vostro soggiorno a Porto Recanati.
          </p>
        </div>

        <hr className="border-pietra-300 mb-16" />

        {/* Regole */}
        <Section title="Le nostre semplici regole">
          <p className="text-pietra-700 leading-relaxed mb-6">
            Ciao e benvenuti nella nostra casa! Questo non è solo un appartamento in affitto,
            ma il luogo che chiamiamo "casa" per gran parte dell'anno. È pieno di cose che amiamo
            e di ricordi, e siamo entusiasti di condividere questo spazio con voi. Vi auguriamo
            di sentirvi a vostro agio e di vivere una vacanza indimenticabile, proprio come se
            foste a casa vostra.
          </p>
          <ul className="space-y-3">
            <Rule>
              <strong>Vietato fumare all'interno.</strong> Potete farlo liberamente sul balcone,
              usando gli appositi posacenere.
            </Rule>
            <Rule>
              <strong>Animali domestici:</strong> Ci dispiace, ma non sono ammessi.
            </Rule>
            <Rule>
              <strong>Feste ed eventi:</strong> L'appartamento è pensato per il relax, non sono
              consentite feste o eventi.
            </Rule>
            <Rule>
              <strong>Orari di silenzio:</strong> Per rispettare i vicini, vi chiediamo di
              mantenere il silenzio dalle 23:00 alle 7:00.
            </Rule>
            <Rule>
              <strong>Aria condizionata:</strong> Per essere efficienti e rispettosi
              dell'ambiente, ricordate di tenere le finestre chiuse quando il condizionatore
              è in funzione.
            </Rule>
          </ul>
        </Section>

        <hr className="border-pietra-300 my-12" />

        {/* Comfort */}
        <Section title="Comfort e istruzioni utili">
          <InfoBlock title="Wi-Fi">
            Il nome della rete è: <strong>CASA CON VISTA WIFI</strong><br />
            La password è disponibile su un cartellino accanto al router.
          </InfoBlock>
          <InfoBlock title="Climatizzazione">
            Ci sono due split (uno in soggiorno e uno nel corridoio) che si accendono con lo
            stesso telecomando. Per attivarli entrambi, assicuratevi di puntare il telecomando
            direttamente su entrambi gli split.
            <br /><br />
            <em>Un consiglio:</em> l'appartamento tende a riscaldarsi di più la mattina, quindi
            vi suggeriamo di accendere il condizionatore in quelle ore. Dal primo pomeriggio,
            la brezza marina rinfresca la casa in modo naturale!
          </InfoBlock>
          <InfoBlock title="Lavatrice & Bucato">
            La lavatrice si trova in bagno ed è a vostra disposizione. Per il vostro soggiorno,
            vi forniamo noi le capsule di detersivo.
            <br /><br />
            <strong>Attenzione al rumore:</strong> la lavatrice può essere rumorosa, quindi vi
            preghiamo di usarla solo durante le ore diurne per non disturbare i vicini.
            <br /><br />
            <strong>Stendino:</strong> Il filo per stendere i panni si trova fuori dalle finestre
            di cucina e bagno. Fate attenzione a non far cadere nulla! Sotto c'è una pensilina
            e gli oggetti caduti non sono recuperabili.
          </InfoBlock>
        </Section>

        <hr className="border-pietra-300 my-12" />

        {/* Caffè */}
        <Section title="Il caffè perfetto">
          <p className="text-pietra-700 leading-relaxed mb-4">
            <strong>COME USARE</strong> la macchina <em>Didiesse Frog</em> per un caffè perfetto:
          </p>
          <ol className="space-y-4 text-pietra-800 leading-relaxed list-none">
            <li className="flex gap-3">
              <span className="font-bold text-adriatico-800 shrink-0">1.</span>
              <span><strong>Accensione:</strong> Collegate la macchina, premete il tasto grande
              e aspettate che la spia luminosa (solitamente verde) si spenga. I due tasti piccoli
              non servono, ignorateli.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-adriatico-800 shrink-0">2.</span>
              <span><strong>Acqua:</strong> Inserite il tubicino trasparente direttamente in una
              bottiglia d'acqua.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-adriatico-800 shrink-0">3.</span>
              <span><strong>Preparazione:</strong> Aprite la leva superiore, inserite una cialda
              (non c'è un verso giusto o sbagliato) e abbassate completamente la leva. Mettete la
              tazzina e premete il pulsante centrale.</span>
            </li>
            <li className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <span className="font-bold text-amber-700 shrink-0">4.</span>
              <span><strong>Dopo il caffè — ATTENZIONE!</strong><br />
              È FONDAMENTALE rimuovere subito la cialda usata! Se la cialda si secca all'interno,
              può rompersi e spargere il caffè macinato. Se dovesse succedere, abbassate la leva
              e premete il pulsante di erogazione per inumidire la cialda e rimuoverla più
              facilmente.</span>
            </li>
          </ol>
        </Section>

        <hr className="border-pietra-300 my-12" />

        {/* Raccolta differenziata */}
        <Section title="Guida alla raccolta differenziata">
          <p className="text-pietra-700 leading-relaxed mb-6">
            La raccolta è porta a porta e per questo è importantissimo rispettare giorni e orari.
            Vi forniamo noi tutti i sacchetti necessari.
          </p>
          <div className="overflow-x-auto rounded-xl ring-1 ring-pietra-200">
            <table className="w-full text-sm text-pietra-800">
              <thead className="bg-pietra-100 text-pietra-600 text-[11px] uppercase tracking-widest">
                <tr>
                  <th className="text-left px-4 py-3">Sacchetto</th>
                  <th className="text-left px-4 py-3">Cosa contiene</th>
                  <th className="text-left px-4 py-3">Giorno</th>
                  <th className="text-left px-4 py-3">Orario</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pietra-100 bg-white">
                <tr>
                  <td className="px-4 py-3 font-semibold">🔵 Sacchetto Blu</td>
                  <td className="px-4 py-3">Plastica, lattine, barattoli</td>
                  <td className="px-4 py-3">Mercoledì e Sabato</td>
                  <td className="px-4 py-3">7:00 – 9:00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">📄 Sacchetto Carta</td>
                  <td className="px-4 py-3">Carta, cartoncini, giornali, Tetra Pak</td>
                  <td className="px-4 py-3">Martedì</td>
                  <td className="px-4 py-3">7:00 – 9:00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">🟡 Sacchetto Giallo</td>
                  <td className="px-4 py-3">Tutto ciò che non è differenziabile</td>
                  <td className="px-4 py-3">Lunedì</td>
                  <td className="px-4 py-3">7:00 – 9:00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">🟤 Umido</td>
                  <td className="px-4 py-3">Avanzi di cibo, tovaglioli, fondi di caffè</td>
                  <td className="px-4 py-3">Contenitori stradali marroni</td>
                  <td className="px-4 py-3">In qualsiasi momento</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">🟢 Vetro</td>
                  <td className="px-4 py-3">Bottiglie, bicchieri, barattoli</td>
                  <td className="px-4 py-3">Contenitori stradali verdi</td>
                  <td className="px-4 py-3">In qualsiasi momento</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <hr className="border-pietra-300 my-12" />

        {/* Cura della casa */}
        <Section title="Trattiamo la casa con cura">
          <p className="text-pietra-700 leading-relaxed mb-4">
            Come vi abbiamo detto, questa è la nostra casa. Ogni cosa, dai libri alla credenza,
            ha una sua storia e un suo valore per noi. Vi preghiamo di trattare l'appartamento
            con la stessa cura che mettereste nel vostro. Se qualcosa dovesse danneggiarsi,
            vi chiediamo di avvisarci subito. Parlandone, troveremo una soluzione in modo sereno
            e senza problemi. La vostra onestà è un gesto di grande rispetto.
          </p>
          <ul className="space-y-2">
            <Rule>I libri e le riviste sono a vostra disposizione per la lettura, vi preghiamo solo di rimetterli al loro posto.</Rule>
            <Rule><strong>Importante:</strong> La credenza sopra la TV non va aperta, né forzata. Grazie per la vostra collaborazione.</Rule>
          </ul>
        </Section>

        <hr className="border-pietra-300 my-12" />

        {/* Playlist */}
        <Section title="Per un'atmosfera perfetta">
          <p className="text-pietra-700 leading-relaxed">
            Se cercate la colonna sonora ideale per godervi un tramonto indimenticabile,
            vi consigliamo questa playlist su Spotify:{" "}
            <a
              href="https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-adriatico-800 underline font-medium"
            >
              A LA SALA
            </a>
          </p>
        </Section>

        <hr className="border-pietra-300 my-12" />

        {/* Footer CTA */}
        <div className="text-center rounded-2xl bg-pietra-950 text-schiuma-50 p-8 sm:p-10">
          <h2 className="font-serif text-2xl mb-2">Hai bisogno di qualcosa?</h2>
          <p className="text-schiuma-100/80 mb-6 text-sm">
            Sono sempre disponibile. Scrivimi su WhatsApp e ti rispondo al più presto.
          </p>
          <a
            href="https://wa.me/393351672597"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white h-11 px-6 text-sm font-medium hover:opacity-90 transition-opacity"
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-2">
      <h2 className="text-3xl sm:text-4xl font-bold text-pietra-950 leading-tight mb-6">
        {title}
      </h2>
      <div className="text-pietra-800 leading-relaxed">{children}</div>
    </section>
  );
}

function Rule({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-adriatico-700 shrink-0" />
      <span className="text-pietra-800 leading-relaxed">{children}</span>
    </li>
  );
}

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="font-bold text-pietra-950 text-lg mb-2">{title}</h3>
      <p className="text-pietra-700 leading-relaxed">{children}</p>
    </div>
  );
}
