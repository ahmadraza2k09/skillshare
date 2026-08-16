import { useRouter } from '../context/RouterContext';
import { DEMO_ORGANIZATIONS } from '../data/demo';

export default function Organizations() {
  const { navigate } = useRouter();

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      <div className="bg-[#1B5E3B] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-display font-semibold text-white mb-2" style={{ fontFamily: "'Fraunces', serif" }}>
            Organisations
          </h1>
          <p className="text-white/70">NGOs, schools, and community organisations using Khayr to find and manage volunteers.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {DEMO_ORGANIZATIONS.map(org => (
            <article key={org.id} className="bg-white rounded-xl border border-[#E5E0D8] p-6 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#F0F9F4] border border-[#E5E0D8] flex items-center justify-center text-xl font-bold text-[#1B5E3B] flex-shrink-0">
                  {org.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-[#141210]">{org.name}</h2>
                    {org.verified && (
                      <span className="text-xs font-medium text-[#1B5E3B] bg-[#F0F9F4] px-2 py-0.5 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#9B9590] mt-0.5">{org.type} · {org.location}</p>
                  <p className="text-sm text-[#6B6560] mt-2 leading-relaxed">{org.description}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {org.causes.map(cause => (
                  <span key={cause} className="text-xs px-2.5 py-1 bg-[#F0EDE6] text-[#6B6560] rounded-full">{cause}</span>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="bg-[#FAFAF8] rounded-lg py-3">
                  <div className="text-lg font-semibold text-[#141210]">{org.activeRequests}</div>
                  <div className="text-xs text-[#9B9590]">active requests</div>
                </div>
                <div className="bg-[#FAFAF8] rounded-lg py-3">
                  <div className="text-lg font-semibold text-[#141210]">{org.totalVolunteers}</div>
                  <div className="text-xs text-[#9B9590]">volunteers</div>
                </div>
                <div className="bg-[#FAFAF8] rounded-lg py-3">
                  <div className="text-lg font-semibold text-[#141210]">{org.totalBeneficiaries.toLocaleString()}</div>
                  <div className="text-xs text-[#9B9590]">people helped</div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => navigate('/find-help')}
                  className="flex-1 py-2.5 text-sm font-medium text-[#1B5E3B] border border-[#1B5E3B] rounded-lg hover:bg-[#F0F9F4] transition-colors"
                >
                  View Needs
                </button>
                <button className="flex-1 py-2.5 text-sm font-medium text-white bg-[#1B5E3B] rounded-lg hover:bg-[#2D7A52] transition-colors">
                  Volunteer Here
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Register org CTA */}
        <div className="mt-12 bg-[#F0EDE6] rounded-2xl p-8 text-center border border-[#E5E0D8]">
          <h2 className="text-2xl font-display font-semibold text-[#141210] mb-3" style={{ fontFamily: "'Fraunces', serif" }}>
            Register Your Organisation
          </h2>
          <p className="text-[#6B6560] mb-6 max-w-xl mx-auto">
            NGOs, schools, universities, and community groups can register on Khayr to submit service requests, run projects, and manage volunteer teams.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-7 py-3 bg-[#1B5E3B] text-white font-semibold rounded-xl hover:bg-[#2D7A52] transition-colors"
          >
            Register Organisation
          </button>
        </div>
      </div>
    </div>
  );
}
