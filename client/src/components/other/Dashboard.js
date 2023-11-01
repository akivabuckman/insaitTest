import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import SubjectByMonth from '../../components/charts/SubjectByMonth';
import LengthBySubject from '../../components/charts/LengthBySubject';
import ConversationsByGender from '../../components/charts/ConversationsByGender';
import Wordiness from '../../components/charts/Wordiness';
import TimeBySubject from '../../components/charts/TimeBySubject';
import ErrorBoundary from './ErrorBoundary';

const Dashboard = (props) => {
    const navigate = useNavigate();
    return (
        <div className='dashboardDiv'>
            <ErrorBoundary>
                <div className='smallChart'>
                    <ConversationsByGender 
                        conversationData={props.conversationData}
                        startMonth={props.startMonth}
                        endMonth={props.endMonth}
                        size={"small"}/>
                    <Button variant="outlined" onClick={() => navigate("/conversationsByGender")}>Enlarge</Button>
                </div>
            </ErrorBoundary>
            
            <ErrorBoundary>
                <div className='smallChart'>
                        <SubjectByMonth 
                            conversationData={props.conversationData}
                            startMonth={props.startMonth}
                            endMonth={props.endMonth}
                            size={"small"}/>
                        <Button variant="outlined" onClick={()=>navigate("/subjectByMonth")}>Enlarge</Button>
                </div>
            </ErrorBoundary>
            
            <ErrorBoundary>
                <div className='smallChart'>
                        <LengthBySubject 
                            conversationData={props.conversationData}
                            startMonth={props.startMonth}
                            endMonth={props.endMonth}
                            size={"small"}/>
                        <Button variant="outlined" onClick={()=>navigate("/lengthBySubject")}>Enlarge</Button>
                </div>
            </ErrorBoundary>
            
            <ErrorBoundary>
                <div className='smallChart'>
                        <Wordiness 
                            conversationData={props.conversationData}
                            startMonth={props.startMonth}
                            endMonth={props.endMonth}
                            size={"small"}/>
                        <Button variant="outlined" onClick={()=>navigate("/wordiness")}>Enlarge</Button>
                </div>
            </ErrorBoundary>
            
            <ErrorBoundary>
                <div className='smallChart'>
                        <TimeBySubject 
                            conversationData={props.conversationData}
                            startMonth={props.startMonth}
                            endMonth={props.endMonth}
                            size={"small"}/>
                        <Button variant="outlined" onClick={()=>navigate("/timeBySubject")}>Enlarge</Button>
                </div>
            </ErrorBoundary>
            <div className='smallChartEmpty'></div>
        </div>
        
    )
};

export default Dashboard;