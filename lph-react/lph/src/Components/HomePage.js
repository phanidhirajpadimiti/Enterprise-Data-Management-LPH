import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import KeyMetrics from './KeyMetrics';
import Cta from './Cta';
import CardFunction from './Card';
import Spacer from './Spacer';
import Headline from './Headline';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="home-page">

      <Navbar/>
      <Hero slogan="Finger Lickin' Good Management at Your Fingertips" />
      <Spacer height="50px" />
      <Headline text="Manage Your Los Pollos Hermanos" />
      <CardFunction/ >
      <Footer/>
    </div>
  );
};

export default HomePage;
