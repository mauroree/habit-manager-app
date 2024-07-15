import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MedicationForm from './MedicationForm';
import MedicationItem from './MedicationItem';

const Medications = () => {
  const [medications, setMedications] = useState([]);
  const [medicationToEdit, setMedicationToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'auth-token': token
      }
    };
    try {
      const response = await axios.get('http://localhost:5000/api/medicamentos', config); // Verifique a rota 'medicamentos' ou 'medications'
      setMedications(response.data);
    } catch (error) {
      console.error('Erro ao buscar medicamentos:', error);
    }
  };

  const editMedication = (medication) => {
    setMedicationToEdit(medication);
    setShowForm(true); // Mostra o formulário ao editar um medicamento
  };

  const clearEdit = () => {
    setMedicationToEdit(null);
    setShowForm(false); // Oculta o formulário ao limpar a edição
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (medicationToEdit) {
      clearEdit(); // Limpa a edição se o formulário estiver aberto durante a edição
    }
  };

  return (
    <div className="container mt-5">
      <h2>Meus Medicamentos</h2>
      <ul className="list-group">
        {medications.map(medication => (
          <MedicationItem key={medication._id} medication={medication} fetchMedications={fetchMedications} editMedication={editMedication} />
        ))}
      </ul>
      {showForm && <MedicationForm fetchMedications={fetchMedications} medicationToEdit={medicationToEdit} clearEdit={clearEdit} />}
      <button className="btn btn-primary mt-3" onClick={toggleForm}>
        {medicationToEdit ? 'Cancelar Edição' : 'Novo Medicamento'}
      </button>
    </div>
  );
};

export default Medications;
