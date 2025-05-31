
"use client";

import { FC, useMemo } from "react";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";
import PropertyListItem from "../../components/PropertyListItem";
import { mockListings, Listing } from "../../utils/mocks";

const AccountPage: FC = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  console.log('address',address)
  // Filter mockListings for those where seller === address
  const ownedProperties: Listing[] = useMemo(() => {
    if (!address) return [];
    return mockListings.filter(
      (listing) => listing.seller.toLowerCase() === address.toLowerCase()
    );
  }, [address]);

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* ================================ */}
        {/* 1) Account & KYC Section       */}
        {/* ================================ */}
        <section className="bg-base-100 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-neutral-content mb-4">
            Account Info
          </h2>

          {!isConnected ? (
            <p className="text-neutral-content/80">
              You are not connected. Please connect your wallet to view your
              account details.
            </p>
          ) : (
            <div className="space-y-4">
              {/* Wallet Address */}
              <div>
                <p className="text-sm text-neutral-content/80">Connected as:</p>
                <p className="font-mono text-lg text-neutral-content">
                  {`${address?.slice(0, 6)}…${address?.slice(-4)}`}
                </p>
              </div>

              {/* KYC Status (Placeholder) */}
              <div>
                <p className="text-sm text-neutral-content/80">KYC Status:</p>
                <p className="inline-flex items-center font-medium text-neutral-content">
                  <span className="badge badge-info mr-2">Pending</span>
                  {/* Replace the above “Pending” with real status when available */}
                  <span className="text-sm text-neutral-content/80">
                    You have not submitted KYC yet.
                  </span>
                  {/* You could add a “Submit KYC” button here */}
                </p>
              </div>

              {/* Disconnect Button */}
              <div>
                <button
                  onClick={() => disconnect()}
                  className="btn btn-ghost text-sm text-error"
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          )}
        </section>

        {/* ==================================== */}
        {/* 2) Owned Properties + Create Button */}
        {/* ==================================== */}
        <section className="bg-base-100 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-content">
              Your Properties
            </h2>
            <Link href="/property/create" className="btn btn-primary btn-sm">
              + Create New Property
            </Link>
          </div>

          {(!isConnected || ownedProperties.length === 0) && isConnected ? (
            <p className="text-neutral-content/80">
              You don’t own any properties yet. Click “Create New Property” to
              list one.
            </p>
          ) : !isConnected ? (
            <p className="text-neutral-content/80">
              Connect your wallet to see your owned properties.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownedProperties.map((prop) => (
                <PropertyListItem key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AccountPage;
