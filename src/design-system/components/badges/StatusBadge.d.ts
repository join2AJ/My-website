import React from 'react';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Runway-light meaning. @default "info" */
  status?: 'clear' | 'caution' | 'stop' | 'info' | 'neutral';
  /** Show leading status dot. @default true */
  dot?: boolean;
  /** Filled treatment for high emphasis. @default false */
  solid?: boolean;
  children?: React.ReactNode;
}

/**
 * Runway-light status pill (green=clear, amber=caution, red=stop).
 * @startingPoint section="Components" subtitle="Status & regulator badges" viewport="700x160"
 */
export function StatusBadge(props: StatusBadgeProps): JSX.Element;
