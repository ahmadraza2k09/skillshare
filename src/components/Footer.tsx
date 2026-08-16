import Logo from './Logo';
import { useRouter } from '../context/RouterContext';
import SolidIcon from './SolidIcon';

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-[#1d2327] text-white border-t border-[#2c3338] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo size="sm" light />
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-xs">
              Connecting NGOs, schools, and organizations with skilled volunteers. Direct communication and transparent recognition.
            </p>
            <div className="mt-5 flex gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#2271b1] bg-white/10 px-2.5 py-1 rounded font-semibold border border-white/10">
                <SolidIcon name="shield" size={12} />
                Verified Connection Platform
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold text-white/90 uppercase tracking-widest mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Find Opportunities', path: '/find-help' },
                { label: 'Become a Volunteer', path: '/volunteer' },
                { label: 'Browse Projects', path: '/projects' },
                { label: 'Registered Organisations', path: '/organizations' },
                { label: 'About Us', path: '/about' },
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
            <h4 className="text-xs font-bold text-white/90 uppercase tracking-widest mb-4">Organizations & Volunteers</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About the Platform', path: '/about' },
                { label: 'How Direct Contact Works', path: '/about' },
                { label: 'Volunteer Recognition', path: '/find-help' },
                { label: 'Browse Projects', path: '/projects' },
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
            <h4 className="text-xs font-bold text-white/90 uppercase tracking-widest mb-4">Direct Connection</h4>
            <p className="text-sm text-white/60 mb-5">Post volunteer opportunities with explicit recognition details and connect directly via Email or WhatsApp.</p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => navigate('/request-help')}
                className="wp-btn wp-btn-primary w-full text-center"
              >
                <SolidIcon name="plus" size={15} />
                <span>Post Opportunity</span>
              </button>
              <button
                onClick={() => navigate('/volunteer')}
                className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded hover:bg-white/20 transition-colors border border-white/20 text-center"
              >
                Explore Volunteer Profiles
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#2c3338] py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © 2026 Skill Share Platform. WordPress-Inspired Connection Infrastructure for NGOs & Volunteers.
          </p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'Contact Support'].map(link => (
              <button key={link} className="text-xs text-white/50 hover:text-white/80 transition-colors">
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
