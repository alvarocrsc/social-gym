import type { JsonLdNode } from "@/lib/seo/json-ld";

export interface JsonLdProps {
  /** The graph to serialise. Nothing renders when this is `null`. */
  data: JsonLdNode | null;
}

/**
 * Renders a structured-data block.
 *
 * This is the only place in the codebase permitted to use
 * `dangerouslySetInnerHTML` (hard rule 12). `<` is escaped so a string in the
 * content layer can never break out of the script element.
 */
export function JsonLd({ data }: JsonLdProps) {
  if (data === null) return null;

  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
