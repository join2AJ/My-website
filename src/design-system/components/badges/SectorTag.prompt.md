Sector livery tag — identifies which of the 11 CompliantBharat verticals an obligation, regulator, or screen belongs to. Each sector owns a fixed hue (aviation=blue, finance=emerald, healthcare=teal, manufacturing=ember, food=harvest green, IT=violet, energy=amber, education=indigo, universal=slate).

```jsx
<SectorTag sector="finance" />
<SectorTag sector="aviation" variant="solid" icon={<PlaneIcon/>} />
<SectorTag sector="universal" variant="outline" />
```

`SECTORS` exports the full map (label, color, soft, regulators[]) for building sector grids.
