import Logo from './Logo';
import { useRouter } from '../context/RouterContext';

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-[#0F3D26] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo size="sm" light />
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xs">
              Connecting community needs with skilled volunteers. Building measurable social impact — one verified service at a time.
            </p>
            <div className="mt-5 flex gap-3">
              {['Twitter', 'LinkedIn', 'Facebook'].map(s => (
                <button key={s} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-white/50 hover:text-white transition-colors text-xs">
                  {s[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Find Help', path: '/find-help' },
                { label: 'Become a Volunteer', path: '/volunteer' },
                { label: 'Browse Projects', path: '/projects' },
                { label: 'Organizations', path: '/organizations' },
                { label: 'Impact Dashboard', path: '/impact' },
              ].map(link => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">Community</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Khayr', path: '/about' },
                { label: 'How It Works', path: '/about' },
                { label: 'SDG Commitment', path: '/impact' },
                { label: 'Success Stories', path: '/projects' },
              ].map(link => (
                <li key={link.label}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">Get Involved</h4>
            <p className="text-sm text-white/60 mb-5">Everyone has something they can give. Start your impact journey today.</p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => navigate('/request-help')}
                className="px-4 py-2.5 bg-[#E8820C] text-white text-sm font-medium rounded-lg hover:bg-[#F5A030] transition-colors"
              >
                Request Community Help
              </button>
              <button
                onClick={() => navigate('/volunteer')}
                className="px-4 py-2.5 bg-white/10 text-white text-sm font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
              >
                Become a Volunteer
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2026 Khayr Community Service Platform. Demo data only — not real statistics.
          </p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map(link => (
              <button key={link} className="text-xs text-white/40 hover:text-white/70 transition-colors">
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
