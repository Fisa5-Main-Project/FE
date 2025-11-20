"use client";

interface LoadingSpinnerProps {
  size?: string; // Tailwind CSS classes for height and width, e.g., "h-12 w-12"
}

/**
 * 로딩 스피너 컴포넌트
 */
export default function LoadingSpinner({ size = "h-12 w-12" }: LoadingSpinnerProps) {
  return (
    <div
      className={`inline-block ${size} animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}
