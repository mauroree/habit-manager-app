import React from 'react';
import axios from 'axios';

const HabitItem = ({ habito, fetchHabitos, editarHabito }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'auth-token': token
      }
    };
    try {
      await axios.delete(`http://localhost:5000/api/habitos/${habito._id}`, config);
      fetchHabitos();
    } catch (error) {
      console.error('Erro ao remover hábito:', error);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>
        <strong>{habito.nome}</strong> - {habito.observacao} ({habito.vezesAoDia} vezes ao dia)
      </span>
      <div>
        <button className="btn btn-sm btn-warning me-2" onClick={() => editarHabito(habito)}>Editar</button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>Excluir</button>
      </div>
    </li>
  );
};

export default HabitItem;
