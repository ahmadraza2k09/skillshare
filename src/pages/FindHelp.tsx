import { useState, useMemo } from 'react';
import { DEMO_REQUESTS } from '../data/demo';
import { CATEGORIES } from '../data/types';
import RequestCard from '../components/RequestCard';
import type { Urgency, RequestStatus } from '../data/types';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'urgent', label: 'Most urgent' },
  { value: 'beneficiaries', label: 'Most people helped' },
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
      const notHidden: RequestStatus[] = ['cancelled', 'rejected', 'draft'];
      if (notHidden.includes(r.status)) return false;
      if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.description.toLowerCase().includes(search.toLowerCase())) return false;
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
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <div className="bg-[#1B5E3B] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-display font-semibold text-white mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
            Find Community Needs
          </h1>
          <p className="text-white/70">Browse genuine requests where your skills can make a difference.</p>

          <div className="mt-6 flex gap-3">
            <div className="flex-1 relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search requests by keyword, skill, or description..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3 rounded-xl border font-medium text-sm transition-all flex items-center gap-2 ${showFilters ? 'bg-white text-[#1B5E3B] border-white' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white border-b border-[#E5E0D8] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-2 block">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#E5E0D8] rounded-lg text-sm text-[#141210] focus:outline-none focus:border-[#1B5E3B] bg-white"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-2 block">Location</label>
                <select
                  value={location}
                  onChange={e => setLocation(e.target.value === 'All Locations' ? '' : e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#E5E0D8] rounded-lg text-sm text-[#141210] focus:outline-none focus:border-[#1B5E3B] bg-white"
                >
                  {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-2 block">Urgency</label>
                <select
                  value={urgency}
                  onChange={e => setUrgency(e.target.value as Urgency | '')}
                  className="w-full px-3 py-2.5 border border-[#E5E0D8] rounded-lg text-sm text-[#141210] focus:outline-none focus:border-[#1B5E3B] bg-white"
                >
                  <option value="">Any Urgency</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#6B6560] uppercase tracking-wider mb-2 block">Mode</label>
                <div className="flex gap-2">
                  {(['all', 'online', 'inperson'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`flex-1 py-2.5 text-xs font-medium rounded-lg border transition-all capitalize ${mode === m ? 'bg-[#1B5E3B] text-white border-[#1B5E3B]' : 'border-[#E5E0D8] text-[#6B6560] hover:border-[#1B5E3B]'}`}
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
                className="mt-3 text-xs text-[#E8820C] font-medium hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#6B6560]">
            <span className="font-semibold text-[#141210]">{filtered.length}</span> {filtered.length === 1 ? 'need' : 'needs'} found
          </p>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm text-[#141210] focus:outline-none focus:border-[#1B5E3B] bg-white"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-[#F0EDE6] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔍</div>
            <h3 className="font-semibold text-[#141210] mb-2">No needs found</h3>
            <p className="text-sm text-[#6B6560]">Try adjusting your filters or search terms.</p>
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
