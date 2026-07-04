import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** CSS padding. @default "var(--space-7)" */
  padding?: string;
  /** Adds hover lift + pointer. @default false */
  interactive?: boolean;
  children?: React.ReactNode;
}

/** Instrument-panel surface (hairline border, low cool shadow). */
export function Card(props: CardProps): JSX.Element;
