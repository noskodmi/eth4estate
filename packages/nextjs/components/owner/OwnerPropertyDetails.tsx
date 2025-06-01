"use client";

import { FC } from "react";
import Image from "next/image";
import { Listing } from "../../utils/listingMocks";
import { PropertyInterface } from "../../utils/propertyMocks";
import { formatEther } from "viem";

interface OwnerPropertyDetailsProps {
  listing: Listing;
  property: PropertyInterface;
}

/**
 * Shows an owner‐focused view, combining:
 *  • property metadata (title, description, location)
 *  • listing data (status, price, collateral, tenant/buyer info)
 */
const OwnerPropertyDetails: FC<OwnerPropertyDetailsProps> = ({ listing, property }) => {
  const isRental = listing.listingType === "RENTAL";
  const isLeased = isRental && listing.currentTenant !== "0x0000000000000000000000000000000000000000";
  const isSale = listing.listingType === "SALE";
  const hasBuyer = isSale && listing.buyer !== "0x0000000000000000000000000000000000000000";

  return (
    <div className="space-y-6">
      {/* Image Placeholder */}
      <div
        className="
            relative 
            w-full 
            h-80            /* default height on very small screens */
            sm:h-96         /* slightly taller on small (≥640px) screens */
            md:h-112         /* even taller on medium (≥768px) screens */
            lg:h-128        /* large (≥1024px) screens */
            xl:h-128        /* extra-large (≥1280px) screens */
            bg-neutral-content/10 
            group-hover:scale-105 
            transition-transform 
            duration-300
          "
      >
        <Image src={`${property.ipfsImageCid}`} alt={`Property #${property.id}`} fill style={{ objectFit: "cover" }} />
      </div>
      {/* Property Metadata */}
      <div>
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <p className="mt-1 text-gray-600">{property.description}</p>
        <p className="mt-2 text-sm">
          <span className="font-medium">Location:</span> {property.location}
        </p>
      </div>

      <hr className="border-neutral‐200" />

      {/* Listing‐specific Details */}
      <div>
        <p className="mt-1">
          <span className="font-medium">Status:</span> <span className="font-semibold">{listing.status}</span>
        </p>
      </div>

      {/* Price / Rent & Collateral */}
      {isRental ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Monthly Rent</p>
            <p>{formatEther(BigInt(listing.price))} ETH</p>
          </div>
          <div>
            <p className="font-medium">Deposit</p>
            <p>{formatEther(BigInt(listing.collateralAmount))} ETH</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-medium">Sale Price</p>
          <p>{formatEther(BigInt(listing.price))} ETH</p>
        </div>
      )}

      {/* Tenant / Buyer Info */}
      {isLeased && (
        <p className="mt-2">
          <span className="font-medium">Current Tenant:</span> {listing.currentTenant.slice(0, 6)}…
          {listing.currentTenant.slice(-4)}
        </p>
      )}
      {hasBuyer && (
        <p className="mt-2">
          <span className="font-medium">Buyer:</span> {listing.buyer.slice(0, 6)}…{listing.buyer.slice(-4)}
        </p>
      )}
    </div>
  );
};

export default OwnerPropertyDetails;
