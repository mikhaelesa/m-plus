"use client";

import { Box, Check, X } from "lucide-react";
import Link from "next/link";
import { Tagline } from "@/components/molecules/Tagline";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PATHS } from "@/constants/paths";

type ComparisonRow = {
  feature: string;
  our: boolean | string;
  theirs: boolean | string;
};

const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: "vPIC Dataset Access", our: true, theirs: "Limited" },
  { feature: "Real-time Analytics", our: true, theirs: false },
  { feature: "Vehicle Type Filtering", our: true, theirs: true },
  { feature: "CSV Data Export", our: true, theirs: "Paid Add-on" },
  { feature: "Manufacturing Trends", our: true, theirs: false },
];

export function ComparisonSection() {
  return (
    <section id="features" className="bg-background section-padding-y">
      <div className="container-padding-x mx-auto flex max-w-6xl flex-col gap-8 md:gap-12">
        {/* Title block */}
        <div className="section-title-gap-lg mx-auto flex flex-col items-center text-center md:max-w-xl">
          <Tagline>Why M+</Tagline>
          <h2 className="heading-lg text-foreground">M+ vs. The Rest</h2>
          <p className="text-muted-foreground text-base">
            Not all automotive analytics platforms are equal. See how M+
            Software delivers a complete vPIC intelligence suite that
            competitors simply can&apos;t match.
          </p>
        </div>

        {/* Comparison grid */}
        {/* Desktop/tablet (md+) table */}
        <div className="hidden overflow-x-auto md:block">
          <div className="">
            <Table>
              <TableHeader>
                <TableRow className="h-14">
                  <TableHead className="w-[40%]"></TableHead>
                  <TableHead className="w-[30%]">
                    <div className="relative flex items-center justify-center">
                      <Logo />
                    </div>
                  </TableHead>
                  <TableHead className="w-[30%]">
                    <div className="flex items-center justify-center">
                      <Box className="size-6" aria-hidden="true" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMPARISON_ROWS.map((row, idx) => (
                  <TableRow key={String(idx)} className="h-14">
                    <TableCell className="text-base font-medium">
                      {row.feature}
                    </TableCell>
                    <TableCell>
                      <div className="relative flex items-center justify-center">
                        <div className="text-base">
                          {typeof row.our === "boolean" ? (
                            row.our ? (
                              <Check className="size-5" aria-hidden="true" />
                            ) : (
                              <X
                                className="text-muted-foreground size-5"
                                aria-hidden="true"
                              />
                            )
                          ) : (
                            row.our
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center text-base">
                        {typeof row.theirs === "boolean" ? (
                          row.theirs ? (
                            <Check className="size-5" aria-hidden="true" />
                          ) : (
                            <X
                              className="text-muted-foreground size-5"
                              aria-hidden="true"
                            />
                          )
                        ) : (
                          row.theirs
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Mobile (< md) stacked rows */}
        <div className="md:hidden">
          <div className="mb-4 grid grid-cols-2 text-sm font-medium">
            <div className="relative flex items-center justify-center py-2">
              <div className="bg-muted/50 absolute inset-0 -z-10" />
              <Logo />
            </div>
            <div className="flex items-center justify-center py-2">
              <Box className="size-6" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-3">
            {COMPARISON_ROWS.map((row, idx) => (
              <div key={String(idx)} className="rounded-md border">
                <div className="px-4 py-3 text-sm font-medium">
                  {row.feature}
                </div>
                <Separator role="presentation" />
                <div className="grid grid-cols-2">
                  <div className="relative flex items-center justify-center py-3">
                    <div className="bg-muted/50 absolute inset-0 -z-10" />
                    <div className="text-sm">
                      {typeof row.our === "boolean" ? (
                        row.our ? (
                          <Check className="size-4" aria-hidden="true" />
                        ) : (
                          <X className="size-4" aria-hidden="true" />
                        )
                      ) : (
                        row.our
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-center py-3 text-sm">
                    {typeof row.theirs === "boolean" ? (
                      row.theirs ? (
                        <Check className="size-4" aria-hidden="true" />
                      ) : (
                        <X
                          className="text-muted-foreground size-4"
                          aria-hidden="true"
                        />
                      )
                    ) : (
                      row.theirs
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center gap-4">
          <Button asChild>
            <Link href={PATHS.dashboard}>Get started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
