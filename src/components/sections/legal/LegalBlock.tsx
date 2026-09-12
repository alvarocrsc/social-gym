import type { ReactElement } from "react";

import { Link } from "@/i18n/navigation";
import type { LegalBlock as Block } from "@/types/content";

import styles from "./Legal.module.css";

export interface LegalBlockProps {
  block: Block;
}

/** Renders one content block of a legal section. */
export function LegalBlock({ block }: LegalBlockProps): ReactElement {
  switch (block.kind) {
    case "text":
      return <p className={styles.text}>{block.body}</p>;

    case "list":
      return (
        <ul className={styles.list}>
          {block.items.map((item) => (
            <li className={styles.listItem} key={item}>
              {item}
            </li>
          ))}
        </ul>
      );

    case "terms":
      return (
        <dl className={styles.terms}>
          {block.items.map((item) => (
            <div className={styles.termRow} key={item.term}>
              <dt className={styles.term}>{item.term}</dt>
              <dd className={styles.termBody}>{item.body}</dd>
            </div>
          ))}
        </dl>
      );

    case "table":
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption>{block.caption}</caption>
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={cell} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={cell}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "link":
      return block.external === true ? (
        <a
          className={`${styles.link} ${styles.line}`}
          href={block.href}
          target="_blank"
          rel="noopener"
        >
          {block.label}
          <span aria-hidden>↗</span>
        </a>
      ) : (
        <Link className={`${styles.link} ${styles.line}`} href={block.href}>
          {block.label}
          <span aria-hidden>→</span>
        </Link>
      );
  }
}
