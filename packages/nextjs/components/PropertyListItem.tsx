// components/PropertyList/PropertyListItem.tsx
import { FC } from "react";
import Link from "next/link";
import { Listing } from "../utils/listingMocks";
// import Image from "next/image";
import { formatEther } from "viem";

interface PropertyListItemProps {
  property: Listing;
}

const PropertyListItem: FC<PropertyListItemProps> = ({ property }) => {
  const isSale = property.listingType === "SALE";
  const badgeClass = isSale ? "badge badge-error" : "badge badge-success";
  const badgeText = isSale ? "For Sale" : "For Rent";

  return (
    <Link
      href={`/listing/${property.id}`}
      className="
        group block overflow-hidden rounded-lg border 
        border-neutral focus:outline-none focus:ring-2 focus:ring-primary
        bg-base-100 text-base-content shadow
        hover:shadow-lg transition-shadow duration-300

        /* Fill the parent’s height and use flex-col so mt-auto works if needed */
        h-full flex flex-col
      "
    >
      {/* Image Container */}
      <div className="relative h-48 w-full bg-neutral-content/10 group-hover:scale-105 transition-transform duration-300">
        {/* <Image
          src={`https://ipfs.io/ipfs/${property.ipfsCid}`}
          alt={`Property #${property.propertyTokenId}`}
          fill
          style={{ objectFit: "cover" }}
        /> */}
      </div>

      {/* ---------- REDUCED PADDING HERE ---------- */}
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">#{property.propertyTokenId}</h3>
          <span className={`${badgeClass} text-xs`}>{badgeText}</span>
        </div>

        <p className="mt-2 text-sm">
          Seller:{" "}
          <span className="font-medium ">
            {property.seller.slice(0, 6)}…{property.seller.slice(-4)}
          </span>
        </p>

        <p className="mt-3 text-xl font-bold">
          {formatEther(BigInt(property.price))} {isSale ? "ETH" : "ETH/mo"}
        </p>

        <p className="mt-1 text-sm">
          Status: <span className="font-medium ">{property.status}</span>
        </p>
      </div>
    </Link>
  );
};

export default PropertyListItem;
