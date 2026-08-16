import { useRouter } from '../context/RouterContext';
import { DEMO_VOLUNTEERS, DEMO_BADGES, DEMO_REQUESTS } from '../data/demo';

const TRUST_CONFIG = {
  new:      { label: 'New Volunteer',       color: '#6B6560', bg: '#F0EDE6' },
  bronze:   { label: 'Bronze',              color: '#92400E', bg: '#FEF3C7' },
  silver:   { label: 'Silver',              color: '#334155', bg: '#F1F5F9' },
  gold:     { label: 'Gold Trust Level',    color: '#92400E', bg: '#FFFBEB' },
  champion: { label: 'Community Champion',  color: '#1B5E3B', bg: '#F0F9F4' },
};

export default function VolunteerProfile() {
  const { navigate } = useRouter();
  const hash = window.location.hash;
  const id = hash.split('/').pop()?.split('?')[0] || 'v1';
  const volunteer = DEMO_VOLUNTEERS.find(v => v.id === id) ?? DEMO_VOLUNTEERS[0];
  const trust = TRUST_CONFIG[volunteer.trustLevel];
  const earnedBadges = DEMO_BADGES.filter(b => volunteer.badges.includes(b.id));

  const recentServices = DEMO_REQUESTS
    .filter(r => r.status === 'verified' || r.status === 'completed')
    .slice(0, 3);

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Cover */}
      <div className="h-40 bg-gradient-to-br from-[#1B5E3B] to-[#0F3D26] relative">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile card */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-6 text-center">
              {volunteer.avatar ? (
                <img
                  src={volunteer.avatar}
                  alt={volunteer.name}
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover mx-auto"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-[#1B5E3B] text-white text-2xl font-bold flex items-center justify-center mx-auto">
                  {volunteer.name[0]}
                </div>
              )}
              <h1 className="mt-4 text-xl font-display font-semibold text-[#141210]" style={{ fontFamily: "'Fraunces', serif" }}>
                {volunteer.name}
              </h1>
              <span
                className="mt-2 inline-block text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: trust.bg, color: trust.color }}
              >
                ★ {trust.label}
              </span>
              <p className="mt-3 text-sm text-[#6B6560] leading-relaxed">{volunteer.bio}</p>

              <div className="mt-5 pt-5 border-t border-[#F0EDE6] flex flex-col gap-2.5 text-left">
                {[
                  { icon: '📍', text: volunteer.location },
                  { icon: '🗣️', text: volunteer.languages.join(', ') },
                  { icon: '📅', text: volunteer.availability },
                  { icon: '❤️', text: volunteer.causes.join(', ') },
                ].map(item => (
                  <div key={item.icon} className="flex gap-2 text-sm text-[#6B6560]">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-5">
              <h3 className="font-semibold text-[#141210] mb-3 text-sm">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {volunteer.skills.map(skill => (
                  <span key={skill} className="text-xs px-2.5 py-1.5 bg-[#F0F9F4] text-[#1B5E3B] rounded-full font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6 mt-8 lg:mt-0">
            {/* Impact stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { value: volunteer.verifiedServices, label: 'Verified Services', icon: '✓' },
                { value: volunteer.volunteerHours + 'h', label: 'Volunteer Hours', icon: '⏱' },
                { value: volunteer.peopleHelped.toLocaleString(), label: 'People Helped', icon: '🤝' },
                { value: volunteer.rating + '/5', label: 'Avg. Rating', icon: '⭐' },
                { value: volunteer.completionRate + '%', label: 'Completion Rate', icon: '📊' },
                { value: volunteer.points.toLocaleString(), label: 'Points Earned', icon: '🏆' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-xl border border-[#E5E0D8] p-4 text-center">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-display font-semibold text-[#141210]" style={{ fontFamily: "'Fraunces', serif" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#9B9590] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Badges */}
            {earnedBadges.length > 0 && (
              <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
                <h2 className="font-semibold text-[#141210] mb-4">Badges Earned</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {earnedBadges.map(badge => (
                    <div key={badge.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#FAFAF8] border border-[#F0EDE6]">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ backgroundColor: badge.color + '20' }}
                      >
                        {badge.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#141210] leading-tight">{badge.name}</p>
                        <p className="text-xs text-[#9B9590] mt-0.5 leading-tight line-clamp-2">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent services */}
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
              <h2 className="font-semibold text-[#141210] mb-4">Recent Services</h2>
              <div className="space-y-3">
                {recentServices.map(r => (
                  <div
                    key={r.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-[#FAFAF8] border border-[#F0EDE6] cursor-pointer hover:border-[#C8C4BC] transition-colors"
                    onClick={() => navigate('/request/' + r.id)}
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#F0F9F4] text-[#1B5E3B] flex items-center justify-center text-sm flex-shrink-0">✓</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#141210] line-clamp-1">{r.title}</p>
                      <p className="text-xs text-[#9B9590] mt-0.5">{r.location} · {r.createdAt} · {r.beneficiaries} people helped</p>
                    </div>
                    <span className="text-xs font-medium text-[#1B5E3B] bg-[#F0F9F4] px-2.5 py-1 rounded-full flex-shrink-0">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
