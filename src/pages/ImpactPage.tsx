import { DEMO_IMPACT, DEMO_PROJECTS } from '../data/demo';
import { SDG_LIST } from '../data/types';
import { useRouter } from '../context/RouterContext';
import SolidIcon from '../components/SolidIcon';

export default function ImpactPage() {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#f0f0f1] min-h-screen pb-16">
      {/* Header */}
      <div className="bg-[#1d2327] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#2c3338]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-bold text-[#2271b1] uppercase tracking-widest block mb-1">
            Platform Metrics
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Community Impact Dashboard
          </h1>
          <p className="text-sm text-white/70 max-w-2xl mx-auto">
            Measurable impact from verified community services, NGO volunteer projects, and direct organization connections.
          </p>
        </div>
      </div>

      {/* Main stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { value: DEMO_IMPACT.peopleHelped.toLocaleString(), label: 'Beneficiaries Reached', iconName: 'users' as const, color: 'border-l-[#2271b1]' },
            { value: DEMO_IMPACT.needsSolved.toString(), label: 'Needs Met', iconName: 'check-circle' as const, color: 'border-l-[#107c41]' },
            { value: DEMO_IMPACT.verifiedServices.toLocaleString(), label: 'Verified Services', iconName: 'award' as const, color: 'border-l-[#2271b1]' },
            { value: DEMO_IMPACT.volunteers.toLocaleString(), label: 'Active Volunteers', iconName: 'user' as const, color: 'border-l-[#107c41]' },
            { value: DEMO_IMPACT.volunteerHours.toLocaleString(), label: 'Volunteer Hours', iconName: 'clock' as const, color: 'border-l-[#2271b1]' },
          ].map(stat => (
            <div key={stat.label} className={`wp-card border-l-4 ${stat.color} p-4 text-center shadow-xs`}>
              <div className="w-8 h-8 rounded bg-[#f0f6fc] text-[#2271b1] flex items-center justify-center mx-auto mb-2 border border-[#c8e1fb]">
                <SolidIcon name={stat.iconName} size={16} />
              </div>
              <div className="text-xl font-bold text-[#1d2327]">
                {stat.value}
              </div>
              <div className="text-[11px] font-semibold text-[#646970] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Secondary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { value: DEMO_IMPACT.organizations, label: 'Organisations Supported', desc: 'Registered NGOs, schools, and institutions' },
            { value: DEMO_IMPACT.projectsCompleted, label: 'Projects Completed', desc: 'Multi-volunteer community initiatives' },
            { value: DEMO_IMPACT.citiesReached, label: 'Cities Reached', desc: 'Across Pakistan' },
          ].map(stat => (
            <div key={stat.label} className="wp-card p-6 text-center">
              <div className="text-3xl font-bold text-[#2271b1]">
                {stat.value}
              </div>
              <div className="font-bold text-[#1d2327] text-sm mt-1">{stat.label}</div>
              <div className="text-xs text-[#646970] mt-1">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Impact by category */}
        <div className="wp-card p-6">
          <h2 className="text-base font-bold text-[#1d2327] mb-5">Impact Distribution by Category</h2>
          <div className="space-y-4">
            {[
              { category: 'Education & Tutoring', hours: 6840, services: 423, beneficiaries: 18200 },
              { category: 'Digital Skills & Technology', hours: 4200, services: 312, beneficiaries: 12400 },
              { category: 'Environment & Climate', hours: 3100, services: 188, beneficiaries: 28000 },
              { category: 'Health & Wellbeing', hours: 2400, services: 156, beneficiaries: 6800 },
              { category: 'Career & Entrepreneurship', hours: 1620, services: 94, beneficiaries: 3200 },
              { category: 'Design & Creative', hours: 600, services: 48, beneficiaries: 52 },
            ].map((item, i) => {
              const maxHours = 6840;
              const pct = Math.round((item.hours / maxHours) * 100);
              return (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="font-bold text-[#1d2327]">{item.category}</span>
                    <div className="flex gap-3 text-[#646970]">
                      <span>{item.services} services</span>
                      <span>{item.hours.toLocaleString()} hours</span>
                      <span>{item.beneficiaries.toLocaleString()} beneficiaries</span>
                    </div>
                  </div>
                  <div className="h-2 bg-[#f0f0f1] rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: i % 2 === 0 ? '#2271b1' : '#107c41',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SDG contributions */}
        <div className="wp-card p-6">
          <h2 className="text-base font-bold text-[#1d2327] mb-1">SDG Contributions</h2>
          <p className="text-xs text-[#646970] mb-5">Verified volunteer hours mapped to Sustainable Development Goals</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {SDG_LIST.slice(0, 12).map(sdg => (
              <div
                key={sdg.id}
                className="flex items-center gap-3 p-3 rounded border bg-white border-[#dcdcde]"
              >
                <div
                  className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: sdg.color }}
                >
                  {sdg.id}
                </div>
                <div className="min-w-0 text-xs">
                  <p className="font-bold text-[#1d2327] truncate">{sdg.name}</p>
                  <p className="text-[11px] font-semibold" style={{ color: sdg.color }}>Mapped Service</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div>
          <h2 className="font-bold text-[#1d2327] mb-4 text-base">Active Community Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_PROJECTS.map(project => (
              <div
                key={project.id}
                className="wp-card overflow-hidden hover:border-[#2271b1] transition-all cursor-pointer group"
                onClick={() => navigate('/projects')}
              >
                {project.image && (
                  <div className="h-36 overflow-hidden bg-[#f0f0f1]">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase text-[#2271b1] bg-[#f0f6fc] px-2 py-0.5 rounded border border-[#c8e1fb]">
                      {project.status}
                    </span>
                    <span className="text-xs text-[#646970] truncate">{project.organizationName}</span>
                  </div>
                  <h3 className="font-bold text-[#1d2327] text-sm mb-3 group-hover:text-[#2271b1] transition-colors leading-snug">{project.title}</h3>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-[#f6f7f7] rounded py-1.5 border border-[#dcdcde]">
                      <div className="font-bold text-[#1d2327]">{project.volunteersCount}</div>
                      <div className="text-[10px] text-[#646970]">volunteers</div>
                    </div>
                    <div className="bg-[#f6f7f7] rounded py-1.5 border border-[#dcdcde]">
                      <div className="font-bold text-[#1d2327]">{project.beneficiaries.toLocaleString()}</div>
                      <div className="text-[10px] text-[#646970]">helped</div>
                    </div>
                    <div className="bg-[#f6f7f7] rounded py-1.5 border border-[#dcdcde]">
                      <div className="font-bold text-[#1d2327]">{project.volunteerHours}h</div>
                      <div className="text-[10px] text-[#646970]">hours</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
