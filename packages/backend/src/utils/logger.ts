export const logger = {
  debug: (message: string, data?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data || '');
    }
  },
  info: (message: string, data?: Record<string, unknown>) => {
    console.log(`[INFO] ${message}`, data || '');
  },
  warn: (message: string, data?: Record<string, unknown>) => {
    console.warn(`[WARN] ${message}`, data || '');
  },
  error: (message: string, error: unknown, data?: Record<string, unknown>) => {
    console.error(`[ERROR] ${message}`, { error, ...data });
  }
}; 