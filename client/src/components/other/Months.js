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
    }



    return (
        <div className="monthsDiv">
            <Button onClick={goHome} size="medium" variant="contained" color="success" style={{ marginLeft: '20px' }}>Home</Button>
            <Button onClick={resetData} variant="outlined" style={{ marginLeft: '20px' }}>Regenerate Data</Button>
            <p>Start Month:</p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.startMonth}
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

            <p>End Month:</p>
    
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.endMonth}
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
        </div>
    )
}

export default Months;