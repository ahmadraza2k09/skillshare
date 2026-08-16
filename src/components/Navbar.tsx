import { useState } from 'react';
import Logo from './Logo';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Find Help', path: '/find-help' },
  { label: 'Volunteer', path: '/volunteer' },
  { label: 'Projects', path: '/projects' },
  { label: 'Organizations', path: '/organizations' },
  { label: 'Impact', path: '/impact' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const { navigate, route } = useRouter();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (path: string) => route === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex-shrink-0 focus:outline-none">
            <Logo size="sm" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#F0F9F4] text-[#1B5E3B]'
                    : 'text-[#6B6560] hover:text-[#141210] hover:bg-[#FAFAF8]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {/* Notifications */}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="relative p-2 rounded-lg text-[#6B6560] hover:bg-[#FAFAF8] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E8820C] rounded-full" />
                </button>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E5E0D8] hover:bg-[#FAFAF8] transition-colors"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[#1B5E3B] text-white text-xs flex items-center justify-center font-semibold">
                        {user.name[0]}
                      </div>
                    )}
                    <span className="text-sm font-medium text-[#141210] hidden sm:block max-w-24 truncate">{user.name.split(' ')[0]}</span>
                    <svg className="w-4 h-4 text-[#9B9590]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-1 w-52 bg-white border border-[#E5E0D8] rounded-xl shadow-lg overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-[#F0EDE6]">
                        <p className="text-sm font-semibold text-[#141210]">{user.name}</p>
                        <p className="text-xs text-[#9B9590] capitalize">{user.role.replace('_', ' ')}</p>
                      </div>
                      {[
                        { label: 'Dashboard', path: '/dashboard' },
                        { label: 'My Profile', path: '/volunteer/v1' },
                        ...(user.role === 'admin' ? [{ label: 'Admin Panel', path: '/admin' }] : []),
                      ].map(item => (
                        <button
                          key={item.path}
                          onClick={() => { navigate(item.path); setProfileOpen(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-[#141210] hover:bg-[#FAFAF8] transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                      <div className="border-t border-[#F0EDE6]">
                        <button
                          onClick={() => { logout(); setProfileOpen(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-[#6B6560] hover:text-[#141210] transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate('/request-help')}
                  className="px-4 py-2 bg-[#1B5E3B] text-white text-sm font-medium rounded-lg hover:bg-[#2D7A52] transition-colors"
                >
                  Request Help
                </button>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-[#6B6560] hover:bg-[#FAFAF8]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[#E5E0D8] bg-white px-4 py-3 space-y-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.path}
              onClick={() => { navigate(link.path); setMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                isActive(link.path)
                  ? 'bg-[#F0F9F4] text-[#1B5E3B]'
                  : 'text-[#6B6560] hover:bg-[#FAFAF8] hover:text-[#141210]'
              }`}
            >
              {link.label}
            </button>
          ))}
          {!user && (
            <div className="pt-2 border-t border-[#F0EDE6] flex gap-2">
              <button
                onClick={() => { navigate('/login'); setMenuOpen(false); }}
                className="flex-1 py-2.5 text-sm font-medium text-[#6B6560] border border-[#E5E0D8] rounded-lg hover:bg-[#FAFAF8]"
              >
                Sign in
              </button>
              <button
                onClick={() => { navigate('/request-help'); setMenuOpen(false); }}
                className="flex-1 py-2.5 text-sm font-medium text-white bg-[#1B5E3B] rounded-lg hover:bg-[#2D7A52]"
              >
                Request Help
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
