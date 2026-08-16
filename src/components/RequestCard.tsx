import type { ServiceRequest } from '../data/types';
import { useRouter } from '../context/RouterContext';
import StatusBadge from './StatusBadge';
import UrgencyBadge from './UrgencyBadge';

interface RequestCardProps {
  request: ServiceRequest;
}

export default function RequestCard({ request }: RequestCardProps) {
  const { navigate } = useRouter();

  return (
    <article
      className="bg-white rounded-[10px] border border-[#E5E0D8] overflow-hidden hover:shadow-md hover:border-[#C8C4BC] transition-all duration-200 cursor-pointer group flex flex-col"
      onClick={() => navigate('/request/' + request.id)}
    >
      {request.image && (
        <div className="h-40 overflow-hidden bg-[#F0EDE6]">
          <img
            src={request.image}
            alt={request.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs text-[#6B6560] font-medium bg-[#F0EDE6] px-2 py-1 rounded-full">
            {request.category}
          </span>
          <UrgencyBadge urgency={request.urgency} />
        </div>

        <h3 className="font-semibold text-[#141210] leading-snug group-hover:text-[#1B5E3B] transition-colors line-clamp-2">
          {request.title}
        </h3>

        <p className="text-sm text-[#6B6560] line-clamp-2 flex-1">{request.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {request.requiredSkills.slice(0, 3).map(skill => (
            <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-[#F0F9F4] text-[#1B5E3B] font-medium">
              {skill}
            </span>
          ))}
          {request.requiredSkills.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#F0EDE6] text-[#6B6560]">
              +{request.requiredSkills.length - 3}
            </span>
          )}
        </div>

        <div className="border-t border-[#F0EDE6] pt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 text-xs text-[#6B6560]">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {request.location}
            </span>
            {request.isOnline && (
              <span className="flex items-center gap-1 text-[#1B5E3B]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                Online OK
              </span>
            )}
          </div>
          <StatusBadge status={request.status} />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-[#FAFAF8] rounded-lg py-2">
            <div className="text-sm font-semibold text-[#141210]">{request.beneficiaries.toLocaleString()}</div>
            <div className="text-xs text-[#9B9590]">helped</div>
          </div>
          <div className="bg-[#FAFAF8] rounded-lg py-2">
            <div className="text-sm font-semibold text-[#141210]">{request.volunteersRequired}</div>
            <div className="text-xs text-[#9B9590]">needed</div>
          </div>
          <div className="bg-[#FAFAF8] rounded-lg py-2">
            <div className="text-sm font-semibold text-[#141210]">{request.applicantsCount}</div>
            <div className="text-xs text-[#9B9590]">applied</div>
          </div>
        </div>
      </div>
    </article>
  );
}
