"use client";

import Link from "next/link";
import { Tagline } from "@/components/molecules/Tagline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="bg-background section-padding-y"
      aria-labelledby="faq-heading"
    >
      <div className="container-padding-x mx-auto flex max-w-2xl flex-col gap-10 md:gap-12">
        {/* Section Header */}
        <div className="section-title-gap-lg flex flex-col items-center text-center">
          {/* Category Tag */}
          <Tagline>FAQ</Tagline>
          {/* Main Title */}
          <h1 id="faq-heading" className="heading-lg text-foreground">
            Frequently Asked Questions
          </h1>
          {/* Section Description */}
          <p className="text-muted-foreground">
            Everything you need to know about M+ Software and the vPIC
            dataset. Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="#" className="text-primary underline">
              Contact us.
            </Link>
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" defaultValue="item-1" aria-label="FAQ items">
          {/* FAQ Item 1 */}
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left text-base font-medium">
              What is the vPIC Dataset?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              The vPIC (Product Information Catalog and Vehicle Listing) dataset
              is a global automotive database provided by NHTSA, containing
              millions of records for vehicles, makes, and manufacturers
              worldwide.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 2 */}
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left text-base font-medium">
              How often is the automotive data updated?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              Our platform synchronizes with the official vPIC API periodically
              to ensure you have access to the latest manufacturer registrations
              and vehicle make updates.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 3 */}
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left text-base font-medium">
              Can I export the analytics data?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              Yes, M+ Software allows users to export filtered datasets for
              Manufacturers and WMIs directly to CSV format for offline
              analysis and reporting.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ Item 4 */}
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left text-base font-medium">
              Is the dashboard mobile-friendly?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              Absolutely. Our dashboard and all analytics charts are fully
              responsive, allowing you to monitor automotive trends on any
              device, from desktop to mobile.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* CTA Card */}
        <div className="bg-muted/60 flex w-full flex-col items-center gap-6 rounded-xl p-6 md:p-8">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-foreground text-2xl font-bold">
              Still have questions?
            </h2>
            <p className="text-muted-foreground text-base">
              Have questions or need assistance? Our team is here to help!
            </p>
          </div>
          <Button aria-label="Contact our support team">Contact us</Button>
        </div>
      </div>
    </section>
  );
}
