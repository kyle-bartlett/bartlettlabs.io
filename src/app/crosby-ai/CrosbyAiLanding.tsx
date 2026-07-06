import {
  PhoneMissed,
  MessageSquareText,
  Star,
  Settings,
  Wrench,
  PhoneIncoming,
  TrendingDown,
  Clock,
  ShieldCheck,
  MapPin,
  AlertTriangle,
  MessageSquareReply,
  CheckCircle2,
} from "lucide-react";
import { getServiceArea } from "@/content/growth-system";
import { CrosbyCtaButton } from "./CrosbyCtaButton";
import { CrosbyLeadForm } from "./CrosbyLeadForm";
import styles from "./crosby.module.css";

const NEIGHBORHOODS = getServiceArea("crosby")?.neighborhoods ?? [
  "Newport",
  "Barrett",
  "Lake Houston",
  "FM 2100",
  "Indian Shores",
  "Crosby Lynchburg",
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I need a new app or software?",
    a: "No. It runs on your existing business number. There is nothing new for you or your crew to log into, learn, or maintain.",
  },
  {
    q: "What does it cost?",
    a: "The Crosby AI Opportunity Audit is free. If we build the system, you get a flat, plain-English monthly price before anything goes live — no surprises.",
  },
  {
    q: "Is my customer data safe?",
    a: "Yes. Your leads and conversations stay yours. We do not sell or share your data, and you can request deletion at any time.",
  },
  {
    q: "What about calls after hours?",
    a: "That is the point. The Assistant texts back missed calls 24/7 — nights, weekends, and while you are on a job — so leads never go cold.",
  },
];

