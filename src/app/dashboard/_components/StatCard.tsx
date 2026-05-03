"use client";

import type { LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { gsap } from "@/lib/gsap";
import { StatCardError } from "./StatCardError";
import { StatCardSkeleton } from "./StatCardSkeleton";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  isError?: boolean;
  isPending?: boolean;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  isError,
  isPending,
}: StatCardProps) {
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numberRef.current) return;

    const counter = { val: 0 };
    const formatter = new Intl.NumberFormat("id-ID");

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.innerText = formatter.format(
              Math.ceil(counter.val),
            );
          }
        },
      });
    });

    return () => ctx.revert();
  }, [value]);

  if (isPending) {
    return <StatCardSkeleton />;
  }

  if (isError) {
    return <StatCardError title={title} icon={Icon} />;
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" ref={numberRef}>
          0
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
