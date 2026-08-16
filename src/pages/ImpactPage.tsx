import { DEMO_IMPACT, DEMO_PROJECTS, DEMO_ORGANIZATIONS } from '../data/demo';
import { SDG_LIST } from '../data/types';
import { useRouter } from '../context/RouterContext';

export default function ImpactPage() {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <div className="bg-[#1B5E3B] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-sm font-semibold text-[#E8820C] uppercase tracking-widest">Demo Data</span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-display font-semibold text-white" style={{ fontFamily: "'Fraunces', serif" }}>
            Community Impact Dashboard
          </h1>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Real community impact is measured by verified services, genuine help delivered, and community needs solved — not likes or followers.
          </p>
        </div>
      </div>

      {/* Main stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { value: DEMO_IMPACT.peopleHelped.toLocaleString(), label: 'People Helped', icon: '🤝', color: 'border-l-[#1B5E3B]' },
            { value: DEMO_IMPACT.needsSolved.toString(), label: 'Needs Solved', icon: '✓', color: 'border-l-[#E8820C]' },
            { value: DEMO_IMPACT.verifiedServices.toLocaleString(), label: 'Verified Services', icon: '📋', color: 'border-l-[#1B5E3B]' },
            { value: DEMO_IMPACT.volunteers.toLocaleString(), label: 'Volunteers', icon: '👥', color: 'border-l-[#E8820C]' },
            { value: DEMO_IMPACT.volunteerHours.toLocaleString(), label: 'Volunteer Hours', icon: '⏱', color: 'border-l-[#1B5E3B]' },
          ].map(stat => (
            <div key={stat.label} className={`bg-white rounded-xl border border-[#E5E0D8] border-l-4 ${stat.color} p-5 shadow-sm`}>
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-display font-semibold text-[#141210]" style={{ fontFamily: "'Fraunces', serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-[#9B9590] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Secondary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { value: DEMO_IMPACT.organizations, label: 'Organisations Supported', desc: 'NGOs, schools, and community groups' },
            { value: DEMO_IMPACT.projectsCompleted, label: 'Projects Completed', desc: 'Multi-volunteer, multi-request initiatives' },
            { value: DEMO_IMPACT.citiesReached, label: 'Cities Reached', desc: 'Across Pakistan' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-[#E5E0D8] p-6 text-center">
              <div className="text-4xl font-display font-semibold text-[#1B5E3B]" style={{ fontFamily: "'Fraunces', serif" }}>
                {stat.value}
              </div>
              <div className="font-semibold text-[#141210] mt-1">{stat.label}</div>
              <div className="text-sm text-[#9B9590] mt-1">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Impact by category */}
        <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
          <h2 className="font-semibold text-[#141210] mb-6 text-lg">Impact by Category</h2>
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
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-[#141210]">{item.category}</span>
                    <div className="flex gap-4 text-xs text-[#9B9590]">
                      <span>{item.services} services</span>
                      <span>{item.hours.toLocaleString()} hours</span>
                      <span>{item.beneficiaries.toLocaleString()} helped</span>
                    </div>
                  </div>
                  <div className="h-2 bg-[#F0EDE6] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: i % 2 === 0 ? '#1B5E3B' : '#E8820C',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SDG impact */}
        <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
          <h2 className="font-semibold text-[#141210] mb-2 text-lg">SDG Contributions</h2>
          <p className="text-sm text-[#9B9590] mb-6">Services mapped to the UN Sustainable Development Goals</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {SDG_LIST.slice(0, 12).map(sdg => {
              const count = Math.floor(Math.random() * 120) + 8;
              return (
                <div
                  key={sdg.id}
                  className="flex items-center gap-3 p-3 rounded-lg border transition-all hover:scale-[1.02] cursor-default"
                  style={{ borderColor: sdg.color + '30', backgroundColor: sdg.color + '08' }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: sdg.color }}
                  >
                    {sdg.id}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#141210] line-clamp-1">{sdg.name}</p>
                    <p className="text-xs" style={{ color: sdg.color }}>{count} services</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured projects */}
        <div>
          <h2 className="font-semibold text-[#141210] mb-5 text-lg">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEMO_PROJECTS.map(project => (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden hover:shadow-md transition-all cursor-pointer group"
                onClick={() => navigate('/projects')}
              >
                {project.image && (
                  <div className="h-36 overflow-hidden bg-[#F0EDE6]">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.status === 'active' ? 'bg-emerald-50 text-emerald-700' : project.status === 'completed' ? 'bg-[#F0F9F4] text-[#1B5E3B]' : 'bg-blue-50 text-blue-700'}`}>
                      {project.status === 'active' ? 'Active' : project.status === 'completed' ? 'Completed' : 'Planning'}
                    </span>
                    <span className="text-xs text-[#9B9590]">{project.organizationName}</span>
                  </div>
                  <h3 className="font-semibold text-[#141210] mb-3 group-hover:text-[#1B5E3B] transition-colors">{project.title}</h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-[#FAFAF8] rounded-lg py-2">
                      <div className="text-sm font-semibold">{project.volunteersCount}</div>
                      <div className="text-xs text-[#9B9590]">volunteers</div>
                    </div>
                    <div className="bg-[#FAFAF8] rounded-lg py-2">
                      <div className="text-sm font-semibold">{project.beneficiaries.toLocaleString()}</div>
                      <div className="text-xs text-[#9B9590]">helped</div>
                    </div>
                    <div className="bg-[#FAFAF8] rounded-lg py-2">
                      <div className="text-sm font-semibold">{project.volunteerHours}h</div>
                      <div className="text-xs text-[#9B9590]">hours</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* City breakdown */}
        <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
          <h2 className="font-semibold text-[#141210] mb-5 text-lg">Impact by City</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { city: 'Lahore', province: 'Punjab', needs: 214, volunteers: 680, helped: 12400 },
              { city: 'Karachi', province: 'Sindh', needs: 187, volunteers: 520, helped: 9800 },
              { city: 'Islamabad', province: 'Federal', needs: 142, volunteers: 410, helped: 8200 },
              { city: 'Multan', province: 'Punjab', needs: 98, volunteers: 280, helped: 5600 },
              { city: 'Peshawar', province: 'KPK', needs: 76, volunteers: 195, helped: 3900 },
              { city: 'Faisalabad', province: 'Punjab', needs: 58, volunteers: 140, helped: 2800 },
            ].map(city => (
              <div key={city.city} className="p-4 bg-[#FAFAF8] rounded-xl border border-[#F0EDE6]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-[#141210]">{city.city}</p>
                    <p className="text-xs text-[#9B9590]">{city.province}</p>
                  </div>
                  <div className="w-8 h-8 bg-[#1B5E3B] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {city.city[0]}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-sm font-semibold text-[#141210]">{city.needs}</div>
                    <div className="text-xs text-[#9B9590]">needs</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#141210]">{city.volunteers}</div>
                    <div className="text-xs text-[#9B9590]">volunteers</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#141210]">{city.helped.toLocaleString()}</div>
                    <div className="text-xs text-[#9B9590]">helped</div>
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
