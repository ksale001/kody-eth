import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * kody.eth — UI/UX preview (single-file React component)
 * - Tailwind classes (no imports needed)
 * - ASCII background layers sourced from merge.txt (embedded as base64)
 * - Sticky header + scroll-spy
 * - Keyboard shortcuts: A/W/R/T/P/C, ?, /, Esc, Enter
 * - Command palette + help overlay + copy-to-clipboard toast
 *
 * Why base64?
 * Your merge.txt includes lots of backslashes and other characters that are painful
 * to embed safely in JS string literals. Base64 keeps the source parseable.
 */

const SECTIONS = [
  { key: "a", id: "about", label: "About" },
  { key: "w", id: "work", label: "Work" },
  { key: "r", id: "writing", label: "Writing" },
  { key: "t", id: "talks", label: "Talks" },
  { key: "p", id: "projects", label: "Projects" },
  { key: "c", id: "contact", label: "Contact" },
];

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const onChange = () => setReduced(!!mq.matches);
    onChange();

    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

// ---------------------------
// ASCII background (merge.txt)
// ---------------------------

// merge.txt embedded as base64 (UTF-8)
const MERGE_TXT_B64 =
  "ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArPyQkJCQkJD8qOyAgICAgICAgICAgICAgICAgICAgICAgICA7Kj8kJCQkPyo7ICAgICAgICAgICAgICAgICAgICAgICAgICshJCQkJCQkPyE7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyMkPz8/JEAjIyQrICAgICAgICAgICAgICAgICAgICAgICEmI0AkPz8kJiNAKiAgICAgICAgICAgICAgICAgICAgICArQCMmJD8/Pz8kIyMrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM7ICAgICArQCMmOyAgICAgICAgICAgICAgICAgICAgISMjKiAgICAgOyQjIyogICAgICAgICAgICAgICAgICAgICBAIyQgICAgICA7JiMrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM7ICAgICAgISMjKyAgICAgICAgICAgICAgICAgICA7IyMkICAgICAgICBAI0AgICAgICAgICAgICAgICAgICAgICAkIyYqICAgICAgKys7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM7ICAgICA7QCMmOyAgICAgICAgICAgICAgICAgICAqIyMqICAgICAgICA/IyM7ICAgICAgICAgICAgICAgICAgICA7JCMjJiQhKzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM/ISEhPyQjIyQrICAgICAgICAgICAgICAgICAgICAhIyMrICAgICAgICAhIyMrICAgICAgICAgICAgICAgICAgICAgIDshJEAjIyYkITsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyNAQEBAJCQhKyAgICAgICAgICAgICAgICAgICAgICAqIyMqICAgICAgICA/IyM7ICAgICAgICAgICAgICAgICAgICAgICAgICA7Kj9AIyYhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7IyMkICAgICAgICBAI0AgICAgICAgICAgICAgICAgICAgIDs/JDsgICAgICAgPyMjKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyMjISAgICAgOz8jIysgICAgICAgICAgICAgICAgICAgIDsjIysgICAgICA7JCMmOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyM7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICEmIyYkPz8kJiNAKiAgICAgICAgICAgICAgICAgICAgIDsmIyYkJD8/JCQmI0ArICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArPz87ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7Kj8kJCQkPysgICAgICAgICAgICAgICAgICAgICAgICA7KyE/JCQkJCQhKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7Ozs7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsrIT8/JCQkPyEqKzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7Kj8kQCYmJiYmQEAkISo7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICo/QCMjIyMjIyMjIyMjIyYkPysgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7IUAjIyMjIyMjIyMjIyMjIyMmJCE7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDshQCMjIyMmQCQ/Pz8/JCRAIyMjIyNAISAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOz8mIyMjIyQ/KisrOysrKiE/QCMjIyMmPzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKkAjIyMmJCo7ICAgICAgICAgOyokJiMjI0AqICAgICAgICAgICAgICAgICAgICAgICAgICAqJiMjI0AhOyAgICAgICAgICAgIDshQCMjIyYhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhIyMjJiE7ICAgICAgICAgICAgICAgOz8mIyMjPyAgICAgICAgICAgICAgICAgICAgICAgICojIyMjISAgICAgICAgICAgICAgICAgIComIyMjPyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICEjIyNAKyAgICAgICAgICAgICAgICAgICA7JCMjIyQgICAgICAgICAgICAgICAgICAgICAgKyMjIyYrICAgICAgICAgICAgICAgICAgICA7JCMjIz8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyMjIyY7ICAgICAgICAgICAgICAgICAgICAgICQjIyM/ICAgOzsrKiE/PyQkJCQkJCQkPz8hJCMjIyogICAgICAgICAgICAgICAgICAgICAgO0AjIyMqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgISMjIyEgICAgICAgICAgICAgICAgICAgICAgICAmIyMjPyRAJiMjIyMjIyMjIyMjIyMjIyMjIyMjI0AkPyErOyAgICAgICAgICAgICAgICAgICsjIyMkICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCMjIysgICAgICAgICAgICAgICAgICAgICA7Kj8mIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyYkITsgICAgICAgICAgICAgICAmIyMmOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCMjIysgICAgICAgICAgICAgICAgICA7ISQmIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyYkITsgICAgICAgICAgICAmIyMjOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiMjIz8gICAgICAgICAgICAgICA7ISQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMkKjsgICAgICAgICsjIyNAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgO0AjIyMrICAgICAgICAgICAgKyQmIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyY/OyAgICAgICQjIyMhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsjIyMmKyAgICAgICAgICokIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyQrICA7JCMjIyQ7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqJiMjIz87ICAgICArJCMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjPypAIyMjJDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyQjIyMmPysgOyQjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyM/OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqQCMjIyNAJiMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICskJiMjIyMjIyMjIyMjIyMjIyMjI0A/ISorKyohJCYjIyMjIyMjIyMjIyMjIyMjIyMjJiQ/KisrKiE/JCMjIyMjIyMjIyMjIyMjIyYqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCMjIyMjIyMjIyMjIyMjIyY/KyAgICAgICAgIDshQCMjIyMjIyMjIyMjIyMjI0AhOyAgICAgICAgIDshQCMjIyMjIyMjIyMjIyMjISAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDskIyMjIyMjIyMjIyMjIyMmITsgICAgICAgICAgICAgIComIyMjIyMjIyMjIyMmITsgICAgICAgICAgICAgICEmIyMjIyMjIyMjIyMjIyEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQjIyMjIyMjIyMjIyMjI0ArICAgICtAKiAgICAgICAgICA7JCMjIyMjIyMjIyQ7ICAgICAgICAgICtAKiAgICA7JCMjIyMjIyMjIyMjIyMhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyMjIyMjIyMjIyMjIyMjJDsgICAgKiMjIyogICAgICAgICAgICQjIyMjIyMjJDsgICAgICAgICAgKyYjIyEgICAgID8jIyMjIyMjIyMjIyMjKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIyMjIyMjIyMjIyMjIyMkICAgICAhIyMjIyMhICAgICAgICAgICAkIyMjIyNAOyAgICAgICAgICAqIyMjIyM/ICAgICA/IyMjIyMjIyMjIyMjQDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAIyMjIyMjIyMjIyMjI0A7ICAgICEjIyMjIyMjISAgICAgICAgICA7JiMjIyMrICAgICAgICAgICojIyMjIyMjPyAgICAgJCMjIyMjIyMjIyMjIz8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsjIyMjIyMjIyMjIyMjIysgICAgPyMjIyMjIyMjIz8gICAgICAgICAgJCMjIyQgICAgICAgICAgISMjIyMjIyMjIyQgICAgKyMjIyMjIyMjIyMjIyY7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQjIyMjIyMjIyMjIyMjJCAgIDskIyMjIyMjIyMjIyM/ICAgICAgICAgISMjIz8gICAgICAgICAhIyMjIyMjIyMjIyMkOyAgICQjIyMjIyMjIyMjIyMhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEAjIyMjIyMjIyMjIyMjKiAgICEjIyMjIyMjIyMjIyMjISAgICAgICAgPyMjIyQgICAgICAgICojIyMjIyMjIyMjIyMjPyAgICsjIyMjIyMjIyMjIyNAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyYjIyMjIyMjIyMjIyMmOyAgICArP0AjIyMjIyMjJiQrOyAgICAgICA7JiMjIyM7ICAgICAgIDsrP0AjIyMjIyMjJj8rOyAgICBAIyMjIyMjIyMjIyMjOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyMjIyMjIyMjIyMjIyNAICAgICAgICArJCYjJiQqOyAgICAgICAgIDskIyMjIyNAOyAgICAgICAgICArJCYjJiQqOyAgICAgICAkIyMjIyMjIyMjIyMjKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyMjIyMjIyMjIyMjIyMkICAgICorICAgIDsrOyAgIDsqOyAgICAgKiYjIyMjIyMjJiEgICAgIDsqOyAgIDsrOyAgICArKjsgICAkIyMjIyMjIyMjIyMjKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYjIyMjIyMjIyMjIyNAICAgIDskQCE7ICAgICArJEAhICAgIDs/IyMjIyMjIyMjIyMkOyAgICAqQCQqICAgICA7KiRAKyAgICAkIyMjIyMjIyMjIyMjKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQjIyMjIyMjIyMjIyMmOyAgICA7JCMmJCorIUAjIyogICAgK0AjIyMjIyMjIyMjIyMjQCsgICAgKyYjQD8rKyQmI0A7ICAgICBAIyMjIyMjIyMjIyMjKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICojIyMjIyMjIyMjIyMjKiAgICAgICQjIyMjIyMmKyAgICAhIyMjIyMjIyMjIyMjIyMjIyM/ICAgICtAIyMjIyMjJDsgICAgICsjIyMjIyMjIyMjIyMjOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAIyMjIyMjIyMjIyMjJCAgICAgICA/IyMjI0ArICAgOyQjIyMjIyMjIyMjIyMjIyMjIyMjJDsgICA7QCMjIyMkICAgICAgICQjIyMjIyMjIyMjIyNAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIyMjIyMjIyMjIyMjIyogICAgICAgISMjQDsgICArQCMjIyMjIyMjIyMjIyMjIyMjIyMjIyYqICAgOyQjIz8gICAgICAgKyMjIyMjIyMjIyMjIyMhICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7JiMjIyMjIyMjIyMjIyM/ICAgICAgICojIyMjIyMjIyMjIyNAOyAgICAgIC8jIyMjIyMjIyMjIyNBIQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICA7OzsgICAgICAgICAgIDs7KyorKzsgICA7OzsrKzs7OysrOzs7ICA7KysrOzs7KysrKzsgOzs7ICAgICAgICAgOzsgICAgICA7OzsgICAgICA7OzsrKzs7OysrKzs7ICAgOzs7KysrKysrKzsgICA7KysrKys7ICAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgIDtAIyYrICAgICAgICArJCYmQCRAJiM/ICBAI0BAQCYjJkBAQCMkIDskQEBAQCMmQEBAQCEgISNAICAgICAgICAhIyQgICAgICsmIyY7ICAgICAhIyZAQEAjJkBAQCYmOyAgISMmQEBAQEBAQCogICAkIyZAQEAmJiQrICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICQjPyNAOyAgICAgID8jJiE7ICAgKiMkICAmJjs7OyQjITs7KiMkICAgOzs7KiNAOzs7OyAgICQjPyAgICAgICsjJjsgICAgO0AjPyMkICAgICAhIyE7OyojQDs7O0AjOyAgPyMkOzs7Ozs7OyAgICBAIyogICA7ISYjPyAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgKiMkID8jJCAgICAgKiMmOyAgICAgOys7ICArKyAgICQjISAgOys7ICAgICAgKiMkICAgICAgIDsmIysgICAgICQjKiAgICAgPyM/ICQjISAgICA7KzsgICsjQCAgICsrICAgPyMkICAgICAgICAgICAkIyogICAgIDsmIyogICAgICAgICAKCQkgICAgICAgICAgICAgICA7JiY7ICBAIyogICAgJCMkICAgICAgICAgICAgICAgICQjISAgICAgICAgICAgKiMkICAgICAgICAhI0A7ICAgISMkICAgICArI0AgIDsmIzsgICAgICAgICsjQCAgICAgICAgPyNAPz8/Pz8/ISAgICAkIyogICAgICAkIyQgICAgICAgICAKCQkgICAgICAgICAgICAgICAkIyE7OzsqIyY7ICAgJCM/ICAgICAgICAgICAgICAgICQjISAgICAgICAgICAgKiMkICAgICAgICAgJCM/ICA7JiY7ICAgIDtAIyo7OzshIyQgICAgICAgICsjQCAgICAgICAgPyNAPz8/Pz8/ISAgICAkIyogICAgICAkIyQgICAgICAgICAKCQkgICAgICAgICAgICAgICEjI0BAQEBAJiMkICAgISNAOyAgICAgICAgICAgICAgICQjISAgICAgICAgICAgKiMkICAgICAgICAgOyYjKyAkIyogICAgID8jJkBAQEBAIyMhICAgICAgICsjQCAgICAgICAgPyMkICAgICAgICAgICAkIyogICAgICBAIyogICAgICAgICAKCQkgICAgICAgICAgICAgOyYmKzs7Ozs7O0AjKiAgOyQjJCsgICAgIEAkICAgICAgICQjISAgICAgICAgICAgKiMkICAgICAgICAgICojQCEjPyAgICAgKiNAOzs7Ozs7KyMjKyAgICAgICsjQCAgICAgICAgPyMkICAgICAgICAgICAkIyogICAgKyQjJCAgICAgICAgICAKCQkgICAgICAgICAgICAgJCMqICAgICAgICsjJjsgIDs/JiNAJCQkJCMkICAgICskJCYjQCQkOyAgIDskJCQkQCMjJCQkJCogICAgICAkIyNAOyAgICA7JiMrICAgICAgICEjQDsgICAkJEAjIyQkKiAgICAgPyMmJCQkJCQkJCEgICBAI0AkJCRAJkAhICAgICAgICAgICAKCQkgICAgICAgICAgICA7KiogICAgICAgICArKjsgICAgICsqIT8hKis7ICAgIDsqKioqKioqICAgIDsqKioqKioqKioqKisgICAgICA7Kio7ICAgICA7KisgICAgICAgICAqKjsgICAqKioqKioqKyAgICAgOyoqKioqKioqKisgICArKiEhISEqOyAgICAgICAgICAgICAKCQkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAJICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCmAKCgoKCgoKCgoKCgogICAgICAgICAgICAgICAgICAgICAuLi4uOjoiIiIiIiIiIiIiIiIiIiIiIiIiIiIuICAgICAgICAgIC4KICAgICAuICAuICAgICAgICAgIC4qICMjIyMgOyIuICAgIH5+LiAgOjo6OjogICAgIDoKICAgICAgICAgICAgICAgICAuNCMjIyMjOl4uJyAgYC4uIDo6Ojo6OiAgICBgLiAuICAgYCAgICAgICAgICAgbwogICAgICAgICAgICAgICAuNCMjIyMjOjonIDogICAgICAgICA6Ojo6Li4nICAuLiAgLiAgIC4KICAgICAgICAgICAgICAuZCMjIyM6OiAgLiAgYC4gLiAgICA6ICAgICAgIDo6IC4KICAuICAgIG8gICAgIC4jIyMjOjouLi46ICAgICAgICAuICBgLiAgICAuICAuICAuLi4uCiAgICAgICAgICAgIC5kIyM6Oi5kJCQgIGAuICAgICAgICAgICAuICAgICAgIDo6JCRiLiAuICAuICAgICAgOiAuCiAgICAgICAgICAuZCMjIzo6ZCQkJCc6Oi4gYCAuICAgICAuICAgIC4gICAgICA6JCQkJAogICAgICAgIC5kIyMjIzo6OiQkJCQjOjogLi4uLi4uLiAgICAgICAgICAgICAgIC5gJCRiICA6ICAuCiAgICAgICAgZCMjIyM6Oi4uIGBkIyM6LicgICAgICAgICAgICAgICAgICAgICAgOiAnJCc6OiAuCiAgbyAgICBkIyMjIzo6JyAuIGQkIzo6ICAgICAgLiwgIC4gICAgICAgICAgICAgIC4gIDouICAgICAuICAgICBvCiAgICAgLmQjIyM6Oi4gOyAgJCQjIzo6IC4uLi4nICAgICAgICAgICAgIC4gICAgICA7IC4gLgogLiAuZCMjIyM6OicgOi4gLnEkJCMjIzo6ICAgICAgICAgICAgICAgICAgICAgICAgOiAgICAgICAgIC4gICAgIDoKICAgJCMjIzo6LiBfLl4uICBgcSQkJCQjIzo6ICAgIC4uPiAgLiAgIC4uICAuICAgOicgIC4KICAkIyMjOjouICwtLSAgLi46LmAuLi4uOjo6Oi4uJyAuICAgICAuICAgIC4uIC4nICAgICAgOjo6IC4nIDoKICAkIyM6OiA6YC4gLi4uLi4nJycnJyAgYGBgLi4uLi4gIC4gIC4uLi4uLicnJ2BgYGAuLi4uLi4gOi4KICAkIyM6ICAuLi4nIC4uLi4uLi4nJycnJycnJyAgICAiIiIiIiAgIGBgYGBgYGBgYC4uLi4uICBgLiAuICAuCiBkIyM6IC4nIC4uLicgLi4uLi4uLiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi4uLi4gIGAuICA7ICAgLgogJCM6Oi5gLiAgICAuJyAgICAuXi4gICAgICAgIDogICAgIC4gJyAgICAgICAuLi4gICAgYC4uICAgOiAgIC4KKCMjIyAgYC4iIiIiICAuLiAuICA6Oi4uLiAgIC4gICA6LiAgICAgICAgICAgICAgICAgLiAgICIiJycgICA6CiBgQCMkJCQkJCQkJCQkJCQkJCQkJCQkJCQkIyMjIyM6Ojo6OjokJCAgOiAgOiAuIC4gICAgIC4KICAgICAiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIicnICcgICcKICBvICAuICAgbyAgICAgIC4gICAgIG8gICAgLiAgbyAgICAgIC4gICBvICAgICAgICAgbyAgICAgICAuIDogIC4KIC4gOiAgIG8gIC4gIG8gICA6IG8gIC4gICBvICAgLiAgIG8gICAgICAuICAgbyAuICA6IC4gbyAuICAgbyAuIC4KICAgIG8gICAgICAgIC4gICAgICAgbyAgICAgICBvICAgICAgICBvICAgICAgOiAgICAuICAgICAgIDogICAgbwogJCQkYiAgJCQgLmQkYi4gJCQkYiAgICQkJGIgICQkIC5kJGIuICQkJGIgICAkJCRiICAkJCAuZCRiLiAkJCRiCiAkIGAkYiAkJCAkJCAkJCAkIGAkYiAgJCBgJGIgJCQgJCQgJCQgJCBgJGIgICQgYCRiICQkICQkICQkICQgYCRiCiAkJCQkJyAkJCAkJCAkJCAkJCQkJyAgJCQkJCcgJCQgJCQgJCQgJCQkJCcgICQkJCQnICQkICQkICQkICQkJCQnCiAkICckYiAkJCAkJCAkJCAkICckYiAgJCAnJGIgJCQgJCQgJCQgJCAnJGIgICQgJyRiICQkICQkICQkICQgJyRiCiAkJCQkJyAkJCRgJCQkJyAkJCQkJyAgJCQkJCcgJCQkYCQkJCcgJCQkJCcgICQkJCQnICQkJGAkJCQnICQkJCQnCgoKCgoKCgoKCgoKCgoKCgoKCgoKCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZTilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZcKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRICAgIFRPIEZVTFUsIE1PQVIgQkxPQlMgVE8gRVRIRVJFVU0gICAg4pWRCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZEgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZEKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIOKVkSAgICAgICAgICBJSUkgREVDRU1CRVIgTU1YWFYgICAgICAgICAgIOKVkQogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg4pWRCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDilZrilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZ0KICAgICAgICAgICAgCiAgICAgICAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICAgICAgICAgICAgICAgfHx8fCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8fHwKICAgICAgICAgICAgICAgIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18CiAgICAgICAgICAgICAgICB8X19fLS0tLS1fX18tLS0tLV9fXy0tLS0tX19fLS0tLS1fX18tLS0tLV9fXy0tLS0tX19fLS0tLS1fX18tLS0tLV9fXy0tLS0tX19ffAogICAgICAgICAgICAgICAgLyBfIFw9PT0vIF8gXCAgIC8gXyBcPT09LyBfIFwgICAgICAgICAgICAgICAgICAgLyBfIFw9PT0vIF8gXCAgIC8gXyBcPT09LyBfIFwKICAgICAgICAgICAgICAgKCAoLlwgb09vIC8uKSApICggKC5cIG9PbyAvLikgKSAgICAgICAgICAgICAgICAgKCAoLlwgb09vIC8uKSApICggKC5cIG9PbyAvLikgKQogICAgICAgICAgICAgICAgXF9fLz09PT09XF9fLyAgIFxfXy89PT09PVxfXy8gICAgICAgICAgICAgICAgICAgXF9fLz09PT09XF9fLyAgIFxfXy89PT09PVxfXy8KICAgICAgICAgICAgICAgICAgIHx8fHx8fHwgICAgICAgICB8fHx8fHx8ICAgICAgICAgICAgICAgICAgICAgICAgIHx8fHx8fHwgICAgICAgICB8fHx8fHx8CiAgICAgICAgICAgICAgICAgICB8fHx8fHx8ICAgICAgICAgfHx8fHx8fCAgICAgXFwvKSwgICAgICAgICAgICAgICB8fHx8fHx8ICAgICAgICAgfHx8fHx8fAogICAgICAgICAgICAgICAgICAgfHx8fHx8fCAgICAgICAgIHx8fHx8fHwgICAgLCcuJyAvLCAgICAgICAgICAgICAgfHx8fHx8fCAgICAgICAgIHx8fHx8fHwKICAgICAgICAgICAgICAgICAgIHx8fHx8fHwgICAgICAgICB8fHx8fHx8ICAgKF8pLSAvIC8sICAgICAgICAgICAgIHx8fHx8fHwgICAgICAgICB8fHx8fHx8CiAgICAgICAgICAgICAgICAgICB8fHx8fHx8ICAgICAgICAgfHx8fHx8fCAgICAgIC9cXy8gfF9fLi4tLSwgICogICB8fHx8fHx8ICAgICAgICAgfHx8fHx8fAogICAgICAgICAgICAgICAgICAgfHx8fHx8fCAgICAgICAgIHx8fHx8fHwgICAgIChcX19fL1wgXCBcIC8gKS4nICAgfHx8fHx8fCAgICAgICAgIHx8fHx8fHwKICAgICAgICAgICAgICAgICAgIHx8fHx8fHwgICAgICAgICB8fHx8fHx8ICAgICAgXF9fX18vIC8gKF8gLy8gICAgIHx8fHx8fHwgICAgICAgICB8fHx8fHx8CiAgICAgICAgICAgICAgICAgICB8fHx8fHx8ICAgICAgICAgfHx8fHx8fCAgICAgICBcXF8gLCctLSdcXyggICAgICB8fHx8fHx8ICAgICAgICAgfHx8fHx8fAogICAgICAgICAgICAgICAgICAgKG9Pb09vKSAgICAgICAgIChvT29PbykgICAgICAgKV8pXy8gKV8vIClfKSAgICAgKG9Pb09vKSAgICAgICAgIChvT29PbykKICAgICAgICAgICAgICAgICAgIEolJSUlJUwgICAgICAgICBKJSUlJSVMICAgICAgKF8oXy4nKF8uJyhfLicgICAgIEolJSUlJUwgICAgICAgICBKJSUlJSVMCiAgICAgICAgICAgICAgICAgIFpaWlpaWlpaWiAgICAgICBaWlpaWlpaWlogICAgICAgICAgICAgICAgICAgICAgIFpaWlpaWlpaWiAgICAgICBaWlpaWlpaWloKICAgICAgICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQogICAgICAgICAgICAgICAgfF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX198CiAgICAgICAgICAgICAgIHxfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX198CiAgICAgICAgICAgICAgfF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19ffAogICAgICAgICAgICAgfF9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX198CiAgICAgICAgICAgICIjCgoKCgoKCgoKCg==";

