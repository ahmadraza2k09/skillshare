import { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { CATEGORIES, SKILLS, SDG_LIST, VolunteerRecognition } from '../data/types';
import SolidIcon from '../components/SolidIcon';

const STEPS = ['Organization & Contact', 'Requirements & Recognition', 'Impact & SDGs', 'Review & Publish'];

const RECOGNITION_OPTIONS: VolunteerRecognition[] = [
  'Certificate of Appreciation',
  'Appreciation Letter',
  'Volunteer Certificate',
  'Recognition/Award',
  'Recommendation Letter',
  'Other',
];

export default function RequestHelp() {
  const { navigate } = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    orgName: 'Bright Future Foundation',
    orgEmail: 'volunteers@brightfuture.org.pk',
    orgWhatsapp: '+923001234567',
    orgPhone: '+92614556789',
    title: '',
    description: '',
    category: 'Education & Tutoring',
    location: 'Multan, Punjab',
    isOnline: false,
    preferredDate: '2026-09-15',
    estimatedDuration: '3 sessions × 3 hours',
    urgency: 'normal' as const,
    requiredSkills: [] as string[],
    volunteersRequired: 2,
    experienceLevel: 'any',
    recognitionType: 'Volunteer Certificate' as VolunteerRecognition,
    recognitionDetails: '',
    beneficiaries: '35',
    targetGroup: 'School Students (12-14 years)',
    sdgs: [4] as number[],
    expectedOutcome: '',
  });

  const update = (field: string, value: unknown) => setForm(prev => ({ ...prev, [field]: value }));

  const toggleSkill = (skill: string) => {
    update('requiredSkills', form.requiredSkills.includes(skill)
      ? form.requiredSkills.filter(s => s !== skill)
      : [...form.requiredSkills, skill]);
  };

  const toggleSdg = (id: number) => {
    update('sdgs', form.sdgs.includes(id) ? form.sdgs.filter(s => s !== id) : [...form.sdgs, id]);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f0f0f1] flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-none shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-[#107c41] text-white rounded-none flex items-center justify-center mx-auto mb-5">
            <SolidIcon name="check-circle" size={36} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1d2327] mb-2">
            Opportunity Published Successfully!
          </h1>
          <p className="text-xs text-[#50575e] mb-4">
            Your volunteer opportunity for <strong className="text-[#1d2327]">&quot;{form.title}&quot;</strong> has been posted.
          </p>

          <div className="bg-[#f0f6fc] rounded-none p-4 mb-6 text-left text-xs space-y-2">
            <p className="font-bold text-[#2271b1] text-xs uppercase tracking-wider">Direct Contact Channels Active:</p>
            <p className="text-[#1d2327]">Volunteers can now directly contact your organization via:</p>
            <div className="flex flex-col gap-1.5 pt-1 font-bold">
              <span className="flex items-center gap-2 text-[#2271b1]">
                <SolidIcon name="email" size={14} /> {form.orgEmail}
              </span>
              <span className="flex items-center gap-2 text-[#107c41]">
                <SolidIcon name="whatsapp" size={14} /> {form.orgWhatsapp}
              </span>
            </div>
            <p className="text-xs text-[#50575e] pt-1">
              <strong>Volunteer Recognition:</strong> {form.recognitionType}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => navigate('/find-help')}
              className="wp-btn wp-btn-primary flex-1 text-xs"
            >
              Browse All Opportunities
            </button>
            <button
              onClick={() => { setSubmitted(false); setStep(0); setForm({ ...form, title: '', description: '' }); }}
              className="px-4 py-2.5 text-xs bg-[#e2e4e7] text-[#1d2327] rounded-none hover:bg-gray-300 font-bold uppercase tracking-wider"
            >
              Post Another Opportunity
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f0f0f1] min-h-screen pb-16">
      {/* WP Header Bar */}
      <div className="bg-[#1d2327] text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[#2271b1] font-bold uppercase tracking-wider mb-2">
            <SolidIcon name="building" size={14} /> Organization Opportunity Creator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Post a Volunteer Opportunity
          </h1>
          <p className="text-xs text-white/70">
            Publish requirements for NGOs, schools, institutions, and community initiatives. Specify direct contact channels and volunteer recognition.
          </p>

          {/* Progress bar */}
          <div className="mt-6 grid grid-cols-4 gap-1.5">
            {STEPS.map((s, i) => (
              <div key={s} className="flex flex-col gap-1">
                <div className={`h-2 rounded-none transition-all ${i <= step ? 'bg-[#2271b1]' : 'bg-white/20'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wider truncate ${i === step ? 'text-white' : 'text-white/40'}`}>
                  {i + 1}. {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 0: Organization & Contact Info */}
        {step === 0 && (
          <div className="wp-card p-6 space-y-6">
            <div className="bg-[#1d2327] text-white p-3 -mx-6 -mt-6 mb-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white">1. Organization & Direct Contact Details</h2>
              <p className="text-[11px] text-white/70 mt-0.5">Provide your official organization name and direct contact channels for volunteers.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">
                  Organization / Institution Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={form.orgName}
                  onChange={e => update('orgName', e.target.value)}
                  placeholder="e.g. Bright Future Foundation, City High School"
                  className="w-full px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">
                  Category <span className="text-red-600">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={e => update('category', e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Direct Contact Channels Box */}
            <div className="bg-[#f0f6fc] rounded-none p-4 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2271b1] uppercase tracking-wider">
                <SolidIcon name="phone" size={14} /> Direct Communication Channels (Required for Volunteers)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">
                    Organization Email Address <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[#50575e]">
                      <SolidIcon name="email" size={14} />
                    </span>
                    <input
                      type="email"
                      value={form.orgEmail}
                      onChange={e => update('orgEmail', e.target.value)}
                      placeholder="e.g. contact@organization.org"
                      className="w-full pl-9 pr-3 py-2 bg-white rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">
                    WhatsApp Number <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-[#107c41]">
                      <SolidIcon name="whatsapp" size={14} />
                    </span>
                    <input
                      type="text"
                      value={form.orgWhatsapp}
                      onChange={e => update('orgWhatsapp', e.target.value)}
                      placeholder="e.g. +923001234567"
                      className="w-full pl-9 pr-3 py-2 bg-white rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">
                Opportunity Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={e => update('title', e.target.value)}
                placeholder="e.g. Computer Literacy Workshop for 35 School Students"
                className="w-full px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">
                Detailed Description <span className="text-red-600">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={e => update('description', e.target.value)}
                placeholder="Describe the opportunity in detail. What are the key responsibilities? Who will benefit? What facilities or tools will be provided?"
                rows={5}
                className="w-full px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-semibold focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">Location <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => update('location', e.target.value)}
                  placeholder="e.g. Multan, Punjab"
                  className="w-full px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={form.preferredDate}
                  onChange={e => update('preferredDate', e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">Urgency Level</label>
                <select
                  value={form.urgency}
                  onChange={e => update('urgency', e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">Duration / Time Commitment</label>
                <input
                  type="text"
                  value={form.estimatedDuration}
                  onChange={e => update('estimatedDuration', e.target.value)}
                  placeholder="e.g. 3 sessions × 3 hours"
                  className="w-full px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                />
              </div>
              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-3 cursor-pointer p-2.5 bg-[#f6f7f7] hover:bg-[#e2e4e7] transition-colors rounded-none">
                  <input
                    type="checkbox"
                    checked={form.isOnline}
                    onChange={e => update('isOnline', e.target.checked)}
                    className="w-4 h-4 accent-[#2271b1]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#1d2327]">Remote / Online Service Allowed</p>
                    <p className="text-[10px] text-[#50575e]">Volunteer can contribute remotely via video or online tools</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Requirements & Volunteer Recognition */}
        {step === 1 && (
          <div className="wp-card p-6 space-y-6">
            <div className="bg-[#1d2327] text-white p-3 -mx-6 -mt-6 mb-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white">2. Skills & Volunteer Recognition</h2>
              <p className="text-[11px] text-white/70 mt-0.5">Specify volunteer requirements and state clearly what recognition your organization will provide.</p>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-3">Required Skill(s) <span className="text-red-600">*</span></label>
              <div className="flex flex-wrap gap-1.5">
                {SKILLS.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-none uppercase transition-all ${
                      form.requiredSkills.includes(skill)
                        ? 'bg-[#2271b1] text-white'
                        : 'bg-[#f6f7f7] text-[#1d2327] hover:bg-[#e2e4e7]'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">Number of Volunteers Required <span className="text-red-600">*</span></label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={form.volunteersRequired}
                  onChange={e => update('volunteersRequired', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">Experience Level Required</label>
                <select
                  value={form.experienceLevel}
                  onChange={e => update('experienceLevel', e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                >
                  <option value="any">Any level welcome</option>
                  <option value="beginner">Beginner friendly</option>
                  <option value="intermediate">Intermediate skill level</option>
                  <option value="expert">Professional / Expert</option>
                </select>
              </div>
            </div>

            {/* CRITICAL REQUIRED SECTION: VOLUNTEER RECOGNITION */}
            <div className="bg-[#2271b1] text-white p-5 rounded-none space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white mb-1">
                  <SolidIcon name="award" size={16} /> Required Field: Volunteer Recognition & Reward
                </div>
                <p className="text-[11px] text-white/80">
                  <strong>What will you provide to the volunteer in recognition of their contribution?</strong> Organizations must clearly communicate what recognition or award the volunteer receives prior to publication.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {RECOGNITION_OPTIONS.map(opt => (
                  <label
                    key={opt}
                    className={`flex items-center gap-3 p-3 rounded-none cursor-pointer transition-all ${
                      form.recognitionType === opt
                        ? 'bg-white text-[#1d2327] font-bold'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="recognitionType"
                      checked={form.recognitionType === opt}
                      onChange={() => update('recognitionType', opt)}
                      className="accent-[#2271b1]"
                    />
                    <span className="text-xs uppercase font-bold">{opt}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-white mb-1">
                  Recognition Details / Description {form.recognitionType === 'Other' && <span className="text-red-300">*</span>}
                </label>
                <input
                  type="text"
                  value={form.recognitionDetails}
                  onChange={e => update('recognitionDetails', e.target.value)}
                  placeholder={
                    form.recognitionType === 'Other'
                      ? 'Please specify what custom recognition or benefit will be provided...'
                      : 'e.g. Official printed & verifiable digital certificate signed by Board of Directors upon completion'
                  }
                  className="w-full px-3 py-2 bg-white text-xs text-[#1d2327] font-bold focus:outline-none rounded-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Impact & SDGs */}
        {step === 2 && (
          <div className="wp-card p-6 space-y-6">
            <div className="bg-[#1d2327] text-white p-3 -mx-6 -mt-6 mb-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white">3. Beneficiaries & UN SDG Alignment</h2>
              <p className="text-[11px] text-white/70 mt-0.5">Quantify beneficiaries and map this opportunity to global Sustainable Development Goals.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">Estimated Beneficiaries <span className="text-red-600">*</span></label>
                <input
                  type="number"
                  min="1"
                  value={form.beneficiaries}
                  onChange={e => update('beneficiaries', e.target.value)}
                  placeholder="How many people will benefit?"
                  className="w-full px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-1">Target Group / Community Segment</label>
                <input
                  type="text"
                  value={form.targetGroup}
                  onChange={e => update('targetGroup', e.target.value)}
                  placeholder="e.g. School students aged 12-14"
                  className="w-full px-3 py-2.5 bg-[#f6f7f7] rounded-none text-xs text-[#1d2327] font-bold focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1d2327] uppercase tracking-wider mb-3">Relevant UN Sustainable Development Goals (SDGs)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SDG_LIST.slice(0, 12).map(sdg => (
                  <button
                    key={sdg.id}
                    type="button"
                    onClick={() => toggleSdg(sdg.id)}
                    className={`flex items-center gap-2 p-2 rounded-none text-left transition-all text-xs font-bold ${
                      form.sdgs.includes(sdg.id) ? 'bg-[#2271b1] text-white' : 'bg-[#f6f7f7] text-[#1d2327] hover:bg-[#e2e4e7]'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-none flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ backgroundColor: sdg.color }}
                    >
                      {sdg.id}
                    </span>
                    <span className="truncate">{sdg.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review & Publish */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="wp-card p-6">
              <div className="bg-[#1d2327] text-white p-3 -mx-6 -mt-6 mb-4 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white">4. Review Opportunity Before Publishing</h2>
                <span className="text-[10px] bg-[#107c41] text-white px-2.5 py-1 font-bold uppercase tracking-wider">
                  Ready to Publish
                </span>
              </div>

              <dl className="divide-y divide-[#f0f0f1] text-xs">
                {[
                  { label: 'Organization Name', value: form.orgName },
                  { label: 'Organization Email', value: form.orgEmail },
                  { label: 'WhatsApp Number', value: form.orgWhatsapp },
                  { label: 'Opportunity Title', value: form.title },
                  { label: 'Category', value: form.category },
                  { label: 'Location', value: form.location },
                  { label: 'Duration / Commitment', value: form.estimatedDuration },
                  { label: 'Volunteers Needed', value: form.volunteersRequired.toString() },
                  { label: 'Remote Available', value: form.isOnline ? 'Yes' : 'No' },
                  { label: 'Volunteer Recognition Offered', value: `${form.recognitionType} ${form.recognitionDetails ? `(${form.recognitionDetails})` : ''}` },
                  { label: 'Required Skills', value: form.requiredSkills.join(', ') || 'None specified' },
                  { label: 'Estimated Beneficiaries', value: form.beneficiaries },
                  { label: 'Target Group', value: form.targetGroup },
                ].map(item => (
                  <div key={item.label} className="py-2.5 grid grid-cols-3 gap-2">
                    <dt className="text-[11px] font-bold text-[#50575e] uppercase">{item.label}</dt>
                    <dd className="col-span-2 text-xs font-bold text-[#1d2327]">{item.value || '—'}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-[#f0f6fc] p-4 text-xs text-[#1d2327] rounded-none">
              <p className="font-bold text-[#2271b1] uppercase tracking-wider mb-1">Direct Contact Confirmation</p>
              <p className="font-semibold">
                By publishing, your organization agrees to receive direct inquiries from interested volunteers via <strong>{form.orgEmail}</strong> and <strong>{form.orgWhatsapp}</strong>, and to fulfill the stated volunteer recognition (<strong>{form.recognitionType}</strong>).
              </p>
            </div>
          </div>
        )}

        {/* Form Navigation Buttons */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => (step > 0 ? setStep(step - 1) : navigate('/find-help'))}
            className="px-5 py-2.5 bg-[#e2e4e7] text-[#1d2327] rounded-none text-xs font-bold uppercase tracking-wider hover:bg-gray-300 transition-colors"
          >
            {step === 0 ? 'Cancel' : 'Back'}
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 0 && (!form.orgName || !form.orgEmail || !form.orgWhatsapp || !form.title || !form.description || !form.location)) ||
                (step === 1 && (form.requiredSkills.length === 0 || !form.recognitionType || (form.recognitionType === 'Other' && !form.recognitionDetails)))
              }
              className="wp-btn wp-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Continue to Step {step + 2}</span>
              <SolidIcon name="chevron-right" size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="px-6 py-3 bg-[#107c41] text-white rounded-none text-xs font-extrabold uppercase tracking-wider hover:bg-[#0b582e] transition-colors flex items-center gap-2"
            >
              <SolidIcon name="check-circle" size={16} />
              Publish Opportunity Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
