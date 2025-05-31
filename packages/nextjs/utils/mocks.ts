// utils/mockListings.ts

/**
 * Enums (as strings) matching your Solidity definitions:
 * 
 * enum ListingType { SALE, RENTAL }
 * enum ListingStatus { ACTIVE, COMPLETED, CANCELLED, DISPUTED }
 */
type ListingType = "SALE" | "RENTAL";
type ListingStatus = "ACTIVE" | "COMPLETED" | "CANCELLED" | "DISPUTED";

/**
 * Mock “Listing” interface matching your Solidity struct:
 *
 * struct Listing {
 *   uint256 id;
 *   ListingType listingType;
 *   ListingStatus status;
 *   address seller; // or landlord for rentals
 *   uint256 propertyTokenId;
 *   uint256 price; // sale price or rent per period (in Wei)
 *   address paymentToken;
 *   address intermediary;
 *   uint256 createdAt; // UNIX timestamp (seconds)
 *   // Rental‐specific
 *   uint256 collateralAmount; // in Wei
 *   uint256 rentPeriod;       // seconds per rent period (e.g. 30 days → 2592000)
 *   address currentTenant;
 *   uint256 leaseStart; // UNIX timestamp (seconds)
 *   uint256 leaseEnd;   // UNIX timestamp (seconds)
 *   // Sale‐specific
 *   address buyer;
 *   uint256 escrowAmount; // in Wei
 *   address aToken;       // e.g. Aave aToken address
 * };
 */
export interface Listing {
  id: number;
  listingType: ListingType;
  status: ListingStatus;
  seller: string;
  propertyTokenId: number;
  price: string;          // Wei as decimal string
  paymentToken: string;
  intermediary: string;
  createdAt: number;      // UNIX timestamp (seconds)

  // Rental‐specific fields (unused for SALE listings)
  collateralAmount: string; // Wei as decimal string
  rentPeriod: number;       // in seconds
  currentTenant: string;
  leaseStart: number;       // UNIX timestamp (seconds)
  leaseEnd: number;         // UNIX timestamp (seconds)

  // Sale‐specific fields (unused for RENTAL listings)
  buyer: string;
  escrowAmount: string;     // Wei as decimal string
  aToken: string;
}

/**
 * A handful of example listings—both SALE and RENTAL.
 */
