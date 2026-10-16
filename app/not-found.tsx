import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold text-white">Not found</h1>
      <p className="mt-3 text-zinc-400">That page isn’t in the yard.</p>
      <Link href="/" className="mt-6 inline-block text-brand-400 underline">Back to the directory</Link>
    </div>
  );
}
