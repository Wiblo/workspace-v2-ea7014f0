"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Container } from "@/components/layout/Container"
import { cn } from "@/lib/utils"

// ─── Color palette ────────────────────────────────────────────────────────────
const C = {
  cream: "#F9F5F0",
  rose: "#D4A5A5",
  gold: "#C9A96E",
  sage: "#8FAF8C",
  charcoal: "#2C2C2C",
  roseLight: "#F2EAEA",
  parchment: "#EDE8E0",
} as const

// ─── Scroll-triggered fade wrapper ───────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "-60px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ─── Hero entrance wrapper (plays immediately on mount) ───────────────────────
function HeroAnimate({
  children,
  delay = 0,
  className,
  fromY = 20,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  fromY?: number
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay * 1000)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className={className}
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : `translateY(${fromY}px)`,
        transition: "opacity 1s cubic-bezier(0.25,0.46,0.45,0.94), transform 1s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
    >
      {children}
    </div>
  )
}

// ─── Botanical SVG leaf branch ────────────────────────────────────────────────
function LeafBranch({ flip = false, color = C.sage }: { flip?: boolean; color?: string }) {
  return (
    <svg
      width="110"
      height="52"
      viewBox="0 0 110 52"
      fill="none"
      aria-hidden="true"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M8 46 Q28 28 55 18 Q82 8 102 4"
        stroke={color}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M28 41 Q34 28 42 23" stroke={color} strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <path d="M48 30 Q54 20 55 18" stroke={color} strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <ellipse cx="46" cy="21" rx="9" ry="5" fill={color} opacity="0.45" transform="rotate(-22 46 21)" />
      <ellipse cx="62" cy="16" rx="8" ry="4.5" fill={color} opacity="0.45" transform="rotate(-16 62 16)" />
      <ellipse cx="34" cy="35" rx="7" ry="3.5" fill={color} opacity="0.35" transform="rotate(-32 34 35)" />
      <ellipse cx="78" cy="11" rx="7" ry="4" fill={color} opacity="0.35" transform="rotate(-12 78 11)" />
      <circle cx="14" cy="44" r="3.5" fill={C.rose} opacity="0.45" />
      <circle cx="26" cy="38" r="2.5" fill={C.rose} opacity="0.35" />
      <circle cx="92" cy="8" r="2" fill={C.rose} opacity="0.3" />
    </svg>
  )
}

// ─── Ornate corner accent ──────────────────────────────────────────────────────
function OrnateCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const sx: Record<string, string> = {
    tl: "",
    tr: "scaleX(-1)",
    bl: "scaleY(-1)",
    br: "scale(-1,-1)",
  }
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden="true"
      style={{ transform: sx[pos] }}
    >
      <path d="M4 52 L4 14 Q4 4 14 4 L52 4" stroke={C.gold} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M4 36 Q9 26 19 21 Q29 16 33 8" stroke={C.gold} strokeWidth="0.7" fill="none" opacity="0.55" />
      <circle cx="4" cy="4" r="3" fill={C.gold} opacity="0.85" />
      <circle cx="52" cy="4" r="1.8" fill={C.gold} opacity="0.5" />
      <circle cx="4" cy="52" r="1.8" fill={C.gold} opacity="0.5" />
    </svg>
  )
}

// ─── Gold divider with floral centre ──────────────────────────────────────────
function FloralDivider({ light = false }: { light?: boolean }) {
  const lineColor = light ? "rgba(201,169,110,0.55)" : C.gold
  return (
    <div className="flex items-center gap-3 my-0">
      <div className="flex-1 h-px" style={{ backgroundColor: lineColor }} />
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          d="M11 1C11 1 7.5 5.5 7.5 11C7.5 16.5 11 21 11 21C11 21 14.5 16.5 14.5 11C14.5 5.5 11 1 11 1Z"
          fill={light ? "rgba(212,165,165,0.7)" : C.rose}
          opacity="0.75"
        />
        <path
          d="M1 11C1 11 5.5 7.5 11 7.5C16.5 7.5 21 11 21 11C21 11 16.5 14.5 11 14.5C5.5 14.5 1 11 1 11Z"
          fill={light ? "rgba(143,175,140,0.7)" : C.sage}
          opacity="0.75"
        />
      </svg>
      <div className="flex-1 h-px" style={{ backgroundColor: lineColor }} />
    </div>
  )
}

