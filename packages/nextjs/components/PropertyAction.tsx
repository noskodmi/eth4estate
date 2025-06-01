"use client";

import { FC, useState } from "react";
import { Listing } from "../utils/listingMocks";
import Button from "./UI/Button";
import { useAccount } from "wagmi";

/**
 * Stubbed “Property Actions”:
 * - If the connected user is the seller (owner) and the listing is ACTIVE:
 *     - Show “Cancel Listing” button
 * - If the connected user is NOT the owner and listing is ACTIVE:
 *     - Show “Make Offer” button
 *
 * In all other cases, we render nothing.
 */
interface PropertyActionsProps {
  property: Listing;
}

const PropertyActions: FC<PropertyActionsProps> = ({ property }) => {
  const { address } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOwner = address?.toLowerCase() === property.seller.toLowerCase();

  const handleCancelListing = async () => {
    setIsSubmitting(true);
    try {
      // TODO: call your on‐chain function to cancel listing
      alert("Cancel listing (stub)");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel listing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMakeOffer = async () => {
    setIsSubmitting(true);
    try {
      // TODO: open a “Make Offer” modal or call on‐chain
      alert("Make offer (stub)");
    } catch (err) {
      console.error(err);
      alert("Failed to make offer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (property.status !== "ACTIVE") {
    return null;
  }

  return (
    <div className="space-x-4">
      {isOwner ? (
        <button onClick={handleCancelListing} disabled={isSubmitting} className="btn btn-error btn-md">
          <p className="">{isSubmitting ? "Cancelling…" : "Cancel Listing"}</p>
        </button>
      ) : (
        <Button
          onClick={handleMakeOffer}
          disabled={isSubmitting}
          // className="px-4 py-2 hover:bg-indigo-700"
        >
          {isSubmitting ? "Processing…" : "Make Offer"}
        </Button>
      )}
    </div>
  );
};

export default PropertyActions;
