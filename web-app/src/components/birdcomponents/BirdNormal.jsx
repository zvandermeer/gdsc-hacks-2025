import BodyNormal from './BodyNormal';
import NormalFace from './NormalFace';

const BirdNormal = () => {
  return (
    <>
      <div style={{position: 'relative'}}>
        <BodyNormal style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
        <NormalFace style={{ position: 'absolute', top: 65, left: 50, zIndex: 2 }} />
      </div>
    </>
  );
};

export default BirdNormal;