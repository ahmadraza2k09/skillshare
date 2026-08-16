import { useState } from 'react';
import Logo from './Logo';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import SolidIcon from './SolidIcon';

const NAV_LINKS = [
  { label: 'Find Help', path: '/find-help' },
  { label: 'Volunteer', path: '/volunteer' },
  { label: 'Projects', path: '/projects' },
  { label: 'Organisations', path: '/organizations' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const { navigate, route } = useRouter();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (path: string) => route === path;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* WordPress Admin Bar top line */}
      <div className="bg-[#1d2327] text-xs text-white py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] font-bold">
            <span className="flex items-center gap-1.5 text-white">
              <SolidIcon name="shield" size={12} className="text-[#2271b1]" />
              Skill Share Platform — Direct Connection for Volunteers & Organisations
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            {user ? (
              <span className="text-white/80">Logged in as <strong className="text-white capitalize">{user.name} ({user.role.replace('_', ' ')})</strong></span>
            ) : (
              <button onClick={() => navigate('/login')} className="hover:text-white transition-colors">Staff / Volunteer Sign In</button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('/')} className="flex-shrink-0 focus:outline-none flex items-center gap-3 text-left">
            <Logo size="sm" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-none transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#2271b1] text-white font-extrabold'
                    : 'text-[#1d2327] hover:bg-[#f6f7f7] hover:text-[#2271b1]'
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
                  className="relative p-2.5 bg-[#f6f7f7] rounded-none text-[#1d2327] hover:bg-[#e2e4e7] transition-colors"
                  title="Notifications"
                >
                  <SolidIcon name="bell" size={18} className="text-[#1d2327]" />
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#2271b1]" />
                </button>

                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-none bg-[#f6f7f7] hover:bg-[#e2e4e7] transition-colors"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-none object-cover" />
                    ) : (
                      <div className="w-6 h-6 rounded-none bg-[#2271b1] text-white text-xs flex items-center justify-center font-bold">
                        {user.name[0]}
                      </div>
                    )}
                    <span className="text-xs font-bold text-[#1d2327] hidden sm:block max-w-28 truncate">{user.name.split(' ')[0]}</span>
                    <SolidIcon name="chevron-down" size={14} className="text-[#50575e]" />
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-1 w-56 bg-white shadow-lg overflow-hidden z-50 rounded-none">
                      <div className="px-4 py-3 bg-[#1d2327] text-white">
                        <p className="text-xs font-bold text-white">{user.name}</p>
                        <p className="text-[10px] text-white/70 uppercase tracking-wider capitalize">{user.role.replace('_', ' ')} Account</p>
                      </div>
                      {[
                        { label: 'Dashboard', path: '/dashboard' },
                        { label: 'My Public Profile', path: '/volunteer/v1' },
                        ...(user.role === 'admin' ? [{ label: 'Admin Panel', path: '/admin' }] : []),
                      ].map(item => (
                        <button
                          key={item.path}
                          onClick={() => { navigate(item.path); setProfileOpen(false); }}
                          className="w-full text-left px-4 py-3 text-xs font-bold text-[#1d2327] hover:bg-[#2271b1] hover:text-white transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                      <div className="border-t border-[#f0f0f1]">
                        <button
                          onClick={() => { logout(); setProfileOpen(false); }}
                          className="w-full text-left px-4 py-3 text-xs font-bold text-red-700 hover:bg-red-600 hover:text-white transition-colors"
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
                  className="hidden sm:block px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#1d2327] hover:text-[#2271b1] transition-colors"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate('/request-help')}
                  className="wp-btn wp-btn-primary"
                >
                  <SolidIcon name="plus" size={14} />
                  <span>Post Opportunity</span>
                </button>
              </>
            )}

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 bg-[#f6f7f7] text-[#1d2327] rounded-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <SolidIcon name={menuOpen ? 'chevron-down' : 'filter'} size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white px-4 py-3 space-y-1 shadow-md">
          {NAV_LINKS.map(link => (
            <button
              key={link.path}
              onClick={() => { navigate(link.path); setMenuOpen(false); }}
              className={`w-full text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded-none transition-colors ${
                isActive(link.path)
                  ? 'bg-[#2271b1] text-white font-extrabold'
                  : 'text-[#1d2327] hover:bg-[#f6f7f7]'
              }`}
            >
              {link.label}
            </button>
          ))}
          {!user && (
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => { navigate('/login'); setMenuOpen(false); }}
                className="flex-1 py-2.5 text-xs font-bold uppercase text-[#1d2327] bg-[#f6f7f7] rounded-none hover:bg-[#e2e4e7]"
              >
                Sign in
              </button>
              <button
                onClick={() => { navigate('/request-help'); setMenuOpen(false); }}
                className="flex-1 py-2.5 text-xs font-bold uppercase text-white bg-[#2271b1] rounded-none hover:bg-[#135e96]"
              >
                Post Opportunity
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
