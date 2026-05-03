"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tagline } from "@/components/molecules/Tagline";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/constants/paths";
import { useGSAPAnimation } from "./useGSAPAnimation";

export function HeroSection() {
  const { sectionRef } = useGSAPAnimation();

  return (
    <section
      ref={sectionRef}
      className="bg-background section-padding-y overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container-padding-x container mx-auto flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col gap-6 lg:gap-8">
          <div className="section-title-gap-xl flex flex-col">
            {/* Tambahkan target class untuk GSAP */}
            <div className="hero-tagline">
              <Tagline>M+ Software</Tagline>
            </div>

            <h1 id="hero-heading" className="hero-heading heading-xl">
              Master Global Automotive Intelligence
            </h1>

            <p className="hero-desc text-muted-foreground text-base lg:text-lg">
              Unlock the power of the vPIC Dataset. Analyze manufacturing
              trends, track global vehicle makes, and gain deep insights into
              the automotive industry with our real-time dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Tambahkan target class hero-btn pada wrapper/link */}
            <Link href={PATHS.dashboard} className="hero-btn">
              <Button className="w-full sm:w-auto">Get started</Button>
            </Link>
            <Link href={"#features"} className="hero-btn">
              <Button variant="ghost" className="w-full sm:w-auto">
                Explore
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>

        <div className="hero-image w-full flex-1">
          <AspectRatio ratio={1 / 1}>
            <Image
              src="/preview.png"
              alt="Hero section visual"
              fill
              priority
              className="h-full w-full rounded-xl object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
}
