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

  if (error && isConnected) {
    return { hasError: true, errorProps: { message: error, onRetry: refresh } };
  }

  if (!isConnected && offlineError && !offlineLoading) {
    return {
      hasError: true,
      errorProps: { message: offlineError, onRetry: resetOfflineError },
    };
  }

  if (!isConnected && offlineData.length === 0 && !offlineLoading) {
    return {
      hasError: true,
      errorProps: {
        message: 'Please check your internet connection and try again',
        onRetry: refresh,
      },
    };
  }

  return { hasError: false, errorProps: null };
};
