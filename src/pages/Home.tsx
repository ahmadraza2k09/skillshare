import { useEffect, useRef, useState } from 'react';
import { useRouter } from '../context/RouterContext';
import RequestCard from '../components/RequestCard';
import VolunteerCard from '../components/VolunteerCard';
import { DEMO_IMPACT, DEMO_REQUESTS, DEMO_VOLUNTEERS, DEMO_ORGANIZATIONS } from '../data/demo';
import { SDG_LIST } from '../data/types';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const steps = 50;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.round(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const formatted = count >= 1000 ? (count / 1000).toFixed(count >= 10000 ? 0 : 1) + 'k' : count.toString();

  return (
    <div ref={ref} className="text-3xl lg:text-4xl font-display font-semibold text-white">
      {formatted}{suffix}
    </div>
  );
}

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'Submit a Need',
    desc: "A community member or organisation describes a genuine need — a workshop, tutoring sessions, design help — and submits a service request.",
  },
  {
    step: '02',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Volunteers Apply',
    desc: 'Skilled volunteers browse published needs and offer to help. The platform shows a match score based on skills, location, and availability.',
  },
  {
    step: '03',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Service Happens',
    desc: 'The requester selects a volunteer. The service is completed. The requester verifies the work.',
  },
  {
    step: '04',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Impact is Recorded',
    desc: 'Verified services earn volunteers hours, points, and badges. Every need solved is added to the real community impact record.',
  },
];

