"use client";
import { useState } from "react";
import PropertyForm, { PropertyFormData } from "../../../components/PropertyForm";
// import PropertyValidator from "../../../components/PropertyValidator";

type Step = "form" | "validate" | "complete";

const CreateProperty = () => {
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<PropertyFormData | null>(null);

  return (
    <div className="mx-auto max-w-2xl mt-12 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-8">Create &amp; Validate Property</h1>

      {step === "form" && (
        <PropertyForm
          onSubmit={(data) => {
            setFormData(data);
            setStep("validate");
          }}
        />
      )}

      {/* {step === "validate" && formData && (
        <PropertyValidator
          formData={formData}
          onSuccess={() => setStep("complete")}
          onBack={() => setStep("form")}
        />
      )} */}

      {step === "complete" && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Property Created!</h2>
          <p className="mb-6">Your property has been successfully registered on-chain.</p>
          {/* <a
            href={`/property/${formData?.propertyId}`}
            className="inline-block text-blue-600 hover:underline"
          >
            View Property Details
          </a> */}
        </div>
      )}
    </div>
  );
};

export default CreateProperty;
