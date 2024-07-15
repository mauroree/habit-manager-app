import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HabitForm = ({ fetchHabitos, habitoParaEditar, limparEdicao }) => {
  const [nome, setNome] = useState('');
  const [observacao, setObservacao] = useState('');
  const [vezesAoDia, setVezesAoDia] = useState(1);

  useEffect(() => {
    if (habitoParaEditar) {
      setNome(habitoParaEditar.nome);
      setObservacao(habitoParaEditar.observacao);
      setVezesAoDia(habitoParaEditar.vezesAoDia);
    }
  }, [habitoParaEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'auth-token': token
      }
    };
    try {
      if (habitoParaEditar) {
        await axios.put(`http://localhost:5000/api/habitos/${habitoParaEditar._id}`, {
          nome,
          observacao,
          vezesAoDia
        }, config);
        limparEdicao();
      } else {
        await axios.post('http://localhost:5000/api/habitos', {
          nome,
          observacao,
          vezesAoDia
        }, config);
      }
      setNome('');
      setObservacao('');
      setVezesAoDia(1);
      fetchHabitos();
    } catch (error) {
      console.error('Erro ao salvar hábito:', error);
    }
  };

  return (
    <div className="container">
      <h2>{habitoParaEditar ? 'Editar Hábito' : 'Novo Hábito'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="observacao" className="form-label">Observação</label>
          <input type="text" className="form-control" id="observacao" value={observacao} onChange={(e) => setObservacao(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="vezesAoDia" className="form-label">Vezes ao Dia</label>
          <input type="number" className="form-control" id="vezesAoDia" value={vezesAoDia} onChange={(e) => setVezesAoDia(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">{habitoParaEditar ? 'Atualizar' : 'Salvar'}</button>
      </form>
    </div>
  );
};

export default HabitForm;
