"use client";

import Link from "next/link";
import { Tagline } from "@/components/molecules/Tagline";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-background section-padding-y"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-xl px-6">
        <div className="flex flex-col items-center gap-10 md:gap-12">
          {/* Section Title */}
          <div className="section-title-gap-lg mx-auto flex max-w-xl flex-col items-center text-center">
            {/* Tagline */}
            <Tagline>Get in Touch</Tagline>
            {/* Main Heading */}
            <h1 id="contact-heading" className="heading-lg">
              Connect with our Data Experts
            </h1>
            {/* Description */}
            <p className="text-muted-foreground">
              Have questions about the vPIC dataset integration or need a custom
              analytics solution for your fleet? Reach out to our team. We
              usually respond within 24 hours.
            </p>
          </div>

          {/* Contact Form */}
          <form
            className="flex w-full flex-col"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Contact form"
          >
            <FieldSet>
              <FieldGroup>
                {/* Name Input */}
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    placeholder="Name"
                    required
                    aria-required="true"
                  />
                </Field>

                {/* Email Input */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    required
                    aria-required="true"
                  />
                </Field>

                {/* Message Textarea */}
                <Field>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea
                    id="message"
                    placeholder="Type your message"
                    className="min-h-[106px]"
                    required
                    aria-required="true"
                  />
                </Field>

                {/* Privacy Policy Checkbox */}
                <Field orientation="horizontal">
                  <Checkbox id="privacy" required aria-required="true" />
                  <FieldLabel
                    htmlFor="privacy"
                    className="text-muted-foreground inline leading-none font-normal"
                  >
                    By selecting this you agree to our{" "}
                    <Link href="#" className="text-foreground underline">
                      Privacy Policy
                    </Link>
                    .
                  </FieldLabel>
                </Field>

                {/* Submit Button */}
                <Field>
                  <Button type="submit" className="w-full">
                    Send message
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </div>
      </div>
    </section>
  );
}
