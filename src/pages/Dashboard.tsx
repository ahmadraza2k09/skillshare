import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { DEMO_REQUESTS, DEMO_APPLICATIONS, DEMO_NOTIFICATIONS, DEMO_BADGES } from '../data/demo';
import StatusBadge from '../components/StatusBadge';
import SolidIcon, { IconName } from '../components/SolidIcon';
import type { RequestStatus } from '../data/types';

export default function Dashboard() {
  const { navigate } = useRouter();
  const { user, login } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f0f0f1] flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center wp-card p-8 rounded-none">
          <div className="w-14 h-14 bg-[#2271b1] text-white rounded-none flex items-center justify-center mx-auto mb-4">
            <SolidIcon name="lock" size={28} />
          </div>
          <h2 className="text-lg font-bold text-[#1d2327] mb-1">Sign in to Access Dashboard</h2>
          <p className="text-xs text-[#50575e] mb-6">Please sign in to manage your volunteer opportunities or interest.</p>
          <button onClick={() => navigate('/login')} className="wp-btn wp-btn-primary w-full">
            Sign In Now
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
    <div className="bg-[#f0f0f1] min-h-screen pb-16">
      {/* WP Admin Dashboard Header */}
      <div className="bg-white py-6 px-4 sm:px-6 lg:px-8 shadow-xs rounded-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#2271b1] uppercase tracking-wider block">Dashboard Overview</span>
            <h1 className="text-2xl font-extrabold text-[#1d2327]">
              Welcome back, {user.name}
            </h1>
            <p className="text-xs text-[#50575e] mt-0.5 capitalize font-semibold">{user.role.replace('_', ' ')} Account · Active Session</p>
          </div>
          <div className="flex gap-3">
            {user.role === 'community_member' || user.role === 'organization' ? (
              <button
                onClick={() => navigate('/request-help')}
                className="wp-btn wp-btn-primary text-xs"
              >
                <SolidIcon name="plus" size={14} /> Post New Opportunity
              </button>
            ) : (
              <button
                onClick={() => navigate('/find-help')}
                className="wp-btn wp-btn-primary text-xs"
              >
                <SolidIcon name="search" size={14} /> Find Opportunities
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats Grid */}
            {(() => {
              const stats = user.role === 'volunteer'
                ? [
                    { val: '11', label: 'Services', iconName: 'check-circle' as const },
                    { val: '38h', label: 'Hours', iconName: 'clock' as const },
                    { val: '220', label: 'Helped', iconName: 'users' as const },
                    { val: '4.6', label: 'Rating', iconName: 'star' as const },
                  ]
                : [
                    { val: '4', label: 'Opportunities', iconName: 'building' as const },
                    { val: '2', label: 'Active', iconName: 'check-circle' as const },
                    { val: '18', label: 'Inquiries', iconName: 'email' as const },
                    { val: '95', label: 'Beneficiaries', iconName: 'users' as const },
                  ];
              return (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stats.map(stat => (
                    <div key={stat.label} className="wp-card p-4 text-center rounded-none">
                      <div className="w-8 h-8 bg-[#2271b1] text-white flex items-center justify-center mx-auto mb-2 rounded-none">
                        <SolidIcon name={stat.iconName} size={16} />
                      </div>
                      <div className="text-xl font-extrabold text-[#1d2327]">{stat.val}</div>
                      <div className="text-[10px] font-bold uppercase text-[#50575e]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Opportunities List */}
            <div className="wp-card rounded-none">
              <div className="px-6 py-4 flex justify-between items-center bg-[#f6f7f7]">
                <h2 className="font-bold text-[#1d2327] text-sm uppercase tracking-wider">
                  {user.role === 'volunteer' ? 'My Applications & Interest' : 'Posted Opportunities'}
                </h2>
                <button onClick={() => navigate('/find-help')} className="text-xs text-[#2271b1] font-bold uppercase hover:underline">View all</button>
              </div>
              <div className="divide-y divide-[#f0f0f1]">
                {activityList.map(item => (
                  <div
                    key={item.id}
                    className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#f6f7f7] cursor-pointer transition-colors"
                    onClick={() => navigate('/request/' + item.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#1d2327] truncate">{item.title}</p>
                      <p className="text-[11px] text-[#50575e] mt-0.5">{item.location} · {item.date}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="wp-card rounded-none">
              <div className="px-6 py-4 flex justify-between items-center bg-[#f6f7f7]">
                <h2 className="font-bold text-[#1d2327] text-sm uppercase tracking-wider flex items-center gap-2">
                  System Notifications
                  {unreadNotifs.length > 0 && (
                    <span className="text-[10px] bg-[#2271b1] text-white px-2 py-0.5 rounded-none font-bold">{unreadNotifs.length} new</span>
                  )}
                </h2>
              </div>
              <div className="divide-y divide-[#f0f0f1]">
                {DEMO_NOTIFICATIONS.map(n => (
                  <div key={n.id} className={`px-6 py-4 flex gap-3 ${!n.read ? 'bg-[#f0f6fc]' : ''}`}>
                    <div className="w-6 h-6 bg-[#2271b1] text-white flex items-center justify-center flex-shrink-0 mt-0.5 rounded-none">
                      <SolidIcon name="bell" size={12} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1d2327]">{n.title}</p>
                      <p className="text-xs text-[#50575e] mt-0.5">{n.body}</p>
                      <p className="text-[10px] text-[#8c8f94] mt-1 font-bold">{n.createdAt.split('T')[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="wp-card p-5 text-center rounded-none">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-none object-cover mx-auto" />
              ) : (
                <div className="w-16 h-16 rounded-none bg-[#2271b1] text-white text-xl font-bold flex items-center justify-center mx-auto">
                  {user.name[0]}
                </div>
              )}
              <h3 className="mt-3 font-extrabold text-[#1d2327] text-sm">{user.name}</h3>
              <p className="text-xs text-[#50575e] mt-0.5 capitalize font-semibold">{user.role.replace('_', ' ')} Account</p>
              <button
                onClick={() => navigate('/volunteer/v1')}
                className="mt-4 w-full py-2.5 bg-[#f6f7f7] text-xs text-[#1d2327] font-bold uppercase tracking-wider hover:bg-[#e2e4e7] transition-colors rounded-none"
              >
                View Public Profile
              </button>
            </div>

            {/* Badges Card */}
            {earnedBadges.length > 0 && (
              <div className="wp-card p-5 rounded-none">
                <h3 className="font-bold text-[#1d2327] uppercase tracking-wider mb-3 text-xs">Recent Badges</h3>
                <div className="space-y-2">
                  {earnedBadges.map(badge => (
                    <div key={badge.id} className="flex items-center gap-3 p-2.5 bg-[#f6f7f7] rounded-none">
                      <div
                        className="w-7 h-7 flex items-center justify-center text-white flex-shrink-0 rounded-none"
                        style={{ backgroundColor: badge.color }}
                      >
                        <SolidIcon name={(badge.icon as IconName) || 'award'} size={14} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#1d2327]">{badge.name}</p>
                        <p className="text-[11px] text-[#50575e] truncate">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Role Switcher */}
            <div className="wp-card p-4 bg-[#f6f7f7] rounded-none">
              <p className="text-xs font-bold uppercase tracking-wider text-[#1d2327] mb-2">Switch User Role (Demo)</p>
              <div className="flex flex-col gap-1.5">
                {demoRoles.map(role => (
                  <button
                    key={role}
                    onClick={() => login(role)}
                    className={`py-2 text-xs font-bold uppercase tracking-wider rounded-none capitalize transition-colors ${
                      user.role === role
                        ? 'bg-[#2271b1] text-white'
                        : 'bg-white text-[#1d2327] hover:bg-[#e2e4e7]'
                    }`}
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
