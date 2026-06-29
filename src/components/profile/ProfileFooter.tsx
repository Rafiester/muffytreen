import React from 'react';

interface ProfileFooterProps {
  name: string;
  isRetro: boolean;
}

export default function ProfileFooter({ name, isRetro }: ProfileFooterProps) {
  return (
    <footer className="text-center mt-auto px-4 z-10 relative">
      <p 
        className={`
          text-[11px] uppercase tracking-widest opacity-60
          ${isRetro ? 'font-mono text-black font-bold' : 'font-sans text-[var(--text-body)]'}
        `}
      >
        &copy; {new Date().getFullYear()} {name} &bull; Supabase CMS Integration
      </p>
    </footer>
  );
}
