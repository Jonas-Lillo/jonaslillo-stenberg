import Link from 'next/link'

interface HeaderProps {
  activePage?: 'hjem' | 'innhold' | 'om'
}

export default function Header({ activePage }: HeaderProps) {
  return (
    <header>
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="header-brand">Jonas Lillo-Stenberg</Link>
          <nav aria-label="Hovednavigasjon">
            <ul className="header-nav">
              <li><Link href="/" className={activePage === 'hjem' ? 'active' : ''}>Hjem</Link></li>
              <li><Link href="/innhold" className={activePage === 'innhold' ? 'active' : ''}>Innhold</Link></li>
              <li><Link href="/om" className={activePage === 'om' ? 'active' : ''}>Om</Link></li>
            </ul>
          </nav>
          <div className="header-social">
            <a href="https://x.com/jonaslillo" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://linkedin.com/in/jonaslillo" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </header>
  )
}
