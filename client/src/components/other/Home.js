import { Link } from 'react-router-dom';
import cbg from "../../images/cbg.jpg";
import lbs from "../../images/lbs.jpg";
import sbm from "../../images/sbm.jpg";
import tbs from "../../images/tbs.jpg";
import w from "../../images/w.jpg";

const Home = (props) => {
    return (
        <div className="homeDiv">
            <div className="smallChart">
                <Link className="reactLink" to="/conversationsByGender">
                    <h3>Conversations By Gender</h3>
                    <img src={cbg} alt="cbg" />
                </Link>   
            </div>

            <div className="smallChart">
                <Link className="reactLink" to="/lengthBySubject">
                <h3>Length By Subject</h3>
                    <img src={lbs} alt="lbs" />
                </Link>   
            </div>

            <div className="smallChart">
                <Link className="reactLink" to="/subjectByMonth">
                    <h3>Subject By Month</h3>
                    <img src={sbm} alt="sbm" />
                </Link>   
            </div>

            <div className="smallChart">
                <Link className="reactLink" to="/timeBySubject">
                    <h3>Time By Subject</h3>
                    <img src={tbs} alt="tbs" />
                </Link>   
            </div>

            <div className="smallChart">
                <Link className="reactLink" to="/wordiness">
                    <h3>Wordinesss</h3>
                    <img src={w} alt="w" />
                </Link>   
            </div>

            

            
        </div>
    )
}

export default Home;