export default function Home() {
  const { navigate } = useRouter();
  const recentRequests = DEMO_REQUESTS.filter(r => r.status === 'applications_open' || r.status === 'published').slice(0, 3);
  const topVolunteers = DEMO_VOLUNTEERS.filter(v => v.trustLevel === 'gold').slice(0, 3);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-[#0F3D26] overflow-hidden min-h-[88vh] flex items-center">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }} />
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&h=800&fit=crop&auto=format"
            alt="Community volunteers working together"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F3D26] via-[#0F3D26]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-[#E8820C] bg-[#E8820C]/15 border border-[#E8820C]/30 rounded-full px-3 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8820C]" />
              Community Service Platform — Demo
            </span>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold text-white leading-[1.08] tracking-tight"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              Turn Community Needs Into Community Action.
            </h1>

            <p className="mt-7 text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl">
              Connect people who need help with volunteers who have the skills and time to make a difference.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/request-help')}
                className="px-7 py-3.5 bg-[#E8820C] text-white font-semibold rounded-xl hover:bg-[#F5A030] transition-colors shadow-lg shadow-[#E8820C]/25 text-base"
              >
                Request Help
              </button>
              <button
                onClick={() => navigate('/volunteer')}
                className="px-7 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/25 hover:bg-white/20 transition-colors text-base"
              >
                Become a Volunteer →
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-2">
                {DEMO_VOLUNTEERS.slice(0, 4).map(v => (
                  <img key={v.id} src={v.avatar} alt={v.name} className="w-9 h-9 rounded-full border-2 border-[#0F3D26] object-cover" />
                ))}
              </div>
              <p className="text-sm text-white/60">
                <strong className="text-white font-semibold">2,341+</strong> volunteers ready to help
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact strip ── */}
      <section className="bg-[#1B5E3B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {[
              { label: 'People Helped', target: DEMO_IMPACT.peopleHelped },
              { label: 'Needs Solved', target: DEMO_IMPACT.needsSolved },
              { label: 'Volunteers', target: DEMO_IMPACT.volunteers },
              { label: 'Volunteer Hours', target: DEMO_IMPACT.volunteerHours },
              { label: 'Cities Reached', target: DEMO_IMPACT.citiesReached },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <AnimatedCounter target={stat.target} />
                <p className="text-sm text-white/60 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-white/30 mt-6">Demo data — not real platform statistics</p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-[#F0EDE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-semibold text-[#E8820C] uppercase tracking-widest">The Process</span>
            <h2 className="mt-2 text-4xl font-display font-semibold text-[#141210] leading-snug" style={{ fontFamily: "'Fraunces', serif" }}>
              How Khayr Works
            </h2>
            <p className="mt-3 text-[#6B6560]">A simple, structured system from need to verified impact.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px border-t-2 border-dashed border-[#C8C4BC] z-0 -translate-x-4" />
                )}
                <div className="relative z-10 bg-white rounded-xl p-6 border border-[#E5E0D8] h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#F0F9F4] text-[#1B5E3B] flex items-center justify-center">
                      {step.icon}
                    </div>
                    <span className="text-2xl font-display font-bold text-[#E5E0D8]" style={{ fontFamily: "'Fraunces', serif" }}>
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#141210] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6B6560] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent needs ── */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-semibold text-[#E8820C] uppercase tracking-widest">Open Now</span>
              <h2 className="mt-1 text-3xl font-display font-semibold text-[#141210]" style={{ fontFamily: "'Fraunces', serif" }}>
                Community Needs
              </h2>
            </div>
            <button
              onClick={() => navigate('/find-help')}
              className="flex items-center gap-2 text-sm font-medium text-[#1B5E3B] hover:gap-3 transition-all"
            >
              Browse all needs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentRequests.map(r => <RequestCard key={r.id} request={r} />)}
          </div>
        </div>
      </section>

      {/* ── Featured volunteers ── */}
      <section className="py-20 bg-white border-t border-[#F0EDE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-sm font-semibold text-[#E8820C] uppercase tracking-widest">Our Community</span>
              <h2 className="mt-1 text-3xl font-display font-semibold text-[#141210]" style={{ fontFamily: "'Fraunces', serif" }}>
                Featured Volunteers
              </h2>
            </div>
            <button
              onClick={() => navigate('/volunteer')}
              className="flex items-center gap-2 text-sm font-medium text-[#1B5E3B] hover:gap-3 transition-all"
            >
              Meet all volunteers
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topVolunteers.map(v => <VolunteerCard key={v.id} volunteer={v} />)}
          </div>
        </div>
      </section>

      {/* ── Organisations ── */}
      <section className="py-16 bg-[#F0EDE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-[#6B6560] uppercase tracking-widest mb-6">Trusted By</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {DEMO_ORGANIZATIONS.map(org => (
              <div key={org.id} className="flex items-center gap-2.5 px-5 py-3 bg-white rounded-xl border border-[#E5E0D8] text-[#141210]">
                <span className="w-8 h-8 bg-[#F0F9F4] rounded-lg flex items-center justify-center text-sm font-bold text-[#1B5E3B]">
                  {org.name[0]}
                </span>
                <span className="text-sm font-medium">{org.name}</span>
                {org.verified && <span className="text-[#1B5E3B] text-xs">✓</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SDG section ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-[#E8820C] uppercase tracking-widest">UN Goals</span>
            <h2 className="mt-2 text-3xl font-display font-semibold text-[#141210]" style={{ fontFamily: "'Fraunces', serif" }}>
              Aligned With the Sustainable Development Goals
            </h2>
            <p className="mt-3 text-[#6B6560]">
              Every service request on Khayr is mapped to one or more of the UN&apos;s 17 SDGs, turning local action into global impact.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {SDG_LIST.map(sdg => (
              <div
                key={sdg.id}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all hover:scale-105 cursor-default"
                style={{ borderColor: sdg.color + '40', backgroundColor: sdg.color + '12', color: sdg.color }}
              >
                <span className="font-bold">{sdg.id}</span>
                <span className="text-[#141210]/70 hidden sm:inline">{sdg.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0F3D26] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-4xl sm:text-5xl font-display font-semibold text-white leading-snug"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Everyone has something they can give.
          </h2>
          <p className="mt-5 text-lg text-white/70">
            Some have knowledge. Some have skills. Some have time. This platform turns those resources into measurable community impact.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/request-help')}
              className="px-7 py-3.5 bg-[#E8820C] text-white font-semibold rounded-xl hover:bg-[#F5A030] transition-colors text-base"
            >
              Request Community Help
            </button>
            <button
              onClick={() => navigate('/volunteer')}
              className="px-7 py-3.5 bg-white text-[#0F3D26] font-semibold rounded-xl hover:bg-white/90 transition-colors text-base"
            >
              Become a Volunteer
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
