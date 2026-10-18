import { getCategories } from "@/lib/news";
import Link from "next/link";
import NavbarSearch from "./NavbarSearch";

const Navbar = async () => {
  const categoryAll = await getCategories();

  const categories = categoryAll.filter((category) => category.scrapable);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 sm:px-6">
        <ul className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto">
          {/* Home */}
          <li>
            <Link
              href="/"
              className="inline-block whitespace-nowrap rounded-md px-3 py-3 text-sm font-bold text-gray-900 transition hover:bg-red-50 hover:text-red-600"
            >
              হোম
            </Link>
          </li>

          {/* Categories */}
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/category/${category.slug}`}
                className="inline-block whitespace-nowrap rounded-md px-3 py-3 text-sm font-bold text-gray-900 transition hover:bg-red-50 hover:text-red-600"
              >
                {category.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search */}
        <NavbarSearch />
      </div>
    </nav>
  );
};

export default Navbar;
