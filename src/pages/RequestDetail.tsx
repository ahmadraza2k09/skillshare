import { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { DEMO_REQUESTS, DEMO_APPLICATIONS, DEMO_VOLUNTEERS } from '../data/demo';
import { SDG_LIST } from '../data/types';
import StatusBadge from '../components/StatusBadge';
import UrgencyBadge from '../components/UrgencyBadge';

export default function RequestDetail() {
  const { params, navigate } = useRouter();
  const { user } = useAuth();
  const [applying, setApplying] = useState(false);
  const [appMessage, setAppMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const requestId = params.id || (window.location.hash.split('/').pop()?.split('?')[0]);
  const request = DEMO_REQUESTS.find(r => r.id === requestId);
  const applications = DEMO_APPLICATIONS.filter(a => a.requestId === requestId);

  if (!request) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#141210] mb-2">Request not found</h2>
          <button onClick={() => navigate('/find-help')} className="text-[#1B5E3B] hover:underline text-sm">
            Browse all needs →
          </button>
        </div>
      </div>
    );
  }

  const sdgItems = SDG_LIST.filter(s => request.sdgs.includes(s.id));

  const handleApply = () => {
    if (submitted) return;
    setSubmitted(true);
    setTimeout(() => { setApplying(false); }, 1500);
  };

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header image */}
      {request.image && (
        <div className="h-64 sm:h-80 overflow-hidden bg-[#F0EDE6]">
          <img src={request.image} alt={request.title} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 right-0 h-64 sm:h-80 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/find-help')}
          className="flex items-center gap-2 text-sm text-[#6B6560] hover:text-[#141210] mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to needs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-medium bg-[#F0EDE6] text-[#6B6560] px-2.5 py-1 rounded-full">{request.category}</span>
                <StatusBadge status={request.status} />
                <UrgencyBadge urgency={request.urgency} />
                {request.isOnline && (
                  <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">Online Available</span>
                )}
              </div>
              <h1 className="text-3xl font-display font-semibold text-[#141210] leading-snug" style={{ fontFamily: "'Fraunces', serif" }}>
                {request.title}
              </h1>
              <div className="mt-3 flex items-center gap-4 text-sm text-[#6B6560]">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {request.requesterName}
                  {request.requesterType === 'organization' && <span className="text-[#1B5E3B] text-xs font-medium">✓ Org</span>}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {request.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {request.preferredDate}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
              <h2 className="font-semibold text-[#141210] mb-3">About This Need</h2>
              <p className="text-[#6B6560] leading-relaxed">{request.description}</p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
              <h2 className="font-semibold text-[#141210] mb-4">Service Requirements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs font-semibold text-[#9B9590] uppercase tracking-wider mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {request.requiredSkills.map(skill => (
                      <span key={skill} className="text-sm px-3 py-1 bg-[#F0F9F4] text-[#1B5E3B] rounded-full font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#9B9590] uppercase tracking-wider mb-2">Duration</p>
                  <p className="text-sm text-[#141210]">{request.estimatedDuration}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#9B9590] uppercase tracking-wider mb-2">Volunteers Needed</p>
                  <p className="text-sm text-[#141210]">{request.volunteersRequired} volunteer{request.volunteersRequired > 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#9B9590] uppercase tracking-wider mb-2">Target Group</p>
                  <p className="text-sm text-[#141210]">{request.targetGroup}</p>
                </div>
              </div>
            </div>

            {/* Impact */}
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
              <h2 className="font-semibold text-[#141210] mb-4">Impact Information</h2>
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="text-center bg-[#F0F9F4] rounded-lg py-4">
                  <div className="text-2xl font-display font-semibold text-[#1B5E3B]" style={{ fontFamily: "'Fraunces', serif" }}>
                    {request.beneficiaries.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#6B6560] mt-1">People to be helped</div>
                </div>
                <div className="text-center bg-[#F0F9F4] rounded-lg py-4">
                  <div className="text-2xl font-display font-semibold text-[#1B5E3B]" style={{ fontFamily: "'Fraunces', serif" }}>
                    {request.applicantsCount}
                  </div>
                  <div className="text-xs text-[#6B6560] mt-1">Applications</div>
                </div>
                <div className="text-center bg-[#F0F9F4] rounded-lg py-4">
                  <div className="text-2xl font-display font-semibold text-[#1B5E3B]" style={{ fontFamily: "'Fraunces', serif" }}>
                    {request.volunteersRequired}
                  </div>
                  <div className="text-xs text-[#6B6560] mt-1">Spots available</div>
                </div>
              </div>

              {sdgItems.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-[#9B9590] uppercase tracking-wider mb-3">Relevant SDGs</p>
                  <div className="flex flex-wrap gap-2">
                    {sdgItems.map(sdg => (
                      <span
                        key={sdg.id}
                        className="text-xs px-2.5 py-1 rounded-lg font-medium"
                        style={{ backgroundColor: sdg.color + '18', color: sdg.color }}
                      >
                        SDG {sdg.id} — {sdg.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Applications */}
            {applications.length > 0 && (
              <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
                <h2 className="font-semibold text-[#141210] mb-4">Recent Applicants</h2>
                {applications.map(app => {
                  const vol = DEMO_VOLUNTEERS.find(v => v.id === app.volunteerId);
                  return (
                    <div key={app.id} className="flex items-start gap-4 p-4 rounded-lg bg-[#FAFAF8] border border-[#F0EDE6]">
                      {vol?.avatar && (
                        <img src={vol.avatar} alt={vol.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-[#141210]">{app.volunteerName}</span>
                          <span className="text-xs bg-[#F0F9F4] text-[#1B5E3B] px-2 py-0.5 rounded-full font-medium">
                            {app.matchScore}% match
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${app.status === 'accepted' ? 'bg-green-50 text-green-700' : app.status === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-sm text-[#6B6560]">{app.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Apply card */}
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-6 sticky top-24">
              {request.status === 'applications_open' || request.status === 'published' ? (
                <>
                  <h3 className="font-semibold text-[#141210] mb-2">Offer to Help</h3>
                  <p className="text-sm text-[#6B6560] mb-5">This request is actively looking for volunteers.</p>
                  {!applying && !submitted ? (
                    <button
                      onClick={() => user ? setApplying(true) : navigate('/login')}
                      className="w-full py-3 bg-[#1B5E3B] text-white font-semibold rounded-xl hover:bg-[#2D7A52] transition-colors"
                    >
                      Offer to Help →
                    </button>
                  ) : submitted ? (
                    <div className="text-center py-4">
                      <div className="w-12 h-12 bg-[#F0F9F4] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">✓</div>
                      <p className="font-semibold text-[#1B5E3B] text-sm">Application submitted!</p>
                      <p className="text-xs text-[#6B6560] mt-1">You will be notified when the requester responds.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <textarea
                        value={appMessage}
                        onChange={e => setAppMessage(e.target.value)}
                        placeholder="Tell them why you want to help and what relevant experience you have..."
                        rows={4}
                        className="w-full px-3 py-2.5 border border-[#E5E0D8] rounded-lg text-sm text-[#141210] placeholder-[#9B9590] focus:outline-none focus:border-[#1B5E3B] resize-none"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => setApplying(false)} className="flex-1 py-2.5 text-sm border border-[#E5E0D8] rounded-lg text-[#6B6560] hover:bg-[#FAFAF8]">
                          Cancel
                        </button>
                        <button
                          onClick={handleApply}
                          disabled={!appMessage.trim()}
                          className="flex-1 py-2.5 text-sm bg-[#1B5E3B] text-white rounded-lg font-medium hover:bg-[#2D7A52] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Submit Application
                        </button>
                      </div>
                    </div>
                  )}
                  {!user && (
                    <p className="text-xs text-center text-[#9B9590] mt-3">
                      <button onClick={() => navigate('/login')} className="text-[#1B5E3B] hover:underline">Sign in</button> to apply
                    </p>
                  )}
                </>
              ) : (
                <div className="text-center py-2">
                  <StatusBadge status={request.status} size="md" />
                  <p className="text-sm text-[#6B6560] mt-3">This request is no longer accepting applications.</p>
                </div>
              )}
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-5">
              <h3 className="font-semibold text-[#141210] mb-4 text-sm">Request Details</h3>
              <dl className="space-y-3">
                {[
                  { label: 'Posted', value: request.createdAt },
                  { label: 'Preferred Date', value: request.preferredDate },
                  { label: 'Duration', value: request.estimatedDuration },
                  { label: 'Mode', value: request.isOnline ? 'Online or In-person' : 'In-person' },
                  { label: 'Type', value: request.requesterType === 'organization' ? 'Organisation request' : 'Individual request' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between gap-2">
                    <dt className="text-xs text-[#9B9590]">{item.label}</dt>
                    <dd className="text-xs text-[#141210] font-medium text-right">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
