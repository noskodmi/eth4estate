// components/OfferList.tsx
"use client";

import { FC, useState } from "react";
import { formatEther } from "viem";

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// components/OfferList.tsx

// import { Listing } from "../utils/mocks";

/**
 * For now, this is a placeholder/stubbed list of offers.
 * You can replace it with real data (e.g., via a hook that fetches on‐chain offers).
 *
 * We’ll hardcode an empty array so it renders a “No offers” message.
 */
interface OfferListProps {
  propertyId: string;
}

interface MockOffer {
  id: string;
  amount: string; // Wei
  offeror: string;
  expiration: number; // UNIX timestamp
}

const OfferList: FC<OfferListProps> = ({}) => {
  const [offers] = useState<MockOffer[]>([]);

  // In a real app, you might do:
  // useEffect(() => {
  //   fetchOffersOnChain(propertyId).then((data) => setOffers(data));
  // }, [propertyId]);

  return (
    <div className="space-y-4">
      {offers.length === 0 ? (
        <p className="text-gray-500">No active offers for this property.</p>
      ) : (
        offers.map(offer => (
          <div key={offer.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm">
            <div>
              <p className="font-medium">{formatEther(BigInt(offer.amount))} ETH</p>
              <p className="text-xs text-gray-600">
                From: {offer.offeror.slice(0, 6)}…{offer.offeror.slice(-4)}
              </p>
              <p className="text-xs text-gray-600">Expires: {new Date(offer.expiration * 1000).toLocaleString()}</p>
            </div>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700" disabled>
              Accept
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default OfferList;
