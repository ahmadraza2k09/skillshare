import type { Volunteer } from '../data/types';
import { useRouter } from '../context/RouterContext';

const TRUST_CONFIG = {
  new:      { label: 'New',              color: 'text-gray-500',   bg: 'bg-gray-100' },
  bronze:   { label: 'Bronze',           color: 'text-amber-700',  bg: 'bg-amber-50' },
  silver:   { label: 'Silver',           color: 'text-slate-600',  bg: 'bg-slate-100' },
  gold:     { label: 'Gold',             color: 'text-yellow-700', bg: 'bg-yellow-50' },
  champion: { label: 'Community Champion', color: 'text-[#1B5E3B]', bg: 'bg-[#F0F9F4]' },
};

interface VolunteerCardProps {
  volunteer: Volunteer;
}

export default function VolunteerCard({ volunteer: v }: VolunteerCardProps) {
  const { navigate } = useRouter();
  const trust = TRUST_CONFIG[v.trustLevel];

  return (
    <article
      className="bg-white rounded-[10px] border border-[#E5E0D8] p-5 hover:shadow-md hover:border-[#C8C4BC] transition-all duration-200 cursor-pointer group"
      onClick={() => navigate('/volunteer/' + v.id)}
    >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          {v.avatar ? (
            <img
              src={v.avatar}
              alt={v.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#E5E0D8]"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#F0F9F4] border-2 border-[#E5E0D8] flex items-center justify-center text-xl font-semibold text-[#1B5E3B]">
              {v.name[0]}
            </div>
          )}
          <span className={`absolute -bottom-1 -right-1 text-xs font-semibold px-1.5 py-0.5 rounded-full border border-white ${trust.bg} ${trust.color}`} style={{ fontSize: '10px' }}>
            {v.trustLevel === 'gold' ? '★' : v.trustLevel === 'champion' ? '👑' : v.trustLevel[0].toUpperCase()}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#141210] group-hover:text-[#1B5E3B] transition-colors truncate">
            {v.name}
          </h3>
          <p className="text-xs text-[#6B6560] flex items-center gap-1 mt-0.5">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {v.location}
          </p>
          <span className={`mt-1.5 inline-block text-xs font-medium px-2 py-0.5 rounded-full ${trust.bg} ${trust.color}`}>
            {trust.label} Trust
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {v.skills.slice(0, 4).map(skill => (
          <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-[#F0EDE6] text-[#6B6560]">
            {skill}
          </span>
        ))}
        {v.skills.length > 4 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#F0EDE6] text-[#6B6560]">+{v.skills.length - 4}</span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-[#FAFAF8] rounded-lg py-2">
          <div className="text-sm font-semibold text-[#141210]">{v.verifiedServices}</div>
          <div className="text-xs text-[#9B9590]">services</div>
        </div>
        <div className="bg-[#FAFAF8] rounded-lg py-2">
          <div className="text-sm font-semibold text-[#141210]">{v.volunteerHours}h</div>
          <div className="text-xs text-[#9B9590]">hours</div>
        </div>
        <div className="bg-[#FAFAF8] rounded-lg py-2">
          <div className="text-sm font-semibold text-[#141210]">{"⭐"} {v.rating}</div>
          <div className="text-xs text-[#9B9590]">rating</div>
        </div>
      </div>
    </article>
  );
}
