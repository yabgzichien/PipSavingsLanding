import { ArrowLeft, ExternalLink, FileText, Scale, ShieldCheck } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Footer, Header, instagramUrl } from './App'

type LegalPageProps = {
  initialTab?: 'privacy' | 'terms'
}

export function LegalPage({ initialTab = 'privacy' }: LegalPageProps) {
  const { pathname } = useLocation()
  const activeTab: 'privacy' | 'terms' = pathname === '/terms' ? 'terms' : initialTab

  useEffect(() => {
    document.title = activeTab === 'privacy' ? 'Privacy Policy — PipSavings' : 'Terms of Use — PipSavings'
    window.scrollTo?.({ top: 0, behavior: 'instant' })
  }, [activeTab])

  return (
    <div className="site-page">
      <Header />
      <main className="legal-page">
        <header className="legal-hero">
          <div className="legal-page__icon">
            <Scale size={32} />
          </div>
          <p className="section-label">Legal</p>
          <nav className="legal-tabs" role="tablist" aria-label="Legal documents">
            <Link
              to="/privacy"
              role="tab"
              className={`legal-tab ${activeTab === 'privacy' ? 'legal-tab--active' : ''}`}
              aria-current={activeTab === 'privacy' ? 'page' : undefined}
            >
              <ShieldCheck size={17} />
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              role="tab"
              className={`legal-tab ${activeTab === 'terms' ? 'legal-tab--active' : ''}`}
              aria-current={activeTab === 'terms' ? 'page' : undefined}
            >
              <FileText size={17} />
              Terms of Use
            </Link>
          </nav>
        </header>

        <article className="legal-card" aria-label={activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Use'}>
          {activeTab === 'privacy' ? <PrivacyPolicyOriginal /> : <TermsOfUseOriginal />}
        </article>

        <div className="legal-page__bottom">
          <Link className="button button--outline" to="/">
            <ArrowLeft size={17} /> Back to Pip
          </Link>
          <div className="legal-page__bottom-links">
            <Link to="/faq">FAQ</Link>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              Instagram <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function PrivacyPolicyOriginal() {
  return (
    <div className="legal-document">
      <h1>Privacy Policy for PipSavings</h1>
      <p className="meta">Last updated: 27 September 2026</p>
      <p>
        PipSavings (“Pip”) is a personal bookkeeping app for Android. Contact:{' '}
        <a href="mailto:zichienyang@gmail.com">zichienyang@gmail.com</a>. Pip is not directed at children.
      </p>

      <h2>What stays on your phone</h2>
      <p>
        Pip does not require an account. Your ledger (transactions, receipts, budgets, accounts, tax tags) is stored in a
        local SQLite database. <strong>It is not encrypted at rest.</strong> Uninstall, or Settings → Danger zone → Reset
        all data, deletes it.
      </p>
      <p>Camera, photos, and notifications are used only for scans, saving a story image, or reminders you turn on.</p>

      <h2>What can leave the phone</h2>
      <p>
        <strong>Crash reports (on by default).</strong> In a production build, a crash may send Sentry a scrubbed stack
        trace, a random install ID, and device model. Turn this off in Settings → Data → Crash Diagnostics.
      </p>
      <p>
        <strong>Bug reports.</strong> Settings → About → Report a bug sends the text you type to Sentry only when you tap
        Send.
      </p>
      <p>
        <strong>Scans (optional).</strong> A scan image is sent over HTTPS to our Cloudflare proxy, then to an external AI
        service to extract merchant, date, amount, and category. We do not keep the image. We may cache the extracted JSON
        against a request hash (quota retries). External AI models may use scan images and extracted rows. Pip does not
        train its own models. A hashed install token is stored to enforce scan limits and promo codes.
      </p>
      <p>
        <strong>Pip Pro.</strong> Google Play handles payment. We never see your card. RevenueCat (and our proxy) receive
        an anonymous app user ID to confirm Pro.
      </p>
      <p>
        <strong>Google Drive backup (optional).</strong> Google Sign-In may provide the <strong>email</strong> of the
        account you pick (kept on device). The backup zip of your ledger goes to your Drive, not to our servers, and is not
        encrypted by Pip.
      </p>
      <p>
        <strong>Live prices (optional).</strong> Ticker or currency codes are sent to Yahoo Finance for public quotes, not
        your quantities.
      </p>
      <p>
        <strong>Ask Pip (optional, your API key).</strong> Your API key is stored on your device. When you use Ask Pip,
        your message, attached photos or files (or text read from them), and relevant trip, person, and category names go{' '}
        <strong>directly</strong> to your selected provider (Gemini / Groq / OpenRouter). Pip does not proxy them and does
        not keep them on its servers. The provider and any underlying model handle inputs and outputs under their own terms
        and privacy policies. Dashboard use and the full local ledger stay on device.
      </p>
      <p>We do not sell your data and we do not show ads. Off-device traffic uses HTTPS.</p>

      <h2>Parties that may receive data</h2>
      <p>
        Google Play, Google (Drive / Sign-In), Cloudflare, external AI services, Gemini, Groq, OpenRouter, RevenueCat,
        Sentry, Yahoo Finance.
      </p>

      <h2>Deletion</h2>
      <p>
        There is no Pip account. Delete local data in Settings or by uninstalling. Remove saved API keys in Ask Pip's key
        settings. Turn off crash diagnostics to drop that install ID. Clear app data to drop the scan token. Remove Drive
        backups in that Google account.
      </p>

      <h2>Changes</h2>
      <p>We may update this policy. The date at the top will change.</p>
    </div>
  )
}

function TermsOfUseOriginal() {
  return (
    <div className="legal-document">
      <h1>Terms of Use for PipSavings</h1>
      <p className="meta">Last updated: 27 September 2026</p>
      <p>
        PipSavings (“Pip”) is a personal bookkeeping app for Android. By using Pip you agree to these terms. Contact:{' '}
        <a href="mailto:zichienyang@gmail.com">zichienyang@gmail.com</a>.
      </p>
      <p>
        Pip stores records on your device. It is <strong>not financial advice</strong> and <strong>not tax advice</strong>.
        It does not file with LHDN, connect to your bank, or make trades. The Tax screen is only a Malaysian personal-relief
        tracker for your records. You are responsible for what you record and file.
      </p>
      <p>
        Crash diagnostics is on by default until you turn it off. Optional scans, Drive backup, live prices, and Ask Pip
        are described in the Privacy Policy.
      </p>

      <h2>Ask Pip</h2>
      <p>
        Ask Pip is optional and uses an API key you provide. You must be allowed to use that key, meet your selected
        provider's age and eligibility rules, and follow the provider's and model's terms. You are responsible for keeping
        the key secure and for any provider fees, quotas, or limits. Provider availability and data handling are controlled
        by the provider, not Pip.
      </p>

      <h2>Subscriptions</h2>
      <p>Pip Pro is an auto-renewing Google Play subscription. A subscription is not required to use the app.</p>
      <ul>
        <li>You are charged through your Google account at the price and period shown on the paywall.</li>
        <li>If a free trial applies, you are charged when it ends unless you cancel first.</li>
        <li>
          It <strong>renews automatically</strong> unless you cancel at least 24 hours before the period ends.
        </li>
        <li>Cancel in Settings → About → Manage subscription (Google Play or RevenueCat).</li>
        <li>Restore purchases on the paywall or in Settings if you reinstall on the same Google account.</li>
        <li>
          A promo code unlocks Pro on that install only. It is not a Play subscription and does not move to a new phone
          automatically.
        </li>
      </ul>
      <p>Do not abuse the scan service, share promo codes publicly, or bypass quota or subscription checks.</p>

      <h2>“As is”</h2>
      <p>
        Pip is provided <strong>as is</strong>. Totals, rates, scan results, Ask Pip results, and tax tags may be wrong.
        Review any prefilled record before saving it. To the fullest extent permitted by law we are not liable for loss of
        data, missed tax claims, or other damages. If that limit is unenforceable, our liability is the amount you paid for
        Pip Pro in the prior 12 months, or RM50, whichever is greater.
      </p>
      <p>You must be 13 or older. These terms are governed by the laws of Malaysia.</p>

      <h2>Changes</h2>
      <p>We may update these terms. The date at the top will change.</p>
    </div>
  )
}
