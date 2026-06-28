import React from 'react';
import type { RegulatorCode } from '../badges/RegulatorTag';

export interface FlightStripProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Obligation code, e.g. "BCAS-AEP-11". */
  code: string;
  /** Obligation title. */
  title: string;
  /** Owning regulator (sets livery rule). @default "DGCA" */
  regulator?: RegulatorCode;
  /** Compliance state. @default "clear" */
  status?: 'clear' | 'caution' | 'stop' | 'info';
  /** Due readout, e.g. "DUE 14D". */
  due?: string;
  /** Owning department. */
  department?: string;
  /** Expanded detail body (enables expand/collapse). */
  detail?: React.ReactNode;
  defaultExpanded?: boolean;
}

/**
 * Signature compliance "flight strip" — compact, scannable, expandable.
 * @startingPoint section="Components" subtitle="Compliance flight strips" viewport="760x300"
 */
export function FlightStrip(props: FlightStripProps): JSX.Element;
