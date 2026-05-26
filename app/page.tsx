import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header activePage="hjem" />
      <main>

        <section className="section section--split">
          <div className="container">
            <div className="split-layout">

              <div className="split-text">
                <h1 style={{ marginBottom: '28px' }}>
                  Digital vekst krever <s>tenking</s> handling utenfor boksen.
                </h1>
                <div className="prose">
                  <p>Fysikk, biologi, kjemi til og med kjønnspsykologi gjør eksperimentering: tester, lærer, endrer og utfører.</p>
                  <p>I den digitale verden vil folk gjerne bygge eller kjøpe antagelser. Det som fungerer er urgammelt og enkelt</p>
                  <ol className="method-steps">
                    <li>Mange små tester</li>
                    <li>Les resultatene</li>
                    <li>Gjør det data tilsier at fungerer</li>
                  </ol>
                </div>
                <div className="hero-ctas" style={{ marginTop: '32px' }}>
                  <a href="mailto:jonas@datona.no" className="btn-primary">Snakk med meg →</a>
                  <a href="/innhold" className="link-arrow">Les essays</a>
                </div>
              </div>

              <div className="split-table-wrap">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th>Antagelsene:</th>
                      <th>Realiteten:</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Nettside</td><td>Presentasjon</td></tr>
                    <tr><td>SEO</td><td>Synlighet</td></tr>
                    <tr><td>App</td><td>Løsning på problem</td></tr>
                    <tr><td>Sosiale medier</td><td>Synlighet</td></tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <p className="section-label">Hvis du tar kontakt</p>
            <div className="contact-block">
              <h2>Først en samtale. Så en plan. Investering kommer sist.</h2>
              <div style={{ marginTop: '24px' }} className="prose">
                <p>Vi går gjennom hva du faktisk prøver å oppnå – ikke hva du tror du trenger å kjøpe. Hvis jeg ser en mulighet, foreslår jeg de enkleste testene som vil gi oss data. Hvis jeg ikke ser den, sier jeg det.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <p className="section-label">Hvem jeg er</p>
            <div className="prose">
              <p>Teknolog som starter med problemet, ikke løsningen. First principles, lean startup, anti-buzzword.</p>
              <p>Jeg driver Datona som medeier og har levert 25+ digitale produkter.</p>
              <div style={{ marginTop: '28px' }}>
                <a href="/om" className="link-arrow">Les hele historien →</a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
