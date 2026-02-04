import React from 'react';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-5">
          <div className="alert alert-danger" role="alert">
            <h2 className="alert-heading">⚠️ Something went wrong</h2>
            <p className="mb-3">
              We're sorry for the inconvenience. The application encountered an unexpected error.
            </p>
            <hr />
            <details className="mb-3">
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Error Details
              </summary>
              <pre className="mt-3 p-3 bg-light rounded">
                <code>{this.state.error && this.state.error.toString()}</code>
              </pre>
              {this.state.errorInfo && (
                <pre className="mt-2 p-3 bg-light rounded" style={{ fontSize: '0.85rem' }}>
                  <code>{this.state.errorInfo.componentStack}</code>
                </pre>
              )}
            </details>
            <button 
              className="btn btn-danger" 
              onClick={this.handleReset}
            >
              Try Again
            </button>
            <button 
              className="btn btn-secondary ms-2" 
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
