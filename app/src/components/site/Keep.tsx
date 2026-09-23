import { Fragment } from "react";

const KEEP = /(Île-de-France|experts?-comptables?|Chaussée d’Antin-La Fayette)/g;

/** Renders text with compound names kept on one line (no break after their hyphen). */
export function Keep({ text }: { text: string }) {
  return (
    <>
      {text.split(KEEP).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="nowrap">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
