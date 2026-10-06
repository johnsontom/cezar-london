"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  /** Rendered instead of the children when something throws. */
  fallback: ReactNode;
  onError?: (error: Error) => void;
  label?: string;
};

type ErrorBoundaryState = { failed: boolean };

/**
 * Keeps optional, heavy enhancements (WebGL, 3D) from ever taking the page
 * down. If the enhancement throws, the graceful fallback stays on screen.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[CEZAR] ${this.props.label ?? "Enhancement"} fell back to its static version.`,
        error,
        info.componentStack,
      );
    }
    this.props.onError?.(error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
