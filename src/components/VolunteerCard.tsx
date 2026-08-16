import type { Volunteer } from '../data/types';
import { useRouter } from '../context/RouterContext';
import SolidIcon from './SolidIcon';

const TRUST_CONFIG = {
  new:      { label: 'New',               color: 'text-slate-800', bg: 'bg-slate-200' },
  bronze:   { label: 'Bronze',            color: 'text-amber-900', bg: 'bg-amber-100' },
  silver:   { label: 'Silver',            color: 'text-slate-900', bg: 'bg-slate-200' },
  gold:     { label: 'Gold',              color: 'text-amber-950', bg: 'bg-amber-200' },
  champion: { label: 'Community Champion', color: 'text-white', bg: 'bg-[#107c41]' },
};

interface VolunteerCardProps {
  volunteer: Volunteer;
}

export default function VolunteerCard({ volunteer: v }: VolunteerCardProps) {
  const { navigate } = useRouter();
  const trust = TRUST_CONFIG[v.trustLevel] || TRUST_CONFIG.new;

  return (
    <article
      className="bg-white rounded-none shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between p-5"
      onClick={() => navigate('/volunteer/' + v.id)}
    >
      <div>
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            {v.avatar ? (
              <img
                src={v.avatar}
                alt={v.name}
                className="w-14 h-14 rounded-none object-cover shadow-xs"
              />
            ) : (
              <div className="w-14 h-14 rounded-none bg-[#2271b1] text-white flex items-center justify-center text-xl font-bold">
                {v.name[0]}
              </div>
            )}
            <div className={`absolute -bottom-1 -right-1 p-1 ${trust.bg} ${trust.color} shadow-xs rounded-none`}>
              <SolidIcon name={v.trustLevel === 'champion' ? 'shield' : 'award'} size={12} />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#1d2327] text-base group-hover:text-[#2271b1] transition-colors truncate">
              {v.name}
            </h3>
            <p className="text-xs text-[#50575e] flex items-center gap-1 mt-0.5 font-bold">
              <SolidIcon name="location" size={12} className="text-[#2271b1]" />
              {v.location}
            </p>
            <span className={`mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none ${trust.bg} ${trust.color}`}>
              {trust.label}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#50575e] mt-3 line-clamp-2 leading-relaxed">{v.bio}</p>

        <div className="mt-4 flex flex-wrap gap-1">
          {v.skills.slice(0, 4).map(skill => (
            <span key={skill} className="text-[11px] px-2 py-0.5 rounded-none bg-[#f6f7f7] text-[#1d2327] font-bold">
              {skill}
            </span>
          ))}
          {v.skills.length > 4 && (
            <span className="text-[11px] px-2 py-0.5 rounded-none bg-[#e2e4e7] text-[#50575e] font-bold">+{v.skills.length - 4}</span>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-1 text-center pt-3 border-t border-[#f0f0f1]">
        <div className="bg-[#f6f7f7] rounded-none py-1.5">
          <div className="text-sm font-bold text-[#1d2327]">{v.verifiedServices}</div>
          <div className="text-[10px] text-[#50575e] uppercase font-semibold">services</div>
        </div>
        <div className="bg-[#f6f7f7] rounded-none py-1.5">
          <div className="text-sm font-bold text-[#1d2327]">{v.volunteerHours}h</div>
          <div className="text-[10px] text-[#50575e] uppercase font-semibold">hours</div>
        </div>
        <div className="bg-[#f6f7f7] rounded-none py-1.5">
          <div className="text-sm font-bold text-[#1d2327] flex items-center justify-center gap-1">
            <SolidIcon name="star" size={12} className="text-amber-500" />
            {v.rating}
          </div>
          <div className="text-[10px] text-[#50575e] uppercase font-semibold">rating</div>
        </div>
      </div>
    </article>
  );
}
