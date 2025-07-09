import { ForwardedRef, forwardRef, useId } from "react";
import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FormInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
  showSearchIcon?: boolean;
}

export const FormInput = forwardRef(
  (
    { label, error, showSearchIcon, ...restProps }: FormInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const id = useId();

    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          {showSearchIcon && (
            <SearchIcon className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
          )}
          <Input
            id={id}
            className={cn("rounded-lg border p-2", showSearchIcon && "pl-10")}
            {...restProps}
            ref={ref}
          />
        </div>
        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
