// Centralized error state logic for handling online/offline errors with appropriate retry actions

type ErrorStateParams<T = unknown> = {
  error: string | null;
  isConnected: boolean;
  offlineError: string | null;
  offlineLoading: boolean;
  offlineData: T[];
  refresh: () => void;
  resetOfflineError: () => void;
};

type ErrorStateResult = {
  hasError: boolean;
  errorProps: { message: string; onRetry: () => void } | null;
};

export const getErrorState = <T>(
  params: ErrorStateParams<T>,
): ErrorStateResult => {
  if (!params) {
    return { hasError: false, errorProps: null };
  }

  const {
    error,
    isConnected,
    offlineError,
    offlineLoading,
    offlineData,
    refresh,
    resetOfflineError,
  } = params;

  // Online API error - show error with refresh retry
  if (error && isConnected) {
    return { hasError: true, errorProps: { message: error, onRetry: refresh } };
  }

  // Offline database error - show error with reset retry
  if (!isConnected && offlineError && !offlineLoading) {
    return {
      hasError: true,
      errorProps: { message: offlineError, onRetry: resetOfflineError },
    };
  }

  // No internet and no cached data - show connection message with refresh retry
  if (!isConnected && offlineData.length === 0 && !offlineLoading) {
    return {
      hasError: true,
      errorProps: {
        message: 'Please check your internet connection and try again',
        onRetry: refresh,
      },
    };
  }

  // No error conditions met - continue normal flow
  return { hasError: false, errorProps: null };
};
