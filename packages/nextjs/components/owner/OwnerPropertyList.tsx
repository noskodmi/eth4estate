// Somewhere in a parent component or page:
import { FC } from "react";
import PropertyListItem from "./OwnerProperyListItem";
import { PropertyInterface } from "~~/utils/propertyMocks";

const PropertyList: FC<{ properties: PropertyInterface[] }> = ({ properties }) => {
  return (
    <ul className="divide-y divide-neutral-content/10">
      {properties.map(prop => (
        <PropertyListItem key={prop.id} property={prop} />
      ))}
    </ul>
  );
};

export default PropertyList;
