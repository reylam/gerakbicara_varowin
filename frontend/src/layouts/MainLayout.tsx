import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { SignBot } from '../components/SignBot';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <AppSidebar />
      <div className="flex min-h-screen flex-col pb-20 lg:ml-72 lg:pb-0">
        <AppHeader />
        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      <SignBot />
    </div>
  );
};
