import React from 'react';

export interface CommLine {
  text: string;
  time?: string;
  /** Color tone of the line. */
  tone?: 'clear' | 'caution' | 'stop' | 'dim';
}

export interface CommBoxProps {
  /** Header label. @default "ATC · DATALINK" */
  title?: string;
  /** Log lines (string or {text,time,tone}). */
  lines?: Array<string | CommLine>;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * ATC comm box — dark cockpit night-mode display for logs / audit trails.
 * @startingPoint section="Components" subtitle="ATC datalink comm box" viewport="700x240"
 */
export function CommBox(props: CommBoxProps): JSX.Element;
