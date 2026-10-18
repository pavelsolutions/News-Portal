"use client";

import { useState } from "react";

const btnBase =
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition";

const ShareButtons = ({ title, url }: { title: string; url: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <span className="text-sm font-bold text-gray-900">শেয়ার করুন</span>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} bg-[#1877F2] text-white hover:brightness-110`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H7.8v3h2.7v8h3z" />
        </svg>
        Facebook
      </a>

      {/* X */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnBase} bg-gray-900 text-white hover:bg-black`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
          <path d="M17.5 3h3.1l-6.8 7.7L21.8 21h-6.3l-4.9-6.4L4.9 21H1.8l7.3-8.3L2.2 3h6.4l4.4 5.9L17.5 3zm-1.1 16.2h1.7L7.7 4.7H5.9l10.5 14.5z" />
        </svg>
        X
      </a>

      {/* Copy */}
      <button
        type="button"
        onClick={handleCopy}
        className={`${btnBase} ${
          copied
            ? "bg-green-600 text-white"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        {copied ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
            <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
          </svg>
        )}
        {copied ? "কপি হয়েছে" : "লিংক কপি"}
      </button>
    </div>
  );
};

export default ShareButtons;
