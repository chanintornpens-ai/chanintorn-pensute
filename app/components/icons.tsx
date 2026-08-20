type IconProps = { className?: string };

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.25 8.5h3.4V21h-3.4V8.5Zm5.55 0h3.26v1.7h.05c.45-.86 1.56-1.77 3.21-1.77 3.43 0 4.06 2.26 4.06 5.2V21h-3.4v-5.49c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.91V21h-3.4V8.5Z" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Squiggle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 120 14" fill="none" className={className} aria-hidden preserveAspectRatio="none">
      <path
        d="M2 8C12 2 22 2 32 8s20 6 30 0 20-6 30 0 20 6 26 2"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ScribbleArrow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 80 60" fill="none" className={className} aria-hidden>
      <path
        d="M6 10c18 0 44 4 52 26"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M44 36c7 2 12 1 16-2m-2 14c0-5 0-9 2-12"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c.7 5.4 5.9 10.6 12 12-6.1 1.4-11.3 6.6-12 12-.7-5.4-5.9-10.6-12-12C6.1 10.6 11.3 5.4 12 0Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.13C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.4.52A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.13c1.9.52 9.4.52 9.4.52s7.5 0 9.4-.52a3 3 0 0 0 2.1-2.13A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.25 3.6L9.6 15.6Z" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.62 10.79a15.5 15.5 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.4 11.4 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

export function LineIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.2 2 1.5 5.82 1.5 10.5c0 4.2 3.73 7.72 8.77 8.39.34.07.8.22.92.51.1.26.07.67.03.93l-.15.9c-.04.26-.21 1.04.91.57 1.12-.47 6.04-3.56 8.24-6.09 1.52-1.67 2.25-3.36 2.25-5.21C22.48 5.82 17.79 2 12 2ZM8.07 12.85h-1.6c-.23 0-.42-.19-.42-.42V9.22c0-.23.19-.42.42-.42.24 0 .43.19.43.42v2.78h1.17c.24 0 .43.19.43.43 0 .23-.19.42-.43.42Zm1.67-.42c0 .23-.19.42-.43.42a.42.42 0 0 1-.42-.42V9.22c0-.23.19-.42.42-.42.24 0 .43.19.43.42v3.21Zm3.86 0c0 .18-.12.34-.29.4a.46.46 0 0 1-.14.02.42.42 0 0 1-.34-.17l-1.31-1.79v1.54c0 .23-.2.42-.43.42a.42.42 0 0 1-.43-.42V9.22c0-.18.12-.34.29-.4a.43.43 0 0 1 .48.15l1.32 1.79V9.22c0-.23.19-.42.42-.42.24 0 .43.19.43.42v3.21Zm2.59-2.03c.24 0 .43.19.43.43 0 .23-.19.42-.43.42h-1.17v.76h1.17c.24 0 .43.19.43.43 0 .23-.19.42-.43.42h-1.6a.42.42 0 0 1-.42-.42V9.22c0-.23.19-.42.42-.42h1.6c.24 0 .43.19.43.42 0 .24-.19.43-.43.43h-1.17v.75h1.17Z"/>
    </svg>
  );
}

export const iconMap = {
  mail: MailIcon,
  github: GithubIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
  phone: PhoneIcon,
} as const;
