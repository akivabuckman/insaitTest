import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'; 


const Months = (props) => {
    const navigate = useNavigate();

      // reset data, completely reset database
    const resetData = async () => {
        const response = await fetch("http://localhost:5000/conversations/populate", {
          method: "POST",
          headers: {"content-type": "application/json"},
          body: JSON.stringify({"quantity": 100})
        });
        const data = await response.json();
        props.setConversationData(data)
    };

    // month filtering
    const handleStartChange = (event) => {
        props.setStartMonth(event.target.value.toString())
    };

    const handleEndChange = (event) => {
        props.setEndMonth(event.target.value.toString())
    };

    const goHome = () => {
      navigate("/")
    };

    const resetMonths = () => {
      props.setStartMonth(1);
      props.setEndMonth(12)
    }



    return (
        <div className="monthsDiv">
            <Button onClick={goHome} size="medium" variant="contained" style={{ marginLeft: '20px' }}>Home</Button>
            <Button onClick={resetData} variant="outlined" color="warning" style={{ marginLeft: '20px', backgroundColor: "white", border: "2px solid #ec740c" }}>Regenerate Data</Button>
            <p>Start Month:</p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.startMonth}
              label="Start"
              onChange={handleStartChange}
              style={{backgroundColor: "white",}}
            >
              {
                Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1)}
                  </MenuItem>
                ))
              }
            </Select>

            <p>End Month:</p>
    
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.endMonth}
              label="End"
              onChange={handleEndChange}
              style={{backgroundColor: "white",}}
            >
              {
                Array.from({ length: 12 }, (_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {String(i + 1)}
                  </MenuItem>
                ))
              }
            </Select>
            <Button onClick={resetMonths} variant="outlined" style={{ marginLeft: '20px', backgroundColor: "white", border: "2px solid rgb(32,116,212)" }}>RESET MONTHS</Button>

        </div>
    )
}

export default Months;