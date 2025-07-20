import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterAll } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';
import { Component } from 'react';
import { afterEach } from 'node:test';
import '@testing-library/jest-dom';

class ProblemChild extends Component {
  componentDidMount() {
    throw new Error('Test error');
  }

  render() {
    return <div>This will not render</div>;
  }
}

describe('ErrorBoundary', () => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>Safe Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe Child')).toBeInTheDocument();
  });

  it('renders fallback UI when error is thrown', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText('Please try to refresh the page')
    ).toBeInTheDocument();
  });
});
