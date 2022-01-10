import './App.css'
import { useState } from "react";
import MultiSelector from './components/MultiSelector';
import ActiveFilters from "./components/ActiveFilters";
import { AllBreeds } from './context/DataContext';
import DataContext from './context/DataContext';
import { useContext } from "react";


function App() {

  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <DataContext.Provider value={{}}>
      <AllBreeds>
        <div className='App'>
          <div className='container-fluid'>
            <div className='row max-size'>
              <div className='col-2 menu '>
                <div className='container-fluid'>
                  <b>Filtros Activos</b>
                  <ActiveFilters />
                  <hr />
                  <MultiSelector />
                </div>
              </div>
              <div className='col-10'>
                <span>chao</span>
              </div>
            </div>
          </div>
        </div>
      </AllBreeds>
    </DataContext.Provider>
  );
}

export default App
