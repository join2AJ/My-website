import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  tone?: 'neutral' | 'blue' | 'dark';
  /** Use mono font for codes/IDs. @default false */
  mono?: boolean;
  children?: React.ReactNode;
}

/** Generic metadata pill (fuselage cross-section). */
export function Tag(props: TagProps): JSX.Element;
