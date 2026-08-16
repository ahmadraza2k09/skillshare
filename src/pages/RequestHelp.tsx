import { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { CATEGORIES, SKILLS, SDG_LIST } from '../data/types';

const STEPS = ['Basic Info', 'Requirements', 'Impact', 'Review'];

export default function RequestHelp() {
  const { navigate } = useRouter();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    isOnline: false,
    preferredDate: '',
    estimatedDuration: '',
    urgency: 'normal',
    requiredSkills: [] as string[],
    volunteersRequired: 1,
    experienceLevel: 'any',
    beneficiaries: '',
    targetGroup: '',
    sdgs: [] as number[],
    expectedOutcome: '',
    additionalNotes: '',
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
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#F0F9F4] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
          <h1 className="text-3xl font-display font-semibold text-[#141210] mb-3" style={{ fontFamily: "'Fraunces', serif" }}>
            Request Submitted!
          </h1>
          <p className="text-[#6B6560] mb-3">Your community service request has been submitted and is now under review.</p>
          <p className="text-sm text-[#9B9590] mb-8">Once approved, volunteers will be able to browse and apply. You will be notified when applications arrive.</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/find-help')} className="py-3 bg-[#1B5E3B] text-white font-semibold rounded-xl hover:bg-[#2D7A52] transition-colors">
              Browse Other Needs
            </button>
            <button onClick={() => { setSubmitted(false); setStep(0); setForm({ ...form, title: '', description: '' }); }} className="py-3 border border-[#E5E0D8] text-[#6B6560] rounded-xl hover:bg-[#FAFAF8] transition-colors">
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF8] min-h-screen">
      {/* Header */}
      <div className="bg-[#1B5E3B] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-semibold text-white mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
            Request Community Help
          </h1>
          {/* Progress */}
          <div className="flex gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col gap-1.5">
                <div className={`h-1.5 rounded-full transition-all ${i <= step ? 'bg-[#E8820C]' : 'bg-white/20'}`} />
                <span className={`text-xs font-medium ${i === step ? 'text-white' : 'text-white/50'}`}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Step 0: Basic Info */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-6 space-y-5">
              <h2 className="font-semibold text-[#141210]">Basic Information</h2>

              <div>
                <label className="block text-sm font-medium text-[#141210] mb-1.5">Request Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => update('title', e.target.value)}
                  placeholder="e.g. Computer literacy workshop for 30 school students"
                  className="w-full px-4 py-3 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] placeholder-[#9B9590] focus:outline-none focus:border-[#1B5E3B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#141210] mb-1.5">Detailed Description <span className="text-red-500">*</span></label>
                <textarea
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  placeholder="Describe the need in detail. What needs to be done? Who will benefit? What does the volunteer need to bring or know?"
                  rows={5}
                  className="w-full px-4 py-3 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] placeholder-[#9B9590] focus:outline-none focus:border-[#1B5E3B] resize-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#141210] mb-1.5">Category <span className="text-red-500">*</span></label>
                  <select
                    value={form.category}
                    onChange={e => update('category', e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] focus:outline-none focus:border-[#1B5E3B] bg-white"
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#141210] mb-1.5">Urgency</label>
                  <select
                    value={form.urgency}
                    onChange={e => update('urgency', e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] focus:outline-none focus:border-[#1B5E3B] bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#141210] mb-1.5">Location <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={e => update('location', e.target.value)}
                    placeholder="City, Province"
                    className="w-full px-4 py-3 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] placeholder-[#9B9590] focus:outline-none focus:border-[#1B5E3B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#141210] mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={form.preferredDate}
                    onChange={e => update('preferredDate', e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] focus:outline-none focus:border-[#1B5E3B] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#141210] mb-1.5">Estimated Duration</label>
                  <input
                    type="text"
                    value={form.estimatedDuration}
                    onChange={e => update('estimatedDuration', e.target.value)}
                    placeholder="e.g. 3 sessions × 2 hours"
                    className="w-full px-4 py-3 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] placeholder-[#9B9590] focus:outline-none focus:border-[#1B5E3B]"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-[#E5E0D8] rounded-xl hover:bg-[#FAFAF8] transition-colors">
                    <input
                      type="checkbox"
                      checked={form.isOnline}
                      onChange={e => update('isOnline', e.target.checked)}
                      className="w-4 h-4 accent-[#1B5E3B]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#141210]">Online is acceptable</p>
                      <p className="text-xs text-[#9B9590]">Volunteer can help remotely</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Requirements */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-6 space-y-5">
              <h2 className="font-semibold text-[#141210]">Service Requirements</h2>

              <div>
                <label className="block text-sm font-medium text-[#141210] mb-3">Required Skills</label>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-all ${form.requiredSkills.includes(skill) ? 'bg-[#1B5E3B] text-white border-[#1B5E3B]' : 'border-[#E5E0D8] text-[#6B6560] hover:border-[#1B5E3B] hover:text-[#1B5E3B]'}`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#141210] mb-1.5">Volunteers Required</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={form.volunteersRequired}
                    onChange={e => update('volunteersRequired', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] focus:outline-none focus:border-[#1B5E3B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#141210] mb-1.5">Experience Level</label>
                  <select
                    value={form.experienceLevel}
                    onChange={e => update('experienceLevel', e.target.value)}
                    className="w-full px-4 py-3 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] focus:outline-none focus:border-[#1B5E3B] bg-white"
                  >
                    <option value="any">Any level</option>
                    <option value="beginner">Beginner friendly</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert / Professional</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Impact */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-6 space-y-5">
              <h2 className="font-semibold text-[#141210]">Impact Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#141210] mb-1.5">Estimated Beneficiaries</label>
                  <input
                    type="number"
                    min="1"
                    value={form.beneficiaries}
                    onChange={e => update('beneficiaries', e.target.value)}
                    placeholder="How many people will benefit?"
                    className="w-full px-4 py-3 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] placeholder-[#9B9590] focus:outline-none focus:border-[#1B5E3B]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#141210] mb-1.5">Target Group</label>
                  <input
                    type="text"
                    value={form.targetGroup}
                    onChange={e => update('targetGroup', e.target.value)}
                    placeholder="e.g. School students aged 12-14"
                    className="w-full px-4 py-3 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] placeholder-[#9B9590] focus:outline-none focus:border-[#1B5E3B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#141210] mb-3">Relevant SDGs (optional)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SDG_LIST.slice(0, 12).map(sdg => (
                    <button
                      key={sdg.id}
                      onClick={() => toggleSdg(sdg.id)}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all text-xs ${form.sdgs.includes(sdg.id) ? 'border-2' : 'border-[#E5E0D8] hover:border-gray-300'}`}
                      style={form.sdgs.includes(sdg.id) ? { borderColor: sdg.color, backgroundColor: sdg.color + '10' } : {}}
                    >
                      <span
                        className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: sdg.color }}
                      >
                        {sdg.id}
                      </span>
                      <span className="text-[#141210] leading-tight line-clamp-1">{sdg.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#141210] mb-1.5">Expected Outcome</label>
                <textarea
                  value={form.expectedOutcome}
                  onChange={e => update('expectedOutcome', e.target.value)}
                  placeholder="What specific outcome do you hope to achieve?"
                  rows={3}
                  className="w-full px-4 py-3 border border-[#E5E0D8] rounded-xl text-sm text-[#141210] placeholder-[#9B9590] focus:outline-none focus:border-[#1B5E3B] resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-[#E5E0D8] p-6">
              <h2 className="font-semibold text-[#141210] mb-4">Review Your Request</h2>
              <dl className="space-y-4">
                {[
                  { label: 'Title', value: form.title || '—' },
                  { label: 'Category', value: form.category || '—' },
                  { label: 'Location', value: form.location || '—' },
                  { label: 'Urgency', value: form.urgency },
                  { label: 'Duration', value: form.estimatedDuration || '—' },
                  { label: 'Volunteers needed', value: form.volunteersRequired.toString() },
                  { label: 'Online available', value: form.isOnline ? 'Yes' : 'No' },
                  { label: 'Required skills', value: form.requiredSkills.join(', ') || '—' },
                  { label: 'Estimated beneficiaries', value: form.beneficiaries || '—' },
                  { label: 'Target group', value: form.targetGroup || '—' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between py-2 border-b border-[#F0EDE6] last:border-0">
                    <dt className="text-sm text-[#9B9590]">{item.label}</dt>
                    <dd className="text-sm text-[#141210] font-medium text-right max-w-48">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <p className="font-semibold mb-1">Before submitting</p>
              <p>Make sure your request is for a genuine community need that can be safely served by a volunteer. Requests for medical emergencies, illegal activities, or unsafe situations should use appropriate emergency services.</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between gap-4">
          <button
            onClick={() => step > 0 ? setStep(step - 1) : navigate('/')}
            className="px-6 py-3 border border-[#E5E0D8] text-[#6B6560] rounded-xl font-medium hover:bg-white transition-colors"
          >
            {step === 0 ? 'Cancel' : '← Back'}
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 0 && (!form.title || !form.category || !form.location)}
              className="px-7 py-3 bg-[#1B5E3B] text-white rounded-xl font-semibold hover:bg-[#2D7A52] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="px-7 py-3 bg-[#E8820C] text-white rounded-xl font-semibold hover:bg-[#F5A030] transition-colors"
            >
              Submit Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
