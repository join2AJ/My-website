Dark cockpit night-mode panel for audit trails, system logs, datalink-style messages. Monospace. Lines can be tone-colored.

```jsx
<CommBox title="AUDIT · TRAIL" lines={[
  { time: '0941Z', text: 'AEP register synced', tone: 'clear' },
  { time: '1102Z', text: 'CERT-In advisory CIAD-2026-04 ingested', tone: 'caution' },
]} />
```
