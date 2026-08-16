import { RouterProvider, useRouter } from './context/RouterContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FindHelp from './pages/FindHelp';
import RequestDetail from './pages/RequestDetail';
import VolunteerPage from './pages/VolunteerPage';
import VolunteerProfile from './pages/VolunteerProfile';
import Projects from './pages/Projects';
import Organizations from './pages/Organizations';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import RequestHelp from './pages/RequestHelp';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';

function AppInner() {
  const { route } = useRouter();

  const isAuthPage = route === '/login' || route === '/register';
  const isAdminPage = route === '/admin';

  const renderPage = () => {
    if (route === '/') return <Home />;
    if (route === '/find-help') return <FindHelp />;
    if (route === '/volunteer') return <VolunteerPage />;
    if (route.startsWith('/request/')) return <RequestDetail />;
    if (route.startsWith('/volunteer/')) return <VolunteerProfile />;
    if (route === '/projects') return <Projects />;
    if (route === '/organizations') return <Organizations />;
    if (route === '/about') return <About />;
    if (route === '/dashboard') return <Dashboard />;
    if (route === '/request-help') return <RequestHelp />;
    if (route === '/admin') return <AdminDashboard />;
    if (route === '/login') return <LoginPage />;
    if (route === '/register') return <LoginPage />;
    return <Home />;
  };

  if (isAuthPage) {
    return renderPage();
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f0f0f1' }}>
      {!isAdminPage && <Navbar />}
      {isAdminPage && (
        <div className="bg-[#1d2327] px-6 py-3 flex items-center gap-4 border-b border-[#2c3338]">
          <button
            onClick={() => { window.location.hash = '/'; }}
            className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-semibold transition-colors"
          >
            ← Back to main site
          </button>
          <span className="text-white/40 text-xs">·</span>
          <span className="text-white/90 text-xs font-bold">Admin Panel</span>
        </div>
      )}
      <main className="flex-1">{renderPage()}</main>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </RouterProvider>
  );
}