export function CrosbyAiLanding() {
  return (
    <main className={styles.main}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div>
              <span className={styles.kicker}>Built for Crosby, TX local operators</span>
              <h1 className={styles.h1}>AI Automation built for Crosby, TX businesses.</h1>
              <p className={styles.lead}>
                Stop letting missed calls go to your competitors. Capture, engage,
                and book local Crosby clients 24/7 with our AI Missed Leads
                Assistant.
              </p>
              <div className={styles.heroActions}>
                <CrosbyCtaButton location="hero" className={styles.cta}>
                  Claim Your Free Crosby AI Opportunity Audit
                </CrosbyCtaButton>
              </div>
              <div className={styles.trustRow}>
                <span>
                  <ShieldCheck className={styles.trustDot} size={16} aria-hidden="true" />
                  Proud Crosby community sponsor on Alignable
                </span>
                <span>
                  <CheckCircle2 className={styles.trustDot} size={16} aria-hidden="true" />
                  No new app for your crew to learn
                </span>
              </div>
            </div>

            <div className={styles.demoCard}>
              <div className={styles.demoHeader}>
                <span className={styles.demoTitle}>Missed Lead Assistant</span>
                <span className={styles.demoPill}>Active 24/7</span>
              </div>
              <div className={styles.demoCall}>
                <span className={styles.demoCallIcon}>
                  <PhoneMissed size={18} aria-hidden="true" />
                </span>
                <span className={styles.demoCallText}>
                  <strong>Missed call from Crosby prospect</strong>
                  <span>0:08 ago · FM 2100 service area</span>
                </span>
              </div>
              <p className={styles.demoLabel}>Automatic text-back sent</p>
              <div className={styles.demoBubble}>
                Hey, thanks for calling — we&apos;re helping another Crosby customer
                right now. What project can we help you with today?
              </div>
              <div className={styles.demoStats}>
                <div className={styles.demoStat}>
                  <div className={styles.demoStatValue}>&lt; 60 sec</div>
                  <div className={styles.demoStatLabel}>reply window</div>
                </div>
                <div className={styles.demoStat}>
                  <div className={styles.demoStatValue}>24/7</div>
                  <div className={styles.demoStatLabel}>lead capture</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Crosby missed-call gap ───────────────────── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <div className={styles.splitGrid}>
            <div>
              <span className={styles.kicker}>The Crosby missed-call gap</span>
              <h2 className={styles.h2}>
                Your best leads call when you&apos;re already working.
              </h2>
              <p className={styles.lead}>
                As a local contractor, builder, realtor, or home service provider in
                Crosby, you&apos;re constantly out in the field. When you&apos;re on
                a job site, showing a property, or driving down FM 2100, you
                can&apos;t always pick up the phone.
              </p>
              <p className={styles.lead}>
                In today&apos;s market, if you don&apos;t answer a prospect within 5
                minutes, they&apos;ve already called the next local business on
                Google. You&apos;re losing thousands in revenue to missed calls.
              </p>
              <div className={styles.calloutBar}>
                <Clock size={20} aria-hidden="true" />
                The first 5 minutes decide whether that lead is yours — or someone
                else&apos;s.
              </div>
            </div>

            <div className={styles.workdayCard}>
              <p className={styles.workdayTitle}>A normal Crosby workday</p>
              <div className={styles.workdayList}>
                <div className={styles.workdayItem}>
                  <Wrench size={18} aria-hidden="true" />
                  On a job site with tools running
                </div>
                <div className={styles.workdayItem}>
                  <PhoneIncoming size={18} aria-hidden="true" />
                  A new prospect calls from Google
                </div>
                <div className={styles.workdayItem}>
                  <TrendingDown size={18} aria-hidden="true" />
                  They call the next business on Google
                </div>
              </div>
              <div className={styles.workdayBand}>
                <div className={styles.workdayBandBig}>Thousands</div>
                <div className={styles.workdayBandText}>
                  in potential monthly revenue can disappear from unanswered calls.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The solution ─────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>The solution</span>
            <h2 className={styles.h2}>
              The AI Missed Leads Assistant keeps conversations moving while you keep
              working.
            </h2>
            <p className={styles.lead}>
              A managed system that responds fast, captures the lead, lifts local
              proof, and keeps your team out of complicated tech.
            </p>
          </div>
          <div className={`${styles.cardGrid} ${styles.cardGrid3}`}>
            <article className={styles.card}>
              <div className={styles.cardIcon}>
                <MessageSquareText size={24} aria-hidden="true" />
              </div>
              <h3 className={styles.cardTitle}>Instant Text-Back</h3>
              <p className={styles.cardText}>
                The second a call is missed, our system automatically texts the
                prospect back, starts a conversation, and answers their questions.
              </p>
            </article>
            <article className={styles.card}>
              <div className={styles.cardIcon}>
                <Star size={24} aria-hidden="true" />
              </div>
              <h3 className={styles.cardTitle}>Review Booster</h3>
              <p className={styles.cardText}>
                Automatically requests and routes Google Reviews from your happiest
                Crosby clients to elevate your local authority.
              </p>
            </article>
            <article className={styles.card}>
              <div className={styles.cardIcon}>
                <Settings size={24} aria-hidden="true" />
              </div>
              <h3 className={styles.cardTitle}>Fully Managed</h3>
              <p className={styles.cardText}>
                We handle the entire setup. No complicated tech for your team to
                learn, maintain, or troubleshoot.
              </p>
            </article>
          </div>
          <div className={styles.noteBar}>
            <ShieldCheck size={16} aria-hidden="true" />
            Designed for local teams that need outcomes, not another software login.
          </div>
        </div>
      </section>

      {/* ── Proof strip ──────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>What you get</span>
            <h2 className={styles.h2}>Fast, always-on, and built for you.</h2>
          </div>
          <div className={styles.proofGrid}>
            <div className={styles.proofItem}>
              <div className={styles.proofValue}>Under 60 sec</div>
              <div className={styles.proofLabel}>
                Every missed call gets an automatic text-back.
              </div>
            </div>
            <div className={styles.proofItem}>
              <div className={styles.proofValue}>24/7</div>
              <div className={styles.proofLabel}>
                Coverage while you&apos;re in the field or asleep.
              </div>
            </div>
            <div className={styles.proofItem}>
              <div className={styles.proofValue}>~7 days</div>
              <div className={styles.proofLabel}>
                From kickoff to a live system on your number.
              </div>
            </div>
            <div className={styles.proofItem}>
              <div className={styles.proofValue}>Built &amp; run for you</div>
              <div className={styles.proofLabel}>
                No new app for your crew to learn.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>How it works</span>
            <h2 className={styles.h2}>
              Live in about a week, without touching your workflow.
            </h2>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.stepTitle}>Map the leak</h3>
              <p className={styles.stepText}>
                We run your free audit and pinpoint exactly where Crosby leads are
                slipping — missed calls, slow replies, no review flow.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.stepTitle}>Build the system</h3>
              <p className={styles.stepText}>
                We set up the Missed Leads Assistant on your existing number and dial
                in the messaging for your trade and service area.
              </p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.stepTitle}>Launch with you</h3>
              <p className={styles.stepText}>
                We go live, watch the first real leads come back, and keep managing
                it so you never touch the tech.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Local trust ──────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Serving all of Crosby</span>
            <h2 className={styles.h2}>Built for Crosby, not a national call center.</h2>
            <p className={styles.lead}>
              From FM 2100 to Lake Houston, we&apos;re the local AI partner for
              Crosby service businesses — proud Crosby community sponsor on
              Alignable.
            </p>
          </div>
          <div className={styles.pillCloud}>
            {NEIGHBORHOODS.map((name) => (
              <span key={name} className={styles.pill}>
                <MapPin size={15} aria-hidden="true" />
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Questions</span>
            <h2 className={styles.h2}>The stuff Crosby owners ask first.</h2>
          </div>
          <div className={styles.faqGrid}>
            {FAQS.map((f) => (
              <div key={f.q} className={styles.faqItem}>
                <p className={styles.faqQ}>{f.q}</p>
                <p className={styles.faqA}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────── */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <div className={styles.closeWrap}>
            <span className={styles.badge}>Crosby community sponsor on Alignable</span>
            <h2 className={styles.h2} style={{ marginTop: "1rem" }}>
              Claim one of the first 10 free Crosby AI Opportunity Audits this month.
            </h2>
            <p className={styles.lead} style={{ marginInline: "auto" }}>
              We are proud sponsors of the Crosby community on Alignable. To help our
              neighbors scale, we are offering a Free AI Opportunity Audit to the
              first 10 Crosby businesses who sign up this month. We&apos;ll show you
              exactly where your lead leaks are and how to patch them.
            </p>
            <div className={styles.miniCards}>
              <div className={styles.miniCard}>
                <AlertTriangle className={styles.miniIcon} size={22} aria-hidden="true" />
                <p className={styles.miniTitle}>Lead leaks</p>
                <p className={styles.miniText}>
                  Find where calls and inquiries are dropping.
                </p>
              </div>
              <div className={styles.miniCard}>
                <MessageSquareReply className={styles.miniIcon} size={22} aria-hidden="true" />
                <p className={styles.miniTitle}>Response plan</p>
                <p className={styles.miniText}>
                  See how fast text-back closes the gap.
                </p>
              </div>
              <div className={styles.miniCard}>
                <Star className={styles.miniIcon} size={22} aria-hidden="true" />
                <p className={styles.miniTitle}>Review lift</p>
                <p className={styles.miniText}>
                  Map review opportunities from happy clients.
                </p>
              </div>
            </div>
            <CrosbyCtaButton location="closing" className={styles.cta}>
              Claim Your Free Crosby AI Opportunity Audit
            </CrosbyCtaButton>
          </div>
        </div>
      </section>

      {/* ── Lead form ────────────────────────────────────── */}
      <section className={styles.section} id="audit" style={{ scrollMarginTop: "90px" }}>
        <div className={styles.container}>
          <CrosbyLeadForm />
        </div>
      </section>
    </main>
  );
}