function decodeBase64Utf8(b64) {
  // Browser
  if (typeof atob === "function") {
    const bin = atob(b64);
    // Convert binary string -> Uint8Array -> UTF-8
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    try {
      return new TextDecoder("utf-8").decode(bytes);
    } catch {
      // Fallback (best-effort): may fail on some unicode, but avoids hard crash
      return bin;
    }
  }

  // Node-ish fallback
  // eslint-disable-next-line no-undef
  if (typeof Buffer !== "undefined") {
    // eslint-disable-next-line no-undef
    return Buffer.from(b64, "base64").toString("utf-8");
  }

  return "";
}

const MERGE_TXT = decodeBase64Utf8(MERGE_TXT_B64);

function splitMergeTxt(txt) {
  const i2 = txt.indexOf("....::");
  const i3 = txt.indexOf("╔════════");

  if (i2 === -1 || i3 === -1 || i3 <= i2) {
    // Could not find markers; return as single block
    return [txt.trimEnd()];
  }

  const b1 = txt.slice(0, i2).trimEnd();
  const b2 = txt.slice(i2, i3).trimEnd();
  const b3 = txt.slice(i3).trimEnd();
  return [b1, b2, b3];
}

const ASCII_BLOCKS = splitMergeTxt(MERGE_TXT);

