import './App.css';
import TimeBySubject from './components/charts/TimeBySubject';
import { useEffect, useState } from 'react';
import SubjectByMonth from './components/charts/SubjectByMonth';
import LengthBySubject from './components/charts/LengthBySubject';
import ConversationsByGender from './components/charts/ConversationsByGender';
import Wordiness from './components/charts/Wordiness';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/other/Navbar';
import Dashboard from './components/other/Dashboard';
import ErrorBoundary from './components/other/ErrorBoundary';


function App() {
  const [conversationData, setConversationData] = useState([]);
  const [startMonth, setStartMonth] = useState(1);
  const [endMonth, setEndMonth] = useState(12);

  // fetch all data from server
  const getConversationData = async () => {
    const conversationResonse = await fetch(`https://insait.onrender.com/conversations/getConversations`);
    const data = await conversationResonse.json();
    setConversationData(data)
  };

  // call the fetch function upon initial load
  useEffect(() => {
    getConversationData()
  }, []);


  return (
    <div className="App">
      <Navbar 
        setConversationData={setConversationData}
        setStartMonth={setStartMonth}
        setEndMonth={setEndMonth}
        startMonth={startMonth}
        endMonth={endMonth}
      />
      <div className='container'>
        <ErrorBoundary>
        <Routes>
          <Route path="/conversationsByGender" element={<ConversationsByGender 
                                            conversationData={conversationData}
                                            startMonth={startMonth}
                                            endMonth={endMonth}/>} />
          <Route path="/lengthBySubject" element={<LengthBySubject 
                                            conversationData={conversationData}
                                            startMonth={startMonth}
                                            endMonth={endMonth}/>} />
          <Route path="/subjectByMonth" element={<SubjectByMonth 
                                            conversationData={conversationData}
                                            startMonth={startMonth}
                                            endMonth={endMonth}/>} />
          <Route path="/timeBySubject" element={<TimeBySubject 
                                            conversationData={conversationData}
                                            startMonth={startMonth}
                                            endMonth={endMonth}/>} />
          <Route path="/wordiness" element={<Wordiness 
                                            conversationData={conversationData}
                                            startMonth={startMonth}
                                            endMonth={endMonth}/>} />
          <Route path="/dashboard" element={<Dashboard 
                                            conversationData={conversationData}
                                            startMonth={startMonth}
                                            endMonth={endMonth}/>} />
          <Route path="/" element={<Dashboard 
                                    conversationData={conversationData}
                                    startMonth={startMonth}
                                    endMonth={endMonth}/>} />

        </Routes>
        </ErrorBoundary>

        </div>


    </div>
  );
}

export default App;
