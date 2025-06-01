import LoginForm from "../components/LoginForm";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-4 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
      {/* If using on-chain wallet only: */}
      <div className="mb-6">
        <ConnectButton showBalance={false} />
      </div>

      {/* Optional: Email/Pass form */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