// Choose which blocks to show as layers.
// merge.txt appears to contain 3 blocks. Default:
// - Waves texture: block 2 (index 1)
// - Main art: block 1 (index 0)
const BG_CONFIG = { wavesIndex: 1, mainIndex: 0 };
const BG_WAVES = ((ASCII_BLOCKS[BG_CONFIG.wavesIndex] || ASCII_BLOCKS[0] || "") + "\n\n" + (ASCII_BLOCKS[BG_CONFIG.wavesIndex] || ASCII_BLOCKS[0] || "")).trimEnd();
const BG_MAIN = (ASCII_BLOCKS[BG_CONFIG.mainIndex] || ASCII_BLOCKS[0] || "").trimEnd();

// ---------------------------
// Minimal self-tests (dev)
// ---------------------------
let __SELF_TEST_RAN__ = false;
function runSelfTestsOnce() {
  if (__SELF_TEST_RAN__) return;
  __SELF_TEST_RAN__ = true;

  try {
    // Test 1: section ids unique
    const ids = SECTIONS.map((s) => s.id);
    const uniqueIds = new Set(ids);
    if (uniqueIds.size !== ids.length) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] Duplicate section ids detected", ids);
    }

    // Test 2: section keys unique
    const keys = SECTIONS.map((s) => s.key);
    const uniqueKeys = new Set(keys);
    if (uniqueKeys.size !== keys.length) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] Duplicate shortcut keys detected", keys);
    }

    // Test 3: section keys are single characters
    const bad = SECTIONS.filter((s) => typeof s.key !== "string" || s.key.length !== 1);
    if (bad.length) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] Non-1char shortcut keys", bad);
    }

    // Test 4: merge decoding produced content
    if (typeof MERGE_TXT !== "string" || MERGE_TXT.replace(/\s/g, "").length < 50) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] merge.txt decode looks empty");
    }

    // Test 5: split produced at least 1 block; prefer 3
    if (!Array.isArray(ASCII_BLOCKS) || ASCII_BLOCKS.length < 1) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] ASCII_BLOCKS missing");
    }
    if (ASCII_BLOCKS.length < 3) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] Expected ~3 blocks; got", ASCII_BLOCKS.length);
    }

    // Test 6: background strings are non-empty
    if (typeof BG_MAIN !== "string" || BG_MAIN.replace(/\s/g, "").length < 50) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] BG_MAIN looks empty");
    }
    if (typeof BG_WAVES !== "string" || BG_WAVES.replace(/\s/g, "").length < 50) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] BG_WAVES looks empty");
    }

    // Test 7: sanity for command filtering behavior
    const sampleCommands = [
      { label: "Work", keywords: ["work", "w"] },
      { label: "GitHub", keywords: ["open", "github", "g"] },
      { label: "Copy ENS", keywords: ["copy", "ens"] },
    ];
    const filter = (q) => {
      const qq = (q || "").trim().toLowerCase();
      if (!qq) return sampleCommands;
      return sampleCommands
        .map((c) => ({
          c,
          score: c.keywords.some((k) => k.includes(qq)) ? 2 : c.label.toLowerCase().includes(qq) ? 1 : 0,
        }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.c);
    };

    if (filter("").length !== sampleCommands.length) {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] Empty query should return all commands");
    }
    if (filter("github").length !== 1 || filter("github")[0].label !== "GitHub") {
      // eslint-disable-next-line no-console
      console.warn("[kody.eth self-test] Filtering for github failed");
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("[kody.eth self-test] threw", e);
  }
}

