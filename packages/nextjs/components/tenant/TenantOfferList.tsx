// "use client";

// import { FC, useEffect, useState } from "react";
// import { Listing } from "../../utils/listingMocks";

// /**
//  * Stubbed list of offers that a tenant can view (e.g., their own past applications).
//  * In a real app, you would fetch this from a subgraph or on‐chain indexing service.
//  */
// interface Offer {
//   id: number;
//   listingId: number;
//   tenant: string;
//   offerAmountWei: string;
//   timestamp: number;
// }

// interface TenantOfferListProps {
//   listingId: number;
// }

// const TenantOfferList: FC<TenantOfferListProps> = ({ listingId }) => {
//   const [offers, setOffers] = useState<Offer[]>([]);

//   useEffect(() => {
//     // Stub: load offers for this tenant and listingId
//     // In practice, filter by current user address + listingId
//     const mock: Offer[] = [
//       {
//         id: 1,
//         listingId,
//         tenant: "0xAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAa",
//         offerAmountWei: "1000000000000000000",
//         timestamp: 1725321600,
//       },
//     ];
//     setOffers(mock);
//   }, [listingId]);

//   if (offers.length === 0) {
//     return (
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Your Offers</h2>
//         <p className="text-gray-600">You haven’t made any offers yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-8">
//       <h2 className="text-2xl font-semibold mb-4">Your Offers</h2>
//       <ul className="space-y-4">
//         {offers.map((offer) => (
//           <li key={offer.id} className="p-4 border rounded-xl">
//             <p>
//               <span className="font-medium">Offer ID:</span> {offer.id}
//             </p>
//             <p>
//               <span className="font-medium">Amount:</span>{" "}
//               {Number(offer.offerAmountWei) / 1e18} ETH
//             </p>
//             <p>
//               <span className="font-medium">Date:</span>{" "}
//               {new Date(offer.timestamp * 1000).toLocaleDateString()}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TenantOfferList;
