import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitForm from './HabitForm';
import HabitItem from './HabitItem';

const Habits = () => {
  const [habitos, setHabitos] = useState([]);
  const [habitoParaEditar, setHabitoParaEditar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    fetchHabitos();
  }, []);

  const fetchHabitos = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'auth-token': token
      }
    };
    try {
      const response = await axios.get('http://localhost:5000/api/habitos', config);
      setHabitos(response.data);
    } catch (error) {
      console.error('Erro ao buscar hábitos:', error);
    }
  };

  const editarHabito = (habito) => {
    setHabitoParaEditar(habito);
  };

  const limparEdicao = () => {
    setHabitoParaEditar(null);
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
    if (habitoParaEditar) {
      limparEdicao();
    }
  };

  return (
    <div className="container mt-5">
      <h2>Meus Hábitos</h2>
      <ul className="list-group">
        {habitos.map(habito => (
          <HabitItem key={habito._id} habito={habito} fetchHabitos={fetchHabitos} editarHabito={editarHabito} />
        ))}
      </ul>
      {mostrarFormulario && <HabitForm fetchHabitos={fetchHabitos} habitoParaEditar={habitoParaEditar} limparEdicao={limparEdicao} />}
      <button className="btn btn-primary mt-3" onClick={toggleFormulario}>
        {habitoParaEditar ? 'Cancelar Edição' : 'Novo Hábito'}
      </button>
    </div>
  );
};

export default Habits;
