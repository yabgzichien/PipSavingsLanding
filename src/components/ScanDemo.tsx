import { ArrowRight, Check, ScanText, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useInView, usePrefersReducedMotion } from '../motion'

type Mode = 'receipt' | 'history'
type Phase = 'scanning' | 'found'

type FoundRow = { merchant: string; tag: string; amount: string; income?: boolean }

const SCAN_MS = 1300
const HOLD_MS = 5200

const receiptLines = [
  { label: 'Nasi lemak ayam', amount: '12.90' },
  { label: 'Iced latte', amount: '9.50' },
  { label: 'Kaya toast set', amount: '6.00' },
  { label: 'Service 10%', amount: '2.84' },
  { label: 'SST 6%', amount: '1.70' },
]

const historyLines = [
  { label: 'Grab ride', sub: 'Today, 8:42 AM', amount: '-14.00' },
  { label: 'Mamak Corner', sub: 'Today, 1:15 PM', amount: '-11.60' },
  { label: 'Transfer from Wen Jie', sub: 'Yesterday', amount: '+25.00', income: true },
  { label: 'Corner Books', sub: 'Yesterday', amount: '-42.90' },
]

const found: Record<Mode, FoundRow[]> = {
  receipt: [{ merchant: 'Kopi & Co', tag: 'likely Food & Drinks', amount: 'RM 32.94' }],
  history: [
    { merchant: 'Grab ride', tag: 'likely Transport', amount: 'RM 14.00' },
    { merchant: 'Mamak Corner', tag: 'likely Food & Drinks', amount: 'RM 11.60' },
    { merchant: 'Wen Jie', tag: 'received', amount: 'RM 25.00', income: true },
    { merchant: 'Corner Books', tag: 'likely Shopping', amount: 'RM 42.90' },
  ],
}

function ReceiptPaper() {
  return (
    <div className="scan-paper">
      <strong className="scan-paper__shop">KOPI &amp; CO.</strong>
      <small>12 Sep 2026 · 12:48 PM · Table 7</small>
      <ul>
        {receiptLines.map((line, i) => (
          <li key={line.label} className="scan-hit" style={{ '--i': i } as CSSProperties}>
            <span>{line.label}</span>
            <span>{line.amount}</span>
          </li>
        ))}
      </ul>
      <div className="scan-paper__total scan-hit" style={{ '--i': 5 } as CSSProperties}>
        <span>TOTAL</span>
        <span>RM 32.94</span>
      </div>
    </div>
  )
}

function HistoryShot() {
  return (
    <div className="scan-shot">
      <div className="scan-shot__bar">
        <span>Transaction history</span>
        <small>eWallet</small>
      </div>
      <ul>
        {historyLines.map((line, i) => (
          <li key={line.label} className="scan-hit" style={{ '--i': i } as CSSProperties}>
            <span className="scan-shot__dot" />
            <span className="scan-shot__label">
              {line.label}
              <small>{line.sub}</small>
            </span>
            <span className={line.income ? 'scan-shot__amt scan-shot__amt--in' : 'scan-shot__amt'}>{line.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * A recreation of Pip's capture flow: the picked image is swept by the same green scanline the
 * app shows, then the rows Pip read are highlighted on the image and listed underneath for review.
 */
export function ScanDemo() {
  const reducedMotion = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef)
  const [mode, setMode] = useState<Mode>('receipt')
  const [cycle, setCycle] = useState(0)
  const [phase, setPhase] = useState<Phase>('scanning')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      setPhase('found')
      setProgress(100)
      return
    }
    if (!inView) return

    setPhase('scanning')
    setProgress(0)
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / SCAN_MS)
      // Fast start, patient finish — the same shape as the app's progress bar.
      setProgress(Math.round(100 * (1 - Math.pow(1 - t, 2.2))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    const foundTimer = window.setTimeout(() => setPhase('found'), SCAN_MS + 200)
    const nextTimer = window.setTimeout(() => {
      setMode((m) => (m === 'receipt' ? 'history' : 'receipt'))
      setCycle((c) => c + 1)
    }, SCAN_MS + 200 + HOLD_MS)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(foundTimer)
      window.clearTimeout(nextTimer)
    }
  }, [mode, cycle, inView, reducedMotion])

  const choose = (next: Mode) => {
    setMode(next)
    setCycle((c) => c + 1)
  }

  const rows = found[mode]
  const done = phase === 'found'

  return (
    <div className="demo-stage scan-demo" ref={rootRef}>
      <div className="mock-phone">
        <div className={`mock-screen scan-demo__screen scan-demo__screen--${phase}`}>
          <div className="mock-status"><span>9:41</span><span className="mock-status__icons" /></div>

          <div className="scan-demo__top">
            <strong>Scan</strong>
            <div className="mock-segment" role="tablist" aria-label="What to scan">
              <span className="mock-segment__thumb" data-pos={mode} aria-hidden="true" />
              <button type="button" role="tab" aria-selected={mode === 'receipt'} onClick={() => choose('receipt')}>
                Receipt
              </button>
              <button type="button" role="tab" aria-selected={mode === 'history'} onClick={() => choose('history')}>
                History
              </button>
            </div>
          </div>

          <div className="scan-demo__preview" key={`${mode}-${cycle}`}>
            {mode === 'receipt' ? <ReceiptPaper /> : <HistoryShot />}
            <span className="scan-demo__line" aria-hidden="true" />
          </div>

          <div className="scan-demo__progress" aria-live="polite">
            <div className="scan-demo__progress-head">
              <span>
                {done ? <Check size={13} /> : <Sparkles size={13} className="scan-demo__pulse" />}
                {done ? 'Scanning complete' : 'Scanning progress'}
              </span>
              <span className="scan-demo__pct">{progress}%</span>
            </div>
            <div className="scan-demo__track">
              <span style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
          </div>

          <div className="scan-demo__results">
            <div className="scan-demo__skeleton" aria-hidden="true"><i /><i /><i /></div>
            <p className="mock-eyebrow">
              {mode === 'receipt' ? 'Receipt found' : `${rows.length} transactions found`}
            </p>
            <ul key={`${mode}-${cycle}`}>
              {rows.map((row, i) => (
                <li key={row.merchant} style={{ '--i': i } as CSSProperties}>
                  <span className="mock-initial">{row.merchant.charAt(0)}</span>
                  <span className="scan-demo__merchant">
                    {row.merchant}
                    <small className={row.income ? 'is-income' : undefined}>
                      {!row.income && <Sparkles size={10} />} {row.tag}
                    </small>
                  </span>
                  <span className={row.income ? 'scan-demo__amt is-income' : 'scan-demo__amt'}>{row.amount}</span>
                  <span className="mock-x" aria-hidden="true"><X size={11} /></span>
                </li>
              ))}
              {mode === 'receipt' &&
                receiptLines.map((line, i) => (
                  <li key={line.label} className="scan-demo__line-item" style={{ '--i': i + 1 } as CSSProperties}>
                    <span>{line.label}</span>
                    <span>RM {line.amount}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="mock-cta">
            {mode === 'receipt' ? 'Review & save' : `Sort ${rows.length} items`} <ArrowRight size={15} />
          </div>
        </div>
      </div>

      <div className="demo-chip demo-chip--top">
        <ScanText size={15} /> {mode === 'receipt' ? 'Paper receipt' : 'Screenshot of your history'}
      </div>
      <div className="demo-chip demo-chip--bottom">
        <Check size={15} /> Nothing saves until you review
      </div>
    </div>
  )
}
