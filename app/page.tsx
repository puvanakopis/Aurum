"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Instagram, Youtube, Twitter, ArrowUpRight, Menu, X } from "lucide-react";

/* ─────────────────────── Custom cursor ─────────────────────── */
function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 25, stiffness: 250, mass: 0.4 });
  const sy = useSpring(y, { damping: 25, stiffness: 250, mass: 0.4 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.body.classList.add("aurum-cursor");
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("aurum-cursor");
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <motion.div
          className="rounded-full border border-[var(--gold)]"
          animate={{
            width: hover ? 44 : 10,
            height: hover ? 44 : 10,
            x: hover ? -22 : -5,
            y: hover ? -22 : -5,
            backgroundColor: hover ? "rgba(201,168,76,0)" : "rgba(201,168,76,1)",
          }}
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
        />
      </motion.div>
    </>
  );
}

/* ─────────────────────── Nav ─────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Collections", "Atelier", "Heritage", "Journal", "Contact"];

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "backdrop-blur-xl bg-[rgba(10,10,10,0.55)] border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <a href="#top" className="font-display text-2xl tracking-[0.4em] text-ivory">
            <span className="text-gold">A</span>URUM
          </a>
          <nav className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="group relative text-xs uppercase tracking-[0.3em] text-[var(--ivory)]/80 hover:text-ivory transition-colors"
              >
                {l}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--gold)] transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-ivory"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <a
            href="#newsletter"
            className="hidden md:inline-flex items-center gap-2 border border-[var(--gold)]/50 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold hover:bg-[var(--gold)] hover:text-[var(--onyx)] transition-colors"
          >
            Boutique <ArrowUpRight size={12} />
          </a>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[var(--onyx)]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-2xl tracking-[0.4em] text-ivory">
                <span className="text-gold">A</span>URUM
              </span>
              <button onClick={() => setOpen(false)} className="text-ivory">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-6 px-10 pt-16">
              {links.map((l, i) => (
                <motion.a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-5xl text-ivory"
                >
                  {l}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────── Hero ─────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const watchY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const word = "AURUM";

  return (
    <section ref={ref} id="top" className="relative min-h-screen overflow-hidden bg-onyx">
      {/* Background gradient */}
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--onyx)_85%)]" />
      </motion.div>

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.6 }}
        className="absolute left-1/2 top-28 -translate-x-1/2 eyebrow z-10"
      >
        Maison Aurum · Genève · Est. 1887
      </motion.p>

      {/* Watch image with parallax + float + shimmer */}
      <motion.div style={{ y: watchY }} className="absolute inset-0 flex items-center justify-center">
        <div className="relative float-slow">
          <motion.img
            src="/assets/hero-watch.jpg"
            alt="AURUM signature gold timepiece"
            width={1080}
            height={1620}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-0 mx-auto h-[78vh] w-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
          />
          <div className="shimmer-overlay" />
        </div>
      </motion.div>

      {/* Title overlay */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center z-20"
      >
        <h1 className="font-display text-[18vw] leading-[0.85] tracking-[-0.04em] text-ivory md:text-[14vw]">
          {word.split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.4,
                delay: 0.4 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {c}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
          className="mt-8 h-px w-64 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.6 }}
          className="mt-8 max-w-md font-sans text-sm font-light tracking-[0.2em] uppercase text-[var(--ivory)]/70"
        >
          Time, reimagined in gold
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[10px] tracking-[0.5em] uppercase text-[var(--ivory)]/50"
      >
        <span className="block">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="mx-auto mt-3 block h-10 w-px bg-[var(--gold)]/60"
        />
      </motion.div>
    </section>
  );
}

