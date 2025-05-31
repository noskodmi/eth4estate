import { FC, useState } from "react";
import { useRouter } from "next/router";

// interface LoginFormProps {}

const LoginForm: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Call your backend API, e.g. POST /api/auth/login
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login failed.");
      // On success, redirect to /properties
      router.push("/properties");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing In…" : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
