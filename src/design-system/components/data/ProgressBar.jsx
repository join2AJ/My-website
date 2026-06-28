import React from 'react';

/**
 * Approach-path progress bar — references runway-length markers.
 * Tone follows runway lighting; shows value as an avionics readout.
 */
export function ProgressBar({ value = 0, tone = 'info', label, showValue = true, height = 8, style = {} }) {
  const pct = Math.max(0, Math.min(100, value));
  const tones = {
    info:    'var(--navy-500)',
    clear:   'var(--status-clear)',
    caution: 'var(--status-caution)',
    stop:    'var(--status-stop)',
  };
  const fill = tones[tone] || tones.info;
  return (
    <div style={{ ...style }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          {label && <span className="cb-label">{label}</span>}
          {showValue && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-body)' }}>
              {pct}%
            </span>
          )}
        </div>
      )}
      <div style={{ position: 'relative', height, background: 'var(--cloud-200)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, width: `${pct}%`,
          background: fill, borderRadius: 'var(--radius-pill)',
          transition: 'width var(--dur-slow) var(--ease-cruise)',
        }} />
      </div>
    </div>
  );
}
