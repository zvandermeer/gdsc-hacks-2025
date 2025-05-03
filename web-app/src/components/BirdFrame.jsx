import BirdHappy from './birdcomponents/BirdHappy'
import BirdNormal from './birdcomponents/BirdNormal'
import BirdSad from './birdcomponents/BirdSad'

const BirdFrame = ({birdState}) =>{
    let displayState = birdState;

    if(!(displayState=='happy' || displayState=='sad' || displayState=='normal')){
        displayState='normal'
    }

    return (
    <div style={{position:'absolute', top:170,left:100}}>
        {displayState === 'happy' && <BirdHappy/>}
        {displayState === 'sad' && <BirdSad/>}
        {displayState === 'normal' && <BirdNormal/>}
    </div>
);
};

export default BirdFrame;