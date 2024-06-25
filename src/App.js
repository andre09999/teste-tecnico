import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./component/header/header";
import './app.css'
import TableDesktop from "./component/table/TableDesktop";
import TablePhone from "./component/table/TablePhone";
import Search from './component/search/Search';

function App() {
  const [isGreaterThan375, setIsGreaterThan375] = useState(window.innerWidth > 375);
  const [copyemployees, setCopyEmployees] = useState([]);
  useEffect(() => {
    const handleResize = () => {
      setIsGreaterThan375(window.innerWidth > 375);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/employees')
      .then(response => { setEmployees(response.data); setCopyEmployees(response.data)})
    .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);
  
 
  const fill = (value) => {
    console.log(value);
    setCopyEmployees(employees.filter(employee => {
      return (
        employee.name.toLowerCase().includes(value.toLowerCase()) ||
        employee.job.toLowerCase().includes(value.toLowerCase()) ||
        employee.phone.toLowerCase().includes(value.toLowerCase())
      );
    }))
}
  return (
    <div className="App">
      <Header />
      <div className='position'>
        <h4>Funcionários</h4>
        <Search setFilter={ fill } />
      </div>
        {isGreaterThan375 ? <TableDesktop copyemployees={copyemployees} /> : <TablePhone copyemployees={copyemployees}/>}
    </div>
  );
}

export default App;
