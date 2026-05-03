import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export const useGSAPAnimation = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const quoteSplit = new SplitText("#testimonial-title", { type: "words" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(quoteSplit.words, {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
        scale: 1.05,
        stagger: 0.03,
        duration: 1,
        ease: "power2.out",
      });

      tl.fromTo(
        ".testimonial-avatar",
        { opacity: 0, scale: 0.5, filter: "blur(5px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        "-=0.5",
      );

      tl.fromTo(
        ".testimonial-author-info",
        { opacity: 0, y: 15, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.6",
      );
    },
    { scope: containerRef },
  );

  return { containerRef };
};
