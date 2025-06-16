import { MountainSnow } from "lucide-react";
import Link from "next/link";

export function Logo({ size = "md", className }: { size?: "sm" | "md" | "lg", className?: string }) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };
  return (
    <Link href="/" className={`flex items-center gap-2 font-bold ${sizeClasses[size]} text-primary ${className || ''}`} aria-label="Nation Quest Home">
      <MountainSnow className="h-6 w-6" />
      <span>Nation Quest</span>
    </Link>
  );
}
