import CatalogueForm from "@/components/admin/CatalogueForm";

export default function NewCataloguePage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <CatalogueForm mode="create" />
    </div>
  );
}
