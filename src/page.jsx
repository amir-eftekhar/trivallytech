import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Rocket, UserPlus, Menu, X, ChevronRight, Lightbulb, Send, Globe, Code, Palette, ArrowRight, Info, Video, MessageCircle, Star, Award } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin, Book, Clock, PenTool, CheckCircle, Target, FileText, BarChart, Briefcase} from 'lucide-react';
import { FaChevronDown, FaChevronUp,  FaBook, FaChartLine, FaArrowRight } from 'react-icons/fa';
import ScrollFadeIn from './Fade.jsx';
import Meet from './meet.jsx'
import { Link } from 'react-router-dom';
import logo from './images/logo2.svg'

const TypeWriter = ({ text, delay = 40 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{displayText}</span>;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', icon: <Info size={24} />, to: '/#about' },
    { name: 'Why Tri-Valley Tech', icon: <Star size={24} />, to: '/#why' },
    { name: 'Progress', icon: <BarChart size={24} />, to: '/progress' },
    { name: 'Articles', icon: <FileText size={24} />, to: '/articles' },
    { name: 'Officers', icon: <Briefcase size={24} />, to: '/officers' },
    { name: 'Join Us', icon: <UserPlus size={24} />, to: '/#join' },
    { name: 'Contact', icon: <MessageCircle size={24} />, to: '/#contact' },
  ];
  
  const NavLink = ({ item, onClick }) => {
    if (item.to.startsWith('/#')) {
      return (
        <a 
          href={item.to} 
          className="text-purple-300 hover:text-purple-100 flex items-center"
          onClick={onClick}
        >
          {React.cloneElement(item.icon, { size: 18, className: "mr-2" })}
          {item.name}
        </a>
      );
    }
    return (
      <Link 
        to={item.to} 
        className="text-purple-300 hover:text-purple-100 flex items-center"
        onClick={onClick}
      >
        {React.cloneElement(item.icon, { size: 18, className: "mr-2" })}
        {item.name}
      </Link>
    );
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 backdrop-blur-md' : 'bg-gray-900'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.a
            className="text-2xl font-bold text-purple-400"
            href="/"
            whileHover={{ scale: 1.05 }}
          >
            <img src={logo} alt="Tri-Valley Tech Logo" style={{ height: '4rem', width: 'auto' }} />
          </motion.a>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <motion.li key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <NavLink item={item} />
                </motion.li>
              ))}
            </ul>
          </nav>
          <motion.button 
            className="md:hidden text-purple-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-gray-800 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav>
              <ul className="flex flex-col items-start space-y-0 px-4">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.name} 
                    className="w-full border-b border-gray-700 last:border-b-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="py-4">
                      <NavLink 
                        item={item}
                        onClick={() => setIsMenuOpen(false)}
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
const RotatingCube = () => (
    <div className="scene">
      <div className="cube">
        <div className="cube__face cube__face--front">
          <Users size={48} />
          <p>Collaborative Community</p>
        </div>
        <div className="cube__face cube__face--back">
          <Rocket size={48} />
          <p>Innovative Projects</p>
        </div>
        <div className="cube__face cube__face--right">
          <Lightbulb size={48} />
          <p>Skill Development</p>
        </div>
        <div className="cube__face cube__face--left">
          <Globe size={48} />
          <p>Global Impact</p>
        </div>
        <div className="cube__face cube__face--top">
          <img src={logo} alt="Tri-Valley Tech Logo" className="w-150 h-150" />
        </div>
        <div className="cube__face cube__face--bottom">
        <img src={logo} alt="Tri-Valley Tech Logo" className="w-150 h-150" />
          {/*<p className="text-lg font-bold">Tri-Valley Tech</p>*/}
        </div>
      </div>
    </div>
  );


  const scrollToJoinSection = () => {
    const joinSection = document.getElementById('join');
    if (joinSection) {
      joinSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
const Hero = () => (
  <section className="relative min-h-screen flex items-start justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden pt-20 pb-12 md:py-16">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <motion.h1
          className="text-5xl md:text-5xl lg:text-6xl font-bold mb-1 pb-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Empowering Young Innovators
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
         Bring your ideas to life with Tri-Valley Tech
        </motion.p>
        <motion.button
      className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-neon"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToJoinSection}
    >
      Get Started
    </motion.button>

        
      </div>
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
        <RotatingCube />
      </div>
    </div>
  </section>
);

  
const VideoSection = () => (
    <section className="py-10 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <ScrollFadeIn>
          <div className="mt-12">
            <h3 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Watch Our Introduction Video
            </h3>
            <div className="flex justify-center">
              <div
                className="rounded-lg overflow-hidden shadow-neon"
                style={{
                  width: '100%',
                  maxWidth: '800px',
                  aspectRatio: '16 / 9',
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/p2AWYanIHkc"
                  
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );

  const Feature = ({ icon, title, description, index }) => (
    <motion.div 
      className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-gradient-to-br from-gray-800 to-gray-700 relative overflow-hidden group"
      whileHover={{ scale: 1.05, zIndex: 1 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
        initial={false}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="text-purple-400 mb-4"
      >
        {React.cloneElement(icon, { size: 48 })}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        {title}
      </h3>
      <p className="text-gray-300">{description}</p>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
  
  const Why = () => (
    <section id="why" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Join Tri-Valley Tech?
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-300 text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          At Tri-Valley Tech (TVT), we believe that high school students are capable of creating real-world change through innovation and collaboration. Our nonprofit organization offers students a unique platform to take their skills to the next level while making a positive impact in their communities.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Feature 
            icon={<Users />}
            title="Collaborative Community"
            description="Connect with like-minded peers who share your passion for making a difference. Join a community that fosters innovation and teamwork."
            index={0}
          />
          <Feature 
            icon={<Rocket />}
            title="Real-World Projects"
            description="Work on meaningful projects that have a tangible impact on your community. Contribute to real-time engineering projects with clear goals and measurable outcomes."
            index={1}
          />
          <Feature 
            icon={<Lightbulb />}
            title="Skill Development"
            description="Learn new skills and gain valuable experience for your future endeavors. Develop project management, technical problem-solving, and leadership skills."
            index={2}
          />
          <Feature 
            icon={<Code />}
            title="Hands-on Tech Experience"
            description="Dive deep into fields like computer science, web development, and engineering. Work on cutting-edge projects and learn practical skills that go beyond the classroom."
            index={3}
          />
          <Feature 
            icon={<Globe />}
            title="Global Impact"
            description="Make a difference not just locally, but potentially on a global scale. Your projects at TVT can address real-world challenges and create positive change."
            index={4}
          />
          <Feature 
            icon={<Users />}
            title="Mentorship"
            description="Connect with experienced mentors who guide you through projects and personal growth. Learn from industry professionals and gain insights into various STEM careers."
            index={5}
          />
          <Feature 
            icon={<Book />}
            title="Strong Portfolio"
            description="Build a portfolio that showcases your skills and dedication to using technology for good. Impress colleges and future employers with real-world project experience."
            index={6}
          />
          <Feature 
            icon={<Clock />}
            title="Volunteer Hours"
            description="Earn volunteer hours not just for direct contributions, but also for productive discussions and collaboration on platforms like Discord. Maximize your involvement while making a difference."
            index={7}
          />
          <Feature 
            icon={<PenTool />}
            title="Diverse Opportunities"
            description="Whether you're interested in technology, environmental causes, or another field, there's a place for you at TVT. Explore various aspects of innovation and find your passion."
            index={8}
          />
        </div>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p className="text-lg text-gray-300 mb-8">
            By joining TVT, you're not just gaining technical experience; you're becoming part of a community that shares your passion for creating change. You'll have the opportunity to work on projects that matter, develop skills that will serve you throughout your career, and make connections that could last a lifetime.
          </p>
          <p className="text-lg text-gray-300 mb-8">
            Whether you're a tech enthusiast, a budding entrepreneur, or an environmental activist, TVT provides a platform for you to grow, learn, and make a real impact. Our unique blend of hands-on experience, mentorship, and collaborative projects sets you up for success in whatever path you choose to pursue.
          </p>
          <a 
  href="https://discord.gg/PzFEsjvQFB" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <motion.button 
    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-300 shadow-lg"
    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(236, 72, 153, 0.7)" }}
    whileTap={{ scale: 0.95 }}
  >
    Join Us Today and Start Making an Impact!
  </motion.button>
</a>
        </motion.div>
        
      </div>
    </section>
  );
  


  const AboutUs = () => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const expandedContent = `
      Welcome to Tri-Valley Tech, a pioneering nonprofit organization dedicated to transforming the landscape of youth empowerment and innovation. Nestled in the heart of the Tri-Valley region, our organization serves as a beacon for high school students eager to harness their creativity and passion to address real-world challenges. At Tri-Valley Tech, we firmly believe that the young minds of today are the architects of a brighter, more sustainable future. To this end, we are committed to providing them with the tools, resources, and support necessary to turn visionary ideas into impactful realities.
  
      Our mission is to empower high school students by fostering an environment where creativity, collaboration, and critical thinking thrive. We aim to bridge the gap between academic learning and practical application, enabling students to engage in meaningful projects that enhance their personal and professional growth while contributing positively to their communities and beyond. By cultivating a generation of innovators, leaders, and change-makers, Tri-Valley Tech equips young individuals to tackle the complex challenges of the modern world with confidence and ingenuity.
  
      Tri-Valley Tech envisions a world where every high school student has the opportunity to explore their interests, develop their skills, and make a tangible difference through technology and innovation. We aspire to be a catalyst for social change, inspiring students to pursue their passions across various fields, including technology, environmental sustainability, the arts, and more. By nurturing a culture of inclusivity, curiosity, and resilience, we aim to create a ripple effect that extends from individual projects to global initiatives, fostering a community of proactive and engaged young leaders.
  
      At Tri-Valley Tech, we offer a comprehensive suite of programs and resources designed to support students at every stage of their innovation journey. Our innovative project incubation process provides a structured pathway for students to develop their ideas from inception to execution. This includes brainstorming sessions, feasibility assessments, and strategic planning to ensure each project is grounded in practicality and aligned with real-world needs.
    `;
  
    return (
      <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">About Tri-Valley Tech</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg mb-6 text-gray-300">
                <TypeWriter text="Tri-Valley Tech is a nonprofit organization dedicated to empowering high school students to create real-world impact through innovative projects. We believe that today's students have the potential to solve many of the challenges we face in our communities and beyond." />
              </p>
              <p className="text-lg mb-6 text-gray-300">
                Our mission is to provide resources, guidance, and a collaborative platform that helps students take their ideas from concept to reality. By joining Tri-Valley Tech, you become part of a community of passionate peers who share your drive to make a difference.
              </p>
              <p className="text-lg text-gray-300">
                Whether you're interested in technology, environmental issues, art, or any other field, Tri-Valley Tech offers the opportunity to work on meaningful projects, learn new skills, and connect with mentors who can help shape your future.
              </p>
              <motion.button
                className="mt-6 bg-purple-600 text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-purple-700 transition duration-300"
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isExpanded ? 'Read Less' : 'Read More'}
                {isExpanded ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
              </motion.button>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Globe size={48} />, text: "High Impact" },
                { icon: <Code size={48} />, text: "Tech Innovation" },
                { icon: <Palette size={48} />, text: "Creative Solutions" },
                { icon: <Users size={48} />, text: "Community Building" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg text-center shadow-neon"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-purple-500">{item.icon}</div>
                  <p className="font-semibold mt-2 text-purple-300">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 text-gray-300"
              >
                <p className="text-lg mb-4">{expandedContent}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    );
  };
  
  const ProjectCard = ({ title, description, tags }) => (
    <motion.div 
      className="bg-gray-800 p-6 rounded-lg shadow-neon"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-2 text-purple-400">{title}</h3>
      <p className="mb-4 text-gray-300">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-purple-900 text-purple-200 px-2 py-1 rounded text-sm">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
  
  const Projects = () => (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard 
            title="Tutoring Application"
            description="Connect students with tutors for online lessons, featuring secure messaging and resource sharing."
            tags={['Education', 'Communication', 'Online Learning']}
          />
          <ProjectCard 
            title="Leg Band for Muscular Health"
            description="Wearable device with sensors and LEDs to provide real-time feedback on leg muscular health."
            tags={['Health Tech', 'Wearables', 'Fitness']}
          />
          <ProjectCard 
            title="Water-Saving Shower Head"
            description="Smart shower head that uses computer vision or sensors to conserve water by targeting spray."
            tags={['Smart Home', 'Water Conservation', 'IoT']}
          />
        </div>
        <div className="text-center mt-13">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/projects" 
              className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full font-bold hover:bg-purple-700 transition duration-300 shadow-neon"
            >
              View All Projects <ChevronRight className="inline" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const CTAButton = ({ href, text, icon, description }) => (
    <div className="mb-12 flex flex-col items-center">
      <p className="text-lg mb-4 text-gray-300 text-center max-w-md">{description}</p>
      <Link to={href}>
        <motion.button 
          className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700 transition duration-300 shadow-neon flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {text} {icon}
        </motion.button>
      </Link>
    </div>
  );
  
  const CTA = () => (
    <section id="join-us" className="bg-gradient-to-br from-gray-900 to-gray-700 text-white py-20">
      <div className="container mx-auto text-center px-4">
        <motion.h2 
          className="text-3xl font-bold mb-4 text-purple-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TypeWriter text="Ready to Make a Difference?" />
        </motion.h2>
        <motion.p 
          className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Join Tri-Valley Tech today and start turning your ideas into action!
        </motion.p>
        
        <div className="flex flex-col items-center">
          <CTAButton 
            href="https://discord.gg/PzFEsjvQFB"
            text="Join Now"
            icon={<FaArrowRight className="ml-2" />}
            description="Connect with like-minded peers and start your journey with Tri-Valley Tech."
          />
          
          <CTAButton 
            href="/articles"
            text="Read Articles"
            icon={<FaBook className="ml-2" />}
            description="Explore our latest articles on technology, innovation, and student projects."
          />
          
          <CTAButton 
            href="/progress"
            text="See Our Progress"
            icon={<FaChartLine className="ml-2" />}
            description="Check out our journey and the milestones we've achieved so far."
          />
        </div>
      </div>
    </section>
  );








const ContactForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      //implement message sending here once backend is implemented
      console.log('Form submitted:', formData);
      
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    };
  
    return (
      <section className="py-20  bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-purple-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-gray-300 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-purple-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-gray-300 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-purple-300 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 text-gray-300 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
              <Send size={20} className="ml-2" />
            </motion.button>
          </form>
        </div>
      </section>
    );
  };

  const Footer = () => (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-purple-400 mb-4">Tri-Valley Tech</h3>
            <p className="text-sm">Empowering high school innovators to create real-world impact through collaborative projects.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-purple-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/#about" className="hover:text-purple-300 transition duration-300">About Us</a></li>
              <li><Link to="/articles" className="hover:text-purple-300 transition duration-300">Articles</Link></li>
              <li><Link to="/progress" className="hover:text-purple-300 transition duration-300">Progress</Link></li>
              <li><Link to="/officers" className="hover:text-purple-300 transition duration-300">Officers</Link></li>
              <li><a href="/#join" className="hover:text-purple-300 transition duration-300">Join Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-purple-400 mb-4">Contact Us</h4>
            <p className="text-sm">Email: trivalleytechnology@gmail.com</p>
            <p className="text-sm">Phone: (470) 609-2206</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-purple-400 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={20} />, href: "https://facebook.com" },
                { icon: <Twitter size={20} />, href: "https://twitter.com" },
                { icon: <Instagram size={20} />, href: "https://instagram.com" },
                { icon: <Linkedin size={20} />, href: "https://linkedin.com" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition duration-300"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 Tri-Valley Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
 const Web = () => (
    <div className="font-sans bg-gray-900">
    <ScrollFadeIn delay={0.2}>
      <Header />
    </ScrollFadeIn>
    <main className="pt-16">
      <ScrollFadeIn delay={0.4}>
        <section id="home">
          <Hero />
        </section>
      </ScrollFadeIn>
      {/*<ScrollFadeIn>
        <section id="video">
          <VideoSection />
        </section>
      </ScrollFadeIn>
      */}
      <ScrollFadeIn>
        <section id="why">
          <Why />
        </section>
      </ScrollFadeIn>
      <ScrollFadeIn>
        <section id="about">
          <AboutUs />
        </section>
      </ScrollFadeIn>
      {/*<ScrollFadeIn>
        <section id="team">
          <Meet />
        </section>

      </ScrollFadeIn>
      
      <ScrollFadeIn>
        <section id="projects">
          <Projects />
        </section>
      </ScrollFadeIn>
      */}
      <ScrollFadeIn>
        <section id="join">
          <CTA />
        </section>
      </ScrollFadeIn>
      <ScrollFadeIn>
        <section id="contact">
          <ContactForm />
        </section>
      </ScrollFadeIn>
    </main>
    <ScrollFadeIn>
      <Footer />
    </ScrollFadeIn>
  </div>
);


 export {Header, Footer};

  export default Web;