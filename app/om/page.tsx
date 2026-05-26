import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Om Jonas',
  description: 'Teknolog, medeier i Datona. Bygger med first principles, lean startup og null buzzwords.',
}

export default function Om() {
  return (
    <>
      <Header activePage="om" />
      <main>

        <section className="container">
          <div style={{ padding: '72px 0 0' }}>
            <p className="ago-ergo-sum"><em>Ago ergo sum</em> — jeg handler, derfor er jeg</p>
          </div>
        </section>

        <section className="container">
          <div style={{ padding: '32px 0 0', maxWidth: '420px' }}>
            <Image
              src="/jonas.jpeg"
              alt="Jonas Lillo-Stenberg"
              width={420}
              height={560}
              style={{ width: '100%', height: 'auto', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              priority
            />
          </div>
        </section>

        <div className="container">

          <div className="about-section">
            <p className="section-label">Hvordan jeg lærte å bygge</p>
            <div className="prose">
              <p>Du forstår ikke et konsept ved å snakke om det. Du må koble det til noe som eksisterer.</p>
              <p>Du kan ikke sykle ved å lese om en sykkel. Du må sette deg på den. Du må se målet, prøve, feile, og iterere.</p>
              <p>Jeg tror på "learn by failing as fast as possible." Det var den eneste måten jeg faktisk lærte å bygge.</p>
            </div>
          </div>

          <div className="about-section">
            <p className="section-label">Hvordan jeg jobber</p>
            <h2 style={{ marginBottom: '32px' }}>Hvordan jeg <s>jobber</s> har det gøy hver dag</h2>
            <ul className="method-list">
              <li className="method-item">
                <strong>Etterspørsel før kode.</strong>
                <p>Jeg jakter problemer, ikke løsninger. Hvis det ikke er reell etterspørsel, bygger jeg ikke.</p>
              </li>
              <li className="method-item">
                <strong>First principles.</strong>
                <p>Hvert problem brytes ned til sine minste byggesteiner. Den korteste veien til målet finnes – jeg leter til jeg finner den.</p>
              </li>
              <li className="method-item">
                <strong>Test enkelt, invester når jeg vet.</strong>
                <p>Lean startup. Jeg behandler bedrifter som eksperimenter. Små tester koster lite og forteller meg hva som fungerer.</p>
              </li>
              <li className="method-item">
                <strong>Anti-buzzword.</strong>
                <p>"Digital transformasjon," "AI-strategi," "framework for vekst" – ord som skjuler at noen ikke vet hva de snakker om.</p>
              </li>
            </ul>
          </div>

          <div className="about-section">
            <p className="section-label">Hva jeg har bygget</p>
            <ul className="built-list">
              <li className="built-item">
                <strong>Datona</strong>
                <p>Teknologibyrå. Medeier. 25+ leveranser: nettsider, leadgen-systemer, automatisering, AI-orkestrering.</p>
              </li>
              <li className="built-item">
                <strong>Egne prosjekter</strong>
                <p>AI-orkestrering, hardware (egne servere), scrapers, distribusjonsverktøy. Bygger det jeg selv trenger.</p>
              </li>
            </ul>
          </div>

          <div className="about-section">
            <p className="section-label">Hva jeg observerer i norsk tech</p>
            <div className="prose">
              <p>Norsk tech-bransje er treg. Den er regulert, vanskelig å skalere i, og dominert av pakke-tenkning.</p>
              <p>Kulturen for eksperimentering mangler. First principles er sjeldent. Hastighet er ikke prioritert.</p>
              <p>Bransjen henger fast i rammeverk fordi det er trygt å selge og enkelt å forstå. Resultatet er at kundene betaler for prosess, ikke for resultater.</p>
              <p>Det er ikke en frustrasjon. Det er en observasjon. Den forklarer hvorfor jeg jobber slik jeg gjør.</p>
            </div>
          </div>

          <div className="about-section">
            <p className="section-label">Hva jeg ikke gjør</p>
            <ul className="dont-list">
              <li>Jeg selger ikke ferdige pakker.</li>
              <li>Jeg jobber ikke med kunder som ikke vil definere hva problemet faktisk er.</li>
              <li>Jeg gjør ikke rene rådgivningsprosjekter – jeg vil bygge eller eksperimentere med det jeg foreslår.</li>
            </ul>
          </div>

          <div className="about-section">
            <p className="section-label">Kontakt</p>
            <a href="mailto:jonas@datona.no" className="contact-email">jonas@datona.no</a>
            <div className="prose">
              <p style={{ color: 'var(--muted)', fontSize: '1rem' }}>Jeg svarer som regel innen 24 timer på hverdager. Fortell meg hva du prøver å oppnå, ikke hva du tror du trenger å kjøpe. Det sparer oss begge for tid.</p>
            </div>
          </div>

        </div>

      </main>
      <Footer />
    </>
  )
}
