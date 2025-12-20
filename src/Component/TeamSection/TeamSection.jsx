import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faX } from '@fortawesome/free-solid-svg-icons';
import { 
    faFacebookF, 
    faInstagram
} from '@fortawesome/free-brands-svg-icons'; 

import assisChef from '../../../assets/team/assistant01.jpg';
import gManager from '../../../assets/team/assistant02.jpg'; 
import prepCook from '../../../assets/team/assistant03.jpg'; 
import headchef from '../../../assets/team/headchef.webp';
import memberBg from '../../../assets/memberBG.png';

const teamMembers = [
  {
    name: 'David Wilson',
    profession: 'Executive Chef',
    description: 'Creative designer with 5+ years of experience in creating user-friendly interfaces and engaging digital experiences.',
    image: headchef
  },
  {
    name: 'Sarah Johnson',
    profession: 'Assistant Chef',
    description: 'Passionate developer specializing in modern web technologies and creating efficient, scalable applications.',
    image: assisChef,
  },
  {
    name: 'Emma Rodriguez',
    profession: 'General Manager',
    description: 'Strategic marketer with expertise in digital campaigns, brand development, and data-driven marketing solutions.',
    image: gManager,
  },
  {
    name: 'Michael Chen',
    profession: 'Prep Cook',
    description: 'Experienced project manager with a track record of delivering complex projects on time and within budget.',
    image: prepCook,
  },
];


const TeamSection = ({ openModal, offsetY }) => {

  const parallaxFactor = 0.05; 

  return (
    <section className="team-section">
      <div className="team-container max-w-5xl mx-auto my-12 md:my-24">
        <h2 className="relative w-fit mt-6 mb-6 text-4xl md:text-5xl lg:text-6xl text-primary-dark font-satisfy transition-transform duration-300 ease-in-out
      hover:scale-[1.05] cursor-pointer transform text-center mx-auto
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-dark after:transform after:scale-x-0 after:origin-center after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-110">
        The Heart of DelishBite
      </h2>

        <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 sm:gap-30 justify-center mt-28">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={`card group relative h-[350px] hover:border hover:border-primary rounded-md shadow-xl transition-all duration-500 cursor-pointer 
                          hover:h-[350px] hover:shadow-2xl
                          ${index >= 1 ? 'mt-20 md:mt-0 lg:mt-0' : ''} 
                          ${index >= 2 ? 'mt-20 md:mt-20 lg:mt-0' : ''} 
                          ${index === 3 ? 'mt-20 md:mt-20 lg:mt-20' : ''}
                          `}
              style={{ 
                backgroundImage: `url(${memberBg})`, 
                backgroundPosition: `center ${-offsetY * parallaxFactor}px`
              }}
            >
              
              <div 
                className={`card-image absolute top-0 left-0 w-full h-full bg-cover bg-top bg-no-repeat rounded-md transition-all duration-500 z-10 
                            group-hover:translate-y-[-80px] group-hover:w-[220px] group-hover:h-[180px] 
                            group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:top-0 
                            group-hover:rounded-xl group-hover:border-4 group-hover:border-[#ff9c12] group-hover:shadow-md
                            ${index === 0 ? 'bg-[0%_12%]' : ''}
                            ${index === 2 ? 'bg-[0%_25%]' : ''}
                            ${index === 3 ? 'bg-[20%_40%]' : ''}`}
                style={{ backgroundImage: `url(${member.image})` }}
                onClick={() => openModal(member.image, true, member.name)}
              ></div>

              <div className="absolute bottom-0 left-0 w-full text-center bg-transparent z-20 transition-all duration-500 group-hover:bottom-5">
                <div className='bg-black bg-opacity-20 backdrop-blur-[2px] group-hover:backdrop-blur-none group-hover:bg-transparent w-fit mx-auto px-6 py-1 rounded-md leading-tight transition duration-500 hover:delay-300'>
                  <h2 className="name text-2xl lg:text-3xl group-hover:text-[40px] font-medium font-satisfy text-[#ec8633] transition-all duration-500">
                  {member.name}
                  </h2>
                  <p className="profession text-md group-hover:text-xl text-[#ec8633] font-bold transition-all duration-500">
                    {member.profession}
                  </p>
                </div>
                <p className="description text-[#333] p-2 group-hover:mt-2 text-sm leading-relaxed max-h-0 opacity-0 group-hover:max-h-[100px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  {member.description}
                </p>
                <div className="social-icons flex justify-center gap-4 mt-4 max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <a href="#" className="w-9 h-9 flex items-center justify-center rounded-md bg-[#f5ab73] text-[#fff] transition-all duration-500 ease-in-out hover:bg-[#0866FF] hover:text-white">
                    <FontAwesomeIcon icon={faFacebookF} /> 
                  </a>
                  <a href="#" className="w-9 h-9 flex items-center justify-center rounded-md bg-[#f5ab73] text-[#fff] transition-all duration-500 hover:bg-[#080808] hover:text-white">
                    <FontAwesomeIcon icon={faX} />
                  </a>
                  <a href="#" className="w-9 h-9 flex items-center justify-center rounded-md bg-[#f5ab73] text-[#fff] transition-all duration-500 hover:bg-gradient-to-bl from-[#6B39C6] from-0% via-[#923DB1] via-30% via-[#E74780] via-50% via-[#FF8942] via-70% to-[#FCD046] to-100%">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;