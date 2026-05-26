import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header activePage="hjem" />
      <main>

        <section className="hero">
          <div className="container">
            <h1>Digital vekst krever bevis, ikke gjetting.</h1>
            <p className="hero-sub">
              Leger lærer av å behandle. Ingeniører lærer av å bygge.<br />
              Analyse er ikke eksperimentering. Handling er.<br />
              Du kan håpe på vekst, eller du kan vite hva som skaper den.
            </p>
            <div className="hero-ctas">
              <a href="mailto:jonas@datona.no" className="btn-primary">Snakk med meg →</a>
              <a href="/innhold" className="link-arrow">Les essays</a>
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
