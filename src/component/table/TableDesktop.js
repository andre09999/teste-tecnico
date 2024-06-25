import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TableDesktop.css';

function TableDesktop() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, ''); 
    const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,5})(\d{0,4})$/)
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return phoneNumberString; 
  };

  return (
    <table>
       <thead>
            <th><h2>Foto</h2></th>
            <th><h2>Nome</h2></th>
            <th><h2>Cargo</h2></th>
            <th><h2>Data de Admissão</h2></th>
            <th><h2>Telefone</h2></th>
      </thead>
      <tbody>
        {employees.map(a => ( 
          <tr key={a.id}>
            <td><img src={ a.image } alt='foto' /></td>
            <td>{a.name}</td>
            <td>{a.job}</td>
            <td>{formatDate(a.admission_date)}</td>
            <td>{ formatPhoneNumber( a.phone )}</td>
          </tr>
        ))}
       
      </tbody>
     </table>
  );
}

export default TableDesktop;
