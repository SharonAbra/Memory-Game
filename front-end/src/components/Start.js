import {Link} from 'react-router-dom';

export default function Start() {
    return (
        <>
        <div className="home">
            <h1 className="welcome">Welcome to Memory Game!</h1>
        </div>
        <div className="home">
           <Link to="/mode-choice" className="start"><div className="startButton">START PLAYING</div></Link>
            <div><img src="https://i.ibb.co/YkzRhDb/cards.png" alt="cards" width="200px"></img></div>
        </div>
        </>
    )
}