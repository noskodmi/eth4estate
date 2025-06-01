// components/PropertyDetails.tsx
"use client";

// if you plan to use any client‐only hooks or state; otherwise remove this line
import { FC } from "react";
import { Listing } from "../utils/listingMocks";
// import Image from "next/image";
import { formatEther } from "viem";

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

// components/PropertyDetails.tsx

interface PropertyDetailsProps {
  property: Listing;
}

/**
 * Displays the main details of a single property:
 * - Image (dummy IPFS CID derived from propertyTokenId)
 * - Title / ID
 * - Seller
 * - Status
 * - Price / Deposit (formatted from Wei → ETH)
 */
const PropertyDetails: FC<PropertyDetailsProps> = ({ property }) => {
  // For demo purposes, we generate a dummy IPFS CID based on propertyTokenId.
  // In a real app, you would fetch the actual IPFS metadata/CID somewhere.
  // const dummyImageCid = "QmMockCid" + property.propertyTokenId;

  return (
    <div className="space-y-6">
      {/* Image */}
      <div className="w-full h-80 relative rounded-md overflow-hidden">
        {/* <Image
          src={`https://ipfs.io/ipfs/${dummyImageCid}`}
          alt={`Property #${property.propertyTokenId}`}
          fill
          style={{ objectFit: "cover" }}
        /> */}
      </div>

      {/* Textual Details */}
      <div>
        <h1 className="text-3xl font-bold">Property #{property.propertyTokenId}</h1>
        <p className=" mt-1">
          Seller: {property.seller.slice(0, 6)}…{property.seller.slice(-4)}
        </p>
        <p className="mt-2 text-lg">
          Status: <span className="font-semibold">{property.status}</span>
        </p>
      </div>

      {/* Price & Deposit */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-medium">Price</p>
          <p className="">{formatEther(BigInt(property.price))} ETH</p>
        </div>
        {property.listingType === "RENTAL" && (
          <div>
            <p className="font-medium">Collateral</p>
            <p className="text-gray-700">{formatEther(BigInt(property.collateralAmount))} ETH</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
