// components/PropertyList/PropertyList.tsx

import { FC, useMemo, useState } from "react";
import Button from "./UI/Button";
import PropertyListItem from "./PropertyListItem";
import { mockListings, Listing } from "../utils/mocks";

interface Filters {
  searchText?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
}

interface PropertyListProps {
  filters: Filters;
}

const PropertyList: FC<PropertyListProps> = ({ filters }) => {
  const PAGE_SIZE = 3;
  const [page, setPage] = useState(0);

  const filteredListings: Listing[] = useMemo(() => {
    return mockListings.filter((listing) => {
      // Filter by status
      if (filters.status && listing.status !== filters.status) return false;

      // Filter by price (Wei string)
      const priceWei = BigInt(listing.price);
      if (
        typeof filters.minPrice === "number" &&
        priceWei < BigInt(Math.floor(filters.minPrice * 10 ** 18))
      ) {
        return false;
      }
      if (
        typeof filters.maxPrice === "number" &&
        priceWei > BigInt(Math.floor(filters.maxPrice * 10 ** 18))
      ) {
        return false;
      }

      // Filter by search text (seller address or tokenId)
      if (filters.searchText) {
        const lower = filters.searchText.toLowerCase();
        const matchesSeller = listing.seller.toLowerCase().includes(lower);
        const matchesId = listing.propertyTokenId.toString().includes(lower);
        if (!matchesSeller && !matchesId) return false;
      }

      return true;
    });
  }, [filters]);

  const paginatedListings: Listing[] = useMemo(() => {
    const start = page * PAGE_SIZE;
    return filteredListings.slice(start, start + PAGE_SIZE);
  }, [filteredListings, page]);

  const hasNextPage = (page + 1) * PAGE_SIZE < filteredListings.length;

  if (filteredListings.length === 0) {
    return (
      <p className="text-neutral-content/80">
        No properties match your criteria.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedListings.map((listing) => (
          <PropertyListItem
            key={listing.id}
            property={listing}
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center mt-8">
          <Button onClick={() => setPage((p) => p + 1)}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
};

export default PropertyList;
