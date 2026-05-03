"use client";

import { Tagline } from "@/components/molecules/Tagline";
import { PlaceholderLogo } from "@/components/organisms/LogoSection/PlaceholderLogo";
import { useGSAPAnimation } from "./useGSAPAnimation";

export function LogoSection() {
  const { containerRef } = useGSAPAnimation();

  return (
    <section
      ref={containerRef}
      className="bg-background section-padding-y overflow-hidden"
    >
      <div className="container-padding-x container mx-auto">
        <div className="flex flex-col items-center gap-12 md:gap-16">
          <div className="section-title-gap-lg flex max-w-xl flex-col items-center text-center">
            <div className="logo-tagline">
              <Tagline>Trusted Partners</Tagline>
            </div>

            <h2 id="logo-heading" className="heading-lg text-foreground">
              Powering Leading Automotive Brands
            </h2>

            <p id="logo-desc" className="text-muted-foreground">
              M+ Software is the trusted analytics engine for manufacturers and
              data analysts worldwide, providing deep insights into global
              vehicle trends and vPIC datasets.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[...Array(10)].map((_, index) => (
              <div
                key={String(index)}
                className="logo-item flex items-center justify-center"
              >
                <PlaceholderLogo className="text-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
