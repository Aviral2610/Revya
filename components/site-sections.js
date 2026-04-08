import Image from "next/image";
import Link from "next/link";

import { getImageDimensions } from "@/lib/image-assets";
import { brand } from "@/lib/site-data";

const NAV_LINKS = [
  { href: "/quiz", label: "Assessment" },
  { href: "/weight-loss", label: "Weight-Loss Care" },
  { href: "/welcome", label: "Getting Started" },
  { href: "/login", label: "Patient Login" },
  { href: "/dashboard", label: "Portal Preview" }
];

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function ActionLink({
  href,
  children,
  variant = "primary",
  className = "",
  prefetch,
  ...props
}) {
  const classes = classNames("button", variant, className);

  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} prefetch={prefetch} {...props}>
      {children}
    </Link>
  );
}

export function TextLink({ href, children, className = "", prefetch, ...props }) {
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a className={classNames("text-link", className)} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classNames("text-link", className)} href={href} prefetch={prefetch} {...props}>
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

export function ArtPanel({
  kind,
  label,
  detail = "",
  imageSrc = null,
  imageAlt = null,
  imagePosition = "center",
  priority = false,
  sizes = "(max-width: 760px) 100vw, 50vw"
}) {
  const imageDimensions = imageSrc ? getImageDimensions(imageSrc) : null;

  return (
    <div className={classNames("art-card", `art-${kind}`, imageSrc && "art-card-has-image")}>
      {imageSrc && (
        <div className="art-image-wrap">
          <Image
            alt={imageAlt || label || "Illustration"}
            className="art-image"
            height={imageDimensions.height}
            loading={priority ? undefined : "lazy"}
            priority={priority}
            sizes={sizes}
            src={imageSrc}
            style={{ objectPosition: imagePosition }}
            width={imageDimensions.width}
          />
        </div>
      )}
      <div className="art-noise" />
      <div className="art-copy">
        <span className="art-chip">{label}</span>
        {detail ? <p>{detail}</p> : null}
      </div>
      {!imageSrc && (
        <div className="art-stack">
          <div className="art-shape art-a" />
          <div className="art-shape art-b" />
          <div className="art-shape art-c" />
        </div>
      )}
    </div>
  );
}

export function MockBanner({ title = "Quick note", copy, className = "" }) {
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
        <nav aria-label="Primary" className="header-nav">
          {NAV_LINKS.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <ActionLink href="/login" variant={light ? "ghost-light" : "ghost"}>
            Patient Login
          </ActionLink>
          <ActionLink href="/quiz" variant={light ? "primary-light" : "primary"}>
            Start Assessment
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
            Revya brings assessment, clinician review, discreet delivery, refill check-ins, and
            portal-based follow-up together in one connected weight-loss care experience.
          </p>
        </div>
        <div>
          <p className="mini-label">Explore</p>
          <nav aria-label="Footer routes" className="footer-links">
            <Link href="/">Revya home</Link>
            <Link href="/quiz">Start assessment</Link>
            <Link href="/weight-loss">Programs and pricing</Link>
            <Link href="/welcome">Getting started guide</Link>
            <Link href="/login">Patient login</Link>
            <Link href="/dashboard">Portal preview</Link>
          </nav>
        </div>
        <div>
          <p className="mini-label">Support</p>
          <div className="footer-links">
            <a href={`mailto:${brand.supportEmail}`}>{brand.supportEmail}</a>
            <span>{brand.supportPhone}</span>
            <span>{brand.address}</span>
          </div>
        </div>
        <div>
          <p className="mini-label">Legal</p>
          <nav aria-label="Footer legal" className="footer-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
          </nav>
          <div className="footer-legit">
            <a
              href="https://www.legitscript.com/websites/?checker_keywords=revya.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify Approval for revya.com
            </a>
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
