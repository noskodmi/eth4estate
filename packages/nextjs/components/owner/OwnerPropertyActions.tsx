"use client";

import { FC, useState } from "react";
import { Listing } from "../../utils/listingMocks";
import { PropertyInterface } from "../../utils/propertyMocks";
import Button from "../UI/Button";
import { useAccount } from "wagmi";

interface OwnerPropertyActionsProps {
  listing: Listing;
  property: PropertyInterface;
}

/**
 * Owner actions:
 *  • If listing is ACTIVE and user is owner:
 *      – RENTAL → “Cancel Rental Listing”
 *      – SALE   → “Cancel Sale Listing”
 *  • If listing is RENTAL, LEASED, and user is owner:
 *      – “End Lease”
 *  • Otherwise, render nothing.
 */
const OwnerPropertyActions: FC<OwnerPropertyActionsProps> = ({ listing, property }) => {
  const { address } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwner = address?.toLowerCase() === listing.seller.toLowerCase();
  const isActive = listing.status === "ACTIVE";
  const isRental = listing.listingType === "RENTAL";
  const isLeased = isRental && listing.currentTenant !== "0x0000000000000000000000000000000000000000";

  const handleCancelListing = async () => {
    setIsSubmitting(true);
    try {
      alert(`Cancelling listing for ${property.title} (stub)`);
    } catch (err) {
      console.error(err);
      alert("Failed to cancel.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndLease = async () => {
    setIsSubmitting(true);
    try {
      alert(`Ending lease on ${property.title} (stub)`);
    } catch (err) {
      console.error(err);
      alert("Failed to end lease.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOwner) return null;

  return (
    <div className="space-x-4 mt-4">
      {isActive && (
        <Button onClick={handleCancelListing} disabled={isSubmitting} className="btn btn-error">
          {isSubmitting ? "Processing…" : isRental ? "Cancel Rental Listing" : "Cancel Sale Listing"}
        </Button>
      )}

      {isLeased && (
        <Button onClick={handleEndLease} disabled={isSubmitting} className="btn btn-warning">
          {isSubmitting ? "Processing…" : "End Lease"}
        </Button>
      )}
    </div>
  );
};

export default OwnerPropertyActions;
