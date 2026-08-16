import { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { DEMO_IMPACT, DEMO_REQUESTS, DEMO_VOLUNTEERS, DEMO_ORGANIZATIONS } from '../data/demo';
import StatusBadge from '../components/StatusBadge';

const TABS = ['Overview', 'Requests', 'Volunteers', 'Organisations', 'Reports'];

export default function AdminDashboard() {
  const { navigate } = useRouter();
  const { user } = useAuth();
  const [tab, setTab] = useState('Overview');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-[#E5E0D8] p-10 text-center max-w-sm w-full">
          <div className="text-3xl mb-4">🔐</div>
          <h2 className="text-xl font-semibold text-[#141210] mb-2">Admin Access Only</h2>
          <p className="text-sm text-[#6B6560] mb-5">Sign in as an admin to access this panel.</p>
          <button onClick={() => navigate('/login')} className="w-full py-3 bg-[#1B5E3B] text-white rounded-xl font-semibold hover:bg-[#2D7A52]">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Sidebar + main layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 min-h-screen bg-[#0F3D26] hidden lg:flex flex-col">
          <div className="p-6 border-b border-white/10">
            <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Admin Panel</p>
            <p className="text-sm text-white font-medium mt-1">Khayr Platform</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === t ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Topbar */}
          <div className="bg-white border-b border-[#E5E0D8] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Mobile tabs */}
              <select
                className="lg:hidden px-3 py-1.5 border border-[#E5E0D8] rounded-lg text-sm bg-white text-[#141210] focus:outline-none"
                value={tab}
                onChange={e => setTab(e.target.value)}
              >
                {TABS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <h1 className="font-semibold text-[#141210] hidden lg:block">{tab}</h1>
            </div>
            <span className="text-xs text-[#9B9590] bg-[#F0EDE6] px-2.5 py-1 rounded-full">Demo Mode</span>
          </div>

          <div className="p-6 max-w-6xl">
            {/* Overview */}
            {tab === 'Overview' && (
              <div className="space-y-7">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Users', value: '2,788', delta: '+12 today', color: 'border-l-[#1B5E3B]' },
                    { label: 'Active Requests', value: '47', delta: '+5 this week', color: 'border-l-[#E8820C]' },
                    { label: 'Pending Verification', value: '23', delta: '3 urgent', color: 'border-l-amber-500' },
                    { label: 'Reported Content', value: '2', delta: 'Needs review', color: 'border-l-red-400' },
                    { label: 'Total Volunteers', value: DEMO_IMPACT.volunteers.toLocaleString(), delta: 'Active platform', color: 'border-l-[#1B5E3B]' },
                    { label: 'People Helped', value: DEMO_IMPACT.peopleHelped.toLocaleString(), delta: 'All time', color: 'border-l-[#E8820C]' },
                    { label: 'Volunteer Hours', value: DEMO_IMPACT.volunteerHours.toLocaleString(), delta: 'Verified', color: 'border-l-[#1B5E3B]' },
                    { label: 'Organisations', value: DEMO_IMPACT.organizations.toString(), delta: 'Registered', color: 'border-l-[#E8820C]' },
                  ].map(stat => (
                    <div key={stat.label} className={`bg-white rounded-xl border border-[#E5E0D8] border-l-4 ${stat.color} p-4`}>
                      <p className="text-xs text-[#9B9590] mb-1">{stat.label}</p>
                      <p className="text-2xl font-semibold text-[#141210]">{stat.value}</p>
                      <p className="text-xs text-[#9B9590] mt-0.5">{stat.delta}</p>
                    </div>
                  ))}
                </div>

                {/* Recent activity */}
                <div className="bg-white rounded-xl border border-[#E5E0D8]">
                  <div className="px-6 py-4 border-b border-[#F0EDE6]">
                    <h2 className="font-semibold text-[#141210]">Recent Activity</h2>
                  </div>
                  <div className="divide-y divide-[#F0EDE6]">
                    {[
                      { action: 'New request submitted', detail: '"Computer Literacy Workshop for 35 Students"', time: '5m ago', type: '📋' },
                      { action: 'Service verified', detail: 'Ahmad Raza — Digital Literacy for Senior Citizens', time: '1h ago', type: '✓' },
                      { action: 'New volunteer registered', detail: 'Fatima Malik joined as volunteer', time: '2h ago', type: '👤' },
                      { action: 'Organisation verified', detail: 'Green Earth Pakistan verified', time: '4h ago', type: '🏢' },
                      { action: 'Content reported', detail: 'Request flagged for review', time: '6h ago', type: '⚠️' },
                    ].map((item, i) => (
                      <div key={i} className="px-6 py-3.5 flex items-center gap-4">
                        <span className="text-lg">{item.type}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#141210]">{item.action}</p>
                          <p className="text-xs text-[#9B9590] truncate">{item.detail}</p>
                        </div>
                        <span className="text-xs text-[#9B9590] flex-shrink-0">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Requests */}
            {tab === 'Requests' && (
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h2 className="font-semibold text-[#141210]">All Requests ({DEMO_REQUESTS.length})</h2>
                  <div className="flex gap-2">
                    <input placeholder="Search..." className="px-3 py-2 border border-[#E5E0D8] rounded-lg text-sm focus:outline-none focus:border-[#1B5E3B]" />
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#F0EDE6] bg-[#FAFAF8]">
                          <th className="text-left px-4 py-3 text-xs font-semibold text-[#9B9590] uppercase tracking-wider">Title</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-[#9B9590] uppercase tracking-wider">Status</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-[#9B9590] uppercase tracking-wider">Location</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-[#9B9590] uppercase tracking-wider">Applicants</th>
                          <th className="text-left px-4 py-3 text-xs font-semibold text-[#9B9590] uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F0EDE6]">
                        {DEMO_REQUESTS.map(r => (
                          <tr key={r.id} className="hover:bg-[#FAFAF8] transition-colors">
                            <td className="px-4 py-3">
                              <p className="font-medium text-[#141210] line-clamp-1 max-w-60">{r.title}</p>
                              <p className="text-xs text-[#9B9590]">{r.requesterName}</p>
                            </td>
                            <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                            <td className="px-4 py-3 text-[#6B6560]">{r.location}</td>
                            <td className="px-4 py-3 text-[#141210] font-medium">{r.applicantsCount}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => navigate('/request/' + r.id)}
                                  className="text-xs text-[#1B5E3B] hover:underline"
                                >
                                  View
                                </button>
                                <button className="text-xs text-red-500 hover:underline">Hide</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Volunteers */}
            {tab === 'Volunteers' && (
              <div>
                <h2 className="font-semibold text-[#141210] mb-5">Volunteers ({DEMO_VOLUNTEERS.length})</h2>
                <div className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#F0EDE6] bg-[#FAFAF8]">
                          {['Name', 'Location', 'Trust Level', 'Services', 'Hours', 'Rating', 'Actions'].map(h => (
                            <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#9B9590] uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F0EDE6]">
                        {DEMO_VOLUNTEERS.map(v => (
                          <tr key={v.id} className="hover:bg-[#FAFAF8]">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {v.avatar && <img src={v.avatar} alt={v.name} className="w-7 h-7 rounded-full object-cover" />}
                                <span className="font-medium text-[#141210]">{v.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-[#6B6560]">{v.location}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${v.trustLevel === 'gold' ? 'bg-yellow-50 text-yellow-700' : v.trustLevel === 'silver' ? 'bg-slate-100 text-slate-600' : 'bg-amber-50 text-amber-700'}`}>
                                {v.trustLevel}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-medium text-[#141210]">{v.verifiedServices}</td>
                            <td className="px-4 py-3 text-[#6B6560]">{v.volunteerHours}h</td>
                            <td className="px-4 py-3 text-[#141210]">⭐ {v.rating}</td>
                            <td className="px-4 py-3">
                              <button onClick={() => navigate('/volunteer/' + v.id)} className="text-xs text-[#1B5E3B] hover:underline">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Organisations */}
            {tab === 'Organisations' && (
              <div>
                <h2 className="font-semibold text-[#141210] mb-5">Organisations ({DEMO_ORGANIZATIONS.length})</h2>
                <div className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#F0EDE6] bg-[#FAFAF8]">
                          {['Name', 'Type', 'Location', 'Verified', 'Active Requests', 'Actions'].map(h => (
                            <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#9B9590] uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F0EDE6]">
                        {DEMO_ORGANIZATIONS.map(org => (
                          <tr key={org.id} className="hover:bg-[#FAFAF8]">
                            <td className="px-4 py-3 font-medium text-[#141210]">{org.name}</td>
                            <td className="px-4 py-3 text-[#6B6560]">{org.type}</td>
                            <td className="px-4 py-3 text-[#6B6560]">{org.location}</td>
                            <td className="px-4 py-3">
                              {org.verified ? (
                                <span className="text-xs bg-[#F0F9F4] text-[#1B5E3B] px-2 py-1 rounded-full">✓ Verified</span>
                              ) : (
                                <button className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full hover:bg-amber-100 transition-colors">
                                  Verify →
                                </button>
                              )}
                            </td>
                            <td className="px-4 py-3 font-medium text-[#141210]">{org.activeRequests}</td>
                            <td className="px-4 py-3">
                              <button className="text-xs text-[#1B5E3B] hover:underline">View</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Reports */}
            {tab === 'Reports' && (
              <div>
                <h2 className="font-semibold text-[#141210] mb-5">Reported Content</h2>
                <div className="space-y-4">
                  {[
                    { id: 'rep1', type: 'Request', target: 'Suspicious help request for cash delivery', reason: 'Scam', reporter: 'Sara Khan', date: '2026-08-15' },
                    { id: 'rep2', type: 'User', target: 'Unknown User #445', reason: 'Harassment', reporter: 'Ahmad Raza', date: '2026-08-14' },
                  ].map(report => (
                    <div key={report.id} className="bg-white rounded-xl border border-red-100 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">⚠️ {report.type} Report</span>
                            <span className="text-xs text-[#9B9590]">Reason: {report.reason}</span>
                          </div>
                          <p className="text-sm font-medium text-[#141210]">{report.target}</p>
                          <p className="text-xs text-[#9B9590] mt-1">Reported by {report.reporter} on {report.date}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium">
                            Remove
                          </button>
                          <button className="px-3 py-1.5 text-xs bg-[#FAFAF8] border border-[#E5E0D8] text-[#6B6560] rounded-lg hover:bg-white transition-colors">
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
