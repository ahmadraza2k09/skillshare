import type { Urgency } from '../data/types';

const URGENCY_CONFIG: Record<Urgency, { label: string; bg: string; text: string }> = {
  low:    { label: 'Low',    bg: 'bg-gray-100',   text: 'text-gray-500' },
  normal: { label: 'Normal', bg: 'bg-blue-50',    text: 'text-blue-600' },
  high:   { label: 'High',   bg: 'bg-orange-50',  text: 'text-orange-600' },
  urgent: { label: 'Urgent', bg: 'bg-red-50',     text: 'text-red-600' },
};

export default function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const c = URGENCY_CONFIG[urgency];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${c.bg} ${c.text}`}>
      {urgency === 'urgent' && '🔴 '}
      {urgency === 'high' && '🟠 '}
      {c.label}
    </span>
  );
}
