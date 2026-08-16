import { useRouter } from '../context/RouterContext';
import Logo from '../components/Logo';

export default function About() {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Hero */}
      <div className="bg-[#F0EDE6] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-[#141210] leading-snug" style={{ fontFamily: "'Fraunces', serif" }}>
            Community Service Infrastructure for Pakistan
          </h1>
          <p className="mt-5 text-lg text-[#6B6560] max-w-2xl mx-auto leading-relaxed">
            Khayr is a platform that turns individual willingness to help into organised, verified, and measurable community action.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-[#E8820C] uppercase tracking-widest">Our Mission</span>
            <h2 className="mt-2 text-3xl font-display font-semibold text-[#141210] leading-snug" style={{ fontFamily: "'Fraunces', serif" }}>
              Everyone has something they can give.
            </h2>
            <div className="mt-5 space-y-4 text-[#6B6560] leading-relaxed">
              <p>Some people have money. Some have knowledge. Some have skills. Some have time. Some simply have the willingness to help.</p>
              <p>Khayr turns those resources into measurable community impact — by connecting genuine community needs with skilled volunteers who have the time and ability to make a difference.</p>
              <p>This is NOT a job marketplace, a donation platform, or a generic volunteer directory. Khayr is a community-needs-first infrastructure platform.</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#E5E0D8] p-8">
            <div className="space-y-5">
              {[
                { icon: '🎯', title: 'Community Needs First', desc: 'Real requests from real people and organisations with genuine needs.' },
                { icon: '✓', title: 'Verified Impact', desc: 'Only verified services contribute to official statistics and volunteer credibility.' },
                { icon: '📊', title: 'Measurable Action', desc: "Every service creates a permanent, verifiable record of the community's progress." },
              ].map(item => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F9F4] flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-[#141210] text-sm">{item.title}</p>
                    <p className="text-sm text-[#6B6560] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Journey */}
        <div>
          <h2 className="text-2xl font-display font-semibold text-[#141210] mb-8 text-center" style={{ fontFamily: "'Fraunces', serif" }}>
            The Core Journey
          </h2>
          <div className="relative">
            <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-[#E5E0D8] -translate-x-1/2" />
            <div className="space-y-6">
              {[
                { label: 'NEED', desc: 'A community member identifies a genuine need and submits a service request', side: 'left' },
                { label: 'MATCH', desc: 'The platform finds volunteers with relevant skills, location, and availability', side: 'right' },
                { label: 'SERVE', desc: 'The requester selects a volunteer. The service is delivered.', side: 'left' },
                { label: 'VERIFY', desc: 'The requester independently confirms the work was completed', side: 'right' },
                { label: 'REWARD', desc: 'The volunteer receives verified hours, points, badges, and credibility', side: 'left' },
                { label: 'IMPACT', desc: "The service is added to project, city, SDG, and national-level statistics", side: 'right' },
              ].map((step, i) => (
                <div key={step.label} className={`flex ${step.side === 'right' ? 'sm:flex-row-reverse' : ''} items-center gap-6 sm:gap-0`}>
                  <div className={`sm:w-[calc(50%-2rem)] ${step.side === 'right' ? 'sm:pl-8' : 'sm:pr-8 sm:text-right'}`}>
                    <div className="bg-white rounded-xl border border-[#E5E0D8] p-4 inline-block w-full">
                      <p className="text-xs font-bold text-[#E8820C] uppercase tracking-wider mb-1">{step.label}</p>
                      <p className="text-sm text-[#6B6560]">{step.desc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 bg-[#1B5E3B] text-white rounded-full flex items-center justify-center text-sm font-bold z-10 hidden sm:flex">
                    {i + 1}
                  </div>
                  <div className="sm:w-[calc(50%-2rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Who is this for */}
        <div>
          <h2 className="text-2xl font-display font-semibold text-[#141210] mb-8 text-center" style={{ fontFamily: "'Fraunces', serif" }}>
            Who Is Khayr For?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: '🙋',
                title: 'Community Members',
                desc: 'Submit genuine needs, review volunteers, confirm completed services, and rate their experience.',
              },
              {
                icon: '🤝',
                title: 'Volunteers',
                desc: 'Build a credibility profile, earn verified hours, collect badges, and grow their community impact.',
              },
              {
                icon: '🏫',
                title: 'Organisations',
                desc: 'Schools, NGOs, and nonprofits can submit requests, run projects, and manage volunteers at scale.',
              },
              {
                icon: '⚙️',
                title: 'Administrators',
                desc: 'Review content, verify organisations, manage categories and badges, monitor platform health.',
              },
            ].map(role => (
              <div key={role.title} className="bg-white rounded-xl border border-[#E5E0D8] p-5">
                <div className="text-3xl mb-3">{role.icon}</div>
                <h3 className="font-semibold text-[#141210] mb-2">{role.title}</h3>
                <p className="text-sm text-[#6B6560] leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0F3D26] rounded-2xl p-10 text-center">
          <h2 className="text-3xl font-display font-semibold text-white mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
            Ready to start?
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Whether you need help or have something to give — Khayr is the bridge.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/request-help')}
              className="px-7 py-3.5 bg-[#E8820C] text-white font-semibold rounded-xl hover:bg-[#F5A030] transition-colors"
            >
              Request Community Help
            </button>
            <button
              onClick={() => navigate('/volunteer')}
              className="px-7 py-3.5 bg-white text-[#0F3D26] font-semibold rounded-xl hover:bg-white/90 transition-colors"
            >
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
