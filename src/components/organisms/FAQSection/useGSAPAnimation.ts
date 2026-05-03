import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export const useGSAPAnimation = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const headingSplit = new SplitText("#faq-heading", {
        type: "chars, words",
      });
      const descSplit = new SplitText("#faq-desc", { type: "words" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".faq-tagline",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );

      tl.from(
        headingSplit.chars,
        {
          opacity: 0,
          y: 20,
          filter: "blur(8px)",
          rotationX: -30,
          scale: 1.1,
          stagger: 0.01,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      );

      tl.from(
        descSplit.words,
        {
          opacity: 0,
          y: 15,
          filter: "blur(6px)",
          stagger: 0.01,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4",
      );

      tl.fromTo(
        ".faq-item",
        {
          opacity: 0,
          y: 20,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3",
      );

      tl.fromTo(
        ".faq-cta-card",
        {
          opacity: 0,
          scale: 0.95,
          y: 20,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "back.out(1.2)",
        },
        "-=0.2",
      );

      tl.fromTo(
        ".faq-cta-content",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4",
      );
    },
    { scope: containerRef },
  );

  return { containerRef };
};
