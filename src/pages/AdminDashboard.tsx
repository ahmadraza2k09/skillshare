import { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { DEMO_IMPACT, DEMO_REQUESTS, DEMO_VOLUNTEERS, DEMO_ORGANIZATIONS } from '../data/demo';
import StatusBadge from '../components/StatusBadge';
import SolidIcon from '../components/SolidIcon';

const TABS = ['Overview', 'Requests', 'Volunteers', 'Organisations', 'Reports'];

export default function AdminDashboard() {
  const { navigate } = useRouter();
  const { user } = useAuth();
  const [tab, setTab] = useState('Overview');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#f0f0f1] flex items-center justify-center px-4">
        <div className="wp-card p-8 text-center max-w-sm w-full rounded-none">
          <div className="w-14 h-14 bg-[#2271b1] text-white flex items-center justify-center mx-auto mb-4 rounded-none">
            <SolidIcon name="lock" size={28} />
          </div>
          <h2 className="text-lg font-bold text-[#1d2327] mb-1">Admin Panel Access Only</h2>
          <p className="text-xs text-[#50575e] mb-5">Please sign in with administrator credentials.</p>
          <button onClick={() => navigate('/login')} className="wp-btn wp-btn-primary w-full">
            Sign In as Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f0f0f1] min-h-screen">
      <div className="flex">
        {/* WP Admin Sidebar */}
        <aside className="w-56 min-h-screen bg-[#1d2327] hidden lg:flex flex-col">
          <div className="p-5 border-b border-[#2c3338]">
            <p className="text-[10px] font-bold text-[#2271b1] uppercase tracking-widest">WP Admin Panel</p>
            <p className="text-sm font-extrabold text-white mt-1">Platform Control</p>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`w-full text-left px-3.5 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
                  tab === t ? 'bg-[#2271b1] text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <SolidIcon name={t === 'Overview' ? 'chart' : t === 'Requests' ? 'plus' : t === 'Volunteers' ? 'user' : t === 'Organisations' ? 'building' : 'alert'} size={14} />
                <span>{t}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Admin Topbar */}
          <div className="bg-white px-6 py-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-4">
              <select
                className="lg:hidden px-3 py-2 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                value={tab}
                onChange={e => setTab(e.target.value)}
              >
                {TABS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <h1 className="font-extrabold text-[#1d2327] text-lg uppercase tracking-wider hidden lg:block">{tab} Overview</h1>
            </div>
            <span className="text-xs font-bold text-white bg-[#2271b1] px-3 py-1 rounded-none uppercase tracking-wider">
              Admin Active Session
            </span>
          </div>

          <div className="p-6 max-w-6xl">
            {/* Overview */}
            {tab === 'Overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Users', value: '2,788', delta: '+12 today', color: 'border-l-4 border-l-[#2271b1]' },
                    { label: 'Active Requests', value: '47', delta: '+5 this week', color: 'border-l-4 border-l-[#d97706]' },
                    { label: 'Pending Verifications', value: '23', delta: '3 urgent', color: 'border-l-4 border-l-amber-500' },
                    { label: 'Reported Items', value: '2', delta: 'Needs review', color: 'border-l-4 border-l-red-600' },
                    { label: 'Registered Volunteers', value: DEMO_IMPACT.volunteers.toLocaleString(), delta: 'Active platform', color: 'border-l-4 border-l-[#107c41]' },
                    { label: 'Beneficiaries Helped', value: DEMO_IMPACT.peopleHelped.toLocaleString(), delta: 'All time', color: 'border-l-4 border-l-[#2271b1]' },
                    { label: 'Volunteer Hours', value: DEMO_IMPACT.volunteerHours.toLocaleString(), delta: 'Verified', color: 'border-l-4 border-l-[#107c41]' },
                    { label: 'Organisations', value: DEMO_IMPACT.organizations.toString(), delta: 'Registered', color: 'border-l-4 border-l-[#2271b1]' },
                  ].map(stat => (
                    <div key={stat.label} className={`wp-card ${stat.color} p-4 rounded-none`}>
                      <p className="text-[10px] font-bold text-[#50575e] uppercase tracking-wider mb-1">{stat.label}</p>
                      <p className="text-2xl font-extrabold text-[#1d2327]">{stat.value}</p>
                      <p className="text-[11px] text-[#8c8f94] mt-0.5 font-semibold">{stat.delta}</p>
                    </div>
                  ))}
                </div>

                {/* Recent activity */}
                <div className="wp-card rounded-none">
                  <div className="px-6 py-4 bg-[#f6f7f7]">
                    <h2 className="font-extrabold text-[#1d2327] text-sm uppercase tracking-wider">Recent Platform Activity</h2>
                  </div>
                  <div className="divide-y divide-[#f0f0f1]">
                    {[
                      { action: 'New opportunity submitted', detail: '"Computer Literacy Workshop for 35 Students"', time: '5m ago', iconName: 'plus' as const },
                      { action: 'Service verified', detail: 'Ahmad Raza — Digital Literacy for Senior Citizens', time: '1h ago', iconName: 'check-circle' as const },
                      { action: 'New volunteer registered', detail: 'Fatima Malik joined as volunteer', time: '2h ago', iconName: 'user' as const },
                      { action: 'Organisation verified', detail: 'Green Earth Pakistan verified', time: '4h ago', iconName: 'building' as const },
                      { action: 'Content reported', detail: 'Opportunity flagged for review', time: '6h ago', iconName: 'alert' as const },
                    ].map((item, i) => (
                      <div key={i} className="px-6 py-3.5 flex items-center gap-4">
                        <div className="w-7 h-7 bg-[#2271b1] text-white flex items-center justify-center flex-shrink-0 rounded-none">
                          <SolidIcon name={item.iconName} size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#1d2327]">{item.action}</p>
                          <p className="text-xs text-[#50575e] truncate font-medium">{item.detail}</p>
                        </div>
                        <span className="text-[11px] text-[#8c8f94] flex-shrink-0 font-semibold">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Requests */}
            {tab === 'Requests' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-extrabold text-[#1d2327] text-base uppercase tracking-wider">All Volunteer Opportunities ({DEMO_REQUESTS.length})</h2>
                </div>
                <div className="wp-card overflow-hidden rounded-none">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-[#f6f7f7]">
                          <th className="text-left px-4 py-3 font-bold text-[#1d2327] uppercase tracking-wider">Title</th>
                          <th className="text-left px-4 py-3 font-bold text-[#1d2327] uppercase tracking-wider">Status</th>
                          <th className="text-left px-4 py-3 font-bold text-[#1d2327] uppercase tracking-wider">Location</th>
                          <th className="text-left px-4 py-3 font-bold text-[#1d2327] uppercase tracking-wider">Recognition Offered</th>
                          <th className="text-left px-4 py-3 font-bold text-[#1d2327] uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0f0f1]">
                        {DEMO_REQUESTS.map(r => (
                          <tr key={r.id} className="hover:bg-[#f6f7f7] transition-colors">
                            <td className="px-4 py-3">
                              <p className="font-bold text-[#1d2327] line-clamp-1 max-w-60">{r.title}</p>
                              <p className="text-[11px] text-[#50575e]">{r.requesterName}</p>
                            </td>
                            <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                            <td className="px-4 py-3 text-[#50575e] font-semibold">{r.location}</td>
                            <td className="px-4 py-3 font-bold text-[#2271b1]">{r.recognitionType}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => navigate('/request/' + r.id)}
                                  className="text-xs text-[#2271b1] font-bold uppercase hover:underline"
                                >
                                  View
                                </button>
                                <button className="text-xs text-red-700 font-bold uppercase hover:underline">Hide</button>
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
                <h2 className="font-extrabold text-[#1d2327] mb-4 text-base uppercase tracking-wider">Registered Volunteers ({DEMO_VOLUNTEERS.length})</h2>
                <div className="wp-card overflow-hidden rounded-none">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-[#f6f7f7]">
                          {['Name', 'Location', 'Trust Level', 'Services', 'Hours', 'Rating', 'Actions'].map(h => (
                            <th key={h} className="text-left px-4 py-3 font-bold text-[#1d2327] uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0f0f1]">
                        {DEMO_VOLUNTEERS.map(v => (
                          <tr key={v.id} className="hover:bg-[#f6f7f7]">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {v.avatar && <img src={v.avatar} alt={v.name} className="w-7 h-7 rounded-none object-cover" />}
                                <span className="font-bold text-[#1d2327]">{v.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-[#50575e] font-semibold">{v.location}</td>
                            <td className="px-4 py-3">
                              <span className="text-[10px] px-2 py-0.5 rounded-none font-bold uppercase bg-[#2271b1] text-white">
                                {v.trustLevel}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-extrabold text-[#1d2327]">{v.verifiedServices}</td>
                            <td className="px-4 py-3 text-[#50575e] font-semibold">{v.volunteerHours}h</td>
                            <td className="px-4 py-3 text-[#1d2327] font-bold">{v.rating} / 5</td>
                            <td className="px-4 py-3">
                              <button onClick={() => navigate('/volunteer/' + v.id)} className="text-xs text-[#2271b1] font-bold uppercase hover:underline">View</button>
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
                <h2 className="font-extrabold text-[#1d2327] mb-4 text-base uppercase tracking-wider">Organisations ({DEMO_ORGANIZATIONS.length})</h2>
                <div className="wp-card overflow-hidden rounded-none">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-[#f6f7f7]">
                          {['Name', 'Type', 'Location', 'Status', 'Active Needs', 'Actions'].map(h => (
                            <th key={h} className="text-left px-4 py-3 font-bold text-[#1d2327] uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0f0f1]">
                        {DEMO_ORGANIZATIONS.map(org => (
                          <tr key={org.id} className="hover:bg-[#f6f7f7]">
                            <td className="px-4 py-3 font-bold text-[#1d2327]">{org.name}</td>
                            <td className="px-4 py-3 text-[#50575e] font-semibold">{org.type}</td>
                            <td className="px-4 py-3 text-[#50575e] font-semibold">{org.location}</td>
                            <td className="px-4 py-3">
                              {org.verified ? (
                                <span className="inline-flex items-center gap-1 text-[10px] bg-[#107c41] text-white px-2 py-0.5 rounded-none font-bold uppercase">
                                  <SolidIcon name="check-circle" size={12} /> Verified NGO
                                </span>
                              ) : (
                                <button className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-none font-bold uppercase">
                                  Verify NGO
                                </button>
                              )}
                            </td>
                            <td className="px-4 py-3 font-extrabold text-[#1d2327]">{org.activeRequests}</td>
                            <td className="px-4 py-3">
                              <button className="text-xs text-[#2271b1] font-bold uppercase hover:underline">View</button>
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
                <h2 className="font-extrabold text-[#1d2327] mb-4 text-base uppercase tracking-wider">Reported Content</h2>
                <div className="space-y-4">
                  {[
                    { id: 'rep1', type: 'Request', target: 'Suspicious help request for cash delivery', reason: 'Scam', reporter: 'Sara Khan', date: '2026-08-15' },
                    { id: 'rep2', type: 'User', target: 'Unknown User #445', reason: 'Harassment', reporter: 'Ahmad Raza', date: '2026-08-14' },
                  ].map(report => (
                    <div key={report.id} className="wp-card p-5 border-l-4 border-l-red-600 rounded-none">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] bg-red-700 text-white px-2 py-0.5 font-bold uppercase flex items-center gap-1 rounded-none">
                              <SolidIcon name="alert" size={12} /> {report.type} Report
                            </span>
                            <span className="text-xs text-[#50575e] font-bold">Reason: {report.reason}</span>
                          </div>
                          <p className="text-xs font-bold text-[#1d2327]">{report.target}</p>
                          <p className="text-[11px] text-[#8c8f94] mt-1 font-semibold">Reported by {report.reporter} on {report.date}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button className="px-3 py-1 text-xs bg-red-700 text-white rounded-none font-bold uppercase">
                            Remove
                          </button>
                          <button className="px-3 py-1 text-xs bg-[#e2e4e7] text-[#1d2327] rounded-none font-bold uppercase hover:bg-gray-300">
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
