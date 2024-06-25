import React, { useState, useEffect } from 'react';
import './TablePhone.css';
import arrow from "../../image/charm_chevron-down.png"
import arrowoff from "../../image/Vector.png"
import elipse from "../../image/Ellipse 1.png"

function TablePhone({ copyemployees }) {

  const [expandedRows, setExpandedRows] = useState({});
  const [hid, setHid] = useState()

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  useEffect(() => {setHid('off')},[])
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
        {copyemployees.map(a => ( 
          <div key={a.id}>
          <tr  className='trCell'>
            
            <td className='tdCell'><img src={ a.image } alt='foto'  /></td>
            <td className='tdCell'><h3>{a.name}</h3></td>
            <td className='tdCell'>
              <button onClick={() => toggleVisibility(a.id)}>
                <img src={arrowImage} alt='arrow' className='arrow'/>
              </button>
            </td>
          </tr>
            <div className={expandedRows[a.id] ? 'on' : 'off' }>
            <td className='detail'><h2>Cargo</h2><h3 className='custom'>{a.job}</h3></td>
            <td  className='detail'><h2>Data de Admissão</h2> <h3 className='custom'>{formatDate(a.admission_date)} </h3></td>
            <td  className='detail'><h2>Telefone</h2> <h3 className='custom'>{ formatPhoneNumber( a.phone )} </h3> </td>
            </div>
            
          </div>
        ))}
       
      </tbody>
     </table>
  );
}

export default TablePhone;
