'use client';

import { Button } from '@/components/qbutton';
import { RotateCcw } from 'lucide-react';
import { resetAppState } from '@/server/actions';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ResetButton() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    setIsResetting(true);
    try {
      // Call the server action to reset Redis
      await resetAppState();
      
      // Invalidate all React Query caches
      await queryClient.invalidateQueries();
      
      // Clear all query caches
      queryClient.clear();
      
      // Force a page reload to clear any other caches
      router.refresh();
      
      // Optional: full reload to clear all client-side state
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error('Failed to reset app state:', error);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <Button
      onClick={handleReset}
      variant="ghost"
      size="small"
      loading={isResetting}
      loadingText="Resetting..."
    >
      <RotateCcw className="w-4 h-4" />
      Reset App State
    </Button>
  );
}