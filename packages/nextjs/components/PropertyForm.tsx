// components/Property/PropertyForm.tsx
import { FC, useState } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
// import { uploadFileToIPFS } from "./../utils/api";  // wrap kubo-rpc-client or bgipfs
import toast from "react-hot-toast";

export interface PropertyFormData {
  title: string;
  description: string;
  location: string;
  pricePerMonth: string; // in ETH (string to parse)
  depositAmount: string; // in ETH
  ipfsImageCid: string; // returned from IPFS
  // you can expand with more fields: availabilityDates, amenities, etc.
}

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
}

const PropertyForm: FC<PropertyFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [pricePerMonth, setPricePerMonth] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!title || !description || !location || !pricePerMonth || !depositAmount || !imageFile) {
      toast.error("Please fill in all fields and select an image.");
      return;
    }

    try {
      setIsUploading(true);
      // 1. Upload imageFile to IPFS
      // const cid = await uploadFileToIPFS(imageFile); // return a string like "bafy…"
      // 2. Build form data
      const data: PropertyFormData = {
        title,
        description,
        location,
        pricePerMonth, // you might convert to Wei later in validator
        depositAmount,
        ipfsImageCid: "cid",
      };
      onSubmit(data);
    } catch (err: any) {
      console.error("IPFS upload error:", err);
      toast.error("Failed to upload image to IPFS.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <Input
          type="text"
          placeholder="Charming Studio in Prague"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-200"
          placeholder="A cozy apartment near Old Town..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Location (Address)</label>
        <Input
          type="text"
          placeholder="Karlova 12, Prague 1"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Price per Month (ETH)</label>
          <Input
            type="number"
            step="0.0001"
            placeholder="0.1"
            value={pricePerMonth}
            onChange={e => setPricePerMonth(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Deposit Amount (ETH)</label>
          <Input
            type="number"
            step="0.0001"
            placeholder="0.2"
            value={depositAmount}
            onChange={e => setDepositAmount(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Property Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="block" />
      </div>

      <Button type="submit" disabled={isUploading}>
        {isUploading ? "Uploading Image…" : "Proceed to Validation"}
      </Button>
    </form>
  );
};

export default PropertyForm;
