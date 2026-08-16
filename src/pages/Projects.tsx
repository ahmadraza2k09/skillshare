import { useRouter } from '../context/RouterContext';
import { DEMO_PROJECTS } from '../data/demo';
import { SDG_LIST } from '../data/types';
import SolidIcon from '../components/SolidIcon';

export default function Projects() {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#f0f0f1] min-h-screen pb-16">
      <div className="bg-[#1d2327] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold text-[#2271b1] uppercase tracking-widest block mb-1">
            Impact Programs
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Community Projects
          </h1>
          <p className="text-xs text-white/70">
            Multi-stage community initiatives bringing together volunteers, NGOs, and resources for high-impact social outcomes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_PROJECTS.map(project => (
            <article key={project.id} className="wp-card overflow-hidden hover:shadow-md transition-all flex flex-col justify-between group rounded-none">
              <div>
                {project.image && (
                  <div className="h-44 overflow-hidden bg-[#f0f0f1] relative rounded-none">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] px-2.5 py-1 font-bold uppercase tracking-wider rounded-none ${
                      project.status === 'active' ? 'bg-[#107c41] text-white' : project.status === 'completed' ? 'bg-[#2271b1] text-white' : 'bg-slate-700 text-white'
                    }`}>
                      {project.status.toUpperCase()}
                    </span>
                    <span className="text-xs font-bold text-[#50575e] uppercase">{project.category}</span>
                  </div>

                  <h2 className="text-lg font-bold text-[#1d2327] mb-2 group-hover:text-[#2271b1] transition-colors leading-snug">
                    {project.title}
                  </h2>
                  <p className="text-xs text-[#50575e] leading-relaxed mb-4">{project.description}</p>

                  <div className="text-xs text-[#1d2327] font-bold mb-4 flex items-center gap-1.5 pt-3 border-t border-[#f0f0f1]">
                    <SolidIcon name="building" size={14} className="text-[#2271b1]" />
                    <span>{project.organizationName}</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1 mb-4 text-center">
                    {[
                      { val: project.requestsCount, label: 'needs' },
                      { val: project.volunteersCount, label: 'volunteers' },
                      { val: project.beneficiaries.toLocaleString(), label: 'helped' },
                      { val: project.volunteerHours + 'h', label: 'hours' },
                    ].map(s => (
                      <div key={s.label} className="bg-[#f6f7f7] rounded-none py-1.5">
                        <div className="text-xs font-extrabold text-[#1d2327]">{s.val}</div>
                        <div className="text-[10px] text-[#50575e] font-bold uppercase">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {SDG_LIST.filter(s => project.sdgs.includes(s.id)).map(sdg => (
                      <span
                        key={sdg.id}
                        className="text-[10px] px-2 py-0.5 rounded-none font-bold uppercase text-white"
                        style={{ background: sdg.color }}
                      >
                        SDG {sdg.id}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#f6f7f7] text-right">
                <button
                  onClick={() => navigate('/find-help')}
                  className="wp-btn wp-btn-primary text-xs w-full"
                >
                  Explore Project Needs
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
