/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateCoupon } from "@/helper/coupons/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  IconDeviceFloppy,
  IconX,
  IconRefresh,
  IconTicket,
  IconFileText,
} from "@tabler/icons-react";
import { useFileUpload } from "@/helper";
import { toast } from "sonner";

export default function EditCouponsForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { upload, uploading } = useFileUpload();

  const [formData, setFormData] = useState({
    category: initialData.category || "",
    title: initialData.title || "",
    description: initialData.description || "",
    couponCode: initialData.couponCode || "",
    discountValue: initialData.discountValue || "",
    minimumOrder: initialData.minimumOrder || "",
    validUntil: initialData.validUntil
      ? new Date(initialData.validUntil).toISOString().split("T")[0]
      : "",
    termsPdf: initialData.termsPdf || "",
    isActive: initialData.isActive ?? true,
  });

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      toast.loading("Uploading PDF...", {
        id: "terms-pdf-upload",
      });

      const { fileUrl } = await upload(file, "coupons");

      setFormData((prev) => ({
        ...prev,
        [field]: fileUrl,
      }));

      toast.success("PDF uploaded successfully!", {
        id: "terms-pdf-upload",
      });
    } catch (error) {
      console.error("Upload failed", error);

      toast.error("PDF upload failed", {
        id: "terms-pdf-upload",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    data.append("category", formData.category);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("couponCode", formData.couponCode);
    data.append("discountValue", formData.discountValue);
    data.append("minimumOrder", formData.minimumOrder);
    data.append("validUntil", formData.validUntil);
    data.append("termsPdf", formData.termsPdf);
    data.append("isActive", formData.isActive ? "on" : "off");

    const res = await updateCoupon(initialData.id, data);

    if (res.success) {
      toast.success("Coupon updated successfully!");

      setTimeout(() => {
        window.location.href = "/admin/coupons";
      }, 700);
    } else {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2">
            <IconTicket className="w-5 h-5 text-teal-600" />
            Coupon Details
          </h3>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Coupon Title
            </label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="New Customer Special"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="">Select category</option>
              <option value="New Customer">New Customer</option>
              <option value="Category">Category</option>
              <option value="Shipping">Shipping</option>
              <option value="Seasonal">Seasonal</option>
              <option value="Trade">Trade</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Coupon Code
            </label>
            <Input
              value={formData.couponCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  couponCode: e.target.value.toUpperCase(),
                })
              }
              placeholder="WELCOME25"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Discount Value
            </label>
            <Input
              value={formData.discountValue}
              onChange={(e) =>
                setFormData({ ...formData, discountValue: e.target.value })
              }
              placeholder="25% OFF"
              required
            />
          </div>
        </div>

        <div className="space-y-4 bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2">
            <IconFileText className="w-5 h-5 text-teal-600" />
            Validity & Terms
          </h3>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Minimum Order
            </label>
            <Input
              value={formData.minimumOrder}
              onChange={(e) =>
                setFormData({ ...formData, minimumOrder: e.target.value })
              }
              placeholder="₹15,000"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Valid Until
            </label>
            <Input
              type="date"
              value={formData.validUntil}
              onChange={(e) =>
                setFormData({ ...formData, validUntil: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Terms & Conditions PDF
            </label>

            <div className="relative border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer">
              <input
                type="file"
                accept="application/pdf"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileUpload(e, "termsPdf")}
              />

              <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                {uploading ? (
                  "Uploading..."
                ) : formData.termsPdf ? (
                  <>
                    <IconRefresh className="w-4 h-4" />
                    Change PDF
                  </>
                ) : (
                  "Upload PDF"
                )}
              </p>
            </div>

            {formData.termsPdf && (
              <a
                href={formData.termsPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-teal-600 hover:underline"
              >
                View uploaded PDF
              </a>
            )}
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="h-4 w-4"
            />

            <label className="text-sm font-semibold text-gray-700">
              Show this coupon on website
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <label className="block font-bold text-lg mb-4 border-b pb-2">
          Coupon Description
        </label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          rows={5}
          placeholder="Write coupon description"
          required
        />
      </div>

      <div className="bottom-0 left-0 right-0 p-4 flex justify-center gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-100">
        <Button
          type="submit"
          disabled={loading || uploading}
          className="bg-[#168BA0] hover:bg-[#137688] text-white px-10 py-4 text-lg font-bold shadow-md"
        >
          {loading ? (
            "Saving Changes..."
          ) : (
            <>
              <IconDeviceFloppy className="w-5 h-5 mr-2" />
              Update Coupon
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="px-10 py-4 text-lg border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <IconX className="w-5 h-5 mr-2" />
          Cancel
        </Button>
      </div>
    </form>
  );
}