import { useState } from 'react';
import './App.css';
import Chart from './components/Chart';
import Header from './components/Header';

function App() {
  const [country, setCountry] = useState("turkey");


  return (
    <div className='container'>
      <Header
        country={country}
        setCountry={setCountry}

      />
      <Chart
        country={country}
      />
    </div>
  );
}

export default App;
