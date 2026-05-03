"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useGSAPAnimation } from "./useGSAPAnimation";

export function TestimonialsSection() {
  const { containerRef } = useGSAPAnimation();

  return (
    <section
      ref={containerRef}
      className="bg-muted/40 container-padding-x section-padding-y flex flex-col items-center overflow-hidden"
      aria-labelledby="testimonial-title"
    >
      <div className="flex max-w-2xl flex-col items-center gap-8">
        <p
          id="testimonial-title"
          className="text-foreground text-center text-lg leading-7 font-medium md:text-xl"
        >
          "M+ Software&apos;s dashboard has revolutionized how we track
          automotive manufacturing trends. The integration with the vPIC dataset
          provides us with unparalleled market intelligence."
        </p>

        <div className="flex flex-col items-center gap-4">
          <div className="testimonial-avatar">
            <Avatar className="h-12 w-12 rounded-xl md:h-14 md:w-14">
              <AvatarImage
                src="https://i.pravatar.cc/150?u=sarah"
                alt="Sarah Jenkins"
              />
            </Avatar>
          </div>

          <div className="testimonial-author-info flex items-center gap-2">
            <span className="text-foreground text-base font-medium">
              Sarah Jenkins
            </span>
            <span className="text-muted-foreground opacity-50">•</span>
            <span className="text-muted-foreground text-base text-center">
              Lead Data Analyst at Global Motors
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
