import './App.css';
import TimeBySubject from './components/charts/TimeBySubject';
import { useEffect, useState, useSyncExternalStore } from 'react';
import SubjectByMonth from './components/charts/SubjectByMonth';
import LengthBySubject from './components/charts/LengthBySubject';
import ConversationsByGender from './components/charts/ConversationsByGender';
import Wordiness from './components/charts/Wordiness';
import { Routes, Link, Route, Router, Switch } from "react-router-dom";
import Months from './components/other/Months';
import Home from './components/other/Home';



function App() {
  const [conversationData, setConversationData] = useState([]);
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


  return (
    <div className="App">
      <Months 
        setConversationData={setConversationData}
        setStartMonth={setStartMonth}
        setEndMonth={setEndMonth}
        startMonth={startMonth}
        endMonth={endMonth}
      />

        <Routes>
          <Route path="/ConversationsByGender" element={<ConversationsByGender 
                                            conversationData={conversationData}
                                            startMonth={startMonth}
                                            endMonth={endMonth}/>} />
          <Route path="/LengthBySubject" element={<LengthBySubject 
                                            conversationData={conversationData}
                                            startMonth={startMonth}
                                            endMonth={endMonth}/>} />
          <Route path="/SubjectByMonth" element={<SubjectByMonth 
                                            conversationData={conversationData}
                                            startMonth={startMonth}
                                            endMonth={endMonth}/>} />
          <Route path="/TimeBySubject" element={<TimeBySubject 
                                            conversationData={conversationData}
                                            startMonth={startMonth}
                                            endMonth={endMonth}/>} />
          <Route path="/Wordiness" element={<Wordiness 
                                            conversationData={conversationData}
                                            startMonth={startMonth}
                                            endMonth={endMonth}/>} />
          <Route path="/" element={<Home 
                                    conversationData={conversationData}
                                    startMonth={startMonth}
                                    endMonth={endMonth}/>} />

        </Routes>

        

            {/* <TimeBySubject 
              conversationData={conversationData}
              startMonth={startMonth}
              endMonth={endMonth}
            />
            <SubjectByMonth 
              conversationData={conversationData}
              startMonth={startMonth}
              endMonth={endMonth}
            />

            <LengthBySubject 
              conversationData={conversationData}
              startMonth={startMonth}
              endMonth={endMonth}
            />
            <ConversationsByGender
              conversationData={conversationData}
              startMonth={startMonth}
              endMonth={endMonth}
            /> */}

            {/* <Wordiness
              conversationData={conversationData}
              startMonth={startMonth}
              endMonth={endMonth}
            /> */}

    </div>
  );
}

export default App;
