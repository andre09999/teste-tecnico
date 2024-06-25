import React from 'react';
import './TableDesktop.css';

function TableDesktop({ copyemployees }) {

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
        {copyemployees.map(a => ( 
          <tr key={a.id}>
            <td><img src={ a.image } alt='foto' /></td>
            <td><h3>{a.name}</h3></td>
            <td><h3>{a.job}</h3></td>
            <td><h3>{formatDate(a.admission_date)}</h3></td>
            <td><h3>{ formatPhoneNumber( a.phone )}</h3></td>
          </tr>
        ))}
       
      </tbody>
     </table>
  );
}

export default TableDesktop;
