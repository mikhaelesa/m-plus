import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export const useGSAPAnimation = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const headingSplit = new SplitText("#contact-heading", { type: "words" });
      const descSplit = new SplitText("#contact-desc", { type: "words" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".contact-tagline",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      );

      tl.from(
        headingSplit.words,
        {
          opacity: 0,
          y: 15,
          filter: "blur(4px)",
          stagger: 0.02,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.1",
      );

      tl.from(
        descSplit.words,
        {
          opacity: 0,
          y: 10,
          filter: "blur(3px)",
          stagger: 0.01,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3",
      );

      tl.fromTo(
        ".contact-field",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2",
      );
    },
    { scope: containerRef },
  );

  return { containerRef };
};
