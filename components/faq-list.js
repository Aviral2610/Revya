"use client";

import { useState } from "react";

export function FaqList({ items, initialIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <div className="faq-list">
      {items.map((faq, index) => {
        const isOpen = activeIndex === index;

        return (
          <article className={`faq-item ${isOpen ? "faq-open" : ""}`} key={faq.question}>
            <button onClick={() => setActiveIndex(index)} type="button">
              <span>{faq.question}</span>
              <span>{isOpen ? "-" : "+"}</span>
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
