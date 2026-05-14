"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteCouponButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  const handleDelete = async () => {
    try {
      toast.loading("Deleting coupon...", {
        id: "delete-coupon",
      });

      await action();

      toast.success("Coupon deleted successfully!", {
        id: "delete-coupon",
      });

      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (error) {
      console.error(error);

      toast.error("Failed to delete coupon", {
        id: "delete-coupon",
      });
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleDelete}
      className="flex items-center gap-1 border-red-200 hover:bg-red-50 text-red-600"
    >
      <Trash2 className="w-4 h-4" />
      Delete
    </Button>
  );
}