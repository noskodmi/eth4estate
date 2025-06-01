// app/property/[property]/tenant/page.tsx
import { notFound } from "next/navigation";
import TenantPropertyActions from "~~/components/tenant/TenantPropertyActions";
import TenantPropertyDetails from "~~/components/tenant/TenantPropertyDetails";
import { Listing, getPropertyListing } from "~~/utils/listingMocks";
import { PropertyInterface, getProperty } from "~~/utils/propertyMocks";

type PageProps = {
  params: Promise<{ listingId: string }>;
};

export default async function TenantPropertyPage(props: PageProps) {
  const { listingId } = await props.params;
  console.log("listingId", listingId);
  const listing: Listing | null = getPropertyListing(listingId);
  const property: PropertyInterface | null = getProperty(String(listing?.propertyTokenId));

  if (!listing || !property) {
    notFound();
  }

  return (
    <div className=" mx-12 mt-12 p-6 bg-base-100 rounded-xl border-neutral shadow-sm">
      <TenantPropertyDetails listing={listing} property={property} />

      <div className="mt-8">
        <TenantPropertyActions listing={listing} property={property} />
      </div>
    </div>
  );
}
