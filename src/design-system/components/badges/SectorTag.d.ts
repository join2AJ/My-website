import React from 'react';

export type SectorKey =
  | 'aviation' | 'finance' | 'healthcare' | 'manufacturing'
  | 'food' | 'it' | 'energy' | 'education' | 'universal';

export interface SectorTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Which sector vertical. @default "aviation" */
  sector?: SectorKey;
  /** @default "soft" */
  variant?: 'soft' | 'solid' | 'outline';
  /** Optional leading sector glyph (replaces the dot). */
  icon?: React.ReactNode;
}

/**
 * Sector livery tag — one of 11 CompliantBharat verticals; fixed hue per sector.
 * @startingPoint section="Components" subtitle="Sector & regulator tags" viewport="700x160"
 */
export function SectorTag(props: SectorTagProps): JSX.Element;

export const SECTORS: Record<SectorKey, {
  label: string; color: string; soft: string; regulators: string[];
}>;
