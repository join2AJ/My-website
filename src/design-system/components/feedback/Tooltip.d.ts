import React from 'react';

export interface TooltipProps {
  /** Tooltip text. */
  label: React.ReactNode;
  /** @default "top" */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Hover tooltip — dark cockpit chip. */
export function Tooltip(props: TooltipProps): JSX.Element;
