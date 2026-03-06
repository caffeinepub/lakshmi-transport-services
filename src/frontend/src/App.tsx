import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Plane,
  Search,
  Shield,
  Star,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import type { Shipment } from "./backend";
import { useActor } from "./hooks/useActor";

/* ── Scroll reveal hook ── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const els = document.querySelectorAll(".section-reveal");
    for (const el of els) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);
}

/* ── Count-up animation hook ── */
function useCountUp(end: number, trigger: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const start = 0;
    const steps = 60;
    const increment = (end - start) / steps;
    let current = start;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end, duration, trigger]);

  return count;
}

/* ── Navbar ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "About", id: "stats" },
    { label: "How It Works", id: "howworks" },
    { label: "Track Shipment", id: "tracking" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-navy py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-3 group"
          >
            <img
              src="/assets/uploads/WhatsApp-Image-2026-03-06-at-12.37.11-PM-1.jpeg"
              alt="Lakshmi Transport Services Logo"
              className="h-12 w-auto object-contain"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                data-ocid="nav.link"
                onClick={() => scrollTo(link.id)}
                className="text-white/80 hover:text-brand-amber font-body text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              data-ocid="nav.primary_button"
              onClick={() => scrollTo("contact")}
              className="btn-shimmer bg-brand-amber hover:bg-brand-amber-dark text-navy font-display font-bold text-sm px-5 py-2 rounded-lg transition-all duration-200 shadow-amber hover:shadow-[0_4px_20px_oklch(0.72_0.17_65/0.40)] hover:scale-[1.03]"
            >
              Get a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 bg-navy-mid rounded-xl p-4 shadow-navy space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                data-ocid="nav.link"
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left text-white/85 hover:text-brand-amber font-body text-sm font-medium px-4 py-3 rounded-lg transition-colors hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <Button
                data-ocid="nav.primary_button"
                onClick={() => scrollTo("contact")}
                className="w-full bg-brand-amber hover:bg-brand-amber-dark text-navy font-display font-bold"
              >
                Get a Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ── Hero Section ── */
function HeroSection() {
  const stats = [
    { value: "15+", label: "Years" },
    { value: "50K+", label: "Deliveries" },
    { value: "200+", label: "Cities" },
    { value: "99%", label: "On-Time" },
  ];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-banner.dim_1600x700.jpg"
          alt="Lakshmi Transport Services fleet"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.1) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-amber/15 border border-brand-amber/30 text-brand-amber text-xs font-body font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm animate-fade-in-up">
            <Shield size={12} />
            India's Trusted Logistics Partner
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 animate-fade-in-up [animation-delay:0.1s]">
            Your Trusted{" "}
            <span className="text-brand-amber relative">
              Partner
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                aria-hidden="true"
                role="presentation"
              >
                <path
                  d="M0 6 Q50 2 100 6 Q150 10 200 6"
                  stroke="oklch(0.72 0.17 65)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <br />
            in Every Mile
          </h1>

          {/* Subheadline */}
          <p className="font-body text-white/80 text-lg md:text-xl leading-relaxed mb-10 animate-fade-in-up [animation-delay:0.2s]">
            Fast, Reliable &amp; Affordable Transport Services Across India.
            <br className="hidden md:block" />
            From pickup to delivery — we keep your cargo moving.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14 animate-fade-in-up [animation-delay:0.3s]">
            <Button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-shimmer bg-brand-amber hover:bg-brand-amber-dark text-navy font-display font-black text-base px-10 py-4 h-auto rounded-xl transition-all duration-200 shadow-amber hover:shadow-[0_8px_32px_oklch(0.72_0.17_65/0.35)] hover:scale-[1.03]"
            >
              Start Shipping Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              onClick={() => scrollTo("tracking")}
              variant="outline"
              size="lg"
              className="border-2 border-white/75 text-white bg-white/8 hover:bg-brand-amber hover:border-brand-amber hover:text-navy font-display font-bold text-base px-9 py-4 h-auto rounded-xl backdrop-blur-sm transition-all duration-250"
            >
              Track Shipment
            </Button>
          </div>

          {/* Stats Glass Bar */}
          <div className="animate-fade-in-up [animation-delay:0.4s] inline-flex items-stretch bg-white/6 backdrop-blur-md border border-white/12 rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center px-6 py-4 relative group hover:bg-white/6 transition-colors duration-200"
              >
                {/* Vertical divider */}
                {i > 0 && (
                  <div className="absolute left-0 top-3 bottom-3 w-px bg-white/12" />
                )}
                {/* Amber accent dot */}
                <div className="w-1 h-1 rounded-full bg-brand-amber mb-1.5 opacity-70" />
                <div className="font-display font-black text-white text-2xl leading-none tracking-tight">
                  {s.value}
                </div>
                <div className="font-body text-white/50 text-[10px] tracking-[0.18em] uppercase mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade — use navy not background to prevent off-white bleed */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/60 to-transparent" />
    </section>
  );
}

