import React, { useState, useEffect } from 'react';
import Header from "./component/header/header";
import './app.css'
import TableDesktop from "./component/table/TableDesktop";
import TablePhone from "./component/table/TablePhone";
function App() {
  const [isGreaterThan375, setIsGreaterThan375] = useState(window.innerWidth > 375);
  useEffect(() => {
    const handleResize = () => {
      setIsGreaterThan375(window.innerWidth > 375);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="App">
      <Header />
      <div>
        <h4>Funcionários</h4>
        {isGreaterThan375 ? <TableDesktop /> : <TablePhone />}

      </div>
    </div>
  );
}

export default App;
