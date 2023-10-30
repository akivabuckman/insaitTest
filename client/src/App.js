import './App.css';
import TimeBySubject from './charts/TimeBySubject';
import { useEffect, useState, useSyncExternalStore } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



function App() {
  const [conversationData, setConversationData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startMonth, setStartMonth] = useState(1);
  const [endMonth, setEndMonth] = useState(12);

  // fetch all data from server
  const getConversationData = async () => {
    const conversationResonse = await fetch("http://localhost:5000/conversations/getConversations");
    const data = await conversationResonse.json();
    setConversationData(data)
  };

  // call the fetch function upon initial load
  useEffect(() => {
    getConversationData()
  }, []);

  //upon initial load (and data reset), all data is relevant
  useEffect(() => {
    setFilteredData(conversationData)
  }, [conversationData])


  // month filtering
  const handleStartChange = (event) => {
    setStartMonth(event.target.value.toString())
  };

  const handleEndChange = (event) => {
    setEndMonth(event.target.value.toString())
  };

  // reset data, completely reset database
  const resetData = async () => {
    const response = await fetch("http://localhost:5000/conversations/populate", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({"quantity": 100})
    });
    const data = await response.json();
    setConversationData(data)
  };

  return (
    <div className="App">
      <div>
        <button onClick={resetData}>Load New Data</button>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={startMonth}
          label="Start"
          onChange={handleStartChange}
        >
          {
            Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i} value={i + 1}>
                {String(i + 1)}
              </MenuItem>
            ))
          }
        </Select>

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={endMonth}
          label="End"
          onChange={handleEndChange}
        >
          {
            Array.from({ length: 12 }, (_, i) => (
              <MenuItem key={i} value={i + 1}>
                {String(i + 1)}
              </MenuItem>
            ))
          }
        </Select>

        <div className='App'>
            <TimeBySubject 
              conversationData={conversationData}
              filteredData={filteredData}
              startMonth={startMonth}
              endMonth={endMonth}
            />
        </div>
        
      </div>
    </div>
  );
}

export default App;
