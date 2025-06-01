// app/property/[property]/owner/page.tsx
import { notFound } from "next/navigation";
import OwnerPropertyActions from "~~/components/owner/OwnerPropertyActions";
import OwnerPropertyDetails from "~~/components/owner/OwnerPropertyDetails";
import { Listing, getPropertyListingByPropertyId } from "~~/utils/listingMocks";
import { PropertyInterface, getProperty } from "~~/utils/propertyMocks";

type PageProps = {
  params: Promise<{ propertyId: string }>;
};

export default async function OwnerPropertyPage(props: PageProps) {
  const { propertyId } = await props.params;
  const listing: Listing | null = getPropertyListingByPropertyId(propertyId);
  const property: PropertyInterface | null = getProperty(propertyId);

  if (!listing || !property) {
    notFound();
  }

  return (
    <div className="mx-12 mt-12 p-6 bg-base-100 rounded-xl border-neutral shadow-sm">
      <OwnerPropertyDetails listing={listing} property={property} />

      <div className="mt-8">
        <OwnerPropertyActions listing={listing} property={property} />
      </div>
    </div>
  );
}
