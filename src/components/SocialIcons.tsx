type IconProps = {
  className?: string;
  strokeWidth?: number;
};

/**
 * Brand marks drawn to match the weight of the Lucide icon set used across the
 * site. Lucide no longer ships third-party brand logos, so these are inlined.
 */

export function InstagramIcon({ className, strokeWidth = 1.25 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className, strokeWidth = 1.25 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M13 3v11.6a3.9 3.9 0 1 1-3.9-3.9" />
      <path d="M13 3.2c.5 2.6 2.4 4.3 5 4.6" />
    </svg>
  );
}
