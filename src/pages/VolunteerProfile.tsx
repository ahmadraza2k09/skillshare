import { useRouter } from '../context/RouterContext';
import { DEMO_VOLUNTEERS, DEMO_BADGES, DEMO_REQUESTS } from '../data/demo';
import SolidIcon, { IconName } from '../components/SolidIcon';

const TRUST_CONFIG = {
  new:      { label: 'New Volunteer',       color: 'text-slate-800', bg: 'bg-slate-200' },
  bronze:   { label: 'Bronze Trust',        color: 'text-amber-900', bg: 'bg-amber-100' },
  silver:   { label: 'Silver Trust',        color: 'text-slate-900', bg: 'bg-slate-200' },
  gold:     { label: 'Gold Trust Level',    color: 'text-amber-950', bg: 'bg-amber-200' },
  champion: { label: 'Community Champion',  color: 'text-white',     bg: 'bg-[#107c41]' },
};

export default function VolunteerProfile() {
  const { navigate } = useRouter();
  const hash = window.location.hash;
  const id = hash.split('/').pop()?.split('?')[0] || 'v1';
  const volunteer = DEMO_VOLUNTEERS.find(v => v.id === id) ?? DEMO_VOLUNTEERS[0];
  const trust = TRUST_CONFIG[volunteer.trustLevel] || TRUST_CONFIG.new;
  const earnedBadges = DEMO_BADGES.filter(b => volunteer.badges.includes(b.id));

  const recentServices = DEMO_REQUESTS
    .filter(r => r.status === 'verified' || r.status === 'completed')
    .slice(0, 3);

  const volWhatsapp = volunteer.whatsapp || '+923001112233';
  const cleanWa = volWhatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="bg-[#f0f0f1] min-h-screen pb-16">
      {/* Cover Header */}
      <div className="h-32 bg-[#1d2327] relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="wp-card p-6 text-center">
              {volunteer.avatar ? (
                <img
                  src={volunteer.avatar}
                  alt={volunteer.name}
                  className="w-24 h-24 rounded-none shadow-md object-cover mx-auto"
                />
              ) : (
                <div className="w-24 h-24 rounded-none shadow-md bg-[#2271b1] text-white text-2xl font-bold flex items-center justify-center mx-auto">
                  {volunteer.name[0]}
                </div>
              )}
              <h1 className="mt-4 text-xl font-extrabold text-[#1d2327]">
                {volunteer.name}
              </h1>

              <div className="mt-2 flex items-center justify-center">
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-none ${trust.bg} ${trust.color}`}>
                  <SolidIcon name="award" size={13} />
                  {trust.label}
                </span>
              </div>

              <p className="mt-4 text-xs text-[#50575e] leading-relaxed text-left border-t border-[#f0f0f1] pt-4 font-semibold">
                {volunteer.bio}
              </p>

              {/* Direct Contact Buttons for Volunteer */}
              <div className="mt-5 space-y-2 pt-3 border-t border-[#f0f0f1]">
                <p className="text-[11px] font-bold text-[#50575e] uppercase tracking-wider text-left">Direct Volunteer Contact</p>
                {volunteer.email && (
                  <a
                    href={`mailto:${volunteer.email}`}
                    className="wp-btn wp-btn-email w-full text-xs py-2.5 text-center rounded-none"
                  >
                    <SolidIcon name="email" size={14} /> Email Volunteer
                  </a>
                )}
                {volunteer.whatsapp && (
                  <a
                    href={`https://wa.me/${cleanWa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wp-btn wp-btn-whatsapp w-full text-xs py-2.5 text-center rounded-none"
                  >
                    <SolidIcon name="whatsapp" size={14} /> WhatsApp Volunteer
                  </a>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-[#f0f0f1] space-y-2.5 text-left text-xs">
                <div className="flex items-center gap-2 text-[#50575e]">
                  <SolidIcon name="location" size={14} className="text-[#2271b1]" />
                  <span className="font-bold text-[#1d2327]">{volunteer.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#50575e]">
                  <SolidIcon name="globe" size={14} className="text-[#2271b1]" />
                  <span className="font-bold text-[#1d2327]">{volunteer.languages.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-[#50575e]">
                  <SolidIcon name="calendar" size={14} className="text-[#2271b1]" />
                  <span className="font-bold text-[#1d2327]">{volunteer.availability}</span>
                </div>
                <div className="flex items-center gap-2 text-[#50575e]">
                  <SolidIcon name="heart" size={14} className="text-[#2271b1]" />
                  <span className="font-bold text-[#1d2327]">{volunteer.causes.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="wp-card p-5">
              <h3 className="font-bold text-[#1d2327] text-xs uppercase tracking-wider mb-3">Verified Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {volunteer.skills.map(skill => (
                  <span key={skill} className="text-xs px-2.5 py-1 bg-[#2271b1] text-white font-bold rounded-none uppercase">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Impact Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { value: volunteer.verifiedServices, label: 'Verified Services', iconName: 'check-circle' as const },
                { value: volunteer.volunteerHours + 'h', label: 'Volunteer Hours', iconName: 'clock' as const },
                { value: volunteer.peopleHelped.toLocaleString(), label: 'People Helped', iconName: 'users' as const },
                { value: volunteer.rating + ' / 5', label: 'Avg. Rating', iconName: 'star' as const },
                { value: volunteer.completionRate + '%', label: 'Completion Rate', iconName: 'chart' as const },
                { value: volunteer.points.toLocaleString(), label: 'Impact Points', iconName: 'award' as const },
              ].map(stat => (
                <div key={stat.label} className="wp-card p-4 text-center">
                  <div className="w-8 h-8 bg-[#f0f6fc] text-[#2271b1] flex items-center justify-center mx-auto mb-2 rounded-none">
                    <SolidIcon name={stat.iconName} size={16} />
                  </div>
                  <div className="text-lg font-extrabold text-[#1d2327]">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-bold uppercase text-[#50575e] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Badges */}
            {earnedBadges.length > 0 && (
              <div className="wp-card p-6">
                <h2 className="wp-card-header -mx-6 -mt-6 mb-4">Badges & Achievements</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {earnedBadges.map(badge => (
                    <div key={badge.id} className="flex items-center gap-3 p-3 bg-[#f6f7f7] rounded-none">
                      <div
                        className="w-10 h-10 flex items-center justify-center text-white flex-shrink-0 rounded-none"
                        style={{ backgroundColor: badge.color }}
                      >
                        <SolidIcon name={(badge.icon as IconName) || 'award'} size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#1d2327]">{badge.name}</p>
                        <p className="text-[11px] text-[#50575e] mt-0.5 line-clamp-1">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Services */}
            <div className="wp-card p-6">
              <h2 className="wp-card-header -mx-6 -mt-6 mb-4">Recent Verified Services</h2>
              <div className="space-y-3">
                {recentServices.map(r => (
                  <div
                    key={r.id}
                    className="p-3.5 bg-[#f6f7f7] rounded-none flex items-start justify-between gap-3 hover:bg-[#e2e4e7] cursor-pointer transition-colors"
                    onClick={() => navigate('/request/' + r.id)}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 bg-[#107c41] text-white flex items-center justify-center flex-shrink-0 rounded-none">
                        <SolidIcon name="check-circle" size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#1d2327] truncate">{r.title}</p>
                        <p className="text-[11px] text-[#50575e] mt-0.5">{r.location} · {r.beneficiaries} beneficiaries helped</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-white bg-[#107c41] px-2 py-0.5 rounded-none flex-shrink-0 uppercase">
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
