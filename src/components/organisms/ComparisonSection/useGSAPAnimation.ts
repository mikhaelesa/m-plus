import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export const useGSAPAnimation = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const headingSplit = new SplitText("#comp-heading", {
        type: "chars, words",
      });
      const descSplit = new SplitText("#comp-desc", { type: "words" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".comp-tagline",
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
          scale: 1.2,
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
        ".comp-table-header",
        { opacity: 0, filter: "blur(4px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" },
        "-=0.2",
      );

      tl.fromTo(
        ".comp-row-desktop",
        { opacity: 0, x: -20, filter: "blur(5px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2",
      );

      tl.fromTo(
        ".comp-card-mobile",
        { opacity: 0, y: 20, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<",
      );

      tl.fromTo(
        ".comp-cta",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.1",
      );
    },
    { scope: containerRef },
  );

  return { containerRef };
};
