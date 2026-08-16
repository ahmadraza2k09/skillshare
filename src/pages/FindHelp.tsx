import { useState, useMemo } from 'react';
import { DEMO_REQUESTS } from '../data/demo';
import { CATEGORIES } from '../data/types';
import RequestCard from '../components/RequestCard';
import SolidIcon from '../components/SolidIcon';
import type { Urgency, RequestStatus } from '../data/types';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'urgent', label: 'Most urgent' },
  { value: 'beneficiaries', label: 'Most beneficiaries' },
  { value: 'applicants', label: 'Most applicants' },
];

const LOCATIONS = ['All Locations', 'Lahore, Punjab', 'Karachi, Sindh', 'Islamabad', 'Multan, Punjab', 'Peshawar, KPK'];

export default function FindHelp() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState<Urgency | ''>('');
  const [mode, setMode] = useState<'all' | 'online' | 'inperson'>('all');
  const [sort, setSort] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...DEMO_REQUESTS].filter(r => {
      const hidden: RequestStatus[] = ['cancelled', 'rejected', 'draft'];
      if (hidden.includes(r.status)) return false;
      if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase()) && !r.requesterName.toLowerCase().includes(search.toLowerCase())) return false;
      if (category && r.category !== category) return false;
      if (location && r.location !== location) return false;
      if (urgency && r.urgency !== urgency) return false;
      if (mode === 'online' && !r.isOnline) return false;
      if (mode === 'inperson' && r.isOnline) return false;
      return true;
    });

    if (sort === 'urgent') {
      const urgencyOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
      list.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
    } else if (sort === 'beneficiaries') {
      list.sort((a, b) => b.beneficiaries - a.beneficiaries);
    } else if (sort === 'applicants') {
      list.sort((a, b) => b.applicantsCount - a.applicantsCount);
    } else {
      list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }

    return list;
  }, [search, category, location, urgency, mode, sort]);

  return (
    <div className="bg-[#f0f0f1] min-h-screen pb-16">
      {/* WP Header */}
      <div className="bg-[#1d2327] text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold text-[#2271b1] uppercase tracking-widest block mb-1">
            Community Needs Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Browse Volunteer Opportunities
          </h1>
          <p className="text-xs text-white/70">
            Discover verified opportunities from NGOs, schools, and institutions. Connect directly with organizations via Email or WhatsApp.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60">
                <SolidIcon name="search" size={16} />
              </span>
              <input
                type="text"
                placeholder="Search opportunities by title, skill, or organization..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-none text-xs text-white placeholder-white/50 focus:outline-none focus:bg-white/20 transition-all font-semibold"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3 rounded-none font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                showFilters ? 'bg-white text-[#1d2327]' : 'bg-[#2271b1] text-white hover:bg-[#135e96]'
              }`}
            >
              <SolidIcon name="filter" size={14} />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1 block">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-none text-xs text-[#1d2327] font-semibold focus:outline-none bg-[#f6f7f7]"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1 block">Location</label>
                <select
                  value={location}
                  onChange={e => setLocation(e.target.value === 'All Locations' ? '' : e.target.value)}
                  className="w-full px-3 py-2.5 rounded-none text-xs text-[#1d2327] font-semibold focus:outline-none bg-[#f6f7f7]"
                >
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1 block">Urgency</label>
                <select
                  value={urgency}
                  onChange={e => setUrgency(e.target.value as Urgency | '')}
                  className="w-full px-3 py-2.5 rounded-none text-xs text-[#1d2327] font-semibold focus:outline-none bg-[#f6f7f7]"
                >
                  <option value="">Any Urgency</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1 block">Mode</label>
                <div className="flex gap-1">
                  {(['all', 'online', 'inperson'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`flex-1 py-2 text-[11px] font-bold uppercase rounded-none transition-all ${
                        mode === m
                          ? 'bg-[#2271b1] text-white'
                          : 'bg-[#f6f7f7] text-[#1d2327] hover:bg-[#e2e4e7]'
                      }`}
                    >
                      {m === 'inperson' ? 'In-person' : m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {(category || location || urgency || mode !== 'all') && (
              <button
                onClick={() => { setCategory(''); setLocation(''); setUrgency(''); setMode('all'); }}
                className="mt-3 text-xs text-[#2271b1] font-bold uppercase tracking-wider hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6 pb-3">
          <p className="text-xs font-bold text-[#50575e] uppercase tracking-wider">
            Showing <span className="text-[#1d2327] font-extrabold">{filtered.length}</span> volunteer {filtered.length === 1 ? 'opportunity' : 'opportunities'}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#50575e] font-bold uppercase hidden sm:inline">Sort:</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-3 py-1.5 rounded-none text-xs text-[#1d2327] font-bold focus:outline-none bg-white shadow-xs"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="wp-card text-center py-16 px-4">
            <div className="w-14 h-14 bg-[#f0f0f1] text-[#50575e] rounded-none flex items-center justify-center mx-auto mb-4">
              <SolidIcon name="search" size={28} />
            </div>
            <h3 className="font-bold text-[#1d2327] mb-1 text-lg">No Volunteer Opportunities Found</h3>
            <p className="text-xs text-[#50575e] max-w-sm mx-auto">
              No active opportunities match your search or filter criteria. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(r => <RequestCard key={r.id} request={r} />)}
          </div>
        )}
      </div>
    </div>
  );
}