/* ─────────────────────── Reveal helper ─────────────────────── */
function Reveal({
  children,
  delay = 0,
  from = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const offset =
    from === "left" ? { x: -60, y: 0 } : from === "right" ? { x: 60, y: 0 } : { x: 0, y: 60 };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset, clipPath: "inset(0 0 100% 0)" }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, clipPath: "inset(0 0 0% 0)" }
          : { opacity: 0, ...offset, clipPath: "inset(0 0 100% 0)" }
      }
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────── Brand Story ─────────────────────── */
function BrandStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section ref={ref} id="heritage" className="relative bg-onyx py-32 md:py-48">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-2 md:gap-24 md:px-10">
        <Reveal from="left">
          <p className="eyebrow">Chapter I</p>
          <h2 className="mt-6 font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
            A maison <em className="text-gold not-italic">of patience</em>, an atelier of light.
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="mt-10 h-px w-40 bg-[var(--gold)]"
          />
          <p className="mt-10 max-w-md text-base font-light leading-relaxed text-[var(--ivory)]/70">
            Since 1887, each AURUM has been assembled by a single watchmaker in the cool
            shadows of our Geneva atelier. We measure progress not in quarters, but in
            generations — a single tourbillon may take eleven months to breathe.
          </p>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-[var(--ivory)]/70">
            We do not chase time. We frame it.
          </p>
        </Reveal>

        <div className="relative overflow-hidden">
          <Reveal from="right" delay={0.2}>
            <motion.div style={{ y: imgY, scale: imgScale }}>
              <img
                src="/assets/atelier.jpg"
                alt="A watchmaker assembling an AURUM movement"
                width={1280}
                height={1280}
                loading="lazy"
                className="h-[70vh] w-full object-cover"
              />
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Horizontal Featured Collection ─────────────────────── */
const featured = [
  { name: "Aurum Sovereign", ref: "Réf. 1887.G", img: "/assets/hero-watch.jpg", line: "Ivory dial · 18k yellow gold" },
  { name: "Nocturne Profond", ref: "Réf. 412.OB", img: "/assets/watch-3.jpg", line: "Obsidian ceramic · 200m" },
  { name: "Mécanique Ouverte", ref: "Réf. 909.RG", img: "/assets/watch-2.jpg", line: "Skeleton · rose gold cage" },
  { name: "Azur Marinier", ref: "Réf. 555.AC", img: "/assets/watch-1.jpg", line: "Sunburst azure · steel" },
  { name: "Petit Salon", ref: "Réf. 218.YG", img: "/assets/watch-4.jpg", line: "Yellow gold · alligator" },
];

