// components/PropertyList/PropertyListItem.tsx

import { FC } from "react";
import Link from "next/link";
// import Image from "next/image";
import { formatEther } from "viem";
import { Listing } from "../utils/listingMocks";

interface PropertyListItemProps {
  property: Listing;
}

const PropertyListItem: FC<PropertyListItemProps> = ({ property }) => {
  // Dummy IPFS CID (replace with your real logic later)
  // const dummyImageCid = "QmMockCid" + property.propertyTokenId;

  // Badge styling based on listing type
  const isSale = property.listingType === "SALE";
  // In DaisyUI, you can use e.g. "badge badge-error" or "badge badge-success" etc.
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
      "
    >
      {/* Image Container */}
      <div className="relative h-48 w-full bg-neutral-content/10 group-hover:scale-105 transition-transform duration-300">
        {/* <Image
          src={`https://ipfs.io/ipfs/${dummyImageCid}`}
          alt={`Property #${property.propertyTokenId}`}
          fill
          style={{ objectFit: "cover" }}
        /> */}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{`#${property.propertyTokenId}`}</h3>
          <span className={`${badgeClass} text-xs`}>
            {badgeText}
          </span>
        </div>

        <p className="mt-2 text-sm">
          Seller:{" "}
          <span className="font-medium ">
            {property.seller.slice(0, 6)}…{property.seller.slice(-4)}
          </span>
        </p>

        <p className="mt-3 text-xl font-bold">
          {formatEther(BigInt(property.price))}{" "}
          {isSale ? "ETH" : "ETH/mo"}
        </p>

        <p className="mt-1 text-sm">
          Status:{" "}
          <span className="font-medium ">
            {property.status}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default PropertyListItem;
