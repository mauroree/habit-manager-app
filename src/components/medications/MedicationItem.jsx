import React from 'react';
import axios from 'axios';

const MedicationItem = ({ medication, fetchMedications, editMedication }) => {
  const handleDeleteMedication = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'auth-token': token
        }
      };
      await axios.delete(`http://localhost:5000/api/medicamentos/${id}`, config);
      fetchMedications();
    } catch (error) {
      console.error('Erro ao remover medicamento:', error);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {medication.nome} - Horário: {medication.horario} - Vezes ao dia: {medication.vezesAoDia}
      <div>
        <button className="btn btn-primary mx-2" onClick={() => editMedication(medication)}>Editar</button>
        <button className="btn btn-danger" onClick={() => handleDeleteMedication(medication._id)}>Remover</button>
      </div>
    </li>
  );
};

export default MedicationItem;
