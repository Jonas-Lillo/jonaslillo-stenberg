export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-line">
            <a href="mailto:jonas@datona.no">jonas@datona.no</a>
          </div>
          <div className="footer-line">Jonas Lillo-Stenberg · 2026</div>
          <div className="footer-links" style={{ marginTop: '4px' }}>
            <a href="https://x.com/jonaslillo" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://linkedin.com/in/jonaslillo" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="/feed.xml">RSS</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
