import LoadingSpinner from '@/components/atoms/loading/LoadingSpinner';

export default function Loading() {
  return (
    <div className="bg-white01 flex h-screen w-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
