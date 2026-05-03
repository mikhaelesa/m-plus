import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export const useGSAPAnimation = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const headingSplit = new SplitText("#logo-heading", {
        type: "chars, words",
      });
      const descSplit = new SplitText("#logo-desc", { type: "words" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".logo-tagline",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );

      tl.from(
        headingSplit.chars,
        {
          opacity: 0,
          y: 30,
          filter: "blur(12px)",
          rotationX: -40,
          scale: 1.1,
          stagger: 0.02,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.3",
      );

      tl.from(
        descSplit.words,
        {
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
          stagger: 0.015,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6",
      );

      tl.fromTo(
        ".logo-item",
        {
          opacity: 0,
          scale: 0.8,
          y: 30,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "back.out(1.2)",
          stagger: {
            amount: 0.8,
            from: "random",
          },
        },
        "-=0.4",
      );
    },
    { scope: containerRef },
  );

  return { containerRef };
};
