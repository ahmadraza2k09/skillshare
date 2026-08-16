import { useRouter } from '../context/RouterContext';
import RequestCard from '../components/RequestCard';
import VolunteerCard from '../components/VolunteerCard';
import SolidIcon from '../components/SolidIcon';
import { DEMO_REQUESTS, DEMO_VOLUNTEERS, DEMO_ORGANIZATIONS } from '../data/demo';
import { SDG_LIST } from '../data/types';

const HOW_IT_WORKS = [
  {
    step: '01',
    iconName: 'plus' as const,
    title: '1. Organization Posts Need',
    desc: 'NGOs, schools, and institutions post volunteer opportunities with detailed requirements and explicit volunteer recognition.',
  },
  {
    step: '02',
    iconName: 'search' as const,
    title: '2. Volunteer Discovers',
    desc: 'Volunteers browse opportunities by location, skills required, and volunteer rewards offered.',
  },
  {
    step: '03',
    iconName: 'phone' as const,
    title: '3. Direct Connection',
    desc: 'Volunteers connect directly with organizations via Email or WhatsApp. No middleman or complex internal messaging.',
  },
  {
    step: '04',
    iconName: 'award' as const,
    title: '4. Service & Recognition',
    desc: 'The volunteer completes the service and receives their promised certificate or recognition letter.',
  },
];

export default function Home() {
  const { navigate } = useRouter();
  const recentRequests = DEMO_REQUESTS.filter(r => r.status === 'applications_open' || r.status === 'published').slice(0, 3);
  const topVolunteers = DEMO_VOLUNTEERS.filter(v => v.trustLevel === 'gold').slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[#1d2327] overflow-hidden min-h-[65vh] flex items-center">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&h=800&fit=crop&auto=format"
            alt="Community volunteers working together"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1d2327] via-[#1d2327]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight">
              Direct Connection Platform for Skill-Based Volunteering.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/75 leading-relaxed max-w-xl font-medium">
              Organizations post requirements and volunteer rewards. Skilled individuals discover opportunities and connect directly via Email or WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/request-help')}
                className="wp-btn wp-btn-primary px-6 py-3.5 text-base shadow-md"
              >
                <SolidIcon name="plus" size={18} />
                <span>Post Volunteer Opportunity</span>
              </button>
              <button
                onClick={() => navigate('/find-help')}
                className="px-6 py-3.5 bg-white/10 text-white font-bold rounded-none hover:bg-white/20 transition-colors text-base flex items-center gap-2 uppercase tracking-wider"
              >
                <SolidIcon name="search" size={18} />
                <span>Browse Opportunities</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-[#f0f0f1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#2271b1] uppercase tracking-widest block mb-1">Simple Workflow</span>
            <h2 className="text-3xl font-extrabold text-[#1d2327]">
              How the Platform Works
            </h2>
            <p className="mt-2 text-xs text-[#50575e] font-semibold">Clear, transparent connection between organizations and skilled volunteers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="wp-card p-6 flex flex-col justify-between rounded-none">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-[#2271b1] text-white flex items-center justify-center rounded-none">
                      <SolidIcon name={step.iconName} size={20} />
                    </div>
                    <span className="text-xl font-extrabold text-[#8c8f94]">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-[#1d2327] text-base mb-2 uppercase tracking-wider">{step.title}</h3>
                  <p className="text-xs text-[#50575e] leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Opportunities */}
      <section className="py-16 bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-3">
            <div>
              <span className="text-xs font-bold text-[#2271b1] uppercase tracking-wider block mb-1">Open Now</span>
              <h2 className="text-2xl font-extrabold text-[#1d2327]">
                Featured Volunteer Opportunities
              </h2>
            </div>
            <button
              onClick={() => navigate('/find-help')}
              className="flex items-center gap-1.5 text-xs font-bold text-[#2271b1] uppercase tracking-wider hover:underline"
            >
              <span>View all opportunities</span>
              <SolidIcon name="chevron-right" size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentRequests.map(r => <RequestCard key={r.id} request={r} />)}
          </div>
        </div>
      </section>

      {/* Featured Volunteers */}
      <section className="py-16 bg-[#f0f0f1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 pb-3">
            <div>
              <span className="text-xs font-bold text-[#2271b1] uppercase tracking-wider block mb-1">Community Members</span>
              <h2 className="text-2xl font-extrabold text-[#1d2327]">
                Active Volunteers
              </h2>
            </div>
            <button
              onClick={() => navigate('/volunteer')}
              className="flex items-center gap-1.5 text-xs font-bold text-[#2271b1] uppercase tracking-wider hover:underline"
            >
              <span>View all volunteers</span>
              <SolidIcon name="chevron-right" size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topVolunteers.map(v => <VolunteerCard key={v.id} volunteer={v} />)}
          </div>
        </div>
      </section>

      {/* Organizations */}
      <section className="py-12 bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-[#50575e] uppercase tracking-widest mb-6">Participating Organisations & Institutions</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {DEMO_ORGANIZATIONS.map(org => (
              <div key={org.id} className="flex items-center gap-3 px-4 py-2.5 bg-[#f6f7f7] rounded-none text-[#1d2327]">
                <div className="w-7 h-7 bg-[#2271b1] text-white text-xs font-bold flex items-center justify-center rounded-none">
                  {org.name[0]}
                </div>
                <span className="text-xs font-extrabold">{org.name}</span>
                {org.verified && (
                  <SolidIcon name="check-circle" size={14} className="text-[#107c41]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDGs */}
      <section className="py-16 bg-[#f0f0f1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-[#2271b1] uppercase tracking-widest block mb-1">Global Alignment</span>
          <h2 className="text-2xl font-extrabold text-[#1d2327] mb-3">
            Mapped to UN Sustainable Development Goals
          </h2>
          <p className="text-xs text-[#50575e] max-w-xl mx-auto mb-8 font-semibold">
            Every volunteer opportunity aligns with local community needs and global development benchmarks.
          </p>

          <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
            {SDG_LIST.map(sdg => (
              <div
                key={sdg.id}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white rounded-none"
              >
                <span
                  className="w-4 h-4 text-white flex items-center justify-center text-[10px] font-bold rounded-none"
                  style={{ backgroundColor: sdg.color }}
                >
                  {sdg.id}
                </span>
                <span className="text-[#1d2327]">{sdg.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
