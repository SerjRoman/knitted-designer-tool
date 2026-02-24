"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/widgets/ui-layer/lib/utils"

type Props = React.ComponentProps<typeof SliderPrimitive.Root>

export default function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: Props) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min],
    [value, defaultValue, min]
  )

  return (
    <SliderPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50 bg-[#e5e7eb] rounded-xl h-[6px]",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative grow overflow-hidden rounded-full bg-muted",
          "data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full",
          "data-[orientation=vertical]:w-1 data-[orientation=vertical]:h-full"
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            "absolute bg-primary",
            "data-[orientation=horizontal]:h-full",
            "data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>

      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block size-5 rounded-full border bg-[#10b981] shadow"
        />
      ))}
    </SliderPrimitive.Root>
  )
}
