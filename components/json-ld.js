function serialize(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: serialize(data)
      }}
      type="application/ld+json"
    />
  );
}
