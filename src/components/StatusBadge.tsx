import type { RequestStatus } from '../data/types';
import SolidIcon from './SolidIcon';

const STATUS_CONFIG: Record<RequestStatus, { label: string; bg: string; text: string; icon?: 'check' | 'clock' | 'check-circle' | 'user' | 'alert' }> = {
  draft:                  { label: 'Draft',                bg: 'bg-slate-200',       text: 'text-slate-800' },
  submitted:              { label: 'Submitted',            bg: 'bg-blue-100',        text: 'text-blue-900',      icon: 'clock' },
  under_review:           { label: 'Under Review',         bg: 'bg-purple-100',      text: 'text-purple-900',    icon: 'clock' },
  published:              { label: 'Published',            bg: 'bg-emerald-100',     text: 'text-emerald-900',   icon: 'check' },
  applications_open:      { label: 'Applications Open',    bg: 'bg-[#2271b1] text-white', text: 'text-white',     icon: 'user' },
  volunteer_selected:     { label: 'Volunteer Selected',   bg: 'bg-teal-700 text-white', text: 'text-white',     icon: 'check-circle' },
  scheduled:              { label: 'Scheduled',            bg: 'bg-cyan-100',        text: 'text-cyan-900',      icon: 'clock' },
  in_progress:            { label: 'In Progress',          bg: 'bg-amber-100',       text: 'text-amber-900',     icon: 'clock' },
  completed:              { label: 'Completed',            bg: 'bg-emerald-700 text-white', text: 'text-white',  icon: 'check-circle' },
  awaiting_verification:  { label: 'Awaiting Verification',bg: 'bg-orange-100',      text: 'text-orange-900',    icon: 'clock' },
  verified:               { label: 'Verified',             bg: 'bg-[#107c41] text-white', text: 'text-white',     icon: 'check-circle' },
  closed:                 { label: 'Closed',               bg: 'bg-gray-200',        text: 'text-gray-700' },
  cancelled:              { label: 'Cancelled',            bg: 'bg-gray-200',        text: 'text-gray-700' },
  rejected:               { label: 'Rejected',             bg: 'bg-red-100',         text: 'text-red-900',       icon: 'alert' },
  expired:                { label: 'Expired',              bg: 'bg-gray-200',        text: 'text-gray-700' },
};

interface StatusBadgeProps {
  status: RequestStatus;
  size?: 'sm' | 'md';
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const c = STATUS_CONFIG[status] || STATUS_CONFIG.published;
  return (
    <span className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-none ${c.bg} ${c.text} ${size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'}`}>
      {c.icon && <SolidIcon name={c.icon} size={size === 'sm' ? 12 : 14} />}
      {c.label}
    </span>
  );
}
