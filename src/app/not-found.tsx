import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page doesn't exist.",
};

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find the page you were looking for!</p>
      <Link href="/" className="link">
        Back to main
      </Link>
    </div>
  );
}