export default function KodyEthPreview() {
  const reducedMotion = usePrefersReducedMotion();

  // Run self-tests once (best-effort)
  useEffect(() => {
    runSelfTestsOnce();
  }, []);

  const refs = useRef({
    about: null,
    work: null,
    writing: null,
    talks: null,
    projects: null,
    contact: null,
  });

  const toastTimerRef = useRef(null);

  const [sticky, setSticky] = useState(false);
  const [active, setActive] = useState("about");
  const [helpOpen, setHelpOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [workExpandFirst, setWorkExpandFirst] = useState(false);

  // placeholders; update later
  const email = "kody@kody.eth";
  const ens = "kody.eth";

  function showToast(msg) {
    setToast(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 1400);
  }

  async function copy(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`copied ${label}`);
    } catch {
      showToast("copy failed");
    }
  }

  function scrollTo(id) {
    const el = refs.current?.[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const commands = useMemo(() => {
    const go = SECTIONS.map((s) => ({
      group: "Go to",
      label: s.label,
      hint: s.key.toUpperCase(),
      action: () => {
        setPaletteOpen(false);
        setHelpOpen(false);
        scrollTo(s.id);
      },
      keywords: ["go", "goto", s.label.toLowerCase(), s.id, s.key],
    }));

    const open = [
      {
        group: "Open",
        label: "GitHub",
        hint: "g",
        action: () => window.open("https://github.com/", "_blank"),
        keywords: ["open", "github", "gh", "g"],
      },
      {
        group: "Open",
        label: "X",
        hint: "x",
        action: () => window.open("https://x.com/", "_blank"),
        keywords: ["open", "x", "twitter"],
      },
      {
        group: "Open",
        label: "Farcaster",
        hint: "f",
        action: () => window.open("https://warpcast.com/", "_blank"),
        keywords: ["open", "farcaster", "warpcast", "f"],
      },
      {
        group: "Open",
        label: "LinkedIn",
        hint: "l",
        action: () => window.open("https://linkedin.com/", "_blank"),
        keywords: ["open", "linkedin", "li", "l"],
      },
    ];

    const cp = [
      {
        group: "Copy",
        label: "Email",
        hint: "e",
        action: () => copy(email, "email"),
        keywords: ["copy", "email", "mail", "e"],
      },
      {
        group: "Copy",
        label: "ENS",
        hint: "ens",
        action: () => copy(ens, "ens"),
        keywords: ["copy", "ens", "name"],
      },
    ];

    return [...go, ...open, ...cp];
  }, [email, ens]);

  const filteredCommands = useMemo(() => {
    const q = paletteQuery.trim().toLowerCase();
    if (!q) return commands;

    return commands
      .map((c) => ({
        c,
        score: c.keywords.some((k) => k.includes(q)) ? 2 : c.label.toLowerCase().includes(q) ? 1 : 0,
      }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.c);
  }, [commands, paletteQuery]);

  // Sticky header toggle
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy via IntersectionObserver
  useEffect(() => {
    const els = SECTIONS.map((s) => refs.current?.[s.id]).filter(Boolean);
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const top = visible[0]?.target;
        if (!top) return;

        const id = top.getAttribute?.("id");
        if (id) setActive(id);
      },
      {
        root: null,
        rootMargin: "-18% 0px -70% 0px",
        threshold: [0.05, 0.1, 0.2, 0.35],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (e) => {
      // avoid hijacking when typing
      const t = e.target;
      const tag = t?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || t?.isContentEditable;

      if (e.key === "Escape") {
        if (helpOpen) setHelpOpen(false);
        if (paletteOpen) setPaletteOpen(false);
        return;
      }

      if (typing) return;

      if (e.key === "?") {
        e.preventDefault();
        setHelpOpen((v) => !v);
        setPaletteOpen(false);
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        setPaletteOpen(true);
        setHelpOpen(false);
        setPaletteQuery("");
        return;
      }

      const k = e.key.toLowerCase();
      const sec = SECTIONS.find((s) => s.key === k);
      if (sec) {
        e.preventDefault();
        setHelpOpen(false);
        setPaletteOpen(false);
        scrollTo(sec.id);
        return;
      }

      if (e.key === "Enter") {
        // Enter as "Explore" only if no overlays are open
        if (!helpOpen && !paletteOpen) {
          e.preventDefault();
          scrollTo("about");
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [helpOpen, paletteOpen]);

  // Palette: enter to run top command
  useEffect(() => {
    if (!paletteOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        filteredCommands[0]?.action?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [paletteOpen, filteredCommands]);

  // When Proof-of-work CTA is used
  useEffect(() => {
    if (!workExpandFirst) return;
    const t = window.setTimeout(() => setWorkExpandFirst(false), 3000);
    return () => window.clearTimeout(t);
  }, [workExpandFirst]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-200/20">
      <style>{`
        @keyframes driftX { 0% { transform: translateX(0px);} 50% { transform: translateX(-18px);} 100% { transform: translateX(0px);} }
        @keyframes sway { 0% { transform: rotate(-0.25deg) translateY(0px);} 50% { transform: rotate(0.25deg) translateY(6px);} 100% { transform: rotate(-0.25deg) translateY(0px);} }
      `}</style>

      {/* ASCII background layers */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Waves */}
        <pre
          className={classNames(
            "absolute -left-20 top-8 whitespace-pre select-none font-mono text-[10px] leading-4",
            "text-zinc-200/10",
            reducedMotion ? "" : "animate-[driftX_22s_ease-in-out_infinite]"
          )}
        >
          {BG_WAVES}
        </pre>

        {/* Main art */}
        <pre
          className={classNames(
            "absolute left-1/2 top-28 -translate-x-1/2 whitespace-pre select-none font-mono text-[9px] leading-4",
            "text-zinc-200/12",
            reducedMotion ? "" : "animate-[sway_28s_ease-in-out_infinite]"
          )}
        >
          {BG_MAIN}
        </pre>

        {/* Soft vignette to protect readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/35 via-zinc-950/35 to-zinc-950/65" />
      </div>

      {/* Toast */}
      <div className="pointer-events-none fixed left-1/2 top-6 z-50 -translate-x-1/2">
        {toast ? (
          <div className="rounded-2xl border border-zinc-700/60 bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-100 shadow-lg backdrop-blur">
            {toast}
          </div>
        ) : null}
      </div>

      {/* Header */}
      <header
        className={classNames(
          "sticky top-0 z-40",
          sticky ? "backdrop-blur-md" : "",
          sticky ? "bg-zinc-950/55 border-b border-zinc-800/60" : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-5xl px-5 py-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-baseline gap-3">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="font-mono text-sm tracking-wide text-zinc-100 hover:underline"
              >
                kody.eth
              </a>
              <span className="hidden sm:inline text-xs text-zinc-300/80">• decentralization maxi • ethereum infra / staking / ops</span>
              <span className="sm:hidden text-xs text-zinc-300/80">decentralization maxi</span>
            </div>

            <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-200/90">
              {SECTIONS.map((s) => {
                const isActive = active === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(s.id);
                    }}
                    className={classNames(
                      "rounded-xl px-2 py-1 transition",
                      "hover:bg-zinc-900/40 hover:underline",
                      "focus:outline-none focus:ring-2 focus:ring-zinc-200/30",
                      isActive ? "bg-zinc-900/55 border border-zinc-800/60" : "border border-transparent"
                    )}
                    title={`Press ${s.key.toUpperCase()}`}
                  >
                    <span className="font-mono">[{s.key.toUpperCase()}]</span>{" "}
                    <span className={classNames(isActive ? "tracking-wide" : "")}>{isActive ? s.label.toUpperCase() : s.label}</span>
                  </a>
                );
              })}

              <button
                onClick={() => {
                  setHelpOpen(true);
                  setPaletteOpen(false);
                }}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-2 py-1 font-mono text-xs text-zinc-100 hover:bg-zinc-900/65 focus:outline-none focus:ring-2 focus:ring-zinc-200/30"
                title="Help (?)"
              >
                [?]
              </button>

              <button
                onClick={() => {
                  setPaletteOpen(true);
                  setHelpOpen(false);
                  setPaletteQuery("");
                }}
                className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-2 py-1 font-mono text-xs text-zinc-100 hover:bg-zinc-900/65 focus:outline-none focus:ring-2 focus:ring-zinc-200/30"
                title="Command palette (/)"
              >
                /
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-5 pb-24 pt-10">
        {/* Hero */}
        <section className="pt-8">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/55 p-5 shadow-xl backdrop-blur">
            <div className="flex flex-col gap-4">
              <pre className="whitespace-pre-wrap font-mono text-[13px] leading-5 text-zinc-100">
{`┌─ kody.eth ───────────────────────────────────────────────────────────────┐
│ $ title                                                                    │
│ > decentralization maxi (ethereum)                                          │
│                                                                            │
│ $ what_i_do                                                                 │
│ > product marketing + growth ops for ethereum infrastructure                │
│ > operator-first systems: docs, programs, GTM that ships                    │
│                                                                            │
│ $ focus                                                                     │
│ > distributed validators • operator ecosystems • public goods               │
│                                                                            │
│ [ enter ] explore  ▸   [ w ] proof of work  ▸   [ c ] contact  ▸            │
└────────────────────────────────────────────────────────────────────────────┘`}
              </pre>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => scrollTo("about")}
                  className="rounded-2xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-900/55 focus:outline-none focus:ring-2 focus:ring-zinc-200/30"
                >
                  Explore
                </button>

                <button
                  onClick={() => {
                    setWorkExpandFirst(true);
                    scrollTo("work");
                  }}
                  className="rounded-2xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-900/55 focus:outline-none focus:ring-2 focus:ring-zinc-200/30"
                >
                  Proof of work
                </button>

                <button
                  onClick={() => scrollTo("contact")}
                  className="rounded-2xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-900/55 focus:outline-none focus:ring-2 focus:ring-zinc-200/30"
                >
                  Contact
                </button>

                <div className="ml-auto flex items-center gap-2 text-xs text-zinc-300/80">
                  <span className="font-mono">ENS:</span>
                  <button
                    onClick={() => copy(ens, "ens")}
                    className="rounded-xl border border-zinc-800/60 bg-zinc-900/35 px-2 py-1 font-mono hover:bg-zinc-900/55 focus:outline-none focus:ring-2 focus:ring-zinc-200/30"
                  >
                    {ens}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-200/85">
            Operator-first marketing and systems-building for Ethereum infrastructure. I care about decentralization,
            credible neutrality, and making the staking/infrastructure layer actually usable.
          </p>
        </section>

        {/* Sections */}
        <SectionBlock id="about" title="About" kicker="mission" setRef={(el) => (refs.current.about = el)}>
          <div className="space-y-4">
            <p className="text-sm leading-6 text-zinc-200/85">
              I work at the intersection of product marketing, growth ops, and hands-on operator experience — mostly
              in Ethereum staking and infrastructure.
            </p>

            <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
              <pre className="whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-200/80">
{`/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\\
Ethereum alignment: decentralization • credible neutrality • operator UX
\\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/`}
              </pre>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <BulletCard title="I optimize for" items={["clarity over hype", "systems that ship", "operator empathy", "public goods energy"]} />
              <BulletCard title="Known for" items={["GTM + growth ops", "docs + flows", "community programs", "technical fluency"]} />
            </div>
          </div>
        </SectionBlock>

        <SectionBlock id="work" title="Work" kicker="proof" setRef={(el) => (refs.current.work = el)}>
          <div className="space-y-3">
            <ImpactCard
              open={workExpandFirst}
              title="Obol Network"
              subtitle="Product marketing + growth ops for staking infrastructure"
              impact={["launch systems", "operator programs", "ecosystem GTM", "docs + support loops"]}
              proofs={["Launch assets (placeholder)", "Docs (placeholder)", "Programs (placeholder)"]}
            />

            <ImpactCard
              title="Smoothly (Founder)"
              subtitle="Ethereum staking product — execution-layer reward pooling"
              impact={["protocol + ops", "community + grants", "docs + education"]}
              proofs={["Docs (placeholder)", "Writeups (placeholder)", "Talks (placeholder)"]}
            />
          </div>
        </SectionBlock>

        <SectionBlock id="writing" title="Writing" kicker="ideas" setRef={(el) => (refs.current.writing = el)}>
          <ListPanel
            items={[
              "2026 • Operator ecosystems: what scales and what breaks",
              "2025 • Why distributed validators matter for credible neutrality",
              "2025 • The operator UX gap: docs, flows, and support systems",
              "2024 • Building for solo stakers: incentives without tokens",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="talks" title="Talks" kicker="signal" setRef={(el) => (refs.current.talks = el)}>
          <ListPanel items={["Talk • Distributed validators and operator UX (placeholder)", "Panel • Ethereum alignment and decentralization (placeholder)"]} />
        </SectionBlock>

        <SectionBlock id="projects" title="Projects" kicker="threads" setRef={(el) => (refs.current.projects = el)}>
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
            <pre className="whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-200/80">
{`Choose a thread:
(1) Operator Experience
(2) Distributed Validators
(3) GTM Systems
(4) Open-source & Public Goods`}
            </pre>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <MiniCard title="Shipping" desc="Operator programs + launch systems (placeholder)" />
            <MiniCard title="Public goods" desc="Decentralization-first work (placeholder)" />
            <MiniCard title="Experiments" desc="Infra + tooling curiosity (placeholder)" />
            <MiniCard title="Talk tracks" desc="Narratives + workshops (placeholder)" />
          </div>
        </SectionBlock>

        <SectionBlock id="contact" title="Contact" kicker="reach" setRef={(el) => (refs.current.contact = el)}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
              <div className="text-sm text-zinc-200/85">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-300/80">email</span>
                  <button
                    onClick={() => copy(email, "email")}
                    className="rounded-xl border border-zinc-800/60 bg-zinc-900/35 px-2 py-1 font-mono text-xs hover:bg-zinc-900/55 focus:outline-none focus:ring-2 focus:ring-zinc-200/30"
                  >
                    copy
                  </button>
                </div>

                <div className="mt-2 font-mono text-sm">{email}</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a className="rounded-2xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 text-sm hover:bg-zinc-900/55" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
                  <a className="rounded-2xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 text-sm hover:bg-zinc-900/55" href="https://x.com/" target="_blank" rel="noreferrer">X</a>
                  <a className="rounded-2xl border border-zinc-800/70 bg-zinc-900/35 px-3 py-2 text-sm hover:bg-zinc-900/55" href="https://warpcast.com/" target="_blank" rel="noreferrer">Farcaster</a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
              <pre className="whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-200/80">
{`┌───────────────────────────────────────────────────────────────┐
│ If you're building Ethereum infra and want crisp GTM + systems  │
│ that actually ship, let's talk.                                │
│                                                               │
│ email: ${(email || "").padEnd(45, " ")}│
└───────────────────────────────────────────────────────────────┘`}
              </pre>
              <div className="mt-3 text-xs text-zinc-300/75">
                ENS: <span className="font-mono">{ens}</span> • Hosted on IPFS (later) • No tracking
              </div>
            </div>
          </div>
        </SectionBlock>

        <footer className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-zinc-800/60 pt-6 text-xs text-zinc-300/70 sm:flex-row">
          <div className="font-mono">{ens} • preview UI</div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => copy(ens, "ens")} className="rounded-xl border border-zinc-800/60 bg-zinc-900/35 px-2 py-1 font-mono hover:bg-zinc-900/55">copy ens</button>
            <button onClick={() => setPaletteOpen(true)} className="rounded-xl border border-zinc-800/60 bg-zinc-900/35 px-2 py-1 font-mono hover:bg-zinc-900/55">/</button>
            <button onClick={() => setHelpOpen(true)} className="rounded-xl border border-zinc-800/60 bg-zinc-900/35 px-2 py-1 font-mono hover:bg-zinc-900/55">?</button>
          </div>
        </footer>
      </main>

      {/* Help overlay */}
      {helpOpen ? (
        <Overlay onClose={() => setHelpOpen(false)}>
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/80 p-5 shadow-2xl backdrop-blur">
            <pre className="whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-100">
{`┌─ help ───────────────────────────────┐
│ Keyboard-first site. No tracking.     │
│                                      │
│ navigate:  A W R T P C                │
│ command:   /                          │
│ close:     esc                        │
└───────────────────────────────────────┘`}
            </pre>
            <div className="mt-3 text-xs text-zinc-300/80">
              Tip: press <span className="font-mono">/</span> to jump around or copy contact info.
            </div>
          </div>
        </Overlay>
      ) : null}

      {/* Command palette */}
      {paletteOpen ? (
        <Overlay
          onClose={() => setPaletteOpen(false)}
          onClickInside={(e) => {
            // prevent closing when interacting inside
            e.stopPropagation();
          }}
        >
          <div className="w-[min(680px,92vw)] rounded-3xl border border-zinc-800/70 bg-zinc-950/85 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="font-mono text-xs text-zinc-300/80">command</div>
              <button onClick={() => setPaletteOpen(false)} className="rounded-xl border border-zinc-800/60 bg-zinc-900/35 px-2 py-1 font-mono text-xs hover:bg-zinc-900/55">esc</button>
            </div>

            <input
              autoFocus
              value={paletteQuery}
              onChange={(e) => setPaletteQuery(e.target.value)}
              placeholder="type to filter… (enter runs top result)"
              className="mt-3 w-full rounded-2xl border border-zinc-800/70 bg-zinc-900/30 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-400/60 outline-none focus:ring-2 focus:ring-zinc-200/20"
            />

            <div className="mt-3 max-h-[48vh] overflow-auto rounded-2xl border border-zinc-800/60">
              {filteredCommands.length ? (
                <div className="divide-y divide-zinc-800/60">
                  {filteredCommands.map((cmd, i) => (
                    <button
                      key={`${cmd.group}-${cmd.label}-${i}`}
                      onClick={() => cmd.action()}
                      className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-zinc-900/40 focus:outline-none focus:ring-2 focus:ring-zinc-200/20"
                    >
                      <div>
                        <div className="text-xs text-zinc-400/80">{cmd.group}</div>
                        <div className="text-sm text-zinc-100">{cmd.label}</div>
                      </div>
                      {cmd.hint ? (
                        <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/30 px-2 py-1 font-mono text-xs text-zinc-200/90">{cmd.hint}</div>
                      ) : null}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-6 text-sm text-zinc-300/80">No matches.</div>
              )}
            </div>

            <div className="mt-3">
              <pre className="whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-200/70">
{`┌─ tips ─────────────────────────────────────────┐
│ try:  work • writing • open github • copy ens   │
└─────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </div>
        </Overlay>
      ) : null}
    </div>
  );
}

function Overlay({ children, onClose, onClickInside }) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 grid place-items-center bg-black/55 px-4 py-10">
      <div onClick={onClickInside} className="w-full grid place-items-center">
        {children}
      </div>
    </div>
  );
}

function SectionBlock({ id, title, kicker, children, setRef }) {
  return (
    <section id={id} ref={(el) => setRef(el)} className="scroll-mt-24 pt-14">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <div className="font-mono text-xs text-zinc-400/80">{kicker}</div>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-zinc-100">{title}</h2>
        </div>
        <div className="hidden sm:block font-mono text-xs text-zinc-400/70">#{id}</div>
      </div>
      {children}
    </section>
  );
}

function ImpactCard({ title, subtitle, impact, proofs, open }) {
  return (
    <details open={open} className="group rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
      <summary className="cursor-pointer list-none select-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-semibold text-zinc-100">{title}</div>
            <div className="mt-0.5 text-sm text-zinc-300/80">{subtitle}</div>
          </div>
          <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 px-2 py-1 font-mono text-xs text-zinc-200/80">
            <span className="group-open:hidden">expand</span>
            <span className="hidden group-open:inline">collapse</span>
          </div>
        </div>
      </summary>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-3">
          <div className="font-mono text-xs text-zinc-400/80">impact</div>
          <ul className="mt-2 space-y-1 text-sm text-zinc-200/85">{impact.map((x) => (<li key={x}>• {x}</li>))}</ul>
        </div>
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/40 p-3">
          <div className="font-mono text-xs text-zinc-400/80">proof</div>
          <ul className="mt-2 space-y-1 text-sm text-zinc-200/85">
            {proofs.map((x) => (<li key={x} className="underline decoration-zinc-500/50 underline-offset-4">{x}</li>))}
          </ul>
        </div>
      </div>
    </details>
  );
}

function BulletCard({ title, items }) {
  return (
    <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
      <div className="font-mono text-xs text-zinc-400/80">{title}</div>
      <ul className="mt-2 space-y-1 text-sm text-zinc-200/85">{items.map((x) => (<li key={x}>• {x}</li>))}</ul>
    </div>
  );
}

function ListPanel({ items }) {
  return (
    <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
      <div className="space-y-2">
        {items.map((x) => (
          <div key={x} className="rounded-2xl border border-zinc-800/60 bg-zinc-950/35 px-3 py-2 text-sm text-zinc-200/85">{x}</div>
        ))}
      </div>
    </div>
  );
}

function MiniCard({ title, desc }) {
  return (
    <div className="rounded-3xl border border-zinc-800/70 bg-zinc-950/45 p-4 backdrop-blur">
      <div className="text-sm font-semibold text-zinc-100">{title}</div>
      <div className="mt-1 text-sm text-zinc-300/80">{desc}</div>
    </div>
  );
}
