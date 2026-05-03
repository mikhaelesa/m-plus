import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";

export const useGSAPAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headingSplit = new SplitText(".hero-heading", {
        type: "words,chars",
      });

      const descSplit = new SplitText(".hero-desc", { type: "lines" });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".hero-tagline", {
        y: 20,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.8,
      })
        .from(
          headingSplit.chars,
          {
            y: 30,
            opacity: 0,
            filter: "blur(12px)",
            stagger: 0.02,
            duration: 1,
          },
          "-=0.5",
        )
        .from(
          descSplit.lines,
          {
            y: 20,
            opacity: 0,
            filter: "blur(8px)",
            stagger: 0.1,
            duration: 0.8,
          },
          "-=0.6",
        )
        .from(
          ".hero-btn",
          {
            y: 20,
            opacity: 0,
            filter: "blur(5px)",
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.5",
        )
        .from(
          ".hero-image",
          {
            scale: 0.95,
            opacity: 0,
            filter: "blur(20px)",
            duration: 1.5,
            ease: "power2.out",
          },
          "-=1.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef };
};
