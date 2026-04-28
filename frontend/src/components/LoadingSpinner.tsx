export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-14">
      <div className="h-12 w-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div>
    </div>
  );
};
