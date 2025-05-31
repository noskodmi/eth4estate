// components/PropertyList/PropertyFilter.tsx
import { FC, useState, useEffect } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
import Input from "./UI/Input";

interface Filters {
  searchText?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
}

interface PropertyFilterProps {
  initialFilters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const PropertyFilter: FC<PropertyFilterProps> = ({
  initialFilters,
  onFilterChange,
}) => {
  const [searchText, setSearchText] = useState(initialFilters.searchText || "");
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || 0);
  const [status, setStatus] = useState(initialFilters.status || "");

  const debouncedSearch = useDebounce(searchText, 500);

  useEffect(() => {
    onFilterChange({ searchText: debouncedSearch, minPrice, maxPrice, status });
  }, [debouncedSearch, minPrice, maxPrice, status, onFilterChange]);

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <Input
            type="text"
            placeholder="Title or Location"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Min Price (ETH)</label>
          <Input
            type="number"
            step="0.0001"
            value={minPrice || ""}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Price (ETH)</label>
          <Input
            type="number"
            step="0.0001"
            value={maxPrice || ""}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            className="w-full border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-200"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="LISTED">Listed</option>
            <option value="NOT_LISTED">Not Listed</option>
            <option value="RENTED">Rented</option>
            <option value="UNDER_OFFER">Under Offer</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
