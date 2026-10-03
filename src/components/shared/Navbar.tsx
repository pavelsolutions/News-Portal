import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-10 max-w-5xl items-center justify-center">
                <ul className="flex items-center gap-5">
                    <li>
                        <Link
                            href="/"
                            className="text-[12px] font-medium text-red-600 transition-colors"
                        >
                            হোম
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/politics"
                            className="text-[12px] font-medium text-gray-700 transition-colors hover:text-red-600"
                        >
                            রাজনীতি
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="world"
                            className="text-[12px] font-medium text-gray-700 transition-colors hover:text-red-600"
                        >
                            বিশ্ব
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/economics"
                            className="text-[12px] font-medium text-gray-700 transition-colors hover:text-red-600"
                        >
                            অর্থনীতি
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/health"
                            className="text-[12px] font-medium text-gray-700 transition-colors hover:text-red-600"
                        >
                            স্বাস্থ্য
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/sports"
                            className="text-[12px] font-medium text-gray-700 transition-colors hover:text-red-600"
                        >
                            খেলা
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/technology"
                            className="text-[12px] font-medium text-gray-700 transition-colors hover:text-red-600"
                        >
                            প্রযুক্তি
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/Country"
                            className="text-[12px] font-medium text-gray-700 transition-colors hover:text-red-600"
                        >
                            দেশ
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;