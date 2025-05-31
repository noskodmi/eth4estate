"use client";

import { useState } from "react";
// import PropertyFilter from "../components/PropertyFilter";
import PropertyList from "../components/PropertyList";
import { NextPage } from "next";

interface Filters {
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  searchText?: string;
  // add more as needed
}

const Home: NextPage = () => {
  const [filters] = useState<Filters>({});

  return (
    <div className=" mx-auto mt-12">
      <h1 className="text-3xl font-bold mb-6">Find Properties</h1>
      {/* 
      <PropertyFilter
        initialFilters={filters}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      /> */}

      <div className="mt-8">
        <PropertyList filters={filters} />
      </div>
    </div>
  );
};

export default Home;
