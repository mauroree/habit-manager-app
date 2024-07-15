import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    // Lógica para limpar o token do localStorage ou deslogar o usuário
    localStorage.removeItem('token');
    // Outras ações necessárias após o logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/habits">Meus Hábitos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/medications">Meus Medicamentos</Link>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Registrar</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-light" onClick={handleLogout}>Sair</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
