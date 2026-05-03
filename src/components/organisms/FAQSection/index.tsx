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
import { useGSAPAnimation } from "./useGSAPAnimation";

const FAQ_ITEMS = [
  {
    id: "item-1",
    question: "What is the vPIC Dataset?",
    answer:
      "The vPIC (Product Information Catalog and Vehicle Listing) dataset is a global automotive database provided by NHTSA, containing millions of records for vehicles, makes, and manufacturers worldwide.",
  },
  {
    id: "item-2",
    question: "How often is the automotive data updated?",
    answer:
      "Our platform synchronizes with the official vPIC API periodically to ensure you have access to the latest manufacturer registrations and vehicle make updates.",
  },
  {
    id: "item-3",
    question: "Can I export the analytics data?",
    answer:
      "Yes, M+ Software allows users to export filtered datasets for Manufacturers and WMIs directly to CSV format for offline analysis and reporting.",
  },
  {
    id: "item-4",
    question: "Is the dashboard mobile-friendly?",
    answer:
      "Absolutely. Our dashboard and all analytics charts are fully responsive, allowing you to monitor automotive trends on any device, from desktop to mobile.",
  },
];

export function FaqSection() {
  const { containerRef } = useGSAPAnimation();

  return (
    <section
      id="faq"
      ref={containerRef}
      className="bg-background section-padding-y overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="container-padding-x mx-auto flex max-w-2xl flex-col gap-10 md:gap-12">
        {/* Header Section */}
        <div className="section-title-gap-lg flex flex-col items-center text-center">
          <div className="faq-tagline">
            <Tagline>FAQ</Tagline>
          </div>

          <h2 id="faq-heading" className="heading-lg text-foreground">
            Frequently Asked Questions
          </h2>

          <p id="faq-desc" className="text-muted-foreground">
            Everything you need to know about M+ Software and the vPIC dataset.
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="#" className="text-primary underline">
              Contact us.
            </Link>
          </p>
        </div>

        {/* Accordion Section - Refactored */}
        <Accordion type="single" defaultValue="item-1" aria-label="FAQ items">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="faq-item">
              <AccordionTrigger className="text-left text-base font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA Card Section */}
        <div className="faq-cta-card bg-muted/60 flex w-full flex-col items-center gap-6 rounded-xl p-6 md:p-8">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="faq-cta-content text-foreground text-2xl font-bold">
              Still have questions?
            </h2>
            <p className="faq-cta-content text-muted-foreground text-base">
              Have questions or need assistance? Our team is here to help!
            </p>
          </div>
          <div className="faq-cta-content">
            <Button aria-label="Contact our support team">Contact us</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
