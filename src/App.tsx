import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CloudUpload,
  ExternalLink,
  FileDown,
  Globe,
  LockKeyhole,
  Menu,
  MessageCircleMore,
  Moon,
  PiggyBank,
  ReceiptText,
  Repeat,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
  WalletCards,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PipMark } from './components/PipMark'
import { LegalPage } from './LegalPage'
import { useTheme } from './theme'
import { usePrefersReducedMotion } from './motion'
import { ScanDemo } from './components/ScanDemo'
import { TripDemo } from './components/TripDemo'

export const instagramUrl = 'https://www.instagram.com/pipsavings/'
const demoAppUrl = 'https://pip-finance.vercel.app'
const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.yabg.pip'

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
  /** Screenshot file in /screens; the dark variant lives at the same name in /screens/dark. */
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

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="brand" href={onHome ? '#top' : '/'} aria-label="Pip home" onClick={closeMenu}>
        <PipMark compact />
        <span>Pip</span>
      </a>

      <nav className={menuOpen ? 'main-nav main-nav--open' : 'main-nav'} aria-label="Main navigation">
        <a href={sectionHref('features')} onClick={closeMenu}>Features</a>
        <a href={sectionHref('privacy')} onClick={closeMenu}>Privacy</a>
        <Link to="/faq" onClick={closeMenu}>FAQ</Link>
        <a className="nav-demo" href={demoAppUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
          Demo <ArrowRight size={15} />
        </a>
        <a
          className="nav-instagram"
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          title="Pip on Instagram"
          onClick={closeMenu}
        >
          <InstagramIcon size={19} />
        </a>
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  )
}

function GooglePlayBadge() {
  return (
    <a
      className="play-badge"
      href={playStoreUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Available on Google Play"
    >
      <span className="play-badge__triangle" aria-hidden="true" />
      <span>
        <small>Available on</small>
        <strong>Google Play</strong>
      </span>
    </a>
  )
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
  const { theme } = useTheme()
  const videoBase = theme === 'dark' ? '/videos/ask-pip-demo-dark' : '/videos/ask-pip-demo'
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
  }, [reducedMotion, theme])

  return (
    <div className="hero-demo" ref={containerRef} aria-label="Ask Pip opens filtered transaction history">
      <div className="hero-demo__halo" />
      <div className="device device--hero">
        <div className="device__screen">
          <video
            key={theme}
            ref={videoRef}
            className="hero-demo__video"
            autoPlay
            loop
            muted
            playsInline
            poster={theme === 'dark' ? '/screens/dark/ask-pip.png' : '/screens/ask-pip.png'}
            aria-label="Demonstration of Ask Pip responding to a natural language money inquiry with filtered activity"
          >
            <source src={`${videoBase}.webm`} type="video/webm" />
            <source src={`${videoBase}.mp4`} type="video/mp4" />
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
          </div>
        </div>
        <HeroDemo />
      </section>
    </main>
  )
}

