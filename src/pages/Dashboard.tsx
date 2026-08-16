import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { DEMO_REQUESTS, DEMO_APPLICATIONS, DEMO_NOTIFICATIONS, DEMO_BADGES } from '../data/demo';
import StatusBadge from '../components/StatusBadge';
import type { RequestStatus } from '../data/types';

export default function Dashboard() {
  const { navigate } = useRouter();
  const { user, login } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center bg-white rounded-2xl border border-[#E5E0D8] p-10">
          <div className="w-16 h-16 bg-[#F0F9F4] rounded-full flex items-center justify-center mx-auto mb-5 text-2xl">🔐</div>
          <h2 className="text-xl font-semibold text-[#141210] mb-2">Sign in to continue</h2>
          <p className="text-sm text-[#6B6560] mb-6">Sign in to access your dashboard.</p>
          <button onClick={() => navigate('/login')} className="w-full py-3 bg-[#1B5E3B] text-white rounded-xl font-semibold hover:bg-[#2D7A52] transition-colors">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const myRequests = DEMO_REQUESTS.slice(0, 3);
  const myApplications = DEMO_APPLICATIONS.slice(0, 2);
  const unreadNotifs = DEMO_NOTIFICATIONS.filter(n => !n.read);
  const earnedBadges = DEMO_BADGES.slice(0, 3);
  const demoRoles: Array<'volunteer' | 'community_member' | 'organization' | 'admin'> = ['volunteer', 'community_member', 'organization', 'admin'];

  type ListItem = { id: string; title: string; status: RequestStatus; location: string; date: string };
  const activityList: ListItem[] = user.role === 'volunteer'
    ? myApplications.map(a => ({
        id: a.id,
        title: a.requestTitle,
        status: (a.status === 'accepted' ? 'volunteer_selected' : 'applications_open') as RequestStatus,
        location: 'Multan, Punjab',
        date: a.appliedAt,
      }))
    : myRequests.map(r => ({
        id: r.id,
        title: r.title,
        status: r.status,
        location: r.location,
        date: r.preferredDate,
      }));

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E0D8] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-semibold text-[#141210]" style={{ fontFamily: "'Fraunces', serif" }}>
              Welcome back, {user.name.split(' ')[0]}
            </h1>
            <p className="text-sm text-[#9B9590] mt-0.5 capitalize">{user.role.replace('_', ' ')} account · Demo mode</p>
          </div>
          <div className="flex gap-3">
            {user.role === 'community_member' || user.role === 'organization' ? (
              <button
                onClick={() => navigate('/request-help')}
                className="px-5 py-2.5 bg-[#1B5E3B] text-white text-sm font-medium rounded-xl hover:bg-[#2D7A52] transition-colors"
              >
                + New Request
              </button>
            ) : (
              <button
                onClick={() => navigate('/find-help')}
                className="px-5 py-2.5 bg-[#1B5E3B] text-white text-sm font-medium rounded-xl hover:bg-[#2D7A52] transition-colors"
              >
                Find Needs
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-7">
            {/* Quick stats */}
            {(() => {
              const stats = user.role === 'volunteer'
                ? [
                    { val: '11', label: 'Services', icon: '✓' },
                    { val: '38h', label: 'Hours', icon: '⏱' },
                    { val: '220', label: 'Helped', icon: '🤝' },
                    { val: '4.6', label: 'Rating', icon: '⭐' },
                  ]
                : [
                    { val: '4', label: 'Requests', icon: '📋' },
                    { val: '2', label: 'Active', icon: '🟢' },
                    { val: '18', label: 'Applications', icon: '📥' },
                    { val: '95', label: 'People helped', icon: '🤝' },
                  ];
              return (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stats.map(stat => (
                    <div key={stat.label} className="bg-white rounded-xl border border-[#E5E0D8] p-4 text-center">
                      <div className="text-xl mb-1">{stat.icon}</div>
                      <div className="text-xl font-semibold text-[#141210]">{stat.val}</div>
                      <div className="text-xs text-[#9B9590]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* My requests / applications */}
            <div className="bg-white rounded-xl border border-[#E5E0D8]">
              <div className="px-6 py-4 border-b border-[#F0EDE6] flex justify-between items-center">
                <h2 className="font-semibold text-[#141210]">
                  {user.role === 'volunteer' ? 'My Applications' : 'My Requests'}
                </h2>
                <button onClick={() => navigate('/find-help')} className="text-xs text-[#1B5E3B] hover:underline">View all</button>
              </div>
              <div className="divide-y divide-[#F0EDE6]">
                {activityList.map(item => (
                  <div
                    key={item.id}
                    className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#FAFAF8] cursor-pointer transition-colors"
                    onClick={() => navigate('/request/' + item.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#141210] line-clamp-1">{item.title}</p>
                      <p className="text-xs text-[#9B9590] mt-0.5">{item.location} · {item.date}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl border border-[#E5E0D8]">
              <div className="px-6 py-4 border-b border-[#F0EDE6] flex justify-between items-center">
                <h2 className="font-semibold text-[#141210] flex items-center gap-2">
                  Notifications
                  {unreadNotifs.length > 0 && (
                    <span className="text-xs bg-[#E8820C] text-white px-2 py-0.5 rounded-full">{unreadNotifs.length}</span>
                  )}
                </h2>
              </div>
              <div className="divide-y divide-[#F0EDE6]">
                {DEMO_NOTIFICATIONS.map(n => (
                  <div key={n.id} className={`px-6 py-4 flex gap-4 ${!n.read ? 'bg-[#FFFBF5]' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!n.read ? 'bg-[#E8820C]' : 'bg-[#E5E0D8]'}`} />
                    <div>
                      <p className="text-sm font-medium text-[#141210]">{n.title}</p>
                      <p className="text-sm text-[#6B6560] mt-0.5">{n.body}</p>
                      <p className="text-xs text-[#9B9590] mt-1">{n.createdAt.split('T')[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Profile card */}
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-5 text-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-[#E5E0D8]" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#1B5E3B] text-white text-xl font-bold flex items-center justify-center mx-auto">
                  {user.name[0]}
                </div>
              )}
              <h3 className="mt-3 font-semibold text-[#141210]">{user.name}</h3>
              <p className="text-xs text-[#9B9590] mt-0.5 capitalize">{user.role.replace('_', ' ')}</p>
              <button
                onClick={() => navigate('/volunteer/v1')}
                className="mt-4 w-full py-2 border border-[#E5E0D8] rounded-lg text-sm text-[#6B6560] hover:bg-[#FAFAF8] transition-colors"
              >
                View Public Profile
              </button>
            </div>

            {/* Badges */}
            {earnedBadges.length > 0 && (
              <div className="bg-white rounded-xl border border-[#E5E0D8] p-5">
                <h3 className="font-semibold text-[#141210] mb-3 text-sm">Recent Badges</h3>
                <div className="space-y-2.5">
                  {earnedBadges.map(badge => (
                    <div key={badge.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-[#FAFAF8]">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                        style={{ background: badge.color + '20' }}
                      >
                        {badge.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#141210]">{badge.name}</p>
                        <p className="text-xs text-[#9B9590] line-clamp-1">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Switch demo user */}
            <div className="bg-[#F0EDE6] rounded-xl p-4 border border-[#E5E0D8]">
              <p className="text-xs font-semibold text-[#141210] mb-3">Demo: Switch User Role</p>
              <div className="flex flex-col gap-2">
                {demoRoles.map(role => (
                  <button
                    key={role}
                    onClick={() => login(role)}
                    className={`py-2 text-xs rounded-lg font-medium capitalize transition-colors ${user.role === role ? 'bg-[#1B5E3B] text-white' : 'bg-white border border-[#E5E0D8] text-[#6B6560] hover:bg-[#FAFAF8]'}`}
                  >
                    {role.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
