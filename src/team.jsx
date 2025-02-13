import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header, Footer } from './page.jsx';
import { useState } from 'react';

// Import officer images
import officer1Image from './images/amir.png';
import officer2Image from './images/sida.webp';
import officer3Image from './images/nik.webp';
import officer4Image from './images/Arjun.png';

// Import officer images
import divaImage from './images/diva.jpg';

import felixImage from './images/felix.jpg';
import alexImage from './images/alex.jpg';
import oliverImage from './images/oliver.jpg';
import purandharImage from './images/purandhar.jpg';
import tanviImage from './images/tanvi.jpg';

// Split data into Chief Suite and Top Interns
const chiefSuiteData = [
  {
    id: 1,
    name: "Amir Eftekhar",
    role: "CEO",
    image: officer1Image,
    description: "As the CEO of Tri-Valley Tech, I lead the charge in turning visionary ideas into impactful real-world projects. With extensive experience in web app development, curriculum design, and teaching coding classes, I bring a unique blend of technical expertise and leadership to our organization. I manage and oversee all of our projects, ensuring that every team member has a clear role and contributes to our mission. My hands-on approach not only drives the success of the organization but also inspires our members to push boundaries, develop new skills, and become the next generation of tech innovators.",
    badges: ["Lead Developer", "UI/UX Design", "Management"]
  },
  {
    id: 2,
    name: "Nikhilesh Suravarjjala",
    role: "CEO",
    image: officer3Image,
    description: "As the co-CEO of Tri-Valley Tech, I am passionate about expanding my horizons in web and app development, management, and design. TVT gives me the opportunity to lead innovative tech solutions, from building user-focused platforms to creating impactful applications that address real-world challenges. As a designer, I enjoy exploring creative problem-solving while ensuring our projects meet the needs of the community. Beyond development, I am deeply committed to organizing community events that inspire and empower local youth, fostering connections and opportunities that drive growth and innovation.",
    badges: ["Event Planning", "Management"]
  },
  {
    id: 3,
    name: "Siddharth Alluri",
    role: "CFO",
    image: officer2Image,
    description: "As the CFO at Tri-Valley Tech, I manage our finances to make sure our innovative projects are well-funded. My job is to ensure that our financial decisions support our mission of giving students practical, real-world experience. I handle budgeting and resource allocation, working closely with our executive team to make sure we use our funds wisely.",
    badges: ["Event Planning", "Management"]
  },
  {
    id: 4,
    name: "Diva Rawal",
    role: "Interim-COO",
    image: divaImage,
    description: "Hi, I'm Diva Rawal, a sophomore at Dublin High School and the COO of Tri-Valley Tech! Over the past two years as class president at my high school, I've had the privilege to grow as a leader and collaborate with others to make a positive impact. I'm always eager to learn and try new things, whether it's exploring video production or creating apps designed to help others.",
    badges: ["UI/UX", "Event Planning", "Marketing", "Management"]
  },
  {
    id: 5,
    name: "Arjun Chakraborty",
    role: "CLO",
    image: officer4Image,
    description: "As the Chief Logistics Officer at Tri-Valley Tech, I oversee the logistical framework that ensures the execution of our projects. My role demands a balance of strategic planning and logistical oversight, managing the company's daily functions while driving long-term growth. I collaborate across departments, aligning team efforts with our broader goals, and ensuring that we consistently meet quality standards. A significant part of my responsibility is streamlining processes and improving efficiency across projects. My focus is on fostering a culture of logistical excellence, where innovation and efficiency go hand in hand. By ensuring that our logistics are well-coordinated, I make sure our output is maximized and leverage that for better opportunities. My approach is grounded in the belief that logistical success depends on a well-supported team. By cultivating a collaborative environment and leading by example, I help our team stay organized, innovative, and motivated to achieve real-world impact."
  }
];

