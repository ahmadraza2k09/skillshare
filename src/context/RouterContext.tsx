import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type RouterContextType = {
  route: string;
  params: Record<string, string>;
  navigate: (path: string, params?: Record<string, string>) => void;
};

const RouterContext = createContext<RouterContextType>({
  route: '/',
  params: {},
  navigate: () => {},
});

function parseHash() {
  const hash = window.location.hash.slice(1) || '/';
  const [path, search] = hash.split('?');
  const params: Record<string, string> = {};
  if (search) {
    new URLSearchParams(search).forEach((v, k) => { params[k] = v; });
  }
  return { path: path || '/', params };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(parseHash);

  useEffect(() => {
    const handler = () => setState(parseHash());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = (path: string, p?: Record<string, string>) => {
    if (p && Object.keys(p).length > 0) {
      window.location.hash = `${path}?${new URLSearchParams(p).toString()}`;
    } else {
      window.location.hash = path;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ route: state.path, params: state.params, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export const useRouter = () => useContext(RouterContext);
