"use client";

import { FC } from "react";
import Link from "next/link";
import { PropertyInterface } from "~~/utils/propertyMocks";

interface PropertyListItemProps {
  property: PropertyInterface;
}

/**
 * Renders a single <li> showing:
 *  • ID
 *  • Location
 * Clicking the row navigates to /property/[id].
 */
const PropertyListItem: FC<PropertyListItemProps> = ({ property }) => {
  return (
    <li className="py-2 border-b last:border-none">
      <Link
        href={`/property/${property.id}`}
        className="flex justify-between px-2 py-1 hover:bg-base-200 rounded-md"
      >
        <span className="font-medium">#{property.id}</span>
        <span className="">{property.location}</span>
      </Link>
    </li>
  );
};

export default PropertyListItem;
