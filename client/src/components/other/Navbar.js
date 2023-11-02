import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 


const Navbar = (props) => {
    const navigate = useNavigate();

      // reset data, completely reset database
    const resetData = async () => {
        const conversationCount = 100;
        const response = await fetch(`https://insait.onrender.com/conversations/populate`, {
          method: "POST",
          headers: {"content-type": "application/json"},
          body: JSON.stringify({"quantity": conversationCount})
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
    };


    return (
        <div className="navbarDiv">
            <Button onClick={goHome} size="medium" variant="contained" style={{ marginLeft: '20px' }}>Home</Button>
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
                  <MenuItem key={i} value={i + 1} disabled={i + 1 > props.endMonth}>
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
                  <MenuItem key={i} value={i + 1} disabled={i + 1 < props.startMonth}>
                    {String(i + 1)}
                  </MenuItem>
                ))
              }
            </Select>
            <Button onClick={resetMonths} variant="outlined" style={{ marginLeft: '20px', backgroundColor: "white", border: "2px solid rgb(32,116,212)" }}>RESET MONTHS</Button>
            <Button onClick={resetData} variant="outlined" color="warning" style={{ marginLeft: '20px', backgroundColor: "white", border: "2px solid #ec740c" }}>Regenerate Data</Button>

        </div>
    )
}

export default Navbar;