import React from 'react';

export interface ProgressBarProps {
  /** 0–100. */
  value?: number;
  /** Runway-light tone. @default "info" */
  tone?: 'info' | 'clear' | 'caution' | 'stop';
  label?: string;
  /** Show % readout. @default true */
  showValue?: boolean;
  height?: number;
  style?: React.CSSProperties;
}

/** Approach-path progress bar with avionics readout. */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
