// components/Property/PropertyValidator.tsx
import { FC, useEffect } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import contractAbi from "../../utils/constants/PropertyContract.json"; // ABI for your on‐chain property contract
import { ethers } from "ethers";
import Button from "./UI/Button";
import toast from "react-hot-toast";
import { PropertyFormData } from "./PropertyForm";

interface PropertyValidatorProps {
  formData: PropertyFormData;
  onSuccess: () => void;
  onBack: () => void;
}

const PropertyValidator: FC<PropertyValidatorProps> = ({ formData, onSuccess, onBack }) => {
  // Prepare the contract write
  const { config, error: prepareError } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_PROPERTY_CONTRACT as `0x${string}`,
    abi: contractAbi,
    functionName: "createProperty", // your contract function
    args: [
      formData.ipfsImageCid,
      formData.title,
      formData.description,
      ethers.utils.parseEther(formData.pricePerMonth),
      ethers.utils.parseEther(formData.depositAmount),
      formData.location,
    ],
    overrides: {
      gasLimit: 300_000,
    },
  });

  const { write, data: txData, isLoading: isTxLoading, isSuccess: isTxSuccess } =
    useContractWrite(config);

  useEffect(() => {
    if (isTxSuccess) {
      toast.success("Transaction confirmed! Property created on‐chain.");
      onSuccess();
    }
  }, [isTxSuccess, onSuccess]);

  return (
    <div className="space-y-6">
      {prepareError && <p className="text-red-500">Error: {prepareError.message}</p>}
      <Button
        onClick={() => write?.()}
        disabled={!write || isTxLoading}
      >
        {isTxLoading ? "Waiting for Confirmation…" : "Confirm Transaction"}
      </Button>
      <Button variant="ghost" onClick={onBack} disabled={isTxLoading}>
        Back to Edit
      </Button>
      {txData && (
        <p className="text-sm text-gray-600">
          Tx Hash:{" "}
          <a
            href={`https://etherscan.io/tx/${txData.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {txData.hash.slice(0, 6)}…{txData.hash.slice(-4)}
          </a>
        </p>
      )}
    </div>
  );
};

export default PropertyValidator;
