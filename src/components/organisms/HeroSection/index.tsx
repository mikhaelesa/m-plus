"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tagline } from "@/components/molecules/Tagline";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/constants/paths";

export function HeroSection() {
  return (
    <section
      className="bg-background section-padding-y"
      aria-labelledby="hero-heading"
    >
      <div className="container-padding-x container mx-auto flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Left Column */}
        <div className="flex flex-1 flex-col gap-6 lg:gap-8">
          {/* Section Title */}
          <div className="section-title-gap-xl flex flex-col">
            {/* Tagline */}
            <Tagline>M+ Software</Tagline>
            {/* Main Heading */}
            <h1 id="hero-heading" className="heading-xl">
              Master Global Automotive Intelligence
            </h1>
            {/* Description */}
            <p className="text-muted-foreground text-base lg:text-lg">
              Unlock the power of the vPIC Dataset. Analyze manufacturing
              trends, track global vehicle makes, and gain deep insights into
              the automotive industry with our real-time dashboard.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href={PATHS.dashboard}>
              <Button>Get started</Button>
            </Link>
            <Link href={"#features"}>
              <Button variant="ghost">
                Explore
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full flex-1">
          <AspectRatio ratio={1 / 1}>
            <Image
              src="https://ui.shadcn.com/placeholder.svg"
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
