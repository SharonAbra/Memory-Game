import {Link} from 'react-router-dom';

const Start = () => {
    return(
        <div className="home">
            <div className="start"><Link to="/mode-choice" className="startButton">START PLAYING</Link></div>
            <div><img src="https://i.ibb.co/YkzRhDb/cards.png" alt="cards" width="200px"></img></div>
        </div>
    )
}

export default Start;