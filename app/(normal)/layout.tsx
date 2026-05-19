import Header from "@/components/commom/header"
import Footer from "@/components/commom/footer"
import { getCategories } from "@/helper/category/action"

export default async function Layout({ children }: {
    children: React.ReactNode
}) {
    const categories = await getCategories();

    return <>
        <Header />
        {children}
        <Footer categories={categories} />
    </>
}