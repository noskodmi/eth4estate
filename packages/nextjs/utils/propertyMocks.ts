/**
 * Defines the shape of a Property object.
 * Each property's `id` corresponds to the `propertyTokenId` used in the listings above.
 */
export interface PropertyInterface {
  id: number;               // corresponds to Listing.propertyTokenId
  title: string;            // human‐readable title of the property
  description: string;      // brief description of the property
  location: string;         // e.g., city, neighborhood, or address
  pricePerMonth: string;    // for RENTAL properties: rent per month, in ETH (string to parse)
  depositAmount: string;    // for RENTAL properties: deposit amount, in ETH
  ipfsImageCid: string;     // IPFS CID for an image of the property
  owner: string
  // You can expand with more fields if needed: amenities, availabilityDates, etc.
}

/**
 * A handful of example property mocks, whose `id` fields correspond exactly
 * to the `propertyTokenId` values used in `mockListings`. We start with the
 * 5 properties already referenced above (1001, 2002, 3003, 4004, 5005),
 * then add 3 apartment rentals (5‐bed, 4‐bed, 3‐bed) with propertyTokenIds
 * 6006, 7007, and 8008.
 */
export const mockProperties: PropertyInterface[] = [
  // ────────────────────────────────────────────────────────────────────────────────
  // Property corresponding to propertyTokenId = 1001 (SALE listing)
  {
    id: 1001,
    title: "Modern Townhouse in Downtown",
    description: "A bright, 2‐story townhouse with rooftop terrace, 3 beds & 2 baths.",
    location: "Prague 1, Old Town Square",
    pricePerMonth: "0",            // Not applicable for SALE
    depositAmount: "0",            // Not applicable for SALE
    ipfsImageCid: "QmTownhouseImgCidExample1",
    owner:"0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4"
  },

  // ────────────────────────────────────────────────────────────────────────────────
  // Property corresponding to propertyTokenId = 2002 (RENTAL listing)
  {
    id: 2002,
    title: "Cozy 1 Bedroom Flat",
    description: "Light‐filled 1BR flat with hardwood floors and river view.",
    location: "Prague 5, Smíchov",
    pricePerMonth: "1",            // 1 ETH per month
    depositAmount: "2",            // 2 ETH deposit
    ipfsImageCid: "QmFlatImgCidExample2",
    owner:"0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4"
  },

  // ────────────────────────────────────────────────────────────────────────────────
  // Property corresponding to propertyTokenId = 3003 (SALE listing, already sold)
  {
    id: 3003,
    title: "Spacious 4 Bedroom Villa",
    description: "Luxurious villa with garden, pool, and private parking.",
    location: "Prague 6, Dejvice",
    pricePerMonth: "0",            // Not applicable for SALE
    depositAmount: "0",            // Not applicable for SALE
    ipfsImageCid: "QmVillaImgCidExample3",
    owner:"0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4"
  },

  // ────────────────────────────────────────────────────────────────────────────────
  // Property corresponding to propertyTokenId = 4004 (RENTAL listing, cancelled)
  {
    id: 4004,
    title: "Downtown Studio Apt.",
    description: "Open‐plan studio, recently renovated, great for singles/couples.",
    location: "Prague 2, Vinohrady",
    pricePerMonth: "2",            // 2 ETH per month
    depositAmount: "0",            // Never taken (cancelled)
    ipfsImageCid: "QmStudioImgCidExample4",
    owner:"0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4"
  },

  // ────────────────────────────────────────────────────────────────────────────────
  // Property corresponding to propertyTokenId = 5005 (SALE listing, disputed)
  {
    id: 5005,
    title: "Historic 2 Bedroom Loft",
    description: "Charming loft in a 19th‐century building, exposed brick walls.",
    location: "Prague 1, Josefov",
    pricePerMonth: "0",            // Not applicable for SALE
    depositAmount: "0",            // Not applicable for SALE
    ipfsImageCid: "QmLoftImgCidExample5",
    owner:"0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4"
  },

  // ────────────────────────────────────────────────────────────────────────────────
  // New Rental: 5‐bedroom apartment
  {
    id: 6006,
    title: "Sprawling 5 Bedroom Apartment",
    description: "Five‐bedrooms, three baths, open kitchen, ideal for large families.",
    location: "Prague 4, Nusle",
    pricePerMonth: "3",            // 3 ETH per month
    depositAmount: "6",            // 6 ETH deposit
    ipfsImageCid: "Qm5BedAptImgCidExample6",
    owner:"0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4"
  },

  // ────────────────────────────────────────────────────────────────────────────────
  // New Rental: 4‐bedroom apartment
  {
    id: 7007,
    title: "Contemporary 4 Bedroom Apartment",
    description: "Four‐bedrooms with expansive living space, balcony, and city views.",
    location: "Prague 3, Žižkov",
    pricePerMonth: "2.5",          // 2.5 ETH per month
    depositAmount: "5",            // 5 ETH deposit
    ipfsImageCid: "Qm4BedAptImgCidExample7",
    owner:"0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4"
  },

  // ────────────────────────────────────────────────────────────────────────────────
  // New Rental: 3‐bedroom apartment
  {
    id: 8008,
    title: "Bright 3 Bedroom Apartment",
    description: "Three‐bedrooms, high ceilings, modern kitchen, near public transit.",
    location: "Prague 10, Strašnice",
    pricePerMonth: "2",            // 2 ETH per month
    depositAmount: "4",            // 4 ETH deposit
    ipfsImageCid: "Qm3BedAptImgCidExample8",
    owner:"0xe843f6aF66E56d3d8093b1134FaF2698C8721BA4"
  },
];

export function getProperty(id: string): PropertyInterface | null {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return null;

  const found = mockProperties.find((l) => l.id === numericId);
  return found ?? null;
}
