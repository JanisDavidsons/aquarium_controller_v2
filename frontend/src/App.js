import React, { useState } from 'react'
import services from './services'
import './App.css';
import logo from './logo.svg';

function App() {

  const [values, setValues] = useState({ entity: '', data: [], newEntity: '' })
  const [isCeateModalVisible, setCreateModalVisible] = useState( false )
  const [isLoading, setLoading] = useState( false )
  const [isSaving, setSaving] = useState( false )

  async function handleSubmit( e ) {
    e.preventDefault()

    setLoading(true)
    const entities = await services.searchEntities( values.entity )
    setLoading(false)

    console.log(entities);
  } 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This will be aquarium controller app v2.
        </p>
        <p>
        This is complete rebuild from previous version
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button type="submit" onClick={ e => handleSubmit(e) } className="btn btn-primary">Submit</button>
    </div>
  );
}

export default App;
