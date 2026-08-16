import type { ServiceRequest } from '../data/types';
import { useRouter } from '../context/RouterContext';
import StatusBadge from './StatusBadge';
import UrgencyBadge from './UrgencyBadge';
import SolidIcon from './SolidIcon';

interface RequestCardProps {
  request: ServiceRequest;
}

export default function RequestCard({ request }: RequestCardProps) {
  const { navigate } = useRouter();

  return (
    <article
      className="bg-white rounded-none shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
      onClick={() => navigate('/request/' + request.id)}
    >
      <div>
        {request.image && (
          <div className="h-44 overflow-hidden bg-[#f0f0f1] relative rounded-none">
            <img
              src={request.image}
              alt={request.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 left-2 flex gap-1">
              <span className="text-[11px] text-white font-bold bg-[#1d2327] px-2 py-1 rounded-none uppercase tracking-wider">
                {request.category}
              </span>
            </div>
          </div>
        )}

        <div className="p-5 space-y-3">
          {!request.image && (
            <div className="flex items-start justify-between gap-2">
              <span className="text-[11px] text-[#1d2327] font-bold bg-[#f6f7f7] px-2 py-1 rounded-none uppercase tracking-wider">
                {request.category}
              </span>
              <UrgencyBadge urgency={request.urgency} />
            </div>
          )}

          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold text-[#2271b1] uppercase tracking-wider flex items-center gap-1.5">
              <SolidIcon name="building" size={14} className="text-[#2271b1]" />
              <span className="truncate max-w-[200px]">{request.requesterName}</span>
            </p>
            {request.image && <UrgencyBadge urgency={request.urgency} />}
          </div>

          <h3 className="font-bold text-[#1d2327] text-base leading-snug group-hover:text-[#2271b1] transition-colors line-clamp-2">
            {request.title}
          </h3>

          <p className="text-xs text-[#50575e] line-clamp-2 leading-relaxed">{request.description}</p>

          {/* Solid Square Recognition Box */}
          <div className="bg-[#f0f6fc] rounded-none p-3 flex items-center gap-3">
            <div className="w-7 h-7 bg-[#2271b1] text-white flex items-center justify-center flex-shrink-0 rounded-none">
              <SolidIcon name="award" size={14} />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-[#2271b1] block text-[10px] uppercase tracking-widest">VOLUNTEER REWARD</span>
              <span className="truncate font-bold text-xs text-[#1d2327] block">
                {request.recognitionType || 'Volunteer Certificate'}
              </span>
            </div>
          </div>

          {/* Required skills tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {request.requiredSkills.slice(0, 3).map(skill => (
              <span key={skill} className="text-[11px] px-2 py-0.5 rounded-none bg-[#f6f7f7] text-[#1d2327] font-bold">
                {skill}
              </span>
            ))}
            {request.requiredSkills.length > 3 && (
              <span className="text-[11px] px-2 py-0.5 rounded-none bg-[#e2e4e7] text-[#50575e] font-bold">
                +{request.requiredSkills.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 space-y-3">
        <div className="bg-[#f6f7f7] p-2.5 flex items-center justify-between text-xs rounded-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-bold text-[#1d2327]">
              <SolidIcon name="location" size={13} className="text-[#2271b1]" />
              {request.location}
            </span>
            {request.isOnline && (
              <span className="flex items-center gap-1 font-bold text-[#107c41] bg-[#e6f4ea] px-1.5 py-0.5 rounded-none text-[10px] uppercase">
                <SolidIcon name="laptop" size={12} />
                Online
              </span>
            )}
          </div>
          <StatusBadge status={request.status} />
        </div>

        <div className="grid grid-cols-3 gap-1 text-center">
          <div className="bg-[#f0f0f1] rounded-none py-1.5">
            <div className="text-xs font-bold text-[#1d2327]">{request.beneficiaries.toLocaleString()}</div>
            <div className="text-[10px] text-[#50575e] font-semibold uppercase">beneficiaries</div>
          </div>
          <div className="bg-[#f0f0f1] rounded-none py-1.5">
            <div className="text-xs font-bold text-[#1d2327]">{request.volunteersRequired}</div>
            <div className="text-[10px] text-[#50575e] font-semibold uppercase">needed</div>
          </div>
          <div className="bg-[#f0f0f1] rounded-none py-1.5">
            <div className="text-xs font-bold text-[#1d2327]">{request.applicantsCount}</div>
            <div className="text-[10px] text-[#50575e] font-semibold uppercase">applied</div>
          </div>
        </div>
      </div>
    </article>
  );
}
