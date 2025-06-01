// components/PropertyList/PropertyListItem.tsx
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Listing } from "../utils/listingMocks";
import { formatEther } from "viem";
import { getProperty } from "~~/utils/propertyMocks";

interface PropertyListItemProps {
  listing: Listing;
}

const PropertyListItem: FC<PropertyListItemProps> = ({ listing }) => {
  const isSale = listing.listingType === "SALE";
  const badgeClass = isSale ? "badge badge-error" : "badge badge-success";
  const badgeText = isSale ? "For Sale" : "For Rent";
  const property = getProperty(String(listing?.propertyTokenId));

  if (!listing || !property) {
    notFound();
  }

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="
        group block overflow-hidden rounded-xl  
         focus:outline-none focus:ring-2 focus:ring-primary
        bg-base-100 text-base-content shadow
        hover:shadow-lg transition-shadow duration-300

        /* Fill the parent’s height and use flex-col so mt-auto works if needed */
        h-full flex flex-col
      "
    >
      {/* Image Container */}
      <div className="relative h-48 w-full bg-neutral-content/10 group-hover:scale-105 transition-transform duration-300">
        <Image src={`${property.ipfsImageCid}`} alt={`Property #${property.id}`} fill style={{ objectFit: "cover" }} />
      </div>

      {/* ---------- REDUCED PADDING HERE ---------- */}
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">#{listing.propertyTokenId}</h3>
          <span className={`${badgeClass} text-xs`}>{badgeText}</span>
        </div>

        <p className="mt-2 text-sm">
          Seller:{" "}
          <span className="font-medium ">
            {listing.seller.slice(0, 6)}…{listing.seller.slice(-4)}
          </span>
        </p>

        <p className="mt-3 text-xl font-bold">
          {formatEther(BigInt(listing.price))} {isSale ? "ETH" : "ETH/mo"}
        </p>

        <p className="mt-1 text-sm">
          Status: <span className="font-medium ">{listing.status}</span>
        </p>
      </div>
    </Link>
  );
};

export default PropertyListItem;
