import BodySad from './BodySad';
import SadFace from './SadFace';

const BirdSad = () => {
  return (
    <>
      <div style={{position: 'relative'}}>
        <BodySad style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
        <SadFace style={{ position: 'absolute', top: 50, left: 50, zIndex: 2 }} />
      </div>
    </>
  );
};

export default BirdSad;