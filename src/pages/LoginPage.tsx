import { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import SolidIcon from '../components/SolidIcon';
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
    <div className="min-h-screen bg-[#f0f0f1] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1d2327] flex-col p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10">
          <button onClick={() => navigate('/')}>
            <Logo size="md" light />
          </button>
        </div>
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <span className="text-xs font-bold text-[#2271b1] uppercase tracking-widest block mb-2">Direct Connection Platform</span>
          <h2 className="text-3xl font-extrabold text-white leading-snug mb-6">
            Join NGOs, Schools & Volunteers Connecting for Verified Impact.
          </h2>
          <div className="space-y-4">
            {[
              { iconName: 'building' as const, text: 'Post volunteer requirements with clear volunteer rewards' },
              { iconName: 'email' as const, text: 'Direct communication via Email & WhatsApp' },
              { iconName: 'award' as const, text: 'Earn verifiable volunteer certificates and recognition' },
              { iconName: 'chart' as const, text: 'Build a permanent credibility profile and impact metrics' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 text-white/90">
                <div className="w-7 h-7 bg-[#2271b1] rounded-none flex items-center justify-center text-white flex-shrink-0">
                  <SolidIcon name={item.iconName} size={14} />
                </div>
                <span className="text-xs font-bold">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 bg-white/10 p-4 rounded-none">
          <p className="text-xs text-white/80 italic leading-relaxed">
            &quot;Skill Share Platform allowed our school to connect directly with a computer trainer within 2 days. 35 students now know how to use computers safely.&quot;
          </p>
          <p className="text-[11px] text-white/50 mt-2 font-bold">— Principal, Government School, Multan</p>
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
          <div className="flex bg-white rounded-none p-1 mb-6 shadow-xs">
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 text-xs font-extrabold rounded-none uppercase tracking-wider transition-all ${
                  mode === m ? 'bg-[#2271b1] text-white' : 'text-[#50575e] hover:text-[#1d2327]'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Register Account'}
              </button>
            ))}
          </div>

          <div className="wp-card p-6 shadow-sm rounded-none">
            <div className="pb-3 mb-5 border-b border-[#2271b1]">
              <h3 className="font-extrabold text-[#1d2327] text-base uppercase tracking-wider">
                {mode === 'login' ? 'Platform Sign In' : 'Register Account'}
              </h3>
              <p className="text-xs text-[#50575e] mt-0.5 font-semibold">Select a role profile below to continue</p>
            </div>

            {mode === 'register' && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-[#1d2327] uppercase tracking-wider mb-2">Account Type</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { role: 'community_member' as const, label: 'Community Member', desc: 'Need help or submit requests', iconName: 'user' as const },
                    { role: 'volunteer' as const, label: 'Volunteer', desc: 'Share skills & earn certificates', iconName: 'users' as const },
                    { role: 'organization' as const, label: 'Organisation / NGO', desc: 'Post opportunities & manage volunteers', iconName: 'building' as const },
                  ].map(opt => (
                    <button
                      key={opt.role}
                      type="button"
                      onClick={() => setSelectedRole(opt.role)}
                      className={`p-3 rounded-none text-left transition-all flex items-center gap-3 ${
                        selectedRole === opt.role
                          ? 'bg-[#2271b1] text-white'
                          : 'bg-[#f6f7f7] text-[#1d2327] hover:bg-[#e2e4e7]'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-none flex items-center justify-center flex-shrink-0 ${
                        selectedRole === opt.role ? 'bg-white text-[#2271b1]' : 'bg-[#2271b1] text-white'
                      }`}>
                        <SolidIcon name={opt.iconName} size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider">{opt.label}</p>
                        <p className={`text-[11px] ${selectedRole === opt.role ? 'text-white/80' : 'text-[#50575e]'}`}>{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="mb-5">
                <label className="block text-xs font-bold text-[#1d2327] uppercase tracking-wider mb-2">Select User Account</label>
                <div className="space-y-2">
                  {[
                    { role: 'volunteer' as const, label: 'Ahmad Raza', subtitle: 'Volunteer (Gold Trust)', iconName: 'users' as const },
                    { role: 'community_member' as const, label: 'Sara Khan', subtitle: 'Community Member', iconName: 'user' as const },
                    { role: 'organization' as const, label: 'Bright Future Foundation', subtitle: 'Organisation / NGO', iconName: 'building' as const },
                    { role: 'admin' as const, label: 'Admin User', subtitle: 'Platform Administrator', iconName: 'shield' as const },
                  ].map(opt => (
                    <button
                      key={opt.role}
                      type="button"
                      onClick={() => setSelectedRole(opt.role)}
                      className={`w-full flex items-center gap-3 p-3 rounded-none text-left transition-all ${
                        selectedRole === opt.role
                          ? 'bg-[#2271b1] text-white'
                          : 'bg-[#f6f7f7] text-[#1d2327] hover:bg-[#e2e4e7]'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-none flex items-center justify-center flex-shrink-0 ${
                        selectedRole === opt.role ? 'bg-white text-[#2271b1]' : 'bg-[#2271b1] text-white'
                      }`}>
                        <SolidIcon name={opt.iconName} size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider">{opt.label}</p>
                        <p className={`text-[11px] ${selectedRole === opt.role ? 'text-white/80' : 'text-[#50575e]'}`}>{opt.subtitle}</p>
                      </div>
                      {selectedRole === opt.role && (
                        <SolidIcon name="check-circle" size={16} className="text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleLogin}
              className="wp-btn wp-btn-primary w-full text-xs py-3 rounded-none"
            >
              <span>{mode === 'login' ? 'Sign In Now' : 'Create Account & Continue'}</span>
              <SolidIcon name="chevron-right" size={14} />
            </button>
          </div>

          <button onClick={() => navigate('/')} className="mt-4 w-full text-center text-xs text-[#50575e] font-bold uppercase tracking-wider hover:underline">
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
}
