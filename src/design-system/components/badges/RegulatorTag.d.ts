import React from 'react';

export type RegulatorCode = 'BCAS' | 'DGCA' | 'AAI' | 'AERA' | 'MoEF' | 'EPFO' | 'CERT-In';

export interface RegulatorTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Which regulatory authority. @default "DGCA" */
  regulator?: RegulatorCode;
  /** @default "soft" */
  variant?: 'soft' | 'solid' | 'outline';
}

/** Regulator livery tag — each authority owns one fixed hue. */
export function RegulatorTag(props: RegulatorTagProps): JSX.Element;
export const REGULATORS: Record<RegulatorCode, { color: string; soft: string; name: string }>;
