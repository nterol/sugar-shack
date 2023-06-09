export function CartIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path
        // stroke="currentColor"
        fill="white"
        // fill-rule="evenodd"
        d="M16.846 18H3.153a1 1 0 0 1-.99-1.141l1.143-8A1 1 0 0 1 4.296 8H5v2a1 1 0 0 0 2 0V8h6v2a1 1 0 0 0 2 0V8h.704a1 1 0 0 1 .99.859l1.143 8a1 1 0 0 1-.99 1.141ZM7 5c0-1.654 1.346-3 3-3 1.655 0 3 1 3 3v1H7V5Zm12.98 12.717-1.429-10A2 2 0 0 0 16.57 6H15V5c0-3-2.244-5-5-5-2.757 0-5 2.243-5 5v1H3.733c-.995 0-2.145.732-2.286 1.717l-1.428 10A2 2 0 0 0 2 20h16a2 2 0 0 0 1.98-2.283Z"
      />
    </svg>
  );
}
