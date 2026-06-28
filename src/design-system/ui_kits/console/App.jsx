/* App shell — login → console with sidebar + screen router. */
function CBApp() {
  const [authed, setAuthed] = React.useState(false);
  const [screen, setScreen] = React.useState('dashboard');

  if (!authed) return <window.CBLoginScreen onEnter={() => setAuthed(true)} />;

  const titles = {
    dashboard: ['Flight deck', 'Indira Gandhi Intl · DEL · live'],
    obligations: ['Obligations register', '418 obligations · 7 regulators'],
    departments: ['Departments', '21 departments tracked'],
  };
  const [title, subtitle] = titles[screen];
  const Screen = { dashboard: window.CBDashboardScreen, obligations: window.CBObligationsScreen, departments: window.CBDepartmentScreen }[screen];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <window.CBSidebar screen={screen} go={setScreen} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <window.CBTopbar title={title} subtitle={subtitle} />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Screen go={setScreen} />
        </div>
      </div>
    </div>
  );
}
window.CBApp = CBApp;
