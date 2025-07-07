"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { ChevronDownIcon } from "lucide-react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FormCalendarProps<T extends FieldValues> {
  label?: string;
  control: Control<T>;
  registerName: Path<T>;
}

export function FormCalendar<T extends FieldValues>({
  label,
  control,
  registerName,
}: FormCalendarProps<T>) {
  const [open, setOpen] = useState(false);

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name: registerName });

  return (
    <div className="w-full space-y-1">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between font-normal"
          >
            {value ? dayjs(value).format("DD/MM/YYYY") : "Select date"}
            <ChevronDownIcon className="text-muted-foreground h-4" />
          </Button>
        </PopoverTrigger>

        {error?.message && (
          <p className="text-destructive text-sm">{error.message}</p>
        )}

        <PopoverContent
          className="z-100 w-auto overflow-hidden p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value}
            captionLayout="dropdown"
            classNames={{
              years_dropdown: "bg-card text-foreground",
              months_dropdown: "bg-card text-foreground",
            }}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
