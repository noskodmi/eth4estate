// app/property/[property]/page.tsx
import { notFound } from "next/navigation";
import OfferList from "../../../components/OfferList";
import PropertyActions from "../../../components/PropertyAction";
import PropertyDetails from "../../../components/PropertyDetails";
import { getProperty } from "../../../utils/propertyMock";

interface PropertyPageProps {
  params: { property: string };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  // getProperty should return `null` or `undefined` if not found, or a Listing object if found.
  const property = await getProperty(params.property);

  if (!property) {
    notFound();
  }

  return (
    <div
      className="max-w-3xl mx-auto mt-12 p-6 border rounded-lg  
        border-neutral shadow-sm"
    >
      <PropertyDetails property={property} />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Offers</h2>
        <OfferList propertyId={params.property} />
      </div>

      <div className="mt-8">
        <PropertyActions property={property} />
      </div>
    </div>
  );
}
