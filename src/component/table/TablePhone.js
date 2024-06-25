import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TablePhone.css';
import arrow from "../../image/charm_chevron-down.png"
import arrowoff from "../../image/Vector.png"
import elipse from "../../image/Ellipse 1.png"

function TablePhone() {
  const [employees, setEmployees] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  const [hid, setHid] = useState('off')
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

  const toggleVisibility = (id) => {

    setExpandedRows(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };
  const arrowImage = hid === 'on' ? arrowoff : arrow;


  return (
    <table className='tableCell'>
       <thead className='headsCell'>
            <th className='headCell'><h2 className='headCell'>Foto</h2></th>
            <th className='headCell'><h2>Nome</h2></th>
        <th className='headCell'><img src={ elipse } alt='complemento' className='circle' /></th>
      </thead>
      <tbody>
        {employees.map(a => ( 
          <div key={a.id}>
          <tr  className='trCell'>
            
            <td className='tdCell'><img src={ a.image } alt='foto'  /></td>
            <td className='tdCell'>{a.name}</td>
            <td className='tdCell'>
              <button onClick={() => toggleVisibility(a.id)}>
                <img src={arrowImage} alt='arrow' className='arrow'/>
              </button>
            </td>
          </tr>
            <div className={expandedRows[a.id] ? 'on' : 'off' }>
            <td className='detail'><h2>Cargo</h2><h3>{a.job}</h3></td>
            <td  className='detail'><h2>Data de Admissão</h2> <h3>{formatDate(a.admission_date)} </h3></td>
            <td  className='detail'><h2>Telefone</h2> <h3>{ formatPhoneNumber( a.phone )} </h3> </td>
            </div>
            
          </div>
        ))}
       
      </tbody>
     </table>
  );
}

export default TablePhone;
