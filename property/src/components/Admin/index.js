import Navigation from './Navigation';
import Sidebar from './Sidebar';
import './index.css';

import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  

  return (
    <div className="admin">
      <header>
        <Navigation />
      </header>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Outlet />
      </main>
      <footer>
        <div>
          <p></p>
        </div>
      </footer>

    </div>
  );
};

export default AdminLayout;

