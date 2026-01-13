import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Skill Not Found</h2>
      <p className="text-gray-600 mb-6">
        The skill you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
