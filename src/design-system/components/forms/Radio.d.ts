import React from 'react';

export interface RadioOption { value: string; label: string; }

export interface RadioProps {
  options?: Array<string | RadioOption>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

/** Radio group — single select. */
export function Radio(props: RadioProps): JSX.Element;
