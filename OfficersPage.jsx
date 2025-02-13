import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header, Footer } from './page.jsx';
import { useState } from 'react';

// Import officer images
import officer1Image from './images/amir.png';
import officer2Image from './images/sida.webp';
import officer3Image from './images/nik.webp';
import officer4Image from './images/Arjun.png';

const officerData = [
  {
    id: 1,
    name: "Amir Eftekhar",
    role: "CEO",
    subRoles: ["Management", "Development", "Research"],
    image: officer1Image,
    description: "As the CEO of Tri-Valley Tech, I lead our organization's vision in management, development, and research initiatives. With extensive experience in web app development and curriculum design, I bring comprehensive technical leadership to our projects. I oversee the strategic direction of our development teams while conducting research into emerging technologies and methodologies. My focus is on creating innovative solutions while mentoring team members to excel in their roles. Through hands-on management and technical guidance, I ensure that our projects not only meet but exceed expectations, while fostering an environment of continuous learning and growth."
  },
  {
    id: 2,
    name: "Nikhilesh Suravarjjala",
    role: "COO",
    subRoles: ["Event Planning", "Management"],
    image: officer3Image,
    description: "As Chief Operating Officer at Tri-Valley Tech, I specialize in event planning and organizational management. My role focuses on coordinating and executing our various events and initiatives, ensuring smooth operations across all our activities. I work to create engaging experiences that bring value to our community while maintaining efficient organizational processes. Through careful planning and execution, I help maintain the high standards of our events while fostering an environment of collaboration and growth."
  },
  {
    id: 3,
    name: "Siddharth Alluri",
    role: "CFO",
    subRoles: ["Financial Planning", "Resource Management"],
    image: officer2Image,
    description: "As the CFO at Tri-Valley Tech, I manage our finances to ensure sustainable growth and resource allocation. My focus is on creating and implementing financial strategies that support our organization's goals while maintaining fiscal responsibility. I work closely with other team members to ensure our projects and initiatives have the necessary resources while maintaining budgetary discipline."
  },
  {
    id: 4,
    name: "Arjun Chakraborty",
    role: "CLO",
    subRoles: ["Logistics", "Operations"],
    image: officer4Image,
    description: "As Chief Logistics Officer, I oversee the operational framework that ensures smooth execution of all our initiatives. My role combines strategic planning with practical implementation, focusing on creating efficient systems that support our organization's goals. I work to optimize our processes while maintaining high quality standards across all our operations."
  }
];

const OfficerCard = ({ officer, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative group">
        <img 
          src={officer.image} 
          alt={officer.name} 
          className="w-full h-[28rem] object-cover transition duration-300 transform group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-3xl font-bold text-white mb-2">{officer.name}</h3>
            <p className="text-purple-400 text-xl font-semibold">{officer.role}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {officer.subRoles.map((subRole, index) => (
                <span key={index} className="bg-purple-500 bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {subRole}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <AnimatePresence>
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-300 text-base leading-relaxed"
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
              className="text-gray-300 text-base leading-relaxed line-clamp-3"
            >
              {officer.description}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-purple-400 hover:text-purple-300 transition-colors duration-300 self-start flex items-center gap-2"
        >
          {isExpanded ? '← Show Less' : 'Read More →'}
        </button>
      </div>
    </motion.div>
  );
};

const OfficersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-20 mt-20">
        <motion.h1
          className="text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Leadership Team
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {officerData.map((officer, index) => (
            <OfficerCard key={officer.id} officer={officer} index={index} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OfficersPage;
