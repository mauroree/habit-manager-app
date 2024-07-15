import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicationForm = ({ fetchMedications, medicationToEdit, clearEdit }) => {
  const [name, setName] = useState('');
  const [schedule, setSchedule] = useState('');
  const [timesPerDay, setTimesPerDay] = useState('');

  useEffect(() => {
    if (!medicationToEdit) {
      clearForm();
    } else {
      setName(medicationToEdit.nome);
      setSchedule(medicationToEdit.horario);
      setTimesPerDay(medicationToEdit.vezesAoDia);
    }
  }, [medicationToEdit]);

  const clearForm = () => {
    setName('');
    setSchedule('');
    setTimesPerDay('');
  };

  const handleCreateOrUpdateMedication = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'auth-token': token
        }
      };
      if (medicationToEdit) {
        await axios.put(`http://localhost:5000/api/medicamentos/${medicationToEdit._id}`, {
          nome: name,
          horario: schedule,
          vezesAoDia: timesPerDay
        }, config);
      } else {
        await axios.post('http://localhost:5000/api/medicamentos', {
          nome: name,
          horario: schedule,
          vezesAoDia: timesPerDay
        }, config);
      }
      fetchMedications();
      clearEdit();
    } catch (error) {
      console.error('Erro ao salvar medicamento:', error);
    }
  };

  return (
    <div className="mt-3">
      <h3>{medicationToEdit ? 'Editar Medicamento' : 'Novo Medicamento'}</h3>
      <form onSubmit={handleCreateOrUpdateMedication}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="schedule" className="form-label">Horário</label>
          <input type="text" className="form-control" id="schedule" value={schedule} onChange={(e) => setSchedule(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="timesPerDay" className="form-label">Vezes ao Dia</label>
          <input type="text" className="form-control" id="timesPerDay" value={timesPerDay} onChange={(e) => setTimesPerDay(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">{medicationToEdit ? 'Atualizar' : 'Criar'}</button>
      </form>
    </div>
  );
};

export default MedicationForm;
