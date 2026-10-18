import { ChevronLeft, Hotel, Link2, Plane, ShoppingBag, TrainFront, Utensils } from 'lucide-react'
import { useRef, type CSSProperties } from 'react'
import { useCountUp, useInView, usePrefersReducedMotion } from '../motion'

const categories = [
  { label: 'Stay', amount: 640, color: '#6c8fd6' },
  { label: 'Food', amount: 286.4, color: '#e38b6a' },
  { label: 'Shopping', amount: 210, color: '#c9a64a' },
  { label: 'Transport', amount: 148.2, color: '#4fa57a' },
]
const total = categories.reduce((sum, c) => sum + c.amount, 0)

const expenses = [
  { icon: Utensils, label: 'Hawker centre', sub: 'Food · 15 Sep', amount: 'S$ 18.50' },
  { icon: TrainFront, label: 'MRT card top-up', sub: 'Transport · 13 Sep', amount: 'S$ 20.00' },
  { icon: ShoppingBag, label: 'Orchard Road', sub: 'Shopping · 14 Sep', amount: 'S$ 86.00' },
  { icon: Hotel, label: 'Hotel, 4 nights', sub: 'Stay · 12 Sep', amount: 'S$ 640.00' },
]

const money = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

/** A trip page as Pip draws it: cover, dates, one total in the trip's currency and where it went. */
export function TripDemo() {
  const reducedMotion = usePrefersReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, 0.3)
  const live = reducedMotion || inView
  const counted = useCountUp(total, inView && !reducedMotion, 1500)
  const shown = reducedMotion ? total : counted

  return (
    <div className={`demo-stage trip-demo${live ? ' is-live' : ''}`} ref={rootRef}>
      <div className="mock-phone">
        <div className="mock-screen trip-demo__screen">
          <div className="mock-status"><span>9:41</span><span className="mock-status__icons" /></div>
          <div className="trip-demo__nav"><ChevronLeft size={17} /> Trips</div>

          <div className="trip-demo__hero">
            <div className="trip-demo__cover">
              <span className="trip-demo__badge"><Plane size={18} /></span>
            </div>
            <div className="trip-demo__head">
              <strong>Singapore · Sep 2026</strong>
              <small>12 – 16 Sep · 18 expenses</small>
            </div>
            <p className="mock-eyebrow">Recorded expenses</p>
            <p className="trip-demo__total">
              <span>S$</span> {money(shown)}
            </p>
            <div className="trip-demo__bar" aria-hidden="true">
              {categories.map((c, i) => (
                <span
                  key={c.label}
                  style={{ flexGrow: c.amount, background: c.color, '--i': i } as CSSProperties}
                />
              ))}
            </div>
            <ul className="trip-demo__legend">
              {categories.map((c) => (
                <li key={c.label}><i style={{ background: c.color }} />{c.label}</li>
              ))}
            </ul>
          </div>

          <p className="mock-eyebrow trip-demo__list-label">Expenses</p>
          <ul className="trip-demo__list">
            {expenses.map(({ icon: Icon, label, sub, amount }, i) => (
              <li key={label} style={{ '--i': i } as CSSProperties}>
                <span className="mock-initial"><Icon size={14} /></span>
                <span className="trip-demo__item">{label}<small>{sub}</small></span>
                <span className="trip-demo__amt">{amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="demo-chip demo-chip--ask">Open my Singapore trip</div>
      <div className="demo-chip demo-chip--bottom">
        <Link2 size={15} /> Pull in expenses you already logged
      </div>
    </div>
  )
}
