import type { Urgency } from '../data/types';

const URGENCY_CONFIG: Record<Urgency, { label: string; bg: string; text: string }> = {
  low:    { label: 'Low Urgency',    bg: 'bg-slate-200', text: 'text-slate-800' },
  normal: { label: 'Normal Urgency', bg: 'bg-blue-100',  text: 'text-blue-900' },
  high:   { label: 'High Urgency',   bg: 'bg-amber-500 text-white', text: 'text-white' },
  urgent: { label: 'Urgent', bg: 'bg-red-700 text-white',   text: 'text-white' },
};

export default function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const c = URGENCY_CONFIG[urgency] || URGENCY_CONFIG.normal;
  return (
    <span className={`inline-flex items-center font-bold uppercase tracking-wider rounded-none px-2.5 py-1 text-[10px] ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}
