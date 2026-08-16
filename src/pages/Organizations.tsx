import { useRouter } from '../context/RouterContext';
import { DEMO_ORGANIZATIONS } from '../data/demo';
import SolidIcon from '../components/SolidIcon';

export default function Organizations() {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#f0f0f1] min-h-screen pb-16">
      {/* Header */}
      <div className="bg-[#1d2327] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold text-[#2271b1] uppercase tracking-widest block mb-1">
            Registered Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Organisations, NGOs & Institutions
          </h1>
          <p className="text-xs text-white/70">
            NGOs, schools, and community groups using Skill Share Platform to find skilled volunteers with transparent recognition.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEMO_ORGANIZATIONS.map(org => {
            const cleanWa = org.whatsapp.replace(/[^0-9]/g, '');
            return (
              <article key={org.id} className="wp-card p-6 flex flex-col justify-between hover:shadow-md transition-all rounded-none">
                <div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-[#2271b1] text-white rounded-none flex items-center justify-center text-xl font-bold flex-shrink-0">
                      {org.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-[#1d2327] text-base">{org.name}</h2>
                        {org.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-[#107c41] px-2 py-0.5 rounded-none uppercase">
                            <SolidIcon name="check-circle" size={12} />
                            Verified NGO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#50575e] mt-0.5 font-bold uppercase">{org.type} · {org.location}</p>
                      <p className="text-xs text-[#1d2327] mt-3 leading-relaxed font-medium">{org.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {org.causes.map(cause => (
                      <span key={cause} className="text-[11px] px-2.5 py-0.5 bg-[#f6f7f7] text-[#1d2327] font-bold uppercase rounded-none">
                        {cause}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2 text-center pt-3 border-t border-[#f0f0f1]">
                    <div className="bg-[#f6f7f7] rounded-none py-2">
                      <div className="text-base font-extrabold text-[#1d2327]">{org.activeRequests}</div>
                      <div className="text-[10px] text-[#50575e] font-bold uppercase">active needs</div>
                    </div>
                    <div className="bg-[#f6f7f7] rounded-none py-2">
                      <div className="text-base font-extrabold text-[#1d2327]">{org.totalVolunteers}</div>
                      <div className="text-[10px] text-[#50575e] font-bold uppercase">volunteers</div>
                    </div>
                    <div className="bg-[#f6f7f7] rounded-none py-2">
                      <div className="text-base font-extrabold text-[#1d2327]">{org.totalBeneficiaries.toLocaleString()}</div>
                      <div className="text-[10px] text-[#50575e] font-bold uppercase">beneficiaries</div>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Bar */}
                <div className="mt-6 pt-4 border-t border-[#f0f0f1] flex flex-col sm:flex-row gap-2">
                  <a
                    href={`mailto:${org.email}`}
                    className="wp-btn wp-btn-email flex-1 text-xs py-2.5 text-center rounded-none"
                  >
                    <SolidIcon name="email" size={14} /> Email Org
                  </a>
                  <a
                    href={`https://wa.me/${cleanWa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wp-btn wp-btn-whatsapp flex-1 text-xs py-2.5 text-center rounded-none"
                  >
                    <SolidIcon name="whatsapp" size={14} /> WhatsApp Org
                  </a>
                  <button
                    onClick={() => navigate('/find-help')}
                    className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#2271b1] hover:bg-[#135e96] transition-colors rounded-none"
                  >
                    View Needs
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Register Organization Callout */}
        <div className="mt-10 wp-card p-8 text-center bg-white rounded-none">
          <div className="w-12 h-12 bg-[#2271b1] text-white flex items-center justify-center mx-auto mb-3 rounded-none">
            <SolidIcon name="building" size={24} />
          </div>
          <h2 className="text-xl font-extrabold text-[#1d2327] mb-2">
            Register Your Organisation or NGO
          </h2>
          <p className="text-xs text-[#50575e] mb-6 max-w-xl mx-auto leading-relaxed">
            Join Skill Share Platform to post volunteer requirements, communicate directly with volunteers via Email and WhatsApp, and issue verifiable volunteer certificates.
          </p>
          <button
            onClick={() => navigate('/request-help')}
            className="wp-btn wp-btn-primary px-6 py-3"
          >
            <SolidIcon name="plus" size={16} /> Post Volunteer Opportunity
          </button>
        </div>
      </div>
    </div>
  );
}
