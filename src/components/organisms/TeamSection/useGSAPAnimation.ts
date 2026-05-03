import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export const useGSAPAnimation = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const headingSplit = new SplitText("#team-heading", {
        type: "chars, words",
      });
      const descSplit = new SplitText("#team-desc", { type: "words" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".team-tagline",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );

      tl.from(
        headingSplit.chars,
        {
          opacity: 0,
          y: 25,
          filter: "blur(12px)",
          rotationX: -30,
          scale: 1.1,
          stagger: 0.02,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4",
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
        ".team-card",
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
          filter: "blur(15px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "back.out(1.2)",
          stagger: {
            amount: 0.6,
            grid: "auto",
            from: "center",
          },
        },
        "-=0.4",
      );

      tl.fromTo(
        ".team-social a",
        { opacity: 0, scale: 0, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "back.out(2)",
          stagger: 0.03,
        },
        "-=0.3",
      );
    },
    { scope: containerRef },
  );

  return { containerRef };
};
