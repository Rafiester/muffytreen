import React from 'react';

interface DashboardHeaderProps {
  saving: boolean;
  onSave: () => void;
  onLogout: () => void;
  onMenuToggle: () => void;
}

export default function DashboardHeader({ saving, onSave, onLogout, onMenuToggle }: DashboardHeaderProps) {
  return (
    <header className="border-b border-slate-900 bg-slate-950/40 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl transition-all mr-1"
            title="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <div className="p-2 bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 rounded-xl hidden sm:block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight leading-none mb-1">Muffytreen CMS</h1>
            <p className="text-[10px] text-slate-500">Live content builder dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open('/', '_blank')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            <span>Preview Profile</span>
          </button>

          <button
            onClick={onSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/10"
          >
            {saving ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>Publish Changes</span>
              </>
            )}
          </button>

          <button
            onClick={onLogout}
            className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-rose-400 text-slate-400 rounded-xl transition-all"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
