import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bot,
  Camera,
  Check,
  ChevronRight,
  LockKeyhole,
  Menu,
  MessageCircleMore,
  ReceiptText,
  ScanLine,
  Sparkles,
  Users,
  WalletCards,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { PipMark } from './components/PipMark'

const instagramUrl = 'https://www.instagram.com/pipsavings/'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

type PhoneFrameProps = {
  src: string
  alt: string
  className?: string
  eager?: boolean
}

type FeatureSectionProps = {
  id?: string
  eyebrow: string
  title: string
  body: string
  points: string[]
  media: ReactNode
  reverse?: boolean
  tone?: 'ivory' | 'sage' | 'blue'
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Pip home" onClick={closeMenu}>
        <PipMark compact />
        <span>Pip</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      <nav className={menuOpen ? 'main-nav main-nav--open' : 'main-nav'} aria-label="Main navigation">
        <a href="#features" onClick={closeMenu}>Features</a>
        <a href="#privacy" onClick={closeMenu}>Privacy</a>
        <Link to="/faq" onClick={closeMenu}>FAQ</Link>
        <a className="nav-connect" href={instagramUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
          Instagram <ArrowRight size={15} />
        </a>
      </nav>
    </header>
  )
}

function GooglePlayBadge() {
  return (
    <div className="play-badge" aria-label="Available on Google Play">
      <span className="play-badge__triangle" aria-hidden="true" />
      <span>
        <small>Available on</small>
        <strong>Google Play</strong>
      </span>
    </div>
  )
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener?.('change', handleChange)
    return () => query.removeEventListener?.('change', handleChange)
  }, [])

  return reduced
}