const internData = [
  {
    id: 6,
    name: "Felix Brassard",
    role: "Marketing & Design Intern",
    image: felixImage,
    description: "Hi my name is Felix Brassard and I am a student at Dublin High School. I am working with a few peers on an app known as StudyLeaf, which is an ai software that helps make study guides for you such as your very own quizlets. My role in this development is in marketing and design where I seek to advertise this app and also making anything related to the app look appealing to the audience.",
    badges: ["Marketing", "Graphic Design"]
  },
  {
    id: 7,
    name: "Alex Mao",
    role: "Software Development Intern",
    image: alexImage,
    description: "As an active intern at Tri-Valley Tech, I'm immersed in hands-on projects that directly contribute to the organization's growth and success. My role is to support various teams by taking on tasks that help streamline operations and push forward innovative initiatives. Whether it's assisting with research, working on technical problems, or contributing to projects, I aim to add value by applying the skills I'm learning in real-time.",
    badges: ["Development", "UI/UX"]
  },
  {
    id: 8,
    name: "Oliver Merham",
    role: "Software Engineering Intern",
    image: oliverImage,
    description: "Hi, my name is Oliver Merham, and I'm currently a sophmore at Dublin High School. I'm passionate about many things, including volleyball, photography, and engineering. I dream of attending prestigious universities at France and pursuing a career at NASA, working on groundbreaking projects like the Mars rover.",
    badges: ["Development"]
  },
  {
    id: 9,
    name: "Purandhar Ayalasomayajula",
    role: "Marketing & Design Intern",
    image: purandharImage,
    description: "My name is Purandhar and I am an 8th grader at Wells Middle School. I joined the TVT by introduction from Nikhilesh Suravarjjala. Some of my skills include Design, Marketing, and assistance for others.",
    badges: ["Graphic Design", "Marketing"]
  },
  {
    id: 10,
    name: "Tanvi Vangaru",
    role: "Design Intern",
    image: tanviImage,
    description: "I have experience in design, including creating a logo for an app that provides personalized haircare assistance. Through this project, I developed skills in visual branding, creativity, and user-focused design. At TVT, I hope to further apply and expand my design abilities across the company, contributing to various creative projects and enhancing the overall design.",
    badges: ["Graphic Design", "Marketing"]
  }
];

const OfficerCard = ({ officer, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col border border-[var(--card-border)] backdrop-blur-sm hover:bg-[var(--hover-bg)]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative">
        <img 
          src={officer.image} 
          alt={officer.name} 
          className="w-full h-[16rem] md:h-[20rem] lg:h-[24rem] object-cover transition duration-300 transform hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-lg font-semibold px-4 text-center">{officer.role}</p>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold text-[var(--accent-primary)] mb-2">{officer.name}</h3>
        {officer.badges && (
          <div className="flex flex-wrap gap-2 mb-3">
            {officer.badges.map((badge, i) => (
              <span key={i} className="px-2 py-1 text-xs rounded-full bg-[var(--badge-bg)] text-[var(--badge-text)]">
                {badge}
              </span>
            ))}
          </div>
        )}
        <AnimatePresence>
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[var(--text-secondary)] text-sm flex-grow overflow-hidden"
            >
              {officer.description}
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 1, height: 'auto' }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[var(--text-secondary)] text-sm line-clamp-3 flex-grow overflow-hidden"
            >
              {officer.description}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors duration-300 self-start"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </motion.div>
  );
};

const OfficersPage = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-5"></div>
      <Header />
      <div className="container mx-auto px-4 py-20 mt-20 relative z-10">
        {/* Chief Suite Section */}
        <motion.h1
          className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Chief Suite
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">
          {chiefSuiteData.map((officer, index) => (
            <OfficerCard key={officer.id} officer={officer} index={index} />
          ))}
        </div>

        {/* Top Interns Section */}
        <motion.h1
          className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Interns
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {internData.map((officer, index) => (
            <OfficerCard key={officer.id} officer={officer} index={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OfficersPage;