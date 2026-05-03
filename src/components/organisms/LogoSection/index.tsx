"use client";

import { Tagline } from "@/components/molecules/Tagline";
import { PlaceholderLogo } from "@/components/organisms/LogoSection/PlaceholderLogo"; /* Make sure to import your logos */

export function LogoSection() {
  return (
    <section className="bg-background section-padding-y">
      <div className="container-padding-x container mx-auto">
        <div className="flex flex-col items-center gap-12 md:gap-16">
          <div className="section-title-gap-lg flex max-w-xl flex-col items-center text-center">
            <Tagline>Trusted Partners</Tagline>
            <h2 className="heading-lg text-foreground">
              Powering Leading Automotive Brands
            </h2>
            <p className="text-muted-foreground">
              M+ Software is the trusted analytics engine for manufacturers and
              data analysts worldwide, providing deep insights into global
              vehicle trends and vPIC datasets.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {[...Array(10)].map((_, index) => (
              <PlaceholderLogo
                key={String(index)}
                className="text-foreground"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
