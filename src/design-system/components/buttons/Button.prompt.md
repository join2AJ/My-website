Action control — use for any user-triggered action; `primary` for the single main action per view, `danger` for destructive/stop actions, `dark` on light surfaces inside cockpit chrome.

```jsx
<Button variant="primary" size="md">Run compliance scan</Button>
<Button variant="secondary" iconLeft={<PlusIcon/>}>Add obligation</Button>
<Button variant="danger" size="sm">Flag breach</Button>
```

Variants: `primary` (navy), `secondary` (outline), `ghost`, `danger` (red), `dark`. Sizes `sm|md|lg`. `pill` for fuselage shape, `block` for full-width.
