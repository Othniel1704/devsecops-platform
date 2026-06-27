export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-semibold text-slate-900">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"
          fill="#059669"
        />
        <path
          d="M9 12.2l2 2 4-4.4"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      DevSecOps & AI
    </span>
  );
}
