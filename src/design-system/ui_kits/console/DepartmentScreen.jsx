/* Departments grid — one instrument card per department. */
const { Card, RegulatorTag, ProgressBar, StatusBadge } = window.CompliantBharatAviationDesignSystem_77e7f4;

function DepartmentScreen() {
  const d = window.CBData;
  return (
    <div className="cb-fade" style={{ padding: 28 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {d.DEPARTMENTS.map(dep => {
          const tone = dep.stop ? 'stop' : dep.caution ? 'caution' : 'clear';
          return (
            <Card key={dep.name} interactive padding="18px">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16, color: 'var(--text-strong)' }}>{dep.name}</div>
                  <div style={{ marginTop: 7 }}><RegulatorTag regulator={dep.regulator} /></div>
                </div>
                <StatusBadge status={tone} dot={false}>{dep.stop ? dep.stop + ' breach' : dep.caution ? dep.caution + ' caution' : 'Clear'}</StatusBadge>
              </div>
              <div style={{ display: 'flex', gap: 18, marginBottom: 14 }}>
                {[['Total', dep.total, 'var(--text-strong)'], ['Clear', dep.clear, 'var(--status-clear)'], ['Caution', dep.caution, 'var(--amber-700)'], ['Breach', dep.stop, 'var(--status-stop)']].map(([l, v, c]) => (
                  <div key={l}><div className="cb-label">{l}</div><div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 19, color: c, marginTop: 3 }}>{v}</div></div>
                ))}
              </div>
              <ProgressBar value={dep.readiness} tone={tone} label="Readiness" />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
window.CBDepartmentScreen = DepartmentScreen;