function PhoneFrame({ src, alt, className = '', eager = false }: PhoneFrameProps) {
  const loading = eager ? 'eager' : 'lazy'
  // Both variants are in the DOM and CSS shows the one for the active theme, so switching never
  // waits on React. Lazy images inside display:none are not fetched until their theme is shown.
  return (
    <div className={`phone-frame ${className}`}>
      <div className="phone-frame__speaker" />
      <img className="themed-img themed-img--light" src={`/screens/${src}`} alt={alt} loading={loading} />
      <img className="themed-img themed-img--dark" src={`/screens/dark/${src}`} alt={alt} loading={loading} />
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

function ProductDemo() {
  const reducedMotion = usePrefersReducedMotion()
  const autoplay = reducedMotion ? '0' : '1'
  const demoUrl = `https://www.youtube-nocookie.com/embed/gdIc29KZZ9s?autoplay=${autoplay}&mute=1&playsinline=1&rel=0`

  return (
    <section className="product-demo">
      <div className="page-shell product-demo__inner">
        <div className="product-demo__copy reveal">
          <h2>See Pip in action.</h2>
        </div>
        <div className="product-demo__frame reveal">
          <iframe
            src={demoUrl}
            title="Pip product demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="lazy"
            allowFullScreen
          />
        </div>
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

      <ProductDemo />

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
            <PhoneFrame src="ask-pip.png" alt="Ask Pip chat screen with suggested money questions" />
            <div className="floating-command floating-command--one">Show me this month</div>
            <div className="floating-command floating-command--two">Who owes me?</div>
          </div>
        }
      />

      <FeatureSection
        eyebrow="Scan and capture"
        title="Take a photo. Skip the typing."
        body="Snap a paper receipt or pick a screenshot of your e-wallet or bank history. Pip reads every line, suggests a category for each one and waits for you to review before anything is saved."
        points={[
          'Itemized receipts, ready to split if you shared the table',
          'Every transaction from one history screenshot',
          'Remembers how you categorize merchants you visit again',
        ]}
        reverse
        media={<ScanDemo />}
      />

      <FeatureSection
        eyebrow="Split bills"
        title="Split the bill while everyone still remembers it."
        body="Assign each item, add service charges and discounts, then keep track of the balance after everyone heads home."
        points={[
          'Item-by-item splits, with shared plates divided fairly',
          'Service charge, tax and vouchers applied the way the receipt does',
          'Send everyone a receipt image of their share',
        ]}
        tone="blue"
        media={
          <div className="split-media">
            <PhoneFrame src="split-bill.png" alt="Receipt items assigned to You, Wen Jie, Zhi Chen or everyone at the table" />
            <PhoneFrame src="split-totals.png" alt="Bill total with each person's share and options to share or download the split receipt" className="phone-frame--rear" />
            <div className="people-chip people-chip--a">WJ</div>
            <div className="people-chip people-chip--b">ZC</div>
            <div className="people-chip people-chip--c">You</div>
          </div>
        }
      />

      <FeatureSection
        id="trips"
        eyebrow="Trips"
        title="Every trip, totalled in one place."
        body="Make a trip with a name and dates, then tag expenses as you go or pull in ones you already logged. Pip adds it up and shows where the money went."
        points={[
          'A total and category breakdown for each trip',
          'Totals in the trip’s own currency, like SGD or JPY, with Pip Pro',
          'Filter your activity by trip, or ask Pip to open it',
        ]}
        tone="sage"
        reverse
        media={<TripDemo />}
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
        media={
          <div className="double-phone">
            <PhoneFrame src="net-worth.png" alt="Pip net worth overview with assets, liabilities and a six-month trend" />
            <PhoneFrame src="breakdown.png" alt="Monthly transaction breakdown organized by spending category" className="phone-frame--rear" />
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
        tone="blue"
        reverse
        media={
          <div className="recap-media">
            <PhoneFrame src="monthly-recap.png" alt="Pip monthly recap showing recorded spending and category breakdown" />
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
        tone="sage"
        media={<HabitMedia />}
      />

      <EverydayEssentials />
    </div>
  )
}

const essentials: { icon: typeof Globe; title: string; body: string; pro?: boolean }[] = [
  { icon: CalendarDays, title: 'Cash-flow calendar', body: 'Money in and out, day by day, so heavy weeks show up early.' },
  { icon: PiggyBank, title: 'Budget envelopes', body: 'Monthly targets per category, with a guided setup.' },
  { icon: Repeat, title: 'Bills and subscriptions', body: 'Rent, utilities and plans in one list, so nothing renews unnoticed.' },
  { icon: Globe, title: 'Multi-currency', body: 'Record in the currency you paid. Live rates convert the rest.', pro: true },
  { icon: ReceiptText, title: 'Tax relief tracking', body: 'Tag eligible spending to Malaysian relief categories, with each cap shown.' },
  { icon: FileDown, title: 'Reports and export', body: 'Preview monthly summaries, then export PDF, Excel or CSV.', pro: true },
  { icon: Smartphone, title: 'Home screen widget', body: 'Your streak and quick-record buttons on your Android home screen.' },
  { icon: CloudUpload, title: 'Google Drive backup', body: 'Optional backups to your own Drive, restored when you switch phones.' },
]

function EverydayEssentials() {
  return (
    <section className="essentials">
      <div className="page-shell">
        <div className="essentials__head reveal">
          <p className="section-label">And the everyday essentials</p>
          <h2>Everything else, already there.</h2>
        </div>
        <ul className="essentials__grid">
          {essentials.map(({ icon: Icon, title, body, pro }, i) => (
            <li key={title} className="essentials__tile reveal" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
              <span className="essentials__icon"><Icon size={20} /></span>
              <strong>{title}{pro && <span className="essentials__pro">Pro</span>}</strong>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function HabitMedia() {
  return (
    <div className="habit-media">
      <PhoneFrame src="home.png" alt="Pip home dashboard with a seven-day logging streak and mascot" />
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
          <div className="privacy-actions">
            <Link className="privacy-link" to="/privacy">
              Read full Privacy Policy <ArrowRight size={15} />
            </Link>
          </div>
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
        <p>Pip is available on Google Play.</p>
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

export function Footer() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`)

  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <a className="brand brand--footer" href={onHome ? '#top' : '/'} aria-label="Pip home"><PipMark compact /><span>Pip</span></a>
        <div className="footer-links">
          <a href={sectionHref('features')}>Features</a>
          <a href={sectionHref('privacy')}>Privacy</a>
          <Link to="/faq">FAQ</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  useEffect(() => {
    document.title = 'Pip'
    const id = window.location.hash.slice(1)
    if (!id) return
    document.getElementById(id)?.scrollIntoView()
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

  const items = [
    {
      question: 'Where does Pip store my financial data?',
      answer: <>Pip stores your transactions, receipts, budgets, accounts, and tax tags in a database on your Android device. You do not need a Pip account, and Pip does not keep a cloud copy of your ledger. The local database is not encrypted by Pip, so protect access to your phone and keep a backup if you need one.</>,
    },
    {
      question: 'When does data leave my device?',
      answer: <>Your ledger stays on your device during normal bookkeeping. Data can leave when you choose a connected feature such as Ask Pip, receipt scanning, Google Drive backup, live prices, a bug report, or a purchase. Production builds also have crash diagnostics on by default; you can turn them off under <strong>Settings → Data → Crash Diagnostics</strong>.</>,
    },
    {
      question: 'Does Pip sell my data or show ads?',
      answer: <>No. Pip does not sell your data and does not show ads.</>,
    },
    {
      question: 'Can I use Pip without AI or an API key?',
      answer: <>Yes. You can record transactions, manage budgets, track accounts and net worth, split bills, and use the dashboard without connecting an AI provider. Ask Pip and AI-powered reading of receipts, statements, balances, or holdings need an internet connection and an AI service.</>,
    },
    {
      question: 'What is BYOK, and why would I use it?',
      answer: <>BYOK means “bring your own key.” An API key is a private code created in your Gemini, Groq, or OpenRouter account. It lets Pip send your AI request directly to the provider you chose, while you control the provider account and its usage limits.</>,
    },
    {
      question: 'How do I connect my own API key?',
      answer: <>Open <strong>Settings → API keys</strong>, choose Gemini, Groq, or OpenRouter, and follow the link to create a key. Copy the key into Pip and tap <strong>Save key</strong>. Pip detects the provider and checks that the key works. Never share your API key with another person.</>,
    },
    {
      question: 'What can I do with Ask Pip?',
      answer: <>Ask Pip can open the right part of the app, prepare an entry for you to review, read supported receipts and statements, and answer supported spending questions using calculations from your local ledger. Try “Lunch 12,” “Show what I’m owed,” or “Show my transactions this month.”</>,
    },
    {
      question: 'Can Ask Pip change my financial records without asking me?',
      answer: <>Ask Pip can prepare an expense, repayment, split, or scan, but you review the details before a financial record is saved. It may change an app preference, such as light or dark mode, when you ask it to. It cannot move money or make bank transactions.</>,
    },
    {
      question: 'Does using my own API key cost extra?',
      answer: <>Your AI provider sets its own free allowance, usage limits, and prices, and these can change. Any provider charges are tied to your provider account and are separate from Pip Pro. Check the provider’s pricing before using the key heavily.</>,
    },
    {
      question: 'How do I delete my data and disconnect AI?',
      answer: <>Use <strong>Settings → Danger zone → Reset all data</strong>, or uninstall Pip, to delete local records. Remove keys under <strong>Settings → API keys</strong>, then revoke them in the provider account. Delete Drive backups from the connected Google account separately.</>,
    },
  ]

  return (
    <div className="site-page">
      <Header />
      <main className="faq-page">
        <header className="faq-hero">
          <div className="faq-page__icon"><ShieldCheck size={31} /></div>
          <p className="section-label">Privacy &amp; AI</p>
          <h1 id="faq-heading">Your money stays yours.</h1>
        </header>

        <section className="faq-list" aria-labelledby="faq-heading">
          {items.map((item, index) => (
            <details className="faq-item" key={item.question} open={index === 0}>
              <summary><span>{item.question}</span><ChevronDown size={20} /></summary>
              <div className="faq-item__answer"><p>{item.answer}</p></div>
            </details>
          ))}
        </section>

        <div className="faq-page__bottom">
          <Link className="button button--outline" to="/"><ArrowLeft size={17} /> Back to Pip</Link>
          <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram <ExternalLink size={14} /></a>
        </div>
      </main>
    </div>
  )
}

export function SiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/legal" element={<Navigate to="/privacy" replace />} />
      <Route path="/privacy" element={<LegalPage initialTab="privacy" />} />
      <Route path="/terms" element={<LegalPage initialTab="terms" />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
