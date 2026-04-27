"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../_components/AuthProvider";

export default function LoginPage() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const { login } = useAuth();
  const router    = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    if (login(email.trim(), password)) {
      router.push("/dashboard");
    } else {
      setError("That email and password don't match. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <main id="main-content" className="w-full max-w-md">
        {/* Welcome */}
        <div className="text-center mb-10">
          <span className="text-6xl inline-block" aria-hidden="true">☕</span>
          <h1 className="font-serif text-4xl font-bold text-stone-900 mt-4">
            Welcome back
          </h1>
          <p className="text-stone-600 mt-2 text-base">
            Sign in to your Campus Companion
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8 hc-card">
          <form onSubmit={handleSubmit} noValidate aria-label="Sign in form">
            {error && (
              <div role="alert" className="mb-6 bg-rose-50 border-2 border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-base hc-card">
                {error}
              </div>
            )}

            <div className="mb-5">
              <label htmlFor="email" className="block text-base font-semibold text-stone-800 mb-2">
                Student email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="you@campus.ie"
                className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition"
              />
            </div>

            <div className="mb-7">
              <label htmlFor="password" className="block text-base font-semibold text-stone-800 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full border-2 border-stone-200 rounded-xl px-4 py-3 text-base bg-white focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-100 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full bg-rose-500 hover:bg-rose-600 disabled:opacity-60 text-white text-base font-semibold py-3.5 rounded-xl min-h-[48px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        {/* Demo creds */}
        <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-2xl px-5 py-4 text-base text-amber-900 hc-card">
          <p className="font-semibold mb-2">Try a demo account</p>
          <p className="leading-relaxed">
            <span className="font-medium">Email:</span> emma.murphy@campus.ie<br />
            <span className="font-medium">Password:</span> campus123
          </p>
          <p className="mt-2 text-amber-800 text-sm">
            or ciaran.walsh@campus.ie / campus123
          </p>
        </div>
      </main>
    </div>
  );
}