function useScrollReveal() {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')

    if (reducedMotion || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('reveal--visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [reducedMotion])
}

function HeroDemo() {
  const reducedMotion = usePrefersReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (reducedMotion) {
      video.pause()
      return
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <div className="hero-demo" ref={containerRef} aria-label="Ask Pip opens filtered transaction history">
      <div className="hero-demo__halo" />
      <div className="device device--hero">
        <div className="device__screen">
          <video
            ref={videoRef}
            className="hero-demo__video"
            autoPlay
            loop
            muted
            playsInline
            poster="/screens/ask-pip.png"
            aria-label="Demonstration of Ask Pip responding to a natural language money inquiry with filtered activity"
          >
            <source src="/videos/ask-pip-demo.webm" type="video/webm" />
            <source src="/videos/ask-pip-demo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="hero-demo__note hero-demo__note--top"><MessageCircleMore size={16} /> Ask in plain language</div>
      <div className="hero-demo__note hero-demo__note--bottom"><Check size={16} /> Opens the real view</div>
    </div>
  )
}

function Hero() {
  return (
    <main id="top">
      <section className="hero page-shell">
        <div className="hero__copy">
          <div className="hero__header">
            <div className="eyebrow"><Sparkles size={14} /> AI-powered personal finance</div>
            <h1>Your money, ready when you ask.</h1>
          </div>
          <div className="hero__details">
            <p className="hero__lead">
              Pip turns receipts, transaction screenshots and everyday questions into a clear view of where your money went. Ask in plain language, then open the real screen to see the details.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#features">
                Explore what Pip can do <ArrowDown size={17} />
              </a>
              <GooglePlayBadge />
            </div>
            <div className="hero__proof" aria-label="Pip product principles">
              <span><LockKeyhole size={15} /> Local-first ledger</span>
              <span>No account required</span>
              <span>You confirm every change</span>
            </div>
          </div>
        </div>
        <HeroDemo />
      </section>
    </main>
  )
}

function PhoneFrame({ src, alt, className = '', eager = false }: PhoneFrameProps) {
  return (
    <div className={`phone-frame ${className}`}>
      <div className="phone-frame__speaker" />
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} />
    </div>
  )
}

function FeatureSection({
  id,
  eyebrow,
  title,
  body,
  points,
  media,
  reverse = false,
  tone = 'ivory',
}: FeatureSectionProps) {
  return (
    <section id={id} className={`feature feature--${tone}`}>
      <div className={`page-shell feature__inner${reverse ? ' feature__inner--reverse' : ''}`}>
        <div className="feature__copy reveal">
          <p className="section-label">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="feature__body">{body}</p>
          <ul className="feature__points">
            {points.map((point) => (
              <li key={point}><span><Check size={13} /></span>{point}</li>
            ))}
          </ul>
        </div>
        <div className="feature__media reveal">{media}</div>
      </div>
    </section>
  )
}

function FeatureStory() {
  return (
    <div id="features" className="feature-story">
      <section className="story-intro page-shell">
        <p className="section-label">One app, fewer money chores</p>
        <h2>Start with a question.<br />Finish with a clearer picture.</h2>
        <p>Pip connects the small jobs that usually live in separate apps, notes and spreadsheets.</p>
      </section>

      <FeatureSection
        eyebrow="Ask Pip"
        title="Ask once. Go straight to the answer."
        body="Type what you need in plain language. Pip finds the right view, applies the filter and leaves every save, edit or settle action with you."
        points={[
          'Open transactions by date, category or trip',
          'Prepare entries without saving behind your back',
        ]}
        tone="sage"
        media={
          <div className="chat-feature-media">
            <PhoneFrame src="/screens/ask-pip.png" alt="Ask Pip chat screen with suggested money questions" />
            <div className="floating-command floating-command--one">Show me this month</div>
            <div className="floating-command floating-command--two">Who owes me?</div>
          </div>
        }
      />

      <FeatureSection
        eyebrow="Scan and capture"
        title="Take a photo. Skip the typing."
        body="Scan a paper receipt or choose a transaction screenshot from your phone. Pip reads the useful details, then shows you what it found before anything is saved."
        points={[
          'Receipts and e-wallet screenshots',
          'Multiple transactions from one history image',
          'A review step before records enter your ledger',
        ]}
        reverse
        media={
          <div className="capture-media">
            <div className="receipt-slip" aria-hidden="true">
              <ReceiptText size={22} />
              <span className="receipt-line receipt-line--long" />
              <span className="receipt-line" />
              <span className="receipt-line receipt-line--short" />
              <strong>Ready to review</strong>
            </div>
            <PhoneFrame src="/screens/scan.png" alt="Pip screen for scanning a receipt or transaction screenshot" />
            <div className="scan-corner"><ScanLine size={23} /></div>
          </div>
        }
      />

      <FeatureSection
        eyebrow="Split bills"
        title="Split the bill while everyone still remembers it."
        body="Assign each item, add service charges and discounts, then keep track of the balance after everyone heads home."
        points={[
          'Item-by-item splits for uneven orders',
          'Service charges, vouchers and owed balances included',
        ]}
        tone="blue"
        media={
          <div className="split-media">
            <PhoneFrame src="/screens/split-bill.jpg" alt="Itemized bill split with people assigned to each order" />
            <div className="people-chip people-chip--a">F</div>
            <div className="people-chip people-chip--b">N</div>
            <div className="people-chip people-chip--c">M</div>
          </div>
        }
      />

      <FeatureSection
        eyebrow="Net worth and history"
        title="Your net worth, minus the spreadsheet."
        body="See assets, liabilities and the transactions behind the number. Pip keeps the overview and the day-to-day details close together."
        points={[
          'Cash, investments, loans and money owed to you',
          'A six-month net worth curve',
          'Spending history organized by category',
        ]}
        reverse
        media={
          <div className="double-phone">
            <PhoneFrame src="/screens/net-worth.png" alt="Pip net worth overview with assets, liabilities and a six-month trend" />
            <PhoneFrame src="/screens/breakdown.png" alt="Monthly transaction breakdown organized by spending category" className="phone-frame--rear" />
          </div>
        }
      />

      <FeatureSection
        eyebrow="Monthly recap"
        title="Your month, in a few honest pages."
        body="Pip turns the activity you recorded into a short monthly recap. See where your money went, notice the habits you kept and share only what you choose."
        points={[
          'A quick read on recorded spending patterns',
          'Shareable story cards that keep amounts private',
        ]}
        tone="sage"
        media={
          <div className="recap-media">
            <PhoneFrame src="/screens/monthly-recap.png" alt="Pip monthly recap showing recorded spending and category breakdown" />
            <div className="recap-tab"><Sparkles size={15} /> Your month with Pip</div>
          </div>
        }
      />

      <FeatureSection
        eyebrow="Streaks and your Pip"
        title="Keep the habit. Make Pip yours."
        body="A light daily streak helps you keep your records current. Change Pip's look as you go, so the routine feels like yours rather than another admin task."
        points={[
          'A visible daily logging streak',
          'Mascot colors and customizations to earn',
        ]}
        reverse
        media={<HabitMedia />}
      />
    </div>
  )
}

function HabitMedia() {
  return (
    <div className="habit-media">
      <PhoneFrame src="/screens/home.png" alt="Pip home dashboard with a seven-day logging streak and mascot" />
      <div className="streak-card">
        <span>🔥</span>
        <div><strong>7 days</strong><small>and counting</small></div>
      </div>
      <div className="mascot-picker" aria-label="Example Pip mascot colors">
        <span className="mascot-picker__label">Pick your Pip</span>
        <span className="mascot-swatch mascot-swatch--gold"><PipMark compact size={30} /></span>
        <span className="mascot-swatch mascot-swatch--sage"><PipMark compact size={30} color="#78ba8e" /></span>
        <span className="mascot-swatch mascot-swatch--blue"><PipMark compact size={30} color="#6ca0dc" /></span>
      </div>
    </div>
  )
}

function PrivacySection() {
  return (
    <section id="privacy" className="privacy-section">
      <div className="page-shell privacy-grid">
        <div className="privacy-copy">
          <p className="section-label section-label--light">Privacy, explained plainly</p>
          <h2>Your ledger stays on your phone.</h2>
          <p>
            Your transactions, budgets and saved receipts live in a local database on your device. You do not need a Pip account to use the app.
          </p>
          <p>
            When you choose an AI feature, Pip tells you what is sent for processing. Ask Pip works with a supported provider key that you add yourself.
          </p>
        </div>
        <div className="privacy-notes">
          <div><span><WalletCards size={20} /></span><strong>Local ledger</strong><p>Your everyday financial records stay in the app on your device.</p></div>
          <div><span><LockKeyhole size={20} /></span><strong>No required account</strong><p>Start tracking without creating another login.</p></div>
          <div><span><Bot size={20} /></span><strong>AI on your terms</strong><p>Add your own key for Ask Pip and review entries before saving.</p></div>
        </div>
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="closing-section">
      <div className="closing-section__orb closing-section__orb--one" />
      <div className="closing-section__orb closing-section__orb--two" />
      <div className="page-shell closing-section__inner">
        <PipMark size={72} />
        <p className="section-label">Pip is ready when you are</p>
        <h2>Less catching up.<br />More knowing where you stand.</h2>
        <p>Pip is available on Google Play. The store link is coming soon.</p>
        <div className="closing-actions">
          <GooglePlayBadge />
          <Link className="button button--outline" to="/faq">FAQ <ChevronRight size={17} /></Link>
          <a className="button button--soft" href={instagramUrl} target="_blank" rel="noreferrer">
            <InstagramIcon size={18} /> Connect with us
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <a className="brand brand--footer" href="#top" aria-label="Pip home"><PipMark compact /><span>Pip</span></a>
        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#privacy">Privacy</a>
          <Link to="/faq">FAQ</Link>
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  useEffect(() => {
    document.title = 'Pip'
  }, [])
  useScrollReveal()

  return (
    <div className="site-page">
      <Header />
      <Hero />
      <FeatureStory />
      <PrivacySection />
      <ClosingSection />
      <Footer />
    </div>
  )
}

function FaqPage() {
  useEffect(() => {
    document.title = 'FAQ | Pip'
  }, [])

  return (
    <main className="faq-page">
      <div className="faq-page__topbar">
        <Link className="brand" to="/"><PipMark compact /><span>Pip</span></Link>
        <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <ArrowRight size={15} /></a>
      </div>
      <div className="faq-page__content">
        <div className="faq-page__icon"><MessageCircleMore size={31} /></div>
        <p className="section-label">Pip FAQ</p>
        <h1>Questions deserve clear answers.</h1>
        <p>We are putting the FAQ together. For now, you can explore the app features or follow Pip on Instagram for updates.</p>
        <div className="faq-page__actions">
          <Link className="button button--primary" to="/"><ArrowLeft size={17} /> Back to Pip</Link>
          <a className="button button--outline" href={instagramUrl} target="_blank" rel="noreferrer"><InstagramIcon size={17} /> Instagram</a>
        </div>
      </div>
      <div className="faq-page__rail" aria-hidden="true">
        <span><Camera size={19} /></span><i /><span><Users size={19} /></span><i /><span><WalletCards size={19} /></span>
      </div>
    </main>
  )
}

export function SiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
