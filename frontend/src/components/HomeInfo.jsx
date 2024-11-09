import { Link } from "react-router-dom";



const HomeInfo = ({ currentStage }) => {

  if (currentStage === 3) {
    return (
      <div className='info-box '>
        <p className='font-medium text-center sm:text-xl'>
        This it a short version of Elden ring wiki <br /> Curious about the fake ass wiki?
        </p>

        <Link to='/weapons' className='neo-brutalism-white neo-btn'>
          Visit the weapon
          <img  alt='arrow' className='w-4 h-4 object-contain' />
        </Link>
      </div>
    );
  }

  if (currentStage === 4) {
    return (
      <div className='info-box'>
      <p className='font-medium sm:text-xl text-center'>
        Login to see the shitty ass website that I make <br/> I'm just a unemploy loser
      </p>

      <Link to='/login' className='neo-brutalism-white neo-btn'>
        Let's login
        <img  alt='arrow' className='w-4 h-4 object-contain' />
      </Link>
    </div>
    );
  }

  return null;
};

export default HomeInfo;