/* ── Services Section ── */
function ServicesSection() {
  const services = [
    {
      icon: <Truck className="h-7 w-7" />,
      title: "Road Freight",
      description:
        "Long-haul truck transport covering every corner of India. Full load and part load options available.",
      badge: "Pan-India",
    },
    {
      icon: <Plane className="h-7 w-7" />,
      title: "Air Cargo",
      description:
        "Express air freight solutions for time-sensitive shipments. Priority handling guaranteed.",
      badge: "Express",
    },
    {
      icon: <Zap className="h-7 w-7" />,
      title: "Express Delivery",
      description:
        "Same-day and next-day delivery services for urgent parcels and documents within city limits.",
      badge: "Same Day",
    },
    {
      icon: <Warehouse className="h-7 w-7" />,
      title: "Warehousing",
      description:
        "Safe, secure, and climate-controlled storage facilities with real-time inventory tracking.",
      badge: "Secure",
    },
    {
      icon: <MapPin className="h-7 w-7" />,
      title: "Last Mile Delivery",
      description:
        "Doorstep delivery with live tracking, signature confirmation, and SMS notifications.",
      badge: "Doorstep",
    },
    {
      icon: <Globe className="h-7 w-7" />,
      title: "International Shipping",
      description:
        "Global logistics solutions covering 50+ countries. Customs clearance and documentation support.",
      badge: "50+ Countries",
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-amber/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section-reveal text-center mb-16">
          <Badge className="bg-brand-amber/10 text-brand-amber border-brand-amber/20 font-body font-semibold text-xs tracking-widest uppercase mb-4 px-4 py-1.5">
            What We Offer
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4">
            Our <span className="text-brand-amber">Services</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            End-to-end logistics solutions designed to keep your supply chain
            running smoothly — from first mile to last.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              data-ocid={`services.card.${i + 1}`}
              className="section-reveal card-hover service-card bg-card border border-border rounded-2xl p-7 cursor-pointer group"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {/* Top row: icon + service number */}
              <div className="flex items-start justify-between mb-5">
                {/* Icon — navy filled at rest, amber on hover */}
                <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center text-brand-amber shadow-navy group-hover:bg-brand-amber group-hover:text-navy transition-all duration-300">
                  {service.icon}
                </div>
                {/* Service index — decorative number */}
                <span className="font-display font-black text-foreground/8 text-4xl leading-none select-none group-hover:text-brand-amber/15 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-navy transition-colors duration-200">
                {service.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Footer: badge + arrow */}
              <div className="flex items-center justify-between">
                <Badge className="bg-secondary text-foreground/50 border-transparent text-xs font-body font-medium group-hover:bg-brand-amber/12 group-hover:text-brand-amber group-hover:border-brand-amber/20 transition-all duration-300">
                  {service.badge}
                </Badge>
                <div className="flex items-center gap-1 text-brand-amber opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <span className="font-body text-xs font-semibold">
                    Explore
                  </span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Stats / Why Choose Us ── */
function StatsSection() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const years = useCountUp(15, triggered, 1800);
  const deliveries = useCountUp(50000, triggered, 2200);
  const cities = useCountUp(200, triggered, 1600);
  const fleet = useCountUp(500, triggered, 2000);

  const stats = [
    {
      value: years,
      suffix: "+",
      label: "Years Experience",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      value: deliveries.toLocaleString("en-IN"),
      suffix: "+",
      label: "Deliveries Completed",
      icon: <Package className="h-6 w-6" />,
    },
    {
      value: cities,
      suffix: "+",
      label: "Cities Covered",
      icon: <MapPin className="h-6 w-6" />,
    },
    {
      value: fleet,
      suffix: "+",
      label: "Fleet Vehicles",
      icon: <Truck className="h-6 w-6" />,
    },
  ];

  const features = [
    { icon: <Shield className="h-5 w-5" />, label: "100% Cargo Insurance" },
    { icon: <Clock className="h-5 w-5" />, label: "24/7 Customer Support" },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      label: "Real-time GPS Tracking",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Dedicated Account Manager",
    },
  ];

  return (
    <section
      id="stats"
      ref={ref}
      className="py-20 bg-navy relative overflow-hidden grain-bg"
    >
      {/* Decorative shapes */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-amber/8 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-brand-amber/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-14">
          <Badge className="bg-brand-amber/15 text-brand-amber border-brand-amber/25 font-body font-semibold text-xs tracking-widest uppercase mb-4 px-4 py-1.5">
            Our Strength
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white">
            Numbers That <span className="text-brand-amber">Speak Louder</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/8 hover:border-brand-amber/30 transition-all duration-300"
            >
              <div className="text-brand-amber/60 mb-3 flex justify-center">
                {stat.icon}
              </div>
              <div className="font-display font-black text-brand-amber text-4xl md:text-5xl leading-none mb-2">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="font-body text-white/60 text-sm tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:border-brand-amber/30 transition-all duration-200"
            >
              <div className="text-brand-amber flex-shrink-0">{f.icon}</div>
              <span className="font-body text-white/80 text-sm font-medium">
                {f.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── How It Works ── */
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: <Package className="h-8 w-8" />,
      title: "Book Online",
      description:
        "Fill out your shipment details in under 2 minutes. Choose your service, pickup & drop locations.",
    },
    {
      number: "02",
      icon: <Truck className="h-8 w-8" />,
      title: "We Pick Up",
      description:
        "Our trained driver arrives at your doorstep at the scheduled time. Package safely loaded and secured.",
    },
    {
      number: "03",
      icon: <CheckCircle2 className="h-8 w-8" />,
      title: "Delivered Safe",
      description:
        "GPS-tracked delivery to the destination. You receive real-time updates every step of the way.",
    },
  ];

  return (
    <section
      id="howworks"
      className="py-24 bg-secondary/40 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.22 0.06 255 / 0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section-reveal text-center mb-16">
          <Badge className="bg-brand-amber/10 text-brand-amber border-brand-amber/20 font-body font-semibold text-xs tracking-widest uppercase mb-4 px-4 py-1.5">
            Simple Process
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4">
            How It <span className="text-brand-amber">Works</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Three simple steps to get your cargo moving — fast, safe, and
            hassle-free.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-px bg-gradient-to-r from-brand-amber/30 via-brand-amber/60 to-brand-amber/30" />

          {steps.map((step, i) => (
            <div
              key={step.title}
              data-ocid={`howworks.item.${i + 1}`}
              className="section-reveal relative flex flex-col items-center text-center group"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Number chip */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-navy flex items-center justify-center shadow-navy group-hover:bg-brand-amber transition-all duration-300">
                  <div className="text-brand-amber group-hover:text-navy transition-colors duration-300">
                    {step.icon}
                  </div>
                </div>
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-brand-amber text-navy font-display font-black text-xs flex items-center justify-center shadow-amber">
                  {step.number}
                </div>
              </div>

              <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                {step.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="section-reveal text-center mt-14">
          <Button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-navy hover:bg-navy-mid text-white font-display font-bold text-base px-8 py-4 h-auto rounded-lg transition-all duration-200 shadow-navy hover:scale-105"
          >
            Start Shipping Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ── Shipment Tracking Section ── */
function ShipmentTrackingSection() {
  const { actor, isFetching } = useActor();
  const [trackingId, setTrackingId] = useState("");
  const [shipment, setShipment] = useState<Shipment | null | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const initializedRef = useRef(false);

  // Initialize shipments once actor is ready
  useEffect(() => {
    if (!actor || isFetching || initializedRef.current) return;
    initializedRef.current = true;
    actor.initializeShipments().catch(() => {
      // silently ignore — data may already exist
    });
  }, [actor, isFetching]);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim() || !actor) return;
    setLoading(true);
    setShipment(undefined);
    setNotFound(false);
    try {
      const result = await actor.trackShipment(trackingId.trim().toUpperCase());
      if (result === null) {
        setNotFound(true);
      } else {
        setShipment(result);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const statusConfig: Record<
    string,
    { label: string; color: string; bg: string; border: string }
  > = {
    Delivered: {
      label: "Delivered",
      color: "text-green-400",
      bg: "bg-green-500/15",
      border: "border-green-500/30",
    },
    "Out for Delivery": {
      label: "Out for Delivery",
      color: "text-amber-400",
      bg: "bg-amber-500/15",
      border: "border-amber-500/30",
    },
    "In Transit": {
      label: "In Transit",
      color: "text-sky-400",
      bg: "bg-sky-500/15",
      border: "border-sky-500/30",
    },
  };

  const getStatusStyle = (status: string) =>
    statusConfig[status] ?? {
      label: status,
      color: "text-white/70",
      bg: "bg-white/10",
      border: "border-white/20",
    };

  const milestoneOcids = [
    "tracking.item.1",
    "tracking.item.2",
    "tracking.item.3",
    "tracking.item.4",
  ];

  return (
    <section
      id="tracking"
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-amber/4 rounded-full blur-3xl pointer-events-none" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.22 0.06 255 / 0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section-reveal text-center mb-14">
          <Badge className="bg-brand-amber/10 text-brand-amber border-brand-amber/20 font-body font-semibold text-xs tracking-widest uppercase mb-4 px-4 py-1.5">
            Live Tracking
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4">
            Track Your <span className="text-brand-amber">Shipment</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Enter your tracking ID to get real-time status, location, and
            delivery updates for your shipment.
          </p>
        </div>

        {/* Search card */}
        <div className="section-reveal max-w-2xl mx-auto mb-10">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-navy/10 shadow-lg">
            <form onSubmit={handleTrack} className="space-y-4">
              <label
                htmlFor="tracking-id-input"
                className="font-body font-semibold text-foreground text-sm block"
              >
                Enter Tracking ID
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="tracking-id-input"
                    data-ocid="tracking.input"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="e.g. LTS001"
                    className="pl-10 font-body uppercase placeholder:normal-case focus:border-brand-amber focus:ring-brand-amber/20"
                  />
                </div>
                <Button
                  data-ocid="tracking.submit_button"
                  type="submit"
                  disabled={loading || !trackingId.trim()}
                  className="btn-shimmer bg-brand-amber hover:bg-brand-amber-dark text-navy font-display font-bold px-6 rounded-xl shadow-amber hover:shadow-[0_4px_20px_oklch(0.72_0.17_65/0.35)] transition-all duration-200 hover:scale-[1.03] disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2
                      data-ocid="tracking.loading_state"
                      className="h-4 w-4 animate-spin"
                    />
                  ) : (
                    <>
                      Track
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <p className="font-body text-muted-foreground text-xs">
                Try:{" "}
                {["LTS001", "LTS002", "LTS003"].map((id, i) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTrackingId(id)}
                    className="text-brand-amber hover:underline font-semibold transition-colors"
                  >
                    {id}
                    {i < 2 ? ", " : ""}
                  </button>
                ))}
              </p>
            </form>
          </div>
        </div>

        {/* Not Found error */}
        {notFound && (
          <div
            data-ocid="tracking.error_state"
            className="max-w-2xl mx-auto mb-8 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-2xl p-5"
          >
            <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-display font-bold text-red-400 text-sm mb-1">
                Shipment Not Found
              </div>
              <p className="font-body text-red-300/80 text-sm">
                We couldn't find a shipment with that tracking ID. Please check
                the ID and try again. Try: LTS001, LTS002, or LTS003.
              </p>
            </div>
          </div>
        )}

        {/* Result card */}
        {shipment && (
          <div data-ocid="tracking.success_state" className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg shadow-navy/10">
              {/* Card header bar */}
              <div className="bg-navy px-7 py-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-brand-amber" />
                  <div>
                    <div className="font-body text-white/50 text-xs uppercase tracking-widest">
                      Tracking ID
                    </div>
                    <div className="font-display font-black text-white text-lg tracking-wider">
                      {shipment.trackingId}
                    </div>
                  </div>
                </div>
                {/* Status badge */}
                {(() => {
                  const style = getStatusStyle(shipment.status);
                  return (
                    <span
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-display font-bold border ${style.bg} ${style.color} ${style.border}`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      {style.label}
                    </span>
                  );
                })()}
              </div>

              {/* Card body */}
              <div className="p-7 space-y-6">
                {/* Route + meta row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Route */}
                  <div className="sm:col-span-3 flex items-center gap-3 bg-secondary/50 border border-border rounded-xl px-5 py-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand-amber" />
                    </div>
                    <div className="font-display font-bold text-foreground text-base">
                      {shipment.origin}
                    </div>
                    <div className="flex-1 flex items-center gap-2 mx-2">
                      <div className="flex-1 h-px bg-gradient-to-r from-brand-amber/40 to-brand-amber/60" />
                      <Truck className="h-4 w-4 text-brand-amber flex-shrink-0" />
                      <div className="flex-1 h-px bg-gradient-to-r from-brand-amber/60 to-brand-amber/40" />
                    </div>
                    <div className="font-display font-bold text-foreground text-base">
                      {shipment.destination}
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-brand-amber" />
                    </div>
                  </div>

                  {/* Current location */}
                  <div className="flex items-center gap-3 bg-secondary/40 border border-border rounded-xl px-4 py-3.5">
                    <MapPin className="h-5 w-5 text-brand-amber flex-shrink-0" />
                    <div>
                      <div className="font-body text-muted-foreground text-xs uppercase tracking-wide mb-0.5">
                        Current Location
                      </div>
                      <div className="font-display font-bold text-foreground text-sm">
                        {shipment.currentLocation}
                      </div>
                    </div>
                  </div>

                  {/* Estimated delivery */}
                  <div className="sm:col-span-2 flex items-center gap-3 bg-secondary/40 border border-border rounded-xl px-4 py-3.5">
                    <Clock className="h-5 w-5 text-brand-amber flex-shrink-0" />
                    <div>
                      <div className="font-body text-muted-foreground text-xs uppercase tracking-wide mb-0.5">
                        Estimated Delivery
                      </div>
                      <div className="font-display font-bold text-foreground text-sm">
                        {shipment.estimatedDelivery}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Milestone timeline */}
                <div>
                  <h3 className="font-display font-bold text-foreground text-base mb-5 flex items-center gap-2">
                    <span className="w-1 h-5 bg-brand-amber rounded-full inline-block" />
                    Shipment Timeline
                  </h3>
                  <div className="space-y-0">
                    {shipment.milestones.map((milestone, idx) => {
                      const isLast = idx === shipment.milestones.length - 1;
                      const ocid =
                        milestoneOcids[idx] ?? `tracking.item.${idx + 1}`;
                      return (
                        <div
                          key={`${milestone.title}-${idx}`}
                          data-ocid={ocid}
                          className="flex gap-4"
                        >
                          {/* Timeline spine */}
                          <div className="flex flex-col items-center flex-shrink-0">
                            {/* Step circle */}
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-xs z-10 transition-all duration-300 ${
                                milestone.completed
                                  ? "bg-brand-amber text-navy shadow-amber shadow-sm"
                                  : "bg-muted border-2 border-border text-muted-foreground"
                              }`}
                            >
                              {milestone.completed ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <span>{idx + 1}</span>
                              )}
                            </div>
                            {/* Connector line */}
                            {!isLast && (
                              <div
                                className={`w-0.5 flex-1 min-h-[2rem] mt-1 mb-1 transition-colors duration-300 ${
                                  milestone.completed
                                    ? "bg-brand-amber/40"
                                    : "bg-border"
                                }`}
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div
                            className={`flex-1 pb-5 ${isLast ? "pb-0" : ""}`}
                          >
                            <div
                              className={`font-display font-bold text-sm mb-0.5 transition-colors ${
                                milestone.completed
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {milestone.title}
                            </div>
                            <div
                              className={`font-body text-xs leading-relaxed mb-1 transition-colors ${
                                milestone.completed
                                  ? "text-foreground/70"
                                  : "text-muted-foreground/60"
                              }`}
                            >
                              {milestone.description}
                            </div>
                            {milestone.timestamp && (
                              <div
                                className={`font-body text-xs flex items-center gap-1 transition-colors ${
                                  milestone.completed
                                    ? "text-brand-amber"
                                    : "text-muted-foreground/40"
                                }`}
                              >
                                <Clock className="h-3 w-3" />
                                {milestone.timestamp}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Testimonials ── */
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Lakshmi Transport delivered our goods on time every single time. Best logistics partner we've ever worked with. Zero delays, zero damage!",
      name: "Rajesh K.",
      city: "Mumbai",
      business: "Manufacturing Co.",
      rating: 5,
    },
    {
      quote:
        "Very professional team and excellent real-time tracking system. I can always see where my shipment is. Highly recommended for all businesses!",
      name: "Priya M.",
      city: "Bangalore",
      business: "E-commerce Retailer",
      rating: 5,
    },
    {
      quote:
        "Affordable rates and absolutely zero damage to our cargo. We've trusted Lakshmi Transport for 5 years — truly the most reliable service in South India.",
      name: "Suresh T.",
      city: "Chennai",
      business: "Textile Exporter",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-amber/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy/4 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section-reveal text-center mb-14">
          <Badge className="bg-brand-amber/10 text-brand-amber border-brand-amber/20 font-body font-semibold text-xs tracking-widest uppercase mb-4 px-4 py-1.5">
            Client Stories
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4">
            What Our Customers <span className="text-brand-amber">Say</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Trusted by thousands of businesses across India.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              data-ocid={`testimonials.card.${i + 1}`}
              className="section-reveal card-hover bg-card border border-border rounded-2xl p-7 cursor-default relative overflow-hidden"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Decorative oversized quote mark */}
              <div
                className="absolute top-4 right-5 font-display font-black text-8xl leading-none text-foreground/4 select-none pointer-events-none"
                aria-hidden="true"
              >
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }, (_, j) => (
                  <Star
                    key={`star-${t.name}-${j}`}
                    className="h-3.5 w-3.5 fill-brand-amber text-brand-amber"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-foreground/75 text-[0.9375rem] leading-relaxed mb-6 relative z-10">
                {t.quote}
              </p>

              {/* Customer */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center font-display font-black text-brand-amber text-sm shadow-navy">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-display font-bold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="font-body text-muted-foreground text-xs">
                    {t.business} · {t.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact / Quote Form ── */
function ContactSection() {
  const { actor } = useActor();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      if (!actor) throw new Error("Service unavailable");
      await actor.submitForm(
        formData.name,
        formData.email,
        formData.phone,
        formData.pickupLocation,
        formData.dropLocation,
        formData.message,
      );
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        pickupLocation: "",
        dropLocation: "",
        message: "",
      });
    } catch (_err) {
      setStatus("error");
      setErrorMsg(
        "Something went wrong. Please try again or call us directly.",
      );
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "info@lakshmitransport.in",
      href: "mailto:info@lakshmitransport.in",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Address",
      value: "123 Transport Nagar, Chennai, Tamil Nadu",
      href: "#",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: "Hours",
      value: "24/7 · 365 Days",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-navy relative overflow-hidden grain-bg"
    >
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-amber/8 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-brand-amber/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section-reveal text-center mb-14">
          <Badge className="bg-brand-amber/15 text-brand-amber border-brand-amber/25 font-body font-semibold text-xs tracking-widest uppercase mb-4 px-4 py-1.5">
            Free Quote
          </Badge>
          <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-4">
            Get a <span className="text-brand-amber">Free Quote</span>
          </h2>
          <p className="font-body text-white/60 text-lg max-w-xl mx-auto">
            Tell us about your shipment and we'll get back to you within 30
            minutes with a competitive quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="section-reveal lg:col-span-2 space-y-5">
            <h3 className="font-display font-bold text-white text-xl mb-6">
              Reach Us Directly
            </h3>
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/8 hover:border-brand-amber/30 transition-all duration-200 group"
              >
                <div className="text-brand-amber mt-0.5 group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <div>
                  <div className="font-body text-white/50 text-xs font-medium tracking-wide uppercase mb-0.5">
                    {info.label}
                  </div>
                  <div className="font-body text-white/85 text-sm font-medium">
                    {info.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="pt-4">
              <div className="font-body text-white/50 text-xs font-medium tracking-wide uppercase mb-3">
                Follow Us
              </div>
              <div className="flex gap-3">
                {[
                  { icon: <SiFacebook />, label: "Facebook", href: "#" },
                  { icon: <SiX />, label: "Twitter", href: "#" },
                  { icon: <SiLinkedin />, label: "LinkedIn", href: "#" },
                  { icon: <SiInstagram />, label: "Instagram", href: "#" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-amber hover:border-brand-amber/30 hover:bg-brand-amber/10 transition-all duration-200"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="section-reveal lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm space-y-4"
            >
              {/* Success */}
              {status === "success" && (
                <div
                  data-ocid="contact.success_state"
                  className="flex items-start gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-4"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-display font-bold text-green-400 text-sm">
                      Quote Request Received!
                    </div>
                    <p className="font-body text-green-300/80 text-sm">
                      Our team will contact you within 30 minutes. Thank you!
                    </p>
                  </div>
                </div>
              )}

              {/* Error */}
              {status === "error" && (
                <div
                  data-ocid="contact.error_state"
                  className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4"
                >
                  <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="font-body text-red-300/90 text-sm">
                    {errorMsg}
                  </p>
                </div>
              )}

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="font-body text-white/70 text-xs font-medium block mb-1.5"
                  >
                    Full Name *
                  </label>
                  <Input
                    id="contact-name"
                    data-ocid="contact.input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Rajesh Kumar"
                    className="bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:border-brand-amber focus:ring-brand-amber/30 font-body"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="font-body text-white/70 text-xs font-medium block mb-1.5"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="rajesh@example.com"
                    className="bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:border-brand-amber focus:ring-brand-amber/30 font-body"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div>
                <label
                  htmlFor="contact-phone"
                  className="font-body text-white/70 text-xs font-medium block mb-1.5"
                >
                  Phone Number *
                </label>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98765 43210"
                  className="bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:border-brand-amber focus:ring-brand-amber/30 font-body"
                />
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-pickup"
                    className="font-body text-white/70 text-xs font-medium block mb-1.5"
                  >
                    Pickup Location *
                  </label>
                  <Input
                    id="contact-pickup"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    required
                    placeholder="Mumbai, Maharashtra"
                    className="bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:border-brand-amber focus:ring-brand-amber/30 font-body"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-drop"
                    className="font-body text-white/70 text-xs font-medium block mb-1.5"
                  >
                    Drop Location *
                  </label>
                  <Input
                    id="contact-drop"
                    name="dropLocation"
                    value={formData.dropLocation}
                    onChange={handleChange}
                    required
                    placeholder="Chennai, Tamil Nadu"
                    className="bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:border-brand-amber focus:ring-brand-amber/30 font-body"
                  />
                </div>
              </div>

              {/* Row 4 */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="font-body text-white/70 text-xs font-medium block mb-1.5"
                >
                  Message / Cargo Details
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your shipment: cargo type, weight, dimensions, special handling requirements..."
                  className="bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:border-brand-amber focus:ring-brand-amber/30 font-body resize-none"
                />
              </div>

              {/* Submit */}
              <Button
                data-ocid="contact.submit_button"
                type="submit"
                disabled={status === "loading"}
                className="btn-shimmer w-full bg-brand-amber hover:bg-brand-amber-dark text-navy font-display font-black text-base py-4 h-auto rounded-xl shadow-amber hover:shadow-[0_8px_32px_oklch(0.72_0.17_65/0.40)] transition-all duration-200 hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none"
              >
                {status === "loading" ? (
                  <>
                    <Loader2
                      data-ocid="contact.loading_state"
                      className="mr-2 h-5 w-5 animate-spin"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get My Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="font-body text-white/40 text-xs text-center">
                We respond within 30 minutes · No spam · No obligation
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "Our Services", id: "services" },
    { label: "About Us", id: "stats" },
    { label: "How It Works", id: "howworks" },
    { label: "Track Shipment", id: "tracking" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Get a Quote", id: "contact" },
  ];

  const serviceLinks = [
    "Road Freight",
    "Air Cargo",
    "Express Delivery",
    "Warehousing",
    "Last Mile Delivery",
    "International Shipping",
  ];

  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-gray-100 text-foreground pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-amber/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-06-at-12.37.11-PM-1.jpeg"
                alt="Lakshmi Transport Services Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="font-body text-black/70 text-sm leading-relaxed mb-5">
              India's most trusted logistics partner. Delivering excellence,
              reliability, and speed since 2009.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <SiFacebook />, label: "Facebook", href: "#" },
                { icon: <SiX />, label: "Twitter", href: "#" },
                { icon: <SiLinkedin />, label: "LinkedIn", href: "#" },
                { icon: <SiInstagram />, label: "Instagram", href: "#" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-black/8 border border-black/10 flex items-center justify-center text-black/50 hover:text-brand-amber hover:border-brand-amber/30 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-black text-sm tracking-wide uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    data-ocid="footer.link"
                    onClick={() => scrollTo(link.id)}
                    className="font-body text-black/70 hover:text-brand-amber text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ChevronRight
                      size={12}
                      className="text-brand-amber/40 group-hover:text-brand-amber transition-colors"
                    />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-black text-sm tracking-wide uppercase mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    data-ocid="footer.link"
                    onClick={() => scrollTo("services")}
                    className="font-body text-black/70 hover:text-brand-amber text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ChevronRight
                      size={12}
                      className="text-brand-amber/40 group-hover:text-brand-amber transition-colors"
                    />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-black text-sm tracking-wide uppercase mb-5">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-brand-amber flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-body text-black/60 text-xs uppercase tracking-wide mb-0.5">
                    Phone
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="font-body text-black/80 text-sm hover:text-brand-amber transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-brand-amber flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-body text-black/60 text-xs uppercase tracking-wide mb-0.5">
                    Email
                  </div>
                  <a
                    href="mailto:info@lakshmitransport.in"
                    className="font-body text-black/80 text-sm hover:text-brand-amber transition-colors"
                  >
                    info@lakshmitransport.in
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand-amber flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-body text-black/60 text-xs uppercase tracking-wide mb-0.5">
                    Address
                  </div>
                  <p className="font-body text-black/80 text-sm leading-relaxed">
                    123 Transport Nagar,
                    <br />
                    Chennai, Tamil Nadu 600001
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-amber/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 bg-brand-amber/5 rounded-xl px-5 py-4">
          <p className="font-body text-black text-sm font-semibold">
            © {new Date().getFullYear()} Lakshmi Transport Services. All Rights
            Reserved.
          </p>
          <p className="font-body text-black/60 text-xs">
            Built with <span className="text-brand-amber">♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-amber hover:text-black transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── App Root ── */
export default function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <HowItWorksSection />
        <ShipmentTrackingSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
