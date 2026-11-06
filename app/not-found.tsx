import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 pb-24 pt-32 text-center">
      <h1 className="heading-4 text-white">Not found</h1>
      <p className="body-3 mt-3 text-zinc-400">That page is not in the yard.</p>
      <Link href="/" className="btn-primary button-md mt-8 inline-flex">
        Back to the directory
      </Link>
    </div>
  );
}
