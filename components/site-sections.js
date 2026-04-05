import Link from "next/link";

import { brand } from "@/lib/site-data";

const NAV_LINKS = [
  { href: "/weight-loss", label: "Weight Loss" },
  { href: "/welcome", label: "Getting Started" },
  { href: "/login", label: "Patient Login" },
  { href: "/dashboard", label: "Portal Demo" }
];

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function ActionLink({ href, children, variant = "primary", className = "" }) {
  const classes = classNames("button", variant, className);

  if (href.startsWith("#") || href.startsWith("mailto:")) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}

export function TextLink({ href, children, className = "" }) {
  if (href.startsWith("mailto:")) {
    return (
      <a className={classNames("text-link", className)} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classNames("text-link", className)} href={href}>
      {children}
    </Link>
  );
}

export function BrandMark({ light = false }) {
  return (
    <Link
      aria-label={`${brand.name} home`}
      className={classNames("brand", light && "brand-light")}
      href="/"
    >
      <span className="brand-badge">{brand.shortName}</span>
      <span className="brand-name">{brand.name}</span>
    </Link>
  );
}

export function ArtPanel({ kind, label, detail = "" }) {
  return (
    <div className={`art-card art-${kind}`}>
      <div className="art-noise" />
      <div className="art-copy">
        <span className="art-chip">{label}</span>
        {detail ? <p>{detail}</p> : null}
      </div>
      <div className="art-stack">
        <div className="art-shape art-a" />
        <div className="art-shape art-b" />
        <div className="art-shape art-c" />
      </div>
    </div>
  );
}

export function MockBanner({ title = "Demo note", copy, className = "" }) {
  return (
    <aside className={classNames("mock-banner", className)}>
      <p className="mini-label">{title}</p>
      <p>{copy}</p>
    </aside>
  );
}

export function SiteHeader({ mode = "default" }) {
  const light = mode === "dark";

  return (
    <header className={classNames("site-header", light && "site-header-dark")}>
      <div className="shell header-inner">
        <BrandMark light={light} />
        <nav className="header-nav">
          {NAV_LINKS.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ActionLink href="/login" variant={light ? "ghost-light" : "ghost"}>
            Log In
          </ActionLink>
          <ActionLink href="/weight-loss" variant={light ? "primary-light" : "primary"}>
            Get Started
          </ActionLink>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <BrandMark />
          <p className="footer-copy">
            This app recreates the public Medvi-style journey with placeholder branding, paraphrased
            copy, and mocked or inferred portal behavior where the real product is private.
          </p>
        </div>
        <div>
          <p className="mini-label">Routes</p>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/weight-loss">Weight Loss</Link>
            <Link href="/welcome">Guide</Link>
            <Link href="/login">Login</Link>
            <Link href="/dashboard">Dashboard</Link>
          </div>
        </div>
        <div>
          <p className="mini-label">Support</p>
          <div className="footer-links">
            <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>
            <span>{brand.supportPhone}</span>
            <span>{brand.address}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function DoctorGrid({ doctors }) {
  return (
    <div className="doctor-grid">
      {doctors.map((doctor) => (
        <article className="doctor-card" key={doctor.name}>
          <div className={`avatar avatar-${doctor.accent}`}>
            {doctor.name
              .split(" ")
              .map((piece) => piece[0])
              .join("")}
          </div>
          <h3>{doctor.name}</h3>
          <p>{doctor.specialty}</p>
        </article>
      ))}
    </div>
  );
}

export function TestimonialGrid({ testimonials }) {
  return (
    <div className="testimonial-grid">
      {testimonials.map((testimonial) => (
        <article
          className={`testimonial-card testimonial-${testimonial.accent}`}
          key={`${testimonial.name}-${testimonial.quote}`}
        >
          <p>"{testimonial.quote}"</p>
          <strong>{testimonial.name}</strong>
        </article>
      ))}
    </div>
  );
}
