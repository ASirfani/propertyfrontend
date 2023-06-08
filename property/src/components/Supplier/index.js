import { useEffect } from 'react';
import Navigation from './Navigation';
import Sidebar from './Sidebar';
import './index.css';

import { Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate()
  useEffect(() => {

    console.log("READING TOKEN....");
    const tokenString = localStorage.getItem('token');
    if (!tokenString) {
    console.log('TOKEN NOT FOUND.....')
        navigate('/login');
        return;
    }
    console.log("TOKEN IS FOUND")

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

