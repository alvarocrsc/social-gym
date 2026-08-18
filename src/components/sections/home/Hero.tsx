import Image from "next/image";
import type { CSSProperties, ReactElement } from "react";

import { hero } from "@/content/hero";
import type { HeroSlide } from "@/types/content";

import styles from "./Hero.module.css";
import { HeroSlider } from "./HeroSlider";

const TITLE_ID = "hero-titulo";

interface HeroHalfProps {
  slide: HeroSlide;
  side: "left" | "right";
  index: number;
  eyebrow: string;
}

function HeroHalf({
  slide,
  side,
  index,
  eyebrow,
}: HeroHalfProps): ReactElement {
  const isLeft = side === "left";
  const isFirst = index === 0;
  const media = isLeft ? slide.media.left : slide.media.right;

  const copy = (
    <>
      {isFirst ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <span className={styles.lines}>
        <span className={`${styles.line} ${styles.lineSolid}`}>
          {slide.line1}
        </span>
        <span className={`${styles.line} ${styles.lineOutline}`}>
          {slide.line2}
        </span>
      </span>
    </>
  );

  return (
    <div
      className={styles.half}
      data-side={side}
      aria-hidden={isLeft ? undefined : true}
      inert={!isLeft}
    >
      <div className={styles.imageLayer} aria-hidden>
        <Image
          className={styles.image}
          src={media.poster.src}
          alt={media.poster.alt}
          fill
          sizes={isLeft ? "(min-width: 48rem) 63vw, 125vw" : "63vw"}
          priority={isFirst && isLeft}
          fetchPriority={isFirst && isLeft ? "high" : undefined}
        />
        {media.sources.length === 0 ? null : (
          <video
            className={styles.video}
            poster={media.poster.src}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            data-video
          >
            {media.sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        )}
      </div>
      <div className={styles.scrim} aria-hidden />
      <div className={styles.copy}>
        {isLeft && isFirst ? (
          <h1 id={TITLE_ID} className={styles.title}>
            {copy}
          </h1>
        ) : (
          <p className={styles.title}>{copy}</p>
        )}
        <p className={styles.caption}>{slide.caption}</p>
      </div>
    </div>
  );
}

export function Hero(): ReactElement {
  const trackStyle = {
    "--slide-count": hero.slides.length,
  } as CSSProperties;

  return (
    <section id="top" className={styles.hero} aria-labelledby={TITLE_ID}>
      <HeroSlider slideCount={hero.slides.length}>
        <div className={styles.pin} style={trackStyle} data-pin>
          <div className={styles.stage}>
            {hero.slides.map((slide, index) => (
              <div key={slide.id} className={styles.slide} data-slide>
                <HeroHalf
                  slide={slide}
                  side="left"
                  index={index}
                  eyebrow={hero.eyebrow}
                />
                <HeroHalf
                  slide={slide}
                  side="right"
                  index={index}
                  eyebrow={hero.eyebrow}
                />
              </div>
            ))}
          </div>
        </div>
      </HeroSlider>
    </section>
  );
}
