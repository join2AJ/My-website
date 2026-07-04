Modal dialog for confirmations and focused tasks. Render conditionally on `open`; backdrop click closes. Pass `footer` for actions.

```jsx
<Dialog open={open} onClose={close} title="Flag breach?"
  subtitle="BCAS-AEP-11 will be escalated to the security head."
  footer={<><Button variant="ghost" onClick={close}>Cancel</Button><Button variant="danger">Flag breach</Button></>}>
  This records a breach against Aerodrome Security and notifies the owner.
</Dialog>
```
