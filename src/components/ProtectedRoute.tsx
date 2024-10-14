import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoadingOverlay from './LoadingOverlay';




const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      router.push('/register');
    } else {
      setLoading(false);
    }
  }, [router, user]);

  if (loading) {
    return <LoadingOverlay />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
