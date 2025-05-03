import BirdHappy from './birdcomponents/BirdHappy'
import BirdNormal from './birdcomponents/BirdNormal'
import BirdSad from './birdcomponents/BirdSad'

const BirdFrame = ({birdState}) =>{

    if(!(birdState=='happy' || birdState=='happy' || birdState=='normal')){
        birdState='normal'
    }

    return (
    <>
    <div style={{position:'absolute', top:225,left:100}}>
        {birdState=='happy' ? (<BirdHappy/>) : (<BirdNormal/>)}
    </div>

    </>)
};

export default BirdFrame;