// ─── 1. Hero ──────────────────────────────────────────────────────────────────
function WeddingHero() {
  return (
    <section className="relative flex items-center justify-center h-dvh overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1519741497674-4ef7b0d97c10?w=1920&q=85"
        alt="Elegant floral wedding arrangement"
        fill
        priority
        className="object-cover object-center scale-105"
        style={{ animation: "heroZoom 12s ease-out forwards" }}
      />

      {/* Layered gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(44,44,44,0.38) 0%, rgba(44,44,44,0.52) 50%, rgba(44,44,44,0.72) 100%)",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <HeroAnimate delay={0.3}>
          <p
            className="text-xs uppercase mb-8"
            style={{ color: C.gold, letterSpacing: "0.38em", fontFamily: "var(--font-geist-sans)" }}
          >
            Together with their families
          </p>
        </HeroAnimate>

        <HeroAnimate delay={0.6}>
          <h1
            className="text-[5rem] md:text-[7.5rem] lg:text-[9.5rem] leading-none text-white text-balance"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}
          >
            John
          </h1>
        </HeroAnimate>

        <HeroAnimate delay={0.85}>
          <div className="flex items-center justify-center gap-5 my-3 md:my-4">
            <div className="flex-1 max-w-[80px] h-px" style={{ backgroundColor: `${C.gold}90` }} />
            <span
              className="text-2xl md:text-3xl"
              style={{ color: C.rose, fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              &amp;
            </span>
            <div className="flex-1 max-w-[80px] h-px" style={{ backgroundColor: `${C.gold}90` }} />
          </div>
        </HeroAnimate>

        <HeroAnimate delay={1.0}>
          <h1
            className="text-[5rem] md:text-[7.5rem] lg:text-[9.5rem] leading-none text-white text-balance"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 400 }}
          >
            Anne
          </h1>
        </HeroAnimate>

        <HeroAnimate delay={1.35}>
          <div className="mt-10 space-y-3">
            <FloralDivider light />
            <p
              className="text-xl md:text-2xl text-white/90 mt-5"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              June 14, 2026
            </p>
            <p
              className="text-white/60 text-xs uppercase"
              style={{ letterSpacing: "0.3em" }}
            >
              Napa Valley, California
            </p>
          </div>
        </HeroAnimate>
      </div>

      {/* Scroll cue */}
      <HeroAnimate
        delay={2.2}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div
          className="w-6 h-10 rounded-full border flex items-start justify-center pt-2"
          style={{ borderColor: "rgba(255,255,255,0.35)" }}
        >
          <div
            className="w-1 h-2.5 rounded-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.6)",
              animation: "scrollBob 1.6s ease-in-out infinite",
            }}
          />
        </div>
      </HeroAnimate>

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1); }
        }
        @keyframes scrollBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .scale-105 { animation: none !important; }
          [style*="scrollBob"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

// ─── 2. Invitation Details ────────────────────────────────────────────────────
function InvitationDetails() {
  return (
    <div style={{ backgroundColor: C.cream }}>
      <section className="py-20 md:py-32">
        <Container>
          <FadeIn className="max-w-xl mx-auto text-center">
            {/* Botanical top */}
            <div className="flex justify-center items-end gap-1 mb-10">
              <LeafBranch flip />
              <LeafBranch />
            </div>

            {/* Ornate bordered card */}
            <div
              className="relative px-8 py-12 md:px-14 md:py-16"
              style={{ border: `1px solid ${C.gold}` }}
            >
              {/* Corners */}
              <div className="absolute top-0 left-0 -translate-x-[1px] -translate-y-[1px]">
                <OrnateCorner pos="tl" />
              </div>
              <div className="absolute top-0 right-0 translate-x-[1px] -translate-y-[1px]">
                <OrnateCorner pos="tr" />
              </div>
              <div className="absolute bottom-0 left-0 -translate-x-[1px] translate-y-[1px]">
                <OrnateCorner pos="bl" />
              </div>
              <div className="absolute bottom-0 right-0 translate-x-[1px] translate-y-[1px]">
                <OrnateCorner pos="br" />
              </div>

              <p
                className="text-[10px] uppercase mb-7"
                style={{ color: C.rose, letterSpacing: "0.32em" }}
              >
                Request the honour of your presence
              </p>

              <h2
                className="text-4xl md:text-5xl mb-7 text-balance"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  color: C.charcoal,
                  fontWeight: 400,
                }}
              >
                John &amp; Anne
              </h2>

              <FloralDivider />

              <div className="mt-7 space-y-2" style={{ color: C.charcoal }}>
                <p
                  className="text-base text-pretty"
                  style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
                >
                  Saturday, the Fourteenth of June
                </p>
                <p
                  className="text-xl"
                  style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
                >
                  Two Thousand &amp; Twenty-Six
                </p>
                <p
                  className="text-xs uppercase mt-3 opacity-60"
                  style={{ letterSpacing: "0.22em" }}
                >
                  at Four O&apos;Clock in the Afternoon
                </p>
              </div>

              <div className="my-7">
                <FloralDivider />
              </div>

              <div style={{ color: C.charcoal }}>
                <p
                  className="text-xl"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  The Grand Estate
                </p>
                <p className="text-sm opacity-60 mt-1">Napa Valley, California</p>
                <p
                  className="text-sm italic mt-4 opacity-75 text-pretty"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Reception to follow
                </p>
              </div>
            </div>

            {/* Botanical bottom */}
            <div className="flex justify-center items-start gap-1 mt-10">
              <LeafBranch flip />
              <LeafBranch />
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  )
}

