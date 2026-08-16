import { useRouter } from '../context/RouterContext';
import Logo from '../components/Logo';
import SolidIcon from '../components/SolidIcon';

export default function About() {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#f0f0f1] min-h-screen pb-16">
      {/* Hero */}
      <div className="bg-[#1d2327] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Logo size="lg" light />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-snug">
            Community Service Connection Infrastructure
          </h1>
          <p className="mt-4 text-sm text-white/75 max-w-2xl mx-auto leading-relaxed">
            Skill Share Platform connects NGOs, schools, and organizations directly with skilled volunteers.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold text-[#2271b1] uppercase tracking-widest block mb-1">Platform Core Purpose</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1d2327] leading-snug">
              Direct, Transparent Connection for Social Good.
            </h2>
            <div className="mt-4 space-y-3 text-xs text-[#50575e] leading-relaxed font-medium">
              <p>Organizations have genuine volunteer needs for tutoring, technology workshops, healthcare awareness, and environmental drives.</p>
              <p>Volunteers have knowledge, skills, and willingness to contribute. Our platform makes it effortless for organizations to state what recognition they provide and for volunteers to connect directly via Email or WhatsApp.</p>
              <p>This is a pure connection platform — keeping communication direct, straightforward, and simple.</p>
            </div>
          </div>
          <div className="wp-card p-6 rounded-none">
            <div className="space-y-4">
              {[
                { iconName: 'building' as const, title: 'Organization Needs First', desc: 'Genuine requirements posted by verified NGOs, schools, and institutions.' },
                { iconName: 'award' as const, title: 'Explicit Recognition', desc: 'Organizations communicate certificate, recommendation, or award details upfront.' },
                { iconName: 'phone' as const, title: 'Direct Communication', desc: 'Direct contact via Email and WhatsApp without complex internal messaging systems.' },
              ].map(item => (
                <div key={item.title} className="flex gap-3">
                  <div className="w-9 h-9 bg-[#2271b1] text-white flex items-center justify-center flex-shrink-0 rounded-none">
                    <SolidIcon name={item.iconName} size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1d2327] text-xs uppercase tracking-wider">{item.title}</p>
                    <p className="text-xs text-[#50575e] mt-0.5 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Journey */}
        <div className="wp-card p-8 rounded-none">
          <h2 className="text-xl font-extrabold text-[#1d2327] mb-8 text-center uppercase tracking-wider">
            How Skill Share Platform Connects You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { num: '1', label: 'NEED', desc: 'NGO or school posts volunteer opportunity & reward' },
              { num: '2', label: 'DISCOVER', desc: 'Volunteers browse needs by skill, location, and reward' },
              { num: '3', label: 'CONTACT', desc: 'Volunteer connects directly via Email or WhatsApp' },
              { num: '4', label: 'DELIVER', desc: 'Volunteer delivers workshop or skill service' },
              { num: '5', label: 'RECOGNIZE', desc: 'Organization issues certificate or appreciation letter' },
              { num: '6', label: 'VERIFY', desc: 'Service recorded on volunteer profile stats' },
            ].map((step) => (
              <div key={step.label} className="p-3 bg-[#f6f7f7] rounded-none flex flex-col justify-between">
                <div>
                  <span className="w-6 h-6 bg-[#2271b1] text-white text-xs font-bold inline-flex items-center justify-center mb-2 rounded-none">
                    {step.num}
                  </span>
                  <p className="text-xs font-bold text-[#2271b1] uppercase tracking-wider block mb-1">{step.label}</p>
                  <p className="text-[11px] text-[#50575e] leading-snug font-semibold">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who is this for */}
        <div>
          <h2 className="text-xl font-extrabold text-[#1d2327] mb-6 text-center uppercase tracking-wider">
            Who Uses Skill Share Platform?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                iconName: 'user' as const,
                title: 'Community Members',
                desc: 'Discover local volunteer opportunities, contribute skills, and build a verified credibility record.',
              },
              {
                iconName: 'users' as const,
                title: 'Volunteers',
                desc: 'Offer teaching, technology, design, or healthcare skills to NGOs and earn certificates.',
              },
              {
                iconName: 'building' as const,
                title: 'NGOs & Schools',
                desc: 'Post volunteer requirements, state volunteer recognition, and receive direct inquiries.',
              },
              {
                iconName: 'shield' as const,
                title: 'Platform Admins',
                desc: 'Verify organizations, maintain community standards, and monitor metrics.',
              },
            ].map(role => (
              <div key={role.title} className="wp-card p-5 rounded-none">
                <div className="w-9 h-9 bg-[#2271b1] text-white flex items-center justify-center mb-3 rounded-none">
                  <SolidIcon name={role.iconName} size={18} />
                </div>
                <h3 className="font-extrabold text-[#1d2327] text-xs uppercase tracking-wider mb-1">{role.title}</h3>
                <p className="text-xs text-[#50575e] leading-relaxed font-medium">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#1d2327] text-white rounded-none p-8 text-center">
          <h2 className="text-2xl font-extrabold text-white mb-2">
            Get Started Today
          </h2>
          <p className="text-xs text-white/70 mb-6 max-w-lg mx-auto">
            Whether you represent an NGO looking for volunteers or an individual ready to share your skills — connect directly now.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/request-help')}
              className="wp-btn wp-btn-primary px-6 py-3 text-xs"
            >
              <SolidIcon name="plus" size={14} /> Post Volunteer Opportunity
            </button>
            <button
              onClick={() => navigate('/volunteer')}
              className="px-6 py-3 bg-white text-[#1d2327] font-bold text-xs rounded-none uppercase tracking-wider hover:bg-white/90 transition-colors"
            >
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
