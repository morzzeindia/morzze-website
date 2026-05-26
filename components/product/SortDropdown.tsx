"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "relevant") {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentSort = searchParams.get("sort") || "relevant";

  return (
    <div className="flex items-center text-sm text-zinc-400 font-inter">
      <span>Sort by:</span>
      <div className="ml-2 w-48">
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="h-8 border-b border-[#FFBF3F] bg-transparent text-white rounded-none focus:ring-0 focus:ring-offset-0 px-2 py-0">
            <SelectValue placeholder="Relevant" />
          </SelectTrigger>
          <SelectContent className="bg-[#111] text-white border-zinc-800">
            <SelectItem value="relevant">Relevant</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