// ─── 3. Our Story ─────────────────────────────────────────────────────────────
function OurStory() {
  return (
    <div style={{ backgroundColor: C.roseLight }}>
      <section className="py-20 md:py-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
            {/* Text */}
            <FadeIn delay={0.05}>
              <div>
                <p
                  className="text-[10px] uppercase mb-5"
                  style={{ color: C.gold, letterSpacing: "0.35em" }}
                >
                  Our Story
                </p>

                <div
                  className="text-8xl leading-none -ml-2 mb-1 select-none"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: C.rose,
                    opacity: 0.4,
                  }}
                >
                  &ldquo;
                </div>

                <blockquote
                  className="text-2xl md:text-3xl leading-relaxed mb-8 text-pretty"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontStyle: "italic",
                    color: C.charcoal,
                    lineHeight: 1.55,
                  }}
                >
                  Two souls, one heart — a story written in the stars long before they ever met.
                </blockquote>

                <p
                  className="text-base leading-relaxed text-pretty"
                  style={{ color: `${C.charcoal}BB` }}
                >
                  John and Anne first crossed paths on a golden autumn evening in San Francisco,
                  drawn together by laughter and a shared love of great wine and even better
                  conversation. What started as a single night became a journey through seasons,
                  adventures, and quiet Sunday mornings — leading them both to this beautiful moment.
                </p>

                <div className="mt-9 flex items-center gap-4">
                  <div className="h-px w-10" style={{ backgroundColor: C.gold }} />
                  <p
                    className="text-sm italic"
                    style={{ color: C.rose, fontFamily: "var(--font-playfair)" }}
                  >
                    Now, forever begins.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Image */}
            <FadeIn delay={0.25}>
              <div className="relative">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=85"
                    alt="John and Anne — a romantic portrait"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                {/* Gold frame inset */}
                <div
                  className="absolute inset-3 pointer-events-none"
                  style={{ border: `1px solid ${C.gold}55` }}
                />
                {/* Botanical accent, overlapping bottom-left */}
                <div className="absolute -bottom-6 -left-6 rotate-12 opacity-60">
                  <LeafBranch />
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </div>
  )
}

