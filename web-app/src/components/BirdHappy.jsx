import BodyHappy from './BodyHappy';
import HappyFace from './HappyFace';

const BirdHappy = () => {
  return (
    <>
      <div style={{position: 'relative'}}>
        <BodyHappy style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
        <HappyFace style={{ position: 'absolute', top: 50, left: 50, zIndex: 2 }} />
      </div>
    </>
  );
};

export default BirdHappy;