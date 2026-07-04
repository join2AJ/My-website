import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: React.ReactNode;
  /** Mono font for codes/IDs. @default false */
  mono?: boolean;
}

/**
 * Instrument-panel text input.
 * @startingPoint section="Components" subtitle="Inputs, selects & switches" viewport="700x260"
 */
export function Input(props: InputProps): JSX.Element;
