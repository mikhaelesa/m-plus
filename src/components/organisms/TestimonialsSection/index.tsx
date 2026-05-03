"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function TestimonialsSection() {
  return (
    <section
      className="bg-muted/40 container-padding-x section-padding-y flex flex-col items-center"
      aria-labelledby="testimonial-title"
    >
      {/* Content Container */}
      <div className="flex max-w-2xl flex-col items-center gap-8">
        {/* Testimonial Quote */}
        <p
          id="testimonial-title"
          className="text-foreground text-center text-lg leading-7 font-medium md:text-xl"
        >
          "M+ Software&apos;s dashboard has revolutionized how we track
          automotive manufacturing trends. The integration with the vPIC dataset
          provides us with unparalleled market intelligence."
        </p>

        {/* Author Information */}
        <div className="flex flex-col items-center gap-4">
          {/* Author Avatar */}
          <Avatar className="h-12 w-12 rounded-xl md:h-14 md:w-14">
            <AvatarImage
              src="https://i.pravatar.cc/150?u=sarah"
              alt="Sarah Jenkins"
            />
          </Avatar>

          {/* Author Details */}
          <div className="flex items-center gap-2">
            <span className="text-foreground text-base font-medium">
              Sarah Jenkins
            </span>
            <span className="text-muted-foreground opacity-50">•</span>
            <span className="text-muted-foreground text-base">
              Lead Data Analyst at Global Motors
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
