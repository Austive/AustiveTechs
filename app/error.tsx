"use client";
export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <a href="/" className="text-blue-500 hover:underline">Return Home</a>
    </div>
  );
}
