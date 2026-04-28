import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { SignBot } from '../components/SignBot';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <AppSidebar />
      <div className="ml-72 flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex-1 px-6 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      <SignBot />
    </div>
  );
};
