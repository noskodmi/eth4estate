"use client";

import { FC } from "react";
import { formatEther } from "viem";
import { Listing } from "../../utils/listingMocks";
import { PropertyInterface } from "../../utils/propertyMocks";

interface TenantPropertyDetailsProps {
  listing: Listing;
  property: PropertyInterface;
}

/**
 * Shows a tenant‐focused view, combining:
 *  • property metadata (title, description, location)
 *  • listing data (status, price, collateral)
 */
const TenantPropertyDetails: FC<TenantPropertyDetailsProps> = ({ listing, property }) => {
  return (
    <div className="space-y-6">
      {/* Image Placeholder */}
      <div className="w-full h-60 bg-gray-100 rounded-md flex items-center justify-center">
        <span className="text-gray-400">Image CID: {property.ipfsImageCid}</span>
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
        <p className="mt-1 text-sm">
          <span className="font-medium">Owner:</span>{" "}
          {listing.seller.slice(0, 6)}…{listing.seller.slice(-4)}
        </p>
        <p className="mt-2">
          <span className="font-medium">Status:</span>{" "}
          <span className="font-semibold">{listing.status}</span>
        </p>
      </div>

      {/* Price & Collateral */}
      {listing.listingType === "RENTAL" ? (
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
    </div>
  );
};

export default TenantPropertyDetails;
