
// "use client";

// import { FC, useEffect, useState } from "react";
// import { Listing } from "../../utils/listingMocks";

// /**
//  * Stubbed list of all offers submitted to this listing,
//  * visible to the owner so they can accept/decline in a real app.
//  */
// interface Offer {
//   id: number;
//   listingId: number;
//   tenant: string;
//   offerAmountWei: string;
//   timestamp: number;
// }

// interface OwnerOfferListProps {
//   listingId: number;
// }

// const OwnerOfferList: FC<OwnerOfferListProps> = ({ listingId }) => {
//   const [offers, setOffers] = useState<Offer[]>([]);

//   useEffect(() => {
//     // Stub: load all offers for this listing
//     const mock: Offer[] = [
//       {
//         id: 1,
//         listingId,
//         tenant: "0xAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAaAa",
//         offerAmountWei: "1000000000000000000",
//         timestamp: 1725321600,
//       },
//       {
//         id: 2,
//         listingId,
//         tenant: "0xBbBbBbBbBbBbBbBbBbBbBbBbBbBbBbBbBbBbBbBb",
//         offerAmountWei: "1200000000000000000",
//         timestamp: 1725408000,
//       },
//     ];
//     setOffers(mock);
//   }, [listingId]);

//   if (offers.length === 0) {
//     return (
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Offers Received</h2>
//         <p className="text-gray-600">No offers have been submitted yet.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-8">
//       <h2 className="text-2xl font-semibold mb-4">Offers Received</h2>
//       <ul className="space-y-4">
//         {offers.map((offer) => (
//           <li key={offer.id} className="p-4 border rounded-lg flex justify-between items-center">
//             <div>
//               <p>
//                 <span className="font-medium">Offer ID:</span> {offer.id}
//               </p>
//               <p>
//                 <span className="font-medium">Tenant:</span>{" "}
//                 {offer.tenant.slice(0, 6)}…{offer.tenant.slice(-4)}
//               </p>
//               <p>
//                 <span className="font-medium">Amount:</span>{" "}
//                 {Number(offer.offerAmountWei) / 1e18} ETH
//               </p>
//               <p className="text-sm text-gray-500">
//                 {new Date(offer.timestamp * 1000).toLocaleString()}
//               </p>
//             </div>
//             <div className="space-x-2">
//               <button
//                 className="btn btn-success btn-sm"
//                 onClick={() => alert(`Accepting offer ${offer.id} (stub)`)}
//               >
//                 Accept
//               </button>
//               <button
//                 className="btn btn-error btn-sm"
//                 onClick={() => alert(`Declining offer ${offer.id} (stub)`)}
//               >
//                 Decline
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default OwnerOfferList;