function HorizontalCollection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(featured.length - 1) * (100 / featured.length)}%`]);

  return (
    <section
      id="collections"
      ref={ref}
      className="relative bg-onyx"
      style={{ height: `${featured.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-10 left-1/2 z-10 -translate-x-1/2 text-center">
          <p className="eyebrow">The Featured Five</p>
          <h2 className="mt-2 font-display text-3xl text-ivory md:text-5xl">
            A horizontal procession
          </h2>
        </div>

        <motion.div
          style={{ x, width: `${featured.length * 100}%` }}
          className="flex h-full"
        >
          {featured.map((w, i) => (
            <FeaturedPanel key={w.ref} item={w} index={i} progress={scrollYProgress} total={featured.length} />
          ))}
        </motion.div>

        {/* progress rule */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64">
          <div className="h-px bg-white/10">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-full bg-[var(--gold)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedPanel({
  item,
  index,
  progress,
  total,
}: {
  item: (typeof featured)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const seg = 1 / total;
  const start = Math.max(0, index * seg - seg * 0.5);
  const end = Math.min(1, index * seg + seg * 0.5);
  const opacity = useTransform(progress, [start, index * seg, end], [0.25, 1, 0.25]);
  const scale = useTransform(progress, [start, index * seg, end], [0.92, 1, 0.92]);

  return (
    <motion.div
      style={{ width: `${100 / total}%` }}
      className="flex h-full shrink-0 items-center justify-center px-10"
    >
      <motion.div style={{ opacity, scale }} className="flex w-full max-w-5xl items-center gap-12">
        <div className="hidden md:block flex-1">
          <p className="eyebrow">{item.ref}</p>
          <h3 className="mt-4 font-display text-5xl text-ivory md:text-7xl leading-[1]">
            {item.name}
          </h3>
          <div className="mt-8 h-px w-24 bg-[var(--gold)]" />
          <p className="mt-6 text-sm font-light tracking-wide text-[var(--ivory)]/70">{item.line}</p>
          <p className="mt-12 text-[10px] uppercase tracking-[0.4em] text-gold">
            0{index + 1} / 0{total}
          </p>
        </div>
        <div className="flex-1">
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            className="mx-auto h-[70vh] w-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────── Craftsmanship / Count-up stats ─────────────────────── */
function CountUp({ end, duration = 2.2 }: { end: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return <span ref={ref}>{val.toLocaleString()}</span>;
}

function Craftsmanship() {
  const stats = [
    { v: 1887, label: "Founded in Geneva" },
    { v: 47, label: "Jewels per movement" },
    { v: 312, label: "Components, hand-fitted" },
    { v: 11, label: "Months per tourbillon" },
  ];
  return (
    <section className="relative overflow-hidden bg-charcoal py-32 md:py-48">
      <div className="absolute inset-0 opacity-[0.07]">
        <img src="/assets/macro-movement.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-center">Craftsmanship</p>
          <h2 className="mx-auto mt-6 max-w-3xl text-center font-display text-4xl leading-[1.05] text-ivory md:text-6xl">
            A century and four decades of unhurried hands.
          </h2>
        </Reveal>

        <div className="mt-24 grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12}>
              <div className="text-center">
                <div className="font-display text-6xl text-gold md:text-7xl">
                  <CountUp end={s.v} />
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className="mx-auto mt-4 h-px w-12 bg-[var(--gold)]"
                />
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--ivory)]/60">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── New Arrivals grid ─────────────────────── */
const arrivals = [
  { name: "Sovereign Ivoire", img: "/assets/hero-watch.jpg", price: "€ 48,200" },
  { name: "Mécanique Rosée", img: "/assets/watch-2.jpg", price: "€ 72,900" },
  { name: "Salon Doré", img: "/assets/watch-4.jpg", price: "€ 31,400" },
];

function ProductCard({ item }: { item: (typeof arrivals)[number] }) {
  return (
    <a
      href="#"
      data-cursor="hover"
      className="group relative block overflow-hidden bg-charcoal"
    >
      {/* gold border trace */}
      <span className="pointer-events-none absolute inset-0 z-20">
        <span className="absolute left-0 top-0 h-px w-0 bg-[var(--gold)] transition-all duration-700 group-hover:w-full" />
        <span className="absolute right-0 top-0 h-0 w-px bg-[var(--gold)] transition-all delay-200 duration-700 group-hover:h-full" />
        <span className="absolute right-0 bottom-0 h-px w-0 bg-[var(--gold)] transition-all delay-[400ms] duration-700 group-hover:w-full" />
        <span className="absolute left-0 bottom-0 h-0 w-px bg-[var(--gold)] transition-all delay-[600ms] duration-700 group-hover:h-full" />
      </span>

      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      </div>

      <div className="relative overflow-hidden px-6 py-6">
        <div className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-7">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-2xl text-ivory">{item.name}</h3>
            <span className="text-xs tracking-[0.2em] text-[var(--ivory)]/60">{item.price}</span>
          </div>
        </div>
        <div className="absolute inset-x-6 bottom-2 translate-y-8 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold">Explore →</span>
        </div>
      </div>
    </a>
  );
}

function NewArrivals() {
  return (
    <section id="atelier" className="bg-onyx py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between">
          <Reveal>
            <p className="eyebrow">Spring Edition</p>
            <h2 className="mt-4 font-display text-4xl text-ivory md:text-6xl">New arrivals</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="#"
              className="hidden md:inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gold"
            >
              View the vault <ArrowUpRight size={12} />
            </a>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-10">
          {arrivals.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.15}>
              <ProductCard item={a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Materials parallax ─────────────────────── */
function Materials() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-80, 120]);
  return (
    <section ref={ref} className="relative h-[90vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
        <img
          src="/assets/macro-movement.jpg"
          alt="Macro view of an AURUM mechanical movement"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-onyx/60 via-onyx/20 to-onyx" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-24 md:px-10">
        <Reveal>
          <p className="eyebrow">Materials &amp; Details</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-ivory md:text-6xl">
            Sapphire, gold and the long quiet of steel.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────── Testimonials ─────────────────────── */
const quotes = [
  {
    q: "An AURUM is not worn. It is inherited — even by the one who first clasps it.",
    a: "Le Monde Horloger",
  },
  {
    q: "The Sovereign keeps a kind of silence other watches only imitate.",
    a: "Revue Suisse",
  },
  {
    q: "Where most maisons sell time, AURUM sells the architecture around it.",
    a: "Hodinkee",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % quotes.length), 6500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="bg-charcoal py-32 md:py-48">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <p className="eyebrow">Press</p>
        <div className="relative mt-12 h-56 md:h-44">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="font-display text-2xl italic leading-relaxed text-ivory md:text-4xl">
                &ldquo;{quotes[i].q}&rdquo;
              </p>
              <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-gold">
                — {quotes[i].a}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex justify-center gap-3">
          {quotes.map((_, j) => (
            <button
              key={j}
              onClick={() => setI(j)}
              className={`h-px w-10 transition-all duration-500 ${
                j === i ? "bg-[var(--gold)]" : "bg-white/20"
              }`}
              aria-label={`Quote ${j + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────── Newsletter ─────────────────────── */
function Newsletter() {
  const [v, setV] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section id="newsletter" className="relative overflow-hidden bg-onyx py-32 md:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,168,76,0.10),transparent_55%)]" />
      <div className="relative mx-auto max-w-2xl px-6 text-center md:px-10">
        <Reveal>
          <p className="eyebrow">Correspondence</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-ivory md:text-6xl">
            Receive our private dispatch.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-[var(--ivory)]/60">
            Four letters a year. New pieces, atelier visits, the occasional auction.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mx-auto mt-12 flex max-w-md items-center border-b border-white/15 focus-within:border-[var(--gold)] transition-colors"
          >
            <input
              type="email"
              required
              value={v}
              onChange={(e) => setV(e.target.value)}
              placeholder="your@address"
              className="flex-1 bg-transparent px-2 py-4 text-sm text-ivory outline-none placeholder:text-[var(--ivory)]/30"
            />
            <button
              type="submit"
              className="px-4 py-4 text-[10px] uppercase tracking-[0.4em] text-gold hover:text-ivory transition-colors"
            >
              {sent ? "Merci →" : "Subscribe →"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────── Footer ─────────────────────── */
function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const socials = [
    { Icon: Instagram, label: "Instagram" },
    { Icon: Youtube, label: "Youtube" },
    { Icon: Twitter, label: "Twitter" },
  ];
  return (
    <footer ref={ref} id="contact" className="relative overflow-hidden border-t border-white/5 bg-onyx pt-24 pb-10">
      {/* Oversized watermark */}
      <motion.img
        src="/assets/hero-watch.jpg"
        alt=""
        aria-hidden
        initial={{ opacity: 0, scale: 1.05 }}
        animate={inView ? { opacity: 0.05, scale: 1 } : {}}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[150%] w-auto -translate-x-1/2 object-contain"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <span className="font-display text-3xl tracking-[0.4em] text-ivory">
              <span className="text-gold">A</span>URUM
            </span>
            <p className="mt-6 text-xs leading-relaxed text-[var(--ivory)]/50">
              Rue du Rhône 47<br /> 1204 Genève, Suisse
            </p>
          </div>
          {[
            { t: "Maison", l: ["Heritage", "Atelier", "Press"] },
            { t: "Collections", l: ["Sovereign", "Nocturne", "Mécanique"] },
            { t: "Concierge", l: ["Boutiques", "Service", "Contact"] },
          ].map((col) => (
            <div key={col.t}>
              <p className="text-[10px] uppercase tracking-[0.4em] text-gold">{col.t}</p>
              <ul className="mt-6 space-y-3">
                {col.l.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-[var(--ivory)]/70 hover:text-ivory transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--ivory)]/40">
            © 1887 — 2026 · Maison Aurum
          </p>
          <div className="flex items-center gap-5">
            {socials.map(({ Icon, label }, i) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-[var(--ivory)]/60 hover:text-gold transition-colors"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────── Page ─────────────────────── */
export default function AurumPage() {
  return (
    <main className="relative bg-onyx text-ivory">
      <CustomCursor />
      <Nav />
      <Hero />
      <BrandStory />
      <HorizontalCollection />
      <Craftsmanship />
      <NewArrivals />
      <Materials />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
