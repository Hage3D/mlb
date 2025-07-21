import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-16">
          <Link href="/" className="text-xl font-semibold text-gray-800">
            MLB Results
          </Link>
        </div>
      </div>
    </header>
  );
}