import React from 'react';
import lphHero from '../images/lph_hero.jpg';
import mainLogo from '../images/Los_Pollos_Hermanos_logo.png';

const Hero = ({ slogan }) => (
  <section className="hero">
    {/* <h1>Welcome to Los Pollos Hermanos Manager App</h1>
    <p>{slogan}</p> */}

    <div className="hero-image">
      <img src= {lphHero} alt="Los Pollos Hermanos Logo" />
      <div className='overlay greeting_overlay'>
        <marquee behavior="alternate" scrollamount="12">
          <marquee behavior="alternate" scrollamount="12" direction="down">
            <img src={mainLogo} alt="LPH logo" className='dance'/>
          </marquee>
        </marquee>
        <p className='greeting'>Hi</p>
        <p className='addressed_to'>Gus Fring</p>
    </div>
    </div>
  </section>
);

export default Hero;
