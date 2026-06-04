import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProductsByCategorySlug, getCategoryBySlug } from "@/helper/category/action";
import Link from "next/link";
import CategoryProductsClient from "../../category/[slug]/CategoryProductsClient";

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const [categoryData, products] = await Promise.all([
        getCategoryBySlug(slug),
        getAllProductsByCategorySlug(slug),
    ]);

    if (!categoryData) {
        notFound();
    }

    return (
        <div className="bg-black min-h-screen">
            {/* Hero Banner */}
            <section className="relative h-[340px] md:h-[420px] overflow-hidden">
                {categoryData.bannerImage ? (
                    <Image
                        src={categoryData.bannerImage}
                        alt={categoryData.name ?? "Category"}
                        width={1600}
                        height={700}
                        className="w-full h-full object-cover opacity-50"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-black" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-10 left-6 md:left-14 right-6 z-10">
                    <nav className="flex items-center gap-2 text-[10px] md:text-xs text-white/50 mb-4 uppercase tracking-widest font-montserrat">
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span>&gt;</span>
                        <Link
                            href="/kitchen"
                            className="hover:text-white transition-colors"
                        >
                            Kitchen
                        </Link>
                        <span>&gt;</span>
                        <span className="text-[#FFBF3F]">{categoryData.name}</span>
                    </nav>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[#EDEBE9] font-montserrat">
                        {categoryData.name}
                    </h1>

                    {categoryData.description && (
                        <p className="text-white/50 text-sm md:text-base mt-3 max-w-2xl font-inter">
                            {categoryData.description}
                        </p>
                    )}

                    <p className="text-[#FFBF3F] text-xs md:text-sm mt-4 font-inter tracking-widest uppercase">
                        {products.length} {products.length === 1 ? "Product" : "Products"}
                    </p>
                </div>
            </section>

            {/* Products */}
            <section className="max-w-screen-2xl mx-auto px-6 md:px-10 py-12 md:py-16">
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-white/40 text-lg font-inter">
                            No products found in this category.
                        </p>
                        <Link
                            href="/category"
                            className="inline-block mt-6 text-[#FFBF3F] text-sm uppercase tracking-widest hover:underline font-inter"
                        >
                            ← Browse other categories
                        </Link>
                    </div>
                ) : (
                    <CategoryProductsClient products={products} categoryName={categoryData.name ?? ""} />
                )}
            </section>
        </div>
    );
}
