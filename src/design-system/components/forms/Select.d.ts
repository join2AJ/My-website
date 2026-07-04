import React from 'react';

export interface SelectOption { value: string; label: string; }

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  options?: Array<string | SelectOption>;
}

/** Select control matching Input styling. */
export function Select(props: SelectProps): JSX.Element;
