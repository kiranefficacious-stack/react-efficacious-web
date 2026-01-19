import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl m-4 border border-red-200 dark:border-red-900/30">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500 mb-4">
                <AlertTriangle size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-md mx-auto">
                We encountered an error while rendering this section.
            </p>
            <code className="bg-slate-100 dark:bg-black p-3 rounded text-xs text-red-600 dark:text-red-400 font-mono block max-w-full overflow-auto">
                {this.state.error?.message}
            </code>
            <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
                Reload Page
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;