import { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { DEMO_VOLUNTEERS } from '../data/demo';
import { SKILLS } from '../data/types';
import VolunteerCard from '../components/VolunteerCard';
import SolidIcon from '../components/SolidIcon';

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
    <div className="bg-[#f0f0f1] min-h-screen pb-16">
      {/* WP Header */}
      <div className="bg-[#1d2327] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#2271b1] uppercase tracking-widest block mb-1">Volunteers Network</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-snug">
              Connect with Skilled Volunteers
            </h1>
            <p className="mt-3 text-xs text-white/70 leading-relaxed font-medium">
              Discover volunteers eager to support NGOs, schools, and local projects. Direct communication enabled via Email and WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/login')}
                className="wp-btn wp-btn-primary text-xs"
              >
                <SolidIcon name="plus" size={14} /> Create Volunteer Profile
              </button>
              <button
                onClick={() => navigate('/find-help')}
                className="px-4 py-2.5 bg-white/10 text-white font-bold text-xs rounded-none hover:bg-white/20 transition-colors uppercase tracking-wider"
              >
                Browse Opportunities
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteer Benefits */}
      <div className="bg-white py-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-extrabold text-[#1d2327] text-center mb-8 uppercase tracking-wider">
            Why Volunteer on Skill Share Platform?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { iconName: 'certificate' as const, title: 'Verified Certificates', desc: 'Organizations explicitly state and provide verifiable certificates or appreciation letters for your contribution.' },
              { iconName: 'shield' as const, title: 'Public Credibility Profile', desc: 'Build a permanent profile demonstrating real-world services, volunteer hours, and organization feedback.' },
              { iconName: 'award' as const, title: 'Earned Recognition Badges', desc: 'Receive digital badges for skills, completed services, and milestone contributions.' },
              { iconName: 'phone' as const, title: 'Direct Communication', desc: 'Connect directly with NGO leaders and community organizers via Email and WhatsApp.' },
            ].map(item => (
              <div key={item.title} className="wp-card p-5">
                <div className="w-10 h-10 bg-[#2271b1] text-white flex items-center justify-center mb-3 rounded-none">
                  <SolidIcon name={item.iconName} size={20} />
                </div>
                <h3 className="font-extrabold text-[#1d2327] text-xs uppercase tracking-wider mb-1.5">{item.title}</h3>
                <p className="text-xs text-[#50575e] leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Directory Search & Filters */}
      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 pb-3">
          <h2 className="text-xl font-extrabold text-[#1d2327]">
            Volunteer Directory ({filtered.length})
          </h2>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap gap-3 mb-6 bg-white p-4 shadow-xs rounded-none">
          <div className="relative flex-1 min-w-56">
            <span className="absolute left-3 top-3 text-[#50575e]">
              <SolidIcon name="search" size={14} />
            </span>
            <input
              type="text"
              placeholder="Search volunteers by name or bio..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
            />
          </div>
          <select
            value={skill}
            onChange={e => setSkill(e.target.value)}
            className="px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
          >
            <option value="">All Skills</option>
            {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={trust}
            onChange={e => setTrust(e.target.value)}
            className="px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
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
              className="px-3 py-2.5 text-xs text-[#2271b1] font-bold uppercase hover:underline"
            >
              Clear Filters
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
