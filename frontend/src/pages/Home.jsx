import React,{Suspense,useEffect,useState} from 'react'
import { Canvas } from "@react-three/fiber";
import { Loader3D } from '../components';
import Potboy from '../models/Potboy';
import HomeInfo from '../components/HomeInfo';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
function Home() {
  const adjustPotboySize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [34.9, 34.9, 34.9];
      screenPosition = [0, -9.5, -43.4];
    } else {
      screenScale = [35, 35, 35];
      screenPosition = [0, -9.5, -43.4];
    }

    return [screenScale, screenPosition];
  };
  const [potboyScale, potboyPosition] = adjustPotboySize();
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [stageClik, setStageClick]=useState(0)
  
  // useEffect(()=>{
  //   if(stageClik!==currentStage){
  //     setStageClick(currentStage)
  //   }
  // },[currentStage])
  useEffect(()=>{
    if(currentStage!==stageClik){
      setCurrentStage(stageClik)
    }
  },[stageClik])
  return (
    <section className="max-w-7xl mx-auto pt-20  h-[662px] lg:h-[878px]">
      <div className='absolute top-24 left-0  right-0 z-10 flex items-center justify-center gap-44'>
      <FaArrowLeft  color='yellow' size={30} className='bg-white rounded-full w-[40px] h-[40px] p-2 hover:bg-black cursor-pointer' onClick={() => setStageClick(3)} />
      <FaArrowRight color='yellow' size={30} className='bg-white rounded-full w-[40px] h-[40px] p-2 hover:bg-black cursor-pointer' onClick={() => setStageClick(4)}/>
      </div>
       <div className={`absolute top-72 ${currentStage===3 ? "left-0 ml-8":" right-0 mr-8"}  z-10 flex items-center justify-center`}>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
      className={`w-full h-screen bg-transparent ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}
      camera={{ near: 0.1, far: 1000, fov:75 }}
      >
      <Suspense fallback={<Loader3D />}>
      <directionalLight position={[1, 1, 1]} intensity={2} />
        <ambientLight intensity={0.5} />
          <pointLight position={[10, 5, 10]} intensity={2} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
          />
          <hemisphereLight
            skyColor='#b1e1ff'
            groundColor='#000000'
            intensity={1}
          />
          <Potboy
          stageClik={stageClik}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          setCurrentStage={setCurrentStage}
           position={potboyPosition}
           rotation={[0.5, 0.3, 0]}
           scale={potboyScale}
           currentAnimation={'Scene'}
          />
      </Suspense>
      </Canvas>
    </section>
  )
}

export default Home