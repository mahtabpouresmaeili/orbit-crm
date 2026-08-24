import { NavLink, Outlet } from 'react-router';

export function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">O</span>
          <span>Orbit<span className="brand-muted">/CRM</span></span>
        </div>
        <p className="workspace-label">North America desk</p>

        <nav className="sidebar-nav" aria-label="Primary navigation">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link--active' : 'nav-link'
            }
          >
            Dashboard
          </NavLink>
          <NavLink 
          to="/contacts"
          className={({ isActive }) =>
              isActive ? 'nav-link nav-link--active' : 'nav-link'
            }
          >
          Contacts
          </NavLink>
        </nav>
        <div className="sidebar-footer">A calmer way to know your customers.</div>
         </aside>
        <main className="page-content">
           <Outlet /> 
        </main>
     
      
    </div>
  );
}
