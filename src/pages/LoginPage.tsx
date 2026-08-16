import { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import type { UserRole } from '../data/types';

export default function LoginPage() {
  const { navigate } = useRouter();
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('volunteer');

  const handleLogin = () => {
    login(selectedRole);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0F3D26] flex-col p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }} />
        <div className="relative z-10">
          <button onClick={() => navigate('/')}>
            <Logo size="md" light />
          </button>
        </div>
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-display font-semibold text-white leading-snug mb-5" style={{ fontFamily: "'Fraunces', serif" }}>
            Join a community that turns goodwill into real impact.
          </h2>
          <div className="space-y-4">
            {[
              { icon: '✓', text: 'Connect with genuine community needs' },
              { icon: '✓', text: 'Build a verified volunteer credibility profile' },
              { icon: '✓', text: 'Earn badges and recognition for real service' },
              { icon: '✓', text: 'Measure your impact with verified statistics' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 text-white/80">
                <span className="w-6 h-6 bg-[#E8820C] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {item.icon}
                </span>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 bg-white/10 rounded-xl p-5 border border-white/15">
          <p className="text-sm text-white/70 italic">
            "Khayr connected my school with a computer trainer within 2 days. 35 students who had never touched a keyboard now know how to use the internet safely."
          </p>
          <p className="text-xs text-white/50 mt-3">— Principal, Government School, Multan (Demo)</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <button onClick={() => navigate('/')}>
              <Logo size="md" />
            </button>
          </div>

          {/* Mode tabs */}
          <div className="flex bg-[#F0EDE6] rounded-xl p-1 mb-8">
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg capitalize transition-all ${mode === m ? 'bg-white text-[#141210] shadow-sm' : 'text-[#6B6560] hover:text-[#141210]'}`}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {/* Demo notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
            <p className="font-semibold mb-1">Demo Mode</p>
            <p>Authentication is not yet implemented. Select a role below and click "{mode === 'login' ? 'Sign In' : 'Create Account'}" to explore the platform as that user type.</p>
          </div>

          {mode === 'register' && (
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#141210] mb-3">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { role: 'community_member', label: 'Community Member', desc: 'I need help', icon: '🙋' },
                  { role: 'volunteer', label: 'Volunteer', desc: 'I want to help', icon: '🤝' },
                  { role: 'organization', label: 'Organisation', desc: 'School, NGO, etc.', icon: '🏫' },
                ] as const).map(opt => (
                  <button
                    key={opt.role}
                    onClick={() => setSelectedRole(opt.role)}
                    className={`p-4 rounded-xl border text-left transition-all ${selectedRole === opt.role ? 'border-[#1B5E3B] bg-[#F0F9F4]' : 'border-[#E5E0D8] bg-white hover:border-[#C8C4BC]'}`}
                  >
                    <div className="text-xl mb-1">{opt.icon}</div>
                    <p className="text-sm font-medium text-[#141210]">{opt.label}</p>
                    <p className="text-xs text-[#9B9590]">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#141210] mb-3">Sign in as (demo)</label>
              <div className="space-y-2">
                {([
                  { role: 'volunteer', label: 'Ahmad Raza', subtitle: 'Volunteer — Gold Trust Level', icon: '🤝' },
                  { role: 'community_member', label: 'Sara Khan', subtitle: 'Community Member', icon: '🙋' },
                  { role: 'organization', label: 'Bright Future Foundation', subtitle: 'Organisation', icon: '🏫' },
                  { role: 'admin', label: 'Admin User', subtitle: 'Platform Administrator', icon: '⚙️' },
                ] as const).map(opt => (
                  <button
                    key={opt.role}
                    onClick={() => setSelectedRole(opt.role)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${selectedRole === opt.role ? 'border-[#1B5E3B] bg-[#F0F9F4]' : 'border-[#E5E0D8] bg-white hover:border-[#C8C4BC]'}`}
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#141210]">{opt.label}</p>
                      <p className="text-xs text-[#9B9590]">{opt.subtitle}</p>
                    </div>
                    {selectedRole === opt.role && (
                      <div className="w-5 h-5 bg-[#1B5E3B] rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-3.5 bg-[#1B5E3B] text-white font-semibold rounded-xl hover:bg-[#2D7A52] transition-colors"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'} →
          </button>

          <p className="text-center text-sm text-[#9B9590] mt-5">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-[#1B5E3B] font-medium hover:underline">
              {mode === 'login' ? 'Register' : 'Sign in'}
            </button>
          </p>

          <button onClick={() => navigate('/')} className="mt-4 w-full text-center text-xs text-[#9B9590] hover:text-[#6B6560] transition-colors">
            ← Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
}
