import { NavLink, Outlet } from 'react-router';

export function AppLayout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Orbit CRM</h2>

        <nav className="sidebar-nav">
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
         </aside>
        <main className="page-content">
           <Outlet /> 
        </main>
     
      
    </div>
  );
}
