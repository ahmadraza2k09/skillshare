import type { RequestStatus } from '../data/types';

const STATUS_CONFIG: Record<RequestStatus, { label: string; bg: string; text: string; dot: string }> = {
  draft:                  { label: 'Draft',                bg: 'bg-gray-100',        text: 'text-gray-600',        dot: 'bg-gray-400' },
  submitted:              { label: 'Submitted',            bg: 'bg-blue-50',          text: 'text-blue-700',        dot: 'bg-blue-400' },
  under_review:           { label: 'Under Review',         bg: 'bg-purple-50',        text: 'text-purple-700',      dot: 'bg-purple-500' },
  published:              { label: 'Published',            bg: 'bg-green-50',         text: 'text-green-700',       dot: 'bg-green-500' },
  applications_open:      { label: 'Applications Open',    bg: 'bg-emerald-50',       text: 'text-emerald-700',     dot: 'bg-emerald-500' },
  volunteer_selected:     { label: 'Volunteer Selected',   bg: 'bg-teal-50',          text: 'text-teal-700',        dot: 'bg-teal-500' },
  scheduled:              { label: 'Scheduled',            bg: 'bg-cyan-50',          text: 'text-cyan-700',        dot: 'bg-cyan-500' },
  in_progress:            { label: 'In Progress',          bg: 'bg-amber-50',         text: 'text-amber-700',       dot: 'bg-amber-500' },
  completed:              { label: 'Completed',            bg: 'bg-lime-50',          text: 'text-lime-700',        dot: 'bg-lime-500' },
  awaiting_verification:  { label: 'Awaiting Verification',bg: 'bg-orange-50',        text: 'text-orange-700',      dot: 'bg-orange-500' },
  verified:               { label: 'Verified ✓',           bg: 'bg-[#F0F9F4]',        text: 'text-[#1B5E3B]',       dot: 'bg-[#1B5E3B]' },
  closed:                 { label: 'Closed',               bg: 'bg-gray-100',         text: 'text-gray-500',        dot: 'bg-gray-400' },
  cancelled:              { label: 'Cancelled',            bg: 'bg-gray-100',         text: 'text-gray-500',        dot: 'bg-gray-400' },
  rejected:               { label: 'Rejected',             bg: 'bg-red-50',           text: 'text-red-600',         dot: 'bg-red-400' },
  expired:                { label: 'Expired',              bg: 'bg-gray-100',         text: 'text-gray-500',        dot: 'bg-gray-400' },
};

interface StatusBadgeProps {
  status: RequestStatus;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const c = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${c.bg} ${c.text} ${size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />
      {c.label}
    </span>
  );
}
