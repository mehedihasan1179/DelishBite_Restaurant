import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrinHearts, faUtensils, 
  faUsers, 
  faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import counterbg from '../../../assets/counterbg2.jpg';

const counterData = [
  { id: 1, start: 35, end: 75, duration: 2.5, suffix: '+', title: 'Dishes Available', icon: faUtensils, },
  { id: 2, start: 40, end: 60, duration: 3, suffix: '%', title: 'Repeated Customer Rate', icon: faFaceGrinHearts, },
  { id: 3, start: 0, end: 10, duration: 2.5, suffix: 'k+', title: 'Happy Customers', icon: faUsers, },
  { id: 4, start: 120, end: 250, duration: 3.5, suffix: '', title: 'Reservation Honored Annually', icon: faCalendarCheck, },
];

const Counter = ({ offsetY }) => {
  const [counterOn, setCounterOn] = useState(false);

  const parallaxFactor = 0.2; 

  return (
    <div
      className="mt-32 w-full"
      style={{
        backgroundImage: `url(${ counterbg })`,
        backgroundPosition: `center ${ -offsetY * parallaxFactor }px`,
        backgroundSize: '100% 400%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <ScrollTrigger
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-4 text-center py-16 lg:py-28">

          {counterData.map((item) => (
            <div key={item.id}>
              <h1 className='text-3xl md:text-4xl lg:text-5xl text-[#F49241] font-bold'>
                <FontAwesomeIcon icon={item.icon} className="text-[#e77415]"/>
                {counterOn && (               
                  <CountUp 
                    start={item.start} 
                    end={item.end} 
                    delay={0} 
                    duration={item.duration}
                  />
                )}
                {item.suffix}
              </h1>
              <p className='text-md md:text-lg lg:text-xl font-medium text-[#333]'>{item.title}</p>
            </div>
          ))}

        </div>
      </ScrollTrigger>
    </div>
  );
};

export default Counter;
