import { useEffect } from 'react';
import Navigation from './Navigation';
import Sidebar from './Sidebar';
import './index.css';

import { Outlet, useNavigate } from 'react-router-dom';
import { getToken } from '../../API/token-service/token';

const AdminLayout = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!getToken) {
      navigate('/login');
      return;
    }
  })


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
    </div>
  );
};

export default AdminLayout;

