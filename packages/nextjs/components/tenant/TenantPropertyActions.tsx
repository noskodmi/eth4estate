"use client";

import { FC, useState } from "react";
import { Listing } from "../../utils/listingMocks";
import { PropertyInterface } from "../../utils/propertyMocks";
import Button from "../UI/Button";
import { useAccount } from "wagmi";

interface TenantPropertyActionsProps {
  listing: Listing;
  property: PropertyInterface;
}

/**
 * Tenant actions:
 *  • If listing is ACTIVE and user is not the owner:
 *      – RENTAL → “Apply to Rent”
 *      – SALE   → “Submit Purchase Offer”
 *  • Otherwise, render nothing.
 */
const TenantPropertyActions: FC<TenantPropertyActionsProps> = ({ listing, property }) => {
  const { address } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwner = address?.toLowerCase() === listing.seller.toLowerCase();
  const isActive = listing.status === "ACTIVE";

  const handleApply = async () => {
    setIsSubmitting(true);
    try {
      if (listing.listingType === "RENTAL") {
        alert(`Applying to rent ${property.title} (stub)`);
      } else {
        alert(`Submitting offer for ${property.title} (stub)`);
      }
    } catch (err) {
      console.error(err);
      alert("Action failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isActive || isOwner) return null;

  return (
    <div className="space-x-4 mt-4">
      <Button onClick={handleApply} disabled={isSubmitting}>
        {isSubmitting
          ? listing.listingType === "RENTAL"
            ? "Applying…"
            : "Processing…"
          : listing.listingType === "RENTAL"
          ? "Apply to Rent"
          : "Submit Offer"}
      </Button>
    </div>
  );
};

export default TenantPropertyActions;
