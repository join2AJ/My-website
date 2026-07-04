import React from 'react';

export interface ToastProps {
  /** Runway-light status. @default "info" */
  status?: 'clear' | 'caution' | 'stop' | 'info';
  title?: string;
  message?: string;
  onClose?: () => void;
  style?: React.CSSProperties;
}

/**
 * Status notification toast (runway-light rule + dot).
 * @startingPoint section="Components" subtitle="Toasts & tooltips" viewport="700x200"
 */
export function Toast(props: ToastProps): JSX.Element;
