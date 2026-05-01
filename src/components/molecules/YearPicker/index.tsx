"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1950;
const YEAR_OPTIONS = Array.from(
  { length: CURRENT_YEAR - MIN_YEAR + 1 },
  (_, i) => {
    const yearStr = (CURRENT_YEAR - i).toString();
    return { value: yearStr, label: yearStr };
  },
);

interface YearPickerProps {
  selectedYear?: string;
  onYearChange: (year: string | undefined) => void;
}

export function YearPicker({ selectedYear, onYearChange }: YearPickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedYear
            ? YEAR_OPTIONS.find((option) => option.value === selectedYear)
                ?.label
            : "Cari Tahun..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Ketik tahun..." />
          <CommandList>
            <CommandEmpty>Tahun tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {YEAR_OPTIONS.map((year) => (
                <CommandItem
                  key={year.value}
                  value={year.value}
                  onSelect={(currentValue) => {
                    onYearChange(
                      currentValue === selectedYear ? undefined : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedYear === year.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {year.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
