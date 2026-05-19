"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const getItemName = (item: any) => item?.name || item?.slug || "";

const sizeOptions = [
  { name: "Brushed Nickel", slug: "brushed-nickel" },
  { name: "12-18 Inch", slug: "12-18-inch" },
  { name: "Antique Brass", slug: "antique-brass" },
  { name: "18-24 Inch", slug: "18-24-inch" },
  { name: "24-30 Inch", slug: "24-30-inch" },
  { name: "30+ Inch", slug: "30plus-inch" },
];

const materialOptions = [
  { name: "304 Stainless Steel", slug: "304-stainless-steel" },
  { name: "Granite Composite", slug: "granite-composite" },
  { name: "Brass", slug: "brass" },
  { name: "Zinc Alloy", slug: "zinc-alloy" },
  { name: "ABS Polymer", slug: "abs-polymer" },
];

export default function ProductFilters({
  productType,
  setProductType,
  size,
  setSize,
  material,
  setMaterial,

}: any) {
  const toggleItem = (item: any, state: any[] = [], setState: Function) => {
    const exists = state.some((selected: any) => selected.slug === item.slug);

    if (exists) {
      setState(state.filter((selected: any) => selected.slug !== item.slug));
    } else {
      setState([...state, item]);
    }
  };

  const removeItem = (slug: string, state: any[] = [], setState: Function) => {
    setState(state.filter((item: any) => item.slug !== slug));
  };

  const renderMultiSelectCard = (
    title: string,
    options: any[],
    state: any[] = [],
    setState: Function,
  ) => (
    <Card className="shadow-sm rounded-2xl">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {options.map((item) => {
            const active = state?.some(
              (selected: any) => selected.slug === item.slug,
            );

            return (
              <Button
                key={item.slug}
                type="button"
                variant={active ? "default" : "outline"}
                onClick={() => toggleItem(item, state, setState)}
                className="rounded-full"
              >
                {item.name}
              </Button>
            );
          })}
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-[0.18em]">
            Selected values
          </div>

          <div className="flex flex-wrap gap-2">
            {(state || []).map((item: any) => (
              <span
                key={item.slug}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
              >
                {getItemName(item)}

                <button
                  type="button"
                  className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-muted text-muted-foreground"
                  onClick={() => removeItem(item.slug, state, setState)}
                >
                  <X size={14} />
                </button>
              </span>
            ))}

            {state?.length === 0 && (
              <div className="text-sm text-muted-foreground">
                No {title.toLowerCase()} selected yet.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {renderMultiSelectCard("Size", sizeOptions, size, setSize)}

      {renderMultiSelectCard(
        "Material",
        materialOptions,
        material,
        setMaterial,
      )}
    </div>
  );
}