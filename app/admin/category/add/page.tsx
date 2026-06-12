"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { createCategory, getAllCategoriesMeta } from "@/helper/category/action";
import { toast } from "sonner";
// Naya component import karein
import ImageUpload from "@/components/ImageUpload";
import { useFileUpload } from "@/helper";

export default function AddCategoryForm() {
  const router = useRouter();
  const { upload, uploading } = useFileUpload();
  const bannerRef = useRef<HTMLInputElement>(null);
  const horizontalBannerRef = useRef<HTMLInputElement>(null);

  const [parentId, setParentId] = useState("");
  // 'preview' ki jagah hum 'bannerUrl' use karenge jo ImageKit se aayega
  const [bannerUrl, setBannerUrl] = useState<string>("");
  const [horizontalBannerUrl, setHorizontalBannerUrl] = useState<string>("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    getAllCategoriesMeta().then((data) => {
      setCategories(data);
    });
  }, []);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const categoryData = {
      name: e.target.name.value,
      parentId: parentId,
      description: e.target.description?.value,
      bannerImage: bannerUrl, // ImageKit ka URL yahan bhej rahe hain,
      horizontalBannerImage: horizontalBannerUrl,
      type: e.target.type.value
    };
    const response = await createCategory(categoryData);
    if (response?.success === true) {
      toast.success(response.message ?? "Category added successfully");
      router.push("/admin/category");
    } else {
      toast.error(response?.message ?? "Failed to add category");
    }
  };

  const handleBanner = async (file?: File) => {
    if (!file) return;

    try {
      const { fileKey, fileUrl } = await upload(file, "category");

      setBannerUrl(fileUrl as any); // UI ke liye

      // IMPORTANT: agar tu key store karna chahta hai (recommended)
      // setForm((prev) => ({
      //   ...prev,
      //   bannerKey: fileKey,
      // }));

      toast.success("Image uploaded");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleHorizontalBanner = async (file?: File) => {
    if (!file) return;

    try {
      const { fileUrl } = await upload(file, "category");

      setHorizontalBannerUrl(fileUrl as any); // UI ke liye

      toast.success("Horizontal image uploaded");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full p-1">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900">
            Add Categories
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Organize your product hierarchy and manage structures.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="createCategory" onSubmit={(e) => submitHandler(e)}>
            <input type="hidden" name="parentId" value={parentId} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-slate-600 font-medium">Category Name</Label>
                  <Input
                    name="name"
                    placeholder="Enter Category Name"
                    className="h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-600 font-medium">
                    Parent Category
                  </Label>
                  <Select
                    name="type"
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select parent" />
                    </SelectTrigger>
                    <SelectContent>
                      {["kitchen", "bathroom"].map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-600 font-medium">Description</Label>
                  <Textarea
                    name="description"
                    placeholder="Enter Description"
                    className="min-h-[140px] resize-none"
                  />
                </div>
              </div>

              {/* Right Column - Image Upload Logic Updated */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-slate-600 font-medium">Category Image</Label>

                  {/* Purana drag-drop div hata kar naya component dala hai */}
                  {/* <ImageUpload onUploadSuccess={(url) => setBannerUrl(url)} /> */}
                  <div
                    onClick={() => bannerRef.current?.click()}
                    className="border-2 border-dashed rounded-xl h-48 flex items-center justify-center cursor-pointer relative overflow-hidden"
                  >
                    {!bannerUrl ? (
                      <p>Click to upload category image</p>
                    ) : (
                      <Image
                        src={bannerUrl}
                        alt="Category banner preview"
                        width={800}
                        height={400}
                        className="w-full h-full object-contain"
                      />
                    )}

                    {uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        Uploading...
                      </div>
                    )}
                  </div>

                  <input
                    ref={bannerRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleBanner(e.target.files?.[0])}
                  />


                  {bannerUrl && (
                    <p className="text-xs text-green-600 font-medium mt-2">
                      ✓ Image uploaded successfully
                    </p>
                  )}
                </div>

                <div className="space-y-3 mt-6">
                  <Label className="text-slate-600 font-medium">Horizontal Category Image</Label>

                  <div
                    onClick={() => horizontalBannerRef.current?.click()}
                    className="border-2 border-dashed rounded-xl h-48 flex items-center justify-center cursor-pointer relative overflow-hidden"
                  >
                    {!horizontalBannerUrl ? (
                      <p>Click to upload horizontal category image</p>
                    ) : (
                      <Image
                        src={horizontalBannerUrl}
                        alt="Horizontal category banner preview"
                        width={800}
                        height={400}
                        className="w-full h-full object-contain"
                      />
                    )}

                    {uploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        Uploading...
                      </div>
                    )}
                  </div>

                  <input
                    ref={horizontalBannerRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleHorizontalBanner(e.target.files?.[0])}
                  />

                  {horizontalBannerUrl && (
                    <p className="text-xs text-green-600 font-medium mt-2">
                      ✓ Horizontal image uploaded successfully
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 px-0 pt-10">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/category")}
                className="px-12 h-11 rounded-full border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                form="createCategory"
                className="px-12 h-11 rounded-full bg-[#2D5A5D] hover:bg-[#234749] text-white"
              >
                Add
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
