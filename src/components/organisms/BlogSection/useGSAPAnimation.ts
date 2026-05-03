import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export const useGSAPAnimation = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // 1. Setup SplitText
      const headingSplit = new SplitText("#blog-heading", {
        type: "chars, words",
      });
      const descSplit = new SplitText("#blog-desc", { type: "words" });

      // 2. Timeline Utama
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 3. Animasi Tagline (Dipercepat)
      tl.fromTo(
        ".blog-tagline",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );

      // 4. Efek Asap Heading (Durasi & stagger dipangkas)
      tl.from(
        headingSplit.chars,
        {
          opacity: 0,
          y: 20,
          filter: "blur(8px)", // Blur sedikit dikurangi agar proses komputasi render lebih ringan
          rotationX: -30,
          scale: 1.1,
          stagger: 0.01, // Sangat cepat antar huruf
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      );

      // 5. Efek Asap Deskripsi (Dipercepat)
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

      // 6. Animasi Kartu Artikel (Slide up lebih cepat dan rapat)
      tl.fromTo(
        ".blog-card",
        {
          opacity: 0,
          y: 30,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.08, // Jeda antar kartu dipersingkat dari 0.15 ke 0.08
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      );

      // 7. Animasi Gambar Reveal (Dipercepat)
      tl.fromTo(
        ".blog-image",
        {
          scale: 1.2, // Skala awal sedikit diturunkan agar perjalanan animasinya lebih pendek
          filter: "grayscale(100%)",
        },
        {
          scale: 1,
          filter: "grayscale(0%)",
          stagger: 0.08, // Harus sama dengan stagger kartu agar sinkron
          duration: 0.8, // Dipangkas dari 1.2 detik
          ease: "power2.out",
        },
        "<",
      );
    },
    { scope: containerRef },
  );

  return { containerRef };
};
