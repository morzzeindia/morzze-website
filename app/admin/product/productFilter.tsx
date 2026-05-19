"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const normalizeSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getItemName = (item: any) => item?.name || item?.slug || "";

export default function ProductFilters({
  productType,
  setProductType,
  size,
  setSize,
  flowType,
  setFlowType,
  material,
  setMaterial,
  cramps,
  setCramps,
  sensitive,
  setSensitive,
}: any) {
  const [sizeInput, setSizeInput] = useState("");
  const [materialInput, setMaterialInput] = useState("");

  const addDynamicItem = (
    value: string,
    state: any[] = [],
    setState: Function,
    clearInput: Function,
  ) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const slug = normalizeSlug(trimmed);
    if(!slug) return;

    setState([...state, { slug, name: trimmed }]);
    clearInput("");
  };

 const removeDynamicItem = (
  index: number,
  state: any[] = [],
  setState: Function,
) => {
  setState(state.filter((_: any, i: number) => i !== index));
};
  const renderDynamicCard = (
    title: string,
    state: any[],
    setState: Function,
    inputValue: string,
    setInputValue: Function,
    placeholder: string,
  ) => (
    <Card className="shadow-sm rounded-2xl">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                addDynamicItem(
                  inputValue,
                  state,
                  setState,
                  setInputValue,
                )
              }
            >
              Add {title}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-[0.18em]">
            Selected values
          </div>
          <div className="flex flex-wrap gap-2">
            {(state || []).map((item: any, index: number) => (
              <span
                key={`${item.slug}-${index}`}
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"
              >
                {getItemName(item)}
                <button
                  type="button"
                  className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-muted text-muted-foreground"
                onClick={() => removeDynamicItem(index, state, setState)}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
            {state?.length === 0 && (
              <div className="text-sm text-muted-foreground">
                No {title.toLowerCase()} added yet.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* existing filter groups can still be added if needed */}

      {renderDynamicCard(
        "Size",
        size,
        setSize,
        sizeInput,
        setSizeInput,
        "Enter size value, e.g. Small",
      )}

      {renderDynamicCard(
        "Material",
        material,
        setMaterial,
        materialInput,
        setMaterialInput,
        "Enter material value, e.g. Organic Cotton",
      )}
    </div>
  );
}
