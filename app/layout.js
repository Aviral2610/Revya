import "./globals.css";

export const metadata = {
  title: "MediVia Demo",
  description:
    "A Next.js reconstruction of a public Medvi-style telehealth funnel with placeholder branding and mocked portal behavior."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
