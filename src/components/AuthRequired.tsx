"use client";

import Link from "next/link";
import { useAuth } from "./AuthContext";

interface AuthRequiredProps {
  children: React.ReactNode;
  message?: string;
}

export function AuthRequired({ children, message = "to do this" }: AuthRequiredProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <div className="card p-6 text-center">
        <p className="text-gray-600 mb-4">
          Please sign in {message}
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/login" className="btn-secondary">
            Log in
          </Link>
          <Link href="/signup" className="btn-primary">
            Sign up
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export function SignInButton({ label = "Sign in to continue" }: { label?: string }) {
  const { user, loading } = useAuth();

  if (loading || user) {
    return null;
  }

  return (
    <Link href="/signup" className="btn-primary">
      {label}
    </Link>
  );
}

export function useRequireAuth() {
  const { user, loading } = useAuth();
  return { user, loading, isAuthenticated: !!user };
}