export const mockListings: Listing[] = [
  // ────────────────────────────────────────────────────────────────────────────────
  // 1) A simple SALE listing that is still ACTIVE
  {
    id: 1,
    listingType: "SALE",
    status: "ACTIVE",
    seller: "0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4",        // example seller
    propertyTokenId: 1001,
    price: "5000000000000000000",    // 5 ETH in Wei
    paymentToken: "0x0000000000000000000000000000000000000000", // ETH‐native (zero address)
    intermediary: "0x1111111111111111111111111111111111111111",  // example intermediary
    createdAt: 1725148800,           // Tue, 01 Jan 2025 00:00:00 GMT

    // Rental fields (ignored in a SALE listing)
    collateralAmount: "0",
    rentPeriod: 0,
    currentTenant: "0x0000000000000000000000000000000000000000",
    leaseStart: 0,
    leaseEnd: 0,

    // Sale‐specific fields
    buyer: "0x0000000000000000000000000000000000000000", // not yet purchased
    escrowAmount: "0",                                  // not yet in escrow
    aToken: "0x0000000000000000000000000000000000000000", // unused here
  },

  // ────────────────────────────────────────────────────────────────────────────────
  // 2) A RENTAL listing that has just started (ACTIVE)
  {
    id: 2,
    listingType: "RENTAL",
    status: "ACTIVE",
    seller: "0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4",        // landlord
    propertyTokenId: 2002,
    price: "1000000000000000000",   // 1 ETH per rentPeriod (in Wei)
    paymentToken: "0x0000000000000000000000000000000000000000", // native ETH
    intermediary: "0x2222222222222222222222222222222222222222",
    createdAt: 1725235200,          // Wed, 02 Jan 2025 00:00:00 GMT

    // Rental fields
    collateralAmount: "2000000000000000000", // 2 ETH deposit
    rentPeriod: 2592000,                      // 30 days in seconds
    currentTenant: "0xCcCcCcCcCcCcCcCcCcCcCcCcCcCcCcCcCcCcCcCc", // tenant
    leaseStart: 1725321600, // Thu, 03 Jan 2025 00:00:00 GMT
    leaseEnd: 1727984000,   // Fri, 31 Jan 2025 00:00:00 GMT

    // Sale‐specific fields (ignored in RENTAL listing)
    buyer: "0x0000000000000000000000000000000000000000",
    escrowAmount: "0",
    aToken: "0x0000000000000000000000000000000000000000",
  },

  // ────────────────────────────────────────────────────────────────────────────────
  // 3) A SALE listing that has already COMPLETED
  {
    id: 3,
    listingType: "SALE",
    status: "COMPLETED",
    seller: "0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4",        // original seller
    propertyTokenId: 3003,
    price: "7500000000000000000",    // 7.5 ETH
    paymentToken: "0x0000000000000000000000000000000000000000", // native ETH
    intermediary: "0x3333333333333333333333333333333333333333",
    createdAt: 1725417600,           // Fri, 04 Jan 2025 00:00:00 GMT

    // Rental fields (ignored)
    collateralAmount: "0",
    rentPeriod: 0,
    currentTenant: "0x0000000000000000000000000000000000000000",
    leaseStart: 0,
    leaseEnd: 0,

    // Sale‐specific fields
    buyer: "0xEeEeEeEeEeEeEeEeEeEeEeEeEeEeEeEeEeEeEeEe",  // actual buyer
    escrowAmount: "7500000000000000000",               // 7.5 ETH in escrow
    aToken: "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", // Example Aave aToken
  },

  // ────────────────────────────────────────────────────────────────────────────────
  // 4) A RENTAL listing that was CANCELLED before starting
  {
    id: 4,
    listingType: "RENTAL",
    status: "CANCELLED",
    seller: "0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4",        // landlord
    propertyTokenId: 4004,
    price: "2000000000000000000",   // 2 ETH per rentPeriod
    paymentToken: "0x0000000000000000000000000000000000000000",
    intermediary: "0x4444444444444444444444444444444444444444",
    createdAt: 1725504000,          // Sat, 05 Jan 2025 00:00:00 GMT

    // Rental fields (never taken)
    collateralAmount: "0",
    rentPeriod: 2592000,
    currentTenant: "0x0000000000000000000000000000000000000000",
    leaseStart: 0,
    leaseEnd: 0,

    // Sale‐specific fields (ignored)
    buyer: "0x0000000000000000000000000000000000000000",
    escrowAmount: "0",
    aToken: "0x0000000000000000000000000000000000000000",
  },

  // ────────────────────────────────────────────────────────────────────────────────
  // 5) A SALE listing that is now DISPUTED (maybe after PurchaseCommitted)
  {
    id: 5,
    listingType: "SALE",
    status: "DISPUTED",
    seller: "0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4",        // original seller
    propertyTokenId: 5005,
    price: "10000000000000000000",   // 10 ETH
    paymentToken: "0x0000000000000000000000000000000000000000",
    intermediary: "0x5555555555555555555555555555555555555555",
    createdAt: 1725590400,           // Sun, 06 Jan 2025 00:00:00 GMT

    // Rental fields (ignored)
    collateralAmount: "0",
    rentPeriod: 0,
    currentTenant: "0x0000000000000000000000000000000000000000",
    leaseStart: 0,
    leaseEnd: 0,

    // Sale‐specific fields
    buyer: "0x7777777777777777777777777777777777777777",  // committed buyer
    escrowAmount: "10000000000000000000",                // 10 ETH in escrow
    aToken: "0xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", // aToken address
  },
];
