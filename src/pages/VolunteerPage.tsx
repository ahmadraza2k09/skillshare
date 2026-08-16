import { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { DEMO_VOLUNTEERS } from '../data/demo';
import { SKILLS } from '../data/types';
import VolunteerCard from '../components/VolunteerCard';

export default function VolunteerPage() {
  const { navigate } = useRouter();
  const [search, setSearch] = useState('');
  const [skill, setSkill] = useState('');
  const [trust, setTrust] = useState('');

  const filtered = DEMO_VOLUNTEERS.filter(v => {
    if (search && !v.name.toLowerCase().includes(search.toLowerCase()) && !v.bio.toLowerCase().includes(search.toLowerCase())) return false;
    if (skill && !v.skills.includes(skill)) return false;
    if (trust && v.trustLevel !== trust) return false;
    return true;
  });

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Hero */}
      <div className="bg-[#0F3D26] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-[#E8820C] uppercase tracking-widest">Join the Movement</span>
              <h1 className="mt-2 text-4xl sm:text-5xl font-display font-semibold text-white leading-snug" style={{ fontFamily: "'Fraunces', serif" }}>
                Become a Volunteer
              </h1>
              <p className="mt-4 text-lg text-white/70 leading-relaxed">
                Share your skills with people who need them most. Every hour you give creates verified, measurable community impact.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-3 bg-[#E8820C] text-white font-semibold rounded-xl hover:bg-[#F5A030] transition-colors"
                >
                  Create Volunteer Profile
                </button>
                <button
                  onClick={() => navigate('/find-help')}
                  className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/25 hover:bg-white/20 transition-colors"
                >
                  Browse Community Needs
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2,341', label: 'Active Volunteers' },
                { value: '18,760', label: 'Volunteer Hours' },
                { value: '42,600+', label: 'People Helped' },
                { value: '96%', label: 'Avg. Completion Rate' },
              ].map(stat => (
                <div key={stat.label} className="bg-white/10 rounded-xl p-5 border border-white/15">
                  <div className="text-2xl font-display font-semibold text-white" style={{ fontFamily: "'Fraunces', serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What you get as a volunteer */}
      <div className="bg-[#F0EDE6] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-semibold text-[#141210] text-center mb-10" style={{ fontFamily: "'Fraunces', serif" }}>
            What Volunteering on Khayr Gives You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '🏅', title: 'Verified Impact Record', desc: 'Every completed service is independently verified and permanently recorded on your profile.' },
              { icon: '⭐', title: 'Credibility Profile', desc: 'Build a public profile showing real impact — hours, services, ratings, and trust level.' },
              { icon: '🎖️', title: 'Badges & Recognition', desc: 'Earn badges for milestones, skills, and outstanding contributions — automatically awarded.' },
              { icon: '📄', title: 'Future Certificates', desc: 'Get verifiable service certificates for your portfolio, university applications, or LinkedIn.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl border border-[#E5E0D8] p-5">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-[#141210] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B6560] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Browse volunteers */}
      <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-display font-semibold text-[#141210]" style={{ fontFamily: "'Fraunces', serif" }}>
            Our Volunteers
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <input
            type="text"
            placeholder="Search volunteers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2.5 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] placeholder-[#9B9590] focus:outline-none focus:border-[#1B5E3B] bg-white min-w-56"
          />
          <select
            value={skill}
            onChange={e => setSkill(e.target.value)}
            className="px-4 py-2.5 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] focus:outline-none focus:border-[#1B5E3B] bg-white"
          >
            <option value="">All Skills</option>
            {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={trust}
            onChange={e => setTrust(e.target.value)}
            className="px-4 py-2.5 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] focus:outline-none focus:border-[#1B5E3B] bg-white"
          >
            <option value="">All Trust Levels</option>
            <option value="champion">Community Champion</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
            <option value="bronze">Bronze</option>
            <option value="new">New</option>
          </select>
          {(search || skill || trust) && (
            <button
              onClick={() => { setSearch(''); setSkill(''); setTrust(''); }}
              className="px-4 py-2.5 text-sm text-[#E8820C] font-medium hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(v => <VolunteerCard key={v.id} volunteer={v} />)}
        </div>
      </div>
    </div>
  );
}
