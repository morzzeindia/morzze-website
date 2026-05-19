import { NextResponse } from "next/server";

export async function GET() {
    const csvContent = `sku,slug,name,description,basePrice,strikethroughPrice,bannerImage,highlights,brand,hasVarientBox,minBoxQuintity,custimizeBoxInfo,isInStock,rateing5Star,rateing4Star,rateing3Star,rateing2Star,rateing1Star,size,flowType,mediaURLs,filters,attributes,variantBoxes,categoryIds

SKU-001,protein-powder,Protein Powder,Best whey protein,1999,2499,https://example.com/banner.jpg,"High Protein|Fast Recovery",ovy,true,5,"Customize Available",true,100,20,10,5,2,1kg,Chocolate,"https://example.com/1.jpg|https://example.com/2.jpg","Gym|Protein","Flavour:Chocolate|Weight:1kg","Starter Box:Good For Beginner:https://example.com/box.jpg","category-uuid-1|category-uuid-2"
`;

    return new NextResponse(csvContent, {
        status: 200,

        headers: {
            "Content-Type": "text/csv",

            "Content-Disposition":
                'attachment; filename="sample-products.csv"',
        },
    });
}