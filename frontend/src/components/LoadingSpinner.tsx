import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="space-y-3 rounded-3xl border border-[color:var(--border)] bg-[var(--surface)] p-5">
      <Skeleton height={16} baseColor="#cbd5e1" highlightColor="#e2e8f0" />
      <Skeleton height={16} width="85%" baseColor="#cbd5e1" highlightColor="#e2e8f0" />
      <Skeleton height={16} width="75%" baseColor="#cbd5e1" highlightColor="#e2e8f0" />
    </div>
  );
};
