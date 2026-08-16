import { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { DEMO_REQUESTS, DEMO_APPLICATIONS, DEMO_VOLUNTEERS, DEMO_ORGANIZATIONS } from '../data/demo';
import { SDG_LIST } from '../data/types';
import StatusBadge from '../components/StatusBadge';
import UrgencyBadge from '../components/UrgencyBadge';
import SolidIcon from '../components/SolidIcon';

export default function RequestDetail() {
  const { params, navigate } = useRouter();
  const { user } = useAuth();

  const requestId = params.id || (window.location.hash.split('/').pop()?.split('?')[0]);
  const request = DEMO_REQUESTS.find(r => r.id === requestId) || DEMO_REQUESTS[0];
  const applications = DEMO_APPLICATIONS.filter(a => a.requestId === request.id);

  // Associated Organization if any
  const matchedOrg = DEMO_ORGANIZATIONS.find(o => o.name === request.requesterName);

  // Volunteer contact modal state
  const [showModal, setShowModal] = useState(false);
  const [submittedInterest, setSubmittedInterest] = useState(false);
  const [volForm, setVolForm] = useState({
    name: user?.name || 'Ahmad Raza',
    email: user?.email || 'ahmad.raza@example.org',
    phone: '+923001112233',
    skills: 'Computer Skills, Teaching',
    message: `Hi ${request.requesterName}, I am interested in volunteering for "${request.title}". I have relevant skills and am available to help.`,
  });

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedInterest(true);
  };

  const sdgItems = SDG_LIST.filter(s => request.sdgs.includes(s.id));

  // Clean numbers for WhatsApp link
  const rawWhatsapp = request.orgWhatsapp || matchedOrg?.whatsapp || '+923001234567';
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, '');
  const waPrefilledText = encodeURIComponent(
    `Hello ${request.requesterName}, I found your opportunity "${request.title}" on Skill Share Platform. I would like to volunteer!`
  );
  const waUrl = `https://wa.me/${cleanWhatsapp}?text=${waPrefilledText}`;

  const orgEmail = request.orgEmail || matchedOrg?.email || 'contact@organization.org';
  const mailtoUrl = `mailto:${orgEmail}?subject=${encodeURIComponent(`Volunteer Inquiry: ${request.title}`)}&body=${encodeURIComponent(`Hello ${request.requesterName},\n\nI am interested in your volunteer opportunity "${request.title}".\n\nName: ${volForm.name}\nEmail: ${volForm.email}\nPhone: ${volForm.phone}\nSkills: ${volForm.skills}\n\nMessage:\n${volForm.message}`)}`;

  const orgPhone = request.orgPhone || matchedOrg?.phone;

  return (
    <div className="bg-[#f0f0f1] min-h-screen pb-16">
      {/* Top Banner / Navigation */}
      <div className="bg-white py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/find-help')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2271b1] hover:underline"
          >
            <SolidIcon name="chevron-left" size={14} />
            Back to Opportunities
          </button>
          <div className="flex items-center gap-2">
            <StatusBadge status={request.status} size="md" />
            <UrgencyBadge urgency={request.urgency} />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Header Card */}
            <div className="wp-card p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-[#1d2327] bg-[#f6f7f7] px-2.5 py-1 rounded-none uppercase tracking-wider">
                  {request.category}
                </span>
                {request.isOnline && (
                  <span className="text-[11px] font-bold text-[#107c41] bg-[#e6f4ea] px-2.5 py-1 rounded-none uppercase tracking-wider flex items-center gap-1">
                    <SolidIcon name="laptop" size={12} />
                    Remote / Online Service
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d2327] leading-snug">
                {request.title}
              </h1>

              <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-[#50575e]">
                <div className="flex items-center gap-1.5 font-bold text-[#1d2327]">
                  <SolidIcon name="building" size={14} className="text-[#2271b1]" />
                  <span>{request.requesterName}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <SolidIcon name="location" size={14} className="text-[#2271b1]" />
                  <span>{request.location}</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold">
                  <SolidIcon name="calendar" size={14} className="text-[#2271b1]" />
                  <span>Date: {request.preferredDate}</span>
                </div>
              </div>
            </div>

            {/* VOLUNTEER RECOGNITION & REWARD SOLID BOX */}
            <div className="wp-card overflow-hidden bg-[#2271b1] text-white">
              <div className="bg-[#1d2327] px-5 py-3 flex items-center gap-3">
                <div className="w-7 h-7 bg-[#2271b1] text-white flex items-center justify-center rounded-none">
                  <SolidIcon name="award" size={16} />
                </div>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                    Volunteer Recognition & Reward Offered
                  </h2>
                  <p className="text-[11px] text-white/70">
                    Provided by {request.requesterName} upon service completion
                  </p>
                </div>
              </div>
              <div className="p-6 bg-white text-[#1d2327] space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-white bg-[#2271b1] px-3 py-1.5 rounded-none uppercase tracking-wider">
                    {request.recognitionType || 'Volunteer Certificate'}
                  </span>
                </div>
                <p className="text-xs text-[#1d2327] leading-relaxed font-semibold">
                  {request.recognitionDetails ||
                    'The organization provides an official, verifiable Volunteer Certificate and formal letter of appreciation to recognize your time and effort.'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="wp-card p-6">
              <h2 className="wp-card-header -mx-6 -mt-6 mb-4">About This Opportunity</h2>
              <p className="text-xs text-[#1d2327] leading-relaxed whitespace-pre-line font-medium">{request.description}</p>
            </div>

            {/* Opportunity Requirements Grid */}
            <div className="wp-card p-6">
              <h2 className="wp-card-header -mx-6 -mt-6 mb-4">Opportunity Requirements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <span className="font-bold text-[#50575e] uppercase tracking-wider block mb-2">Required Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {request.requiredSkills.map(skill => (
                      <span key={skill} className="px-2.5 py-1 bg-[#2271b1] text-white text-[11px] font-bold rounded-none uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-bold text-[#50575e] uppercase tracking-wider block mb-1">Time Commitment</span>
                  <p className="font-bold text-[#1d2327]">{request.estimatedDuration}</p>
                </div>
                <div>
                  <span className="font-bold text-[#50575e] uppercase tracking-wider block mb-1">Volunteers Required</span>
                  <p className="font-bold text-[#1d2327]">{request.volunteersRequired} volunteer position(s)</p>
                </div>
                <div>
                  <span className="font-bold text-[#50575e] uppercase tracking-wider block mb-1">Beneficiary Group</span>
                  <p className="font-bold text-[#1d2327]">{request.targetGroup}</p>
                </div>
              </div>
            </div>

            {/* SDGs */}
            {sdgItems.length > 0 && (
              <div className="wp-card p-6">
                <h2 className="wp-card-header -mx-6 -mt-6 mb-4">UN Sustainable Development Goals</h2>
                <div className="flex flex-wrap gap-2">
                  {sdgItems.map(sdg => (
                    <span
                      key={sdg.id}
                      className="text-xs px-3 py-1.5 rounded-none font-bold text-white uppercase tracking-wider"
                      style={{ backgroundColor: sdg.color }}
                    >
                      SDG {sdg.id} — {sdg.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Applicants */}
            {applications.length > 0 && (
              <div className="wp-card p-6">
                <h2 className="wp-card-header -mx-6 -mt-6 mb-4">Recent Applicants</h2>
                <div className="space-y-3">
                  {applications.map(app => {
                    const vol = DEMO_VOLUNTEERS.find(v => v.id === app.volunteerId);
                    return (
                      <div key={app.id} className="p-3.5 rounded-none bg-[#f6f7f7] flex items-start gap-3">
                        {vol?.avatar ? (
                          <img src={vol.avatar} alt={vol.name} className="w-9 h-9 rounded-none object-cover" />
                        ) : (
                          <div className="w-9 h-9 rounded-none bg-[#2271b1] text-white flex items-center justify-center font-bold text-xs">
                            {app.volunteerName[0]}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1d2327]">{app.volunteerName}</span>
                            <span className="text-[10px] bg-[#107c41] text-white px-2 py-0.5 rounded-none font-bold uppercase tracking-wider">
                              {app.matchScore}% Match
                            </span>
                          </div>
                          <p className="text-xs text-[#50575e] mt-1">{app.message}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: Direct Communication & Contact Options */}
          <div className="space-y-6">
            {/* DIRECT CONTACT CARD */}
            <div className="wp-card p-6 sticky top-20">
              <div className="bg-[#1d2327] text-white p-3 -mx-6 -mt-6 mb-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                  <SolidIcon name="phone" size={14} className="text-[#2271b1]" />
                  Direct Contact Options
                </h3>
                <p className="text-[11px] text-white/70 mt-0.5">Connect directly with {request.requesterName}</p>
              </div>

              <div className="space-y-2">
                {/* Email Button */}
                <a
                  href={mailtoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wp-btn wp-btn-email w-full text-center text-xs py-3 rounded-none"
                >
                  <SolidIcon name="email" size={16} />
                  <span>Contact via Email</span>
                </a>

                {/* WhatsApp Button */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wp-btn wp-btn-whatsapp w-full text-center text-xs py-3 rounded-none"
                >
                  <SolidIcon name="whatsapp" size={16} />
                  <span>Contact via WhatsApp</span>
                </a>

                {/* Phone Link if available */}
                {orgPhone && (
                  <a
                    href={`tel:${orgPhone}`}
                    className="flex items-center justify-center gap-2 text-xs text-white bg-[#50575e] py-2.5 px-3 rounded-none font-bold uppercase tracking-wider hover:bg-[#1d2327] transition-colors"
                  >
                    <SolidIcon name="phone" size={14} />
                    <span>Call: {orgPhone}</span>
                  </a>
                )}

                {/* Express Interest Modal Trigger */}
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full mt-2 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#2271b1] rounded-none hover:bg-[#135e96] transition-colors flex items-center justify-center gap-1.5"
                >
                  <SolidIcon name="send" size={14} />
                  Send Volunteer Contact Info
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-[#f0f0f1] space-y-2 text-xs">
                <div className="flex justify-between text-[#50575e]">
                  <span className="font-bold">Email:</span>
                  <span className="font-bold text-[#1d2327] truncate max-w-[160px]">{orgEmail}</span>
                </div>
                <div className="flex justify-between text-[#50575e]">
                  <span className="font-bold">WhatsApp:</span>
                  <span className="font-bold text-[#107c41]">{rawWhatsapp}</span>
                </div>
              </div>
            </div>

            {/* Quick Metadata Box */}
            <div className="wp-card p-5 text-xs space-y-3">
              <h3 className="font-bold text-[#1d2327] uppercase tracking-wider pb-2 border-b border-[#2271b1]">
                Overview Details
              </h3>
              <div className="flex justify-between text-[#50575e]">
                <span>Posted Date:</span>
                <span className="font-bold text-[#1d2327]">{request.createdAt}</span>
              </div>
              <div className="flex justify-between text-[#50575e]">
                <span>Beneficiaries:</span>
                <span className="font-bold text-[#1d2327]">{request.beneficiaries.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#50575e]">
                <span>Volunteers Needed:</span>
                <span className="font-bold text-[#1d2327]">{request.volunteersRequired}</span>
              </div>
              <div className="flex justify-between text-[#50575e]">
                <span>Mode:</span>
                <span className="font-bold text-[#1d2327]">{request.isOnline ? 'Online / Remote' : 'On-site'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VOLUNTEER CONTACT INFORMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="wp-card max-w-lg w-full p-6 shadow-xl relative animate-fade-in rounded-none">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white bg-[#1d2327] w-7 h-7 flex items-center justify-center font-bold text-xs"
            >
              ✕
            </button>

            {!submittedInterest ? (
              <form onSubmit={handleInterestSubmit} className="space-y-4">
                <div className="bg-[#1d2327] text-white p-3 -mx-6 -mt-6 mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <SolidIcon name="user" size={16} className="text-[#2271b1]" />
                    Provide Volunteer Contact Information
                  </h3>
                  <p className="text-[11px] text-white/70 mt-0.5">
                    Share details so <strong>{request.requesterName}</strong> can contact you directly.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">Full Name <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    required
                    value={volForm.name}
                    onChange={e => setVolForm({ ...volForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f6f7f7] text-xs text-[#1d2327] font-bold focus:outline-none rounded-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">Email Address <span className="text-red-600">*</span></label>
                    <input
                      type="email"
                      required
                      value={volForm.email}
                      onChange={e => setVolForm({ ...volForm, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#f6f7f7] text-xs text-[#1d2327] font-bold focus:outline-none rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">WhatsApp / Phone <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      required
                      value={volForm.phone}
                      onChange={e => setVolForm({ ...volForm, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-[#f6f7f7] text-xs text-[#1d2327] font-bold focus:outline-none rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">Relevant Skills</label>
                  <input
                    type="text"
                    value={volForm.skills}
                    onChange={e => setVolForm({ ...volForm, skills: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f6f7f7] text-xs text-[#1d2327] font-bold focus:outline-none rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">Message to Organization</label>
                  <textarea
                    rows={3}
                    value={volForm.message}
                    onChange={e => setVolForm({ ...volForm, message: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f6f7f7] text-xs text-[#1d2327] font-semibold focus:outline-none resize-none rounded-none"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#e2e4e7] text-[#1d2327] rounded-none hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 wp-btn wp-btn-primary text-xs"
                  >
                    Submit & View Direct Contacts
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 bg-[#107c41] text-white flex items-center justify-center mx-auto rounded-none">
                  <SolidIcon name="check-circle" size={32} />
                </div>
                <h3 className="text-base font-bold text-[#1d2327]">Your Contact Information Received!</h3>
                <p className="text-xs text-[#50575e]">
                  Connect directly with <strong>{request.requesterName}</strong> using the options below:
                </p>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href={mailtoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wp-btn wp-btn-email text-xs py-3 rounded-none"
                  >
                    <SolidIcon name="email" size={16} /> Send Direct Email Now
                  </a>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wp-btn wp-btn-whatsapp text-xs py-3 rounded-none"
                  >
                    <SolidIcon name="whatsapp" size={16} /> Send Direct WhatsApp Message
                  </a>
                </div>

                <button
                  onClick={() => { setShowModal(false); setSubmittedInterest(false); }}
                  className="mt-2 text-xs font-bold text-[#50575e] hover:underline uppercase"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
