"use client";

import { useState } from "react";

export function FaqList({ items, initialIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <div className="faq-list">
      {items.map((faq, index) => {
        const isOpen = activeIndex === index;
        const panelId = `faq-panel-${index}`;
        const triggerId = `faq-trigger-${index}`;

        return (
          <article className={`faq-item ${isOpen ? "faq-open" : ""}`} key={faq.question}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              id={triggerId}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span>{faq.question}</span>
              <span>{isOpen ? "-" : "+"}</span>
            </button>
            <div aria-labelledby={triggerId} className="faq-answer" id={panelId} role="region">
              <p>{faq.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
