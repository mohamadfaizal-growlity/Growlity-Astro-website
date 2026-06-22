import React from 'react';

export const Link = ({ to, children, className, onClick, ...props }: any) => {
  return (
    <a href={to} className={className} onClick={onClick} {...props}>
      {children}
    </a>
  );
};

export const RouterProvider = ({ children }: any) => <>{children}</>;
export const createBrowserRouter = () => ({});
export const useLocation = () => ({ pathname: typeof window !== 'undefined' ? window.location.pathname : '/' });
export const useNavigate = () => (path: string) => { if (typeof window !== 'undefined') window.location.href = path; };
