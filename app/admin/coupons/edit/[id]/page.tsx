import EditCouponsForm from "@/components/admin/EditCouponsForm";
import { getCouponById } from "@/helper/coupons/action";
import { notFound } from "next/navigation";

export default async function EditCouponsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const couponData = await getCouponById(id);

  if (!couponData) return notFound();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Coupon</h1>
      <EditCouponsForm initialData={couponData} />
    </div>
  );
}