// ─── 4. Venue ─────────────────────────────────────────────────────────────────
function VenueSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1474601813747-1b78204b0c27?w=1920&q=85"
        alt="Rolling vineyard rows at The Grand Estate, Napa Valley"
        fill
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(44,44,44,0.72) 0%, rgba(44,44,44,0.48) 100%)",
        }}
      />

      <FadeIn className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <p
          className="text-[10px] uppercase mb-6"
          style={{ color: C.gold, letterSpacing: "0.38em" }}
        >
          The Venue
        </p>

        <h3
          className="text-4xl md:text-6xl text-white mb-5 text-balance"
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          The Grand Estate
        </h3>

        <div className="max-w-xs mx-auto">
          <FloralDivider light />
        </div>

        <p className="text-white/80 text-lg mt-5 mb-1">Napa Valley, California</p>
        <p className="text-white/50 text-sm">1 Grand Estate Drive · Yountville, CA 94599</p>

        <p
          className="mt-6 text-base text-white/75 text-pretty max-w-md mx-auto"
          style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
        >
          Nestled among rolling vineyards, The Grand Estate offers an unforgettable setting for
          an unforgettable day.
        </p>
      </FadeIn>
    </section>
  )
}

// ─── 5. RSVP ─────────────────────────────────────────────────────────────────
function RSVPSection() {
  return (
    <div style={{ backgroundColor: C.charcoal }}>
      <section className="py-20 md:py-32">
        <Container>
          <FadeIn className="max-w-lg mx-auto text-center">
            {/* Botanical top — lightened for dark background */}
            <div className="flex justify-center items-end gap-1 mb-12 opacity-50">
              <LeafBranch flip color="#C9A96E" />
              <LeafBranch color="#C9A96E" />
            </div>

            <p
              className="text-[10px] uppercase mb-5"
              style={{ color: C.gold, letterSpacing: "0.38em" }}
            >
              RSVP
            </p>

            <h3
              className="text-4xl md:text-5xl text-white mb-6 text-balance"
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Will you join us?
            </h3>

            <div className="max-w-xs mx-auto">
              <FloralDivider light />
            </div>

            <p
              className="text-white/65 text-base italic my-5 text-pretty"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Kindly reply by the First of May, Two Thousand &amp; Twenty-Six
            </p>
            <p className="text-white/35 text-xs mb-10" style={{ letterSpacing: "0.12em" }}>
              May 1, 2026
            </p>

            <a
              href="mailto:rsvp@johnanneswedding.com"
              className={cn(
                "inline-block px-10 py-4 text-[11px] uppercase",
                "transition-all duration-200 hover:opacity-75 active:scale-95"
              )}
              style={{
                border: `1px solid ${C.gold}`,
                color: C.gold,
                letterSpacing: "0.28em",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              RSVP Now
            </a>

            <p className="mt-14 text-white/25 text-xs">
              Questions? Contact us at{" "}
              <a
                href="mailto:rsvp@johnanneswedding.com"
                className="underline underline-offset-2 hover:text-white/50 transition-colors duration-150"
                style={{ color: `${C.gold}55` }}
              >
                rsvp@johnanneswedding.com
              </a>
            </p>
          </FadeIn>
        </Container>
      </section>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function WeddingInvite() {
  return (
    <div style={{ backgroundColor: C.cream }}>
      <WeddingHero />
      <InvitationDetails />
      <OurStory />
      <VenueSection />
      <RSVPSection />
    </div>
  )
}
