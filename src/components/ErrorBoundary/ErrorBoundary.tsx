import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Caught error in ErrorBoundary:', error);
    console.error('Component stack:', info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-red-500">
          <h2>Something went wrong</h2>
          <p>Please try to refresh the page</p>
        </div>
      );
    }

    return this.props.children;
  }
}
