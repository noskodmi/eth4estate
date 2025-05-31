
import { Listing, mockListings } from "./mocks";

/**
 * getProperty(id: string) → returns either a Listing or null.
 * In a real app, you would:
 *   1) Convert `id` to a BigInt or number
 *   2) Call `useContractRead` / `viem` to fetch on‐chain
 *   3) Or query your backend / subgraph
 */
export function getProperty(id: string): Listing | null {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return null;

  const found = mockListings.find((l) => l.propertyTokenId === numericId);
  return found ?? null;
}
