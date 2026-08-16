import { useRouter } from '../context/RouterContext';
import { DEMO_PROJECTS } from '../data/demo';
import { SDG_LIST } from '../data/types';

export default function Projects() {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div className="bg-[#1B5E3B] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-display font-semibold text-white mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
            Community Projects
          </h1>
          <p className="text-white/70">Large-scale initiatives combining multiple service requests and volunteer teams.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DEMO_PROJECTS.map(project => (
            <article key={project.id} className="bg-white rounded-xl border border-[#E5E0D8] overflow-hidden hover:shadow-md transition-all group cursor-pointer flex flex-col">
              {project.image && (
                <div className="h-48 overflow-hidden bg-[#F0EDE6]">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.status === 'active' ? 'bg-emerald-50 text-emerald-700' : project.status === 'completed' ? 'bg-[#F0F9F4] text-[#1B5E3B]' : 'bg-blue-50 text-blue-700'}`}>
                    {project.status === 'active' ? '● Active' : project.status === 'completed' ? '✓ Completed' : '○ Planning'}
                  </span>
                  <span className="text-xs text-[#9B9590]">{project.category}</span>
                </div>

                <h2 className="text-lg font-semibold text-[#141210] mb-2 group-hover:text-[#1B5E3B] transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm text-[#6B6560] leading-relaxed flex-1 mb-4">{project.description}</p>

                <div className="text-xs text-[#9B9590] mb-4 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {project.organizationName}
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                  {[
                    { val: project.requestsCount, label: 'requests' },
                    { val: project.volunteersCount, label: 'volunteers' },
                    { val: project.beneficiaries.toLocaleString(), label: 'helped' },
                    { val: project.volunteerHours + 'h', label: 'hours' },
                  ].map(s => (
                    <div key={s.label} className="bg-[#FAFAF8] rounded-lg py-2">
                      <div className="text-sm font-semibold text-[#141210]">{s.val}</div>
                      <div className="text-xs text-[#9B9590]">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {SDG_LIST.filter(s => project.sdgs.includes(s.id)).map(sdg => (
                    <span
                      key={sdg.id}
                      className="text-xs px-2 py-0.5 rounded-md font-medium"
                      style={{ background: sdg.color + '18', color: sdg.color }}
                    >
                      SDG {sdg.id}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
