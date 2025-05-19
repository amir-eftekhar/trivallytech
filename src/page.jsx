import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Rocket, UserPlus, Menu, X, ChevronRight, Lightbulb, Send, Globe, Code, Palette, ArrowRight, Info, Video, MessageCircle, Star, Award, FileText, BarChart, Sun, Moon } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin, Book, Clock, PenTool, CheckCircle, Target, Briefcase} from 'lucide-react';
import { FaChevronDown, FaChevronUp,  FaBook, FaChartLine, FaArrowRight } from 'react-icons/fa';
import ScrollFadeIn from './Fade.jsx';
import { Link } from 'react-router-dom';
import logo from './images/logo2.svg';

import { useTheme } from './ThemeContext';

// Add CSS animations
const styles = document.createElement('style');
styles.textContent = `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`;
document.head.appendChild(styles);

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

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
  const { isDark, toggleTheme } = useTheme();
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
    { name: 'Why Join TVT?', icon: <Users size={20} />, to: '/#why-join', onClick: () => scrollToSection('why') },
    { name: 'Impact', icon: <BarChart size={20} />, to: '/#impact', onClick: () => scrollToSection('impact') },
    { name: 'Articles', icon: <FileText size={20} />, to: '/articles' },
    { name: 'Team', icon: <Users size={20} />, to: '/team' },
    { name: 'Dev Vault', icon: <Code size={20} />, to: '/dev-vault' },
    { name: 'Contact', icon: <MessageCircle size={20} />, to: '/#contact', onClick: () => scrollToSection('contact') },
  ];

  const NavLink = ({ item, onClick }) => {
    if (item.onClick) {
      return (
        <button 
          className="px-4 py-2 rounded-full transition-all duration-200 flex items-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5"
          onClick={(e) => {
            e.preventDefault();
            item.onClick();
            if (onClick) onClick();
          }}
        >
          {React.cloneElement(item.icon, { className: "mr-2" })}
          {item.name}
        </button>
      );
    }
    return (
      <Link 
        to={item.to} 
        className="px-4 py-2 rounded-full transition-all duration-200 flex items-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5"
        onClick={onClick}
      >
        {React.cloneElement(item.icon, { className: "mr-2" })}
        {item.name}
      </Link>
    );
  };

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <motion.nav 
        className={`
          ${isScrolled ? 'bg-[var(--nav-bg)]/90' : 'bg-[var(--nav-bg)]'} 
          backdrop-blur-md rounded-full px-6 py-3
          border border-[var(--accent-primary)]/5
          flex items-center justify-between gap-6
          max-w-6xl w-full transition-all duration-300
          mt-4 shadow-sm
        `}
      >
        <motion.a
          className="flex-shrink-0"
          href="/"
          whileHover={{ scale: 1.05 }}
        >
          <img src={logo} alt="Tri-Valley Tech Logo" className="h-10 w-auto" />
        </motion.a>

        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NavLink item={item} onClick={() => setIsMenuOpen(false)} />
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.button
            className="p-2 rounded-full transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <motion.button 
            className="md:hidden p-2 rounded-full transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed top-24 left-4 right-4 rounded-2xl shadow-xl bg-[var(--bg-primary)] border border-[var(--text-primary)]/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="p-4">
              <ul className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.name} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavLink 
                      item={item}
                      onClick={() => setIsMenuOpen(false)}
                    />
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
  
const Hero = () => {
  const { isDark } = useTheme();
  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-40 md:pt-32 polka-pattern">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern z-0"></div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-[var(--accent-secondary)]/5"></div>
      
      {/* Background blobs */}
      <div className="absolute top-20 -left-4 w-96 h-96 bg-[var(--accent-primary)]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-20 -right-4 w-96 h-96 bg-[var(--accent-secondary)]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <motion.h1
            className="text-5xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Empowering Young Innovators
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-[var(--text-secondary)] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bring your ideas to life with Tri-Valley Tech
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="https://discord.gg/n6TCxpCGqM"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--accent-primary)] text-white px-8 py-3 rounded-full font-semibold hover:bg-[var(--accent-secondary)] transition-colors duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="ml-2" />
            </a>
          </motion.div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <RotatingCube />
        </div>
      </div>
    </section>
  );
};

const VideoSection = () => {
  const { isDark } = useTheme();
  return (
    <section className="py-16 bg-[var(--bg-secondary)] polka-pattern">
      <div className="container mx-auto px-4">
        <ScrollFadeIn>
          <div className="mt-12">
            <h3 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">
              Watch Our Introduction Video
            </h3>
            <div className="flex justify-center">
              <div
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[var(--bg-primary)]"
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
};

  const Feature = ({ icon, title, description, index }) => {
    const { isDark } = useTheme();
    return (
      <motion.div 
        className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-[var(--bg-secondary)] relative overflow-hidden group hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05, zIndex: 1 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="text-[var(--accent-primary)] mb-4 flex justify-center items-center h-16 group-hover:text-[var(--accent-secondary)] transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]">{title}</h3>
        <p className="text-[var(--text-secondary)]">{description}</p>
      </motion.div>
    );
  };
  
  const Why = () => {
    const { isDark } = useTheme();
    const features = [
      {
        title: "Real-World Projects",
        description: "Take part in projects that address real community needs and provide tangible outcomes. From engineering solutions to technology-driven initiatives, TVT gives you the opportunity to make a difference while gaining hands-on experience.",
        icon: <Rocket />
      },
      {
        title: "Skill Development",
        description: "Learn essential skills such as project management, technical problem-solving, and leadership. Whether you're exploring coding, design, or environmental innovation, you'll develop abilities that set you apart for future academic and career opportunities.",
        icon: <Book />
      },
      {
        title: "Volunteer Hours",
        description: "Earn valuable volunteer hours for both your direct contributions and collaborative efforts. Engage in productive discussions and teamwork while building your resume and making a positive impact.",
        icon: <Clock />
      }
    ];

    return (
      <section id="why-join" className="py-20 bg-[var(--bg-primary)] relative overflow-hidden polka-subtle">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[var(--accent-primary)]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-[var(--accent-secondary)]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-[var(--accent-primary)]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-primary)]">
              Why Join Tri-Valley Tech?
            </h2>
            <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed">
              At Tri-Valley Tech (TVT), we empower high school students to create real-world change through meaningful projects, skill development, and community impact.pact. By joining, you'll work on collaborative initiatives that solve real problems, gain practical experience, and contribute to something bigger than yourself.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-[var(--bg-primary)] shadow-xl border border-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-300 relative overflow-hidden group backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <div className="p-4 rounded-full bg-[var(--accent-primary)]/10 inline-block mb-6">
                    {React.cloneElement(feature.icon, { size: 32, className: 'text-[var(--accent-primary)]' })}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    {feature.title}
                  </h3>
                  
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
              At TVT, you'll join a community of like-minded peers, guided by experienced mentors, to turn your ideas into impactful realities. Whether you're coding an app, designing sustainable solutions, or working on your first engineering project, TVT equips you with the tools to succeed and the platform to showcase your talent.
            </p>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Become part of a movement that bridges the gap between education, technology, and social impact. Join Tri-Valley Tech today to develop your skills, contribute to meaningful projects, and make a lasting difference in your community and beyond.
            </p>
          </motion.div>
        </div>
      </section>
    );
  };
  


  const AboutUs = () => {
    const { isDark } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    const mainContent = "Tri-Valley Tech is a nonprofit organization dedicated to empowering high school students through technology-driven initiatives. We provide hands-on opportunities to develop innovative solutions, collaborate on impactful projects, and lead community-focused events, bridging the gap between education, technology, and real-world needs.";
  
    const expandedContent = `Tri-Valley Tech serves as a hub for creativity and innovation, equipping students with resources, mentorship, and a collaborative platform to turn ideas into reality. Our mission is to inspire and empower the next generation of leaders by fostering an environment where critical thinking, collaboration, and real-world problem-solving thrive.

Through a structured approach that includes project incubation, strategic planning, and hands-on experience, we enable students to create solutions that address community challenges and broader societal needs. Whether it's web development, app creation, or sustainability-focused projects, we aim to bridge the gap between academic learning and practical application.

We envision a world where every student has the opportunity to explore their passions, gain valuable skills, and make a meaningful impact. By nurturing curiosity, resilience, and leadership, Tri-Valley Tech is building a community of innovators ready to tackle the challenges of today and shape a better tomorrow.`;

    return (
      <section id="about" className="py-20 bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-transparent bg-clip-text">About Us</h2>
            <p className="text-lg mb-4 text-[var(--text-secondary)]">{mainContent}</p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition-colors flex items-center mx-auto"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                <FaChevronDown />
              </motion.span>
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
                  <p className="text-lg text-[var(--text-secondary)] whitespace-pre-line leading-relaxed">{expandedContent}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    );
  };
  const CTAButton = ({ href, text, icon, description }) => (
    <div className="mb-12 flex flex-col items-center">
      <p className="text-lg mb-4 text-[var(--text-secondary)] text-center max-w-md">{description}</p>
      <Link to={href}>
        <motion.button 
          className="bg-[var(--accent-primary)] text-white px-8 py-3 rounded-full font-bold hover:bg-[var(--accent-secondary)] transition duration-300 shadow-neon flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {text} {icon}
        </motion.button>
      </Link>
    </div>
  );
  
  const CTA = () => (
    <section id="join" className="py-20 bg-[var(--bg-secondary)] circuit-pattern">
      <div className="container mx-auto text-center px-4">
        <motion.h2 
          className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Join Us?
        </motion.h2>
        <motion.p 
          className="text-xl text-[var(--text-secondary)] mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Start your journey with Tri-Valley Tech today
        </motion.p>
        <motion.button
          className="px-8 py-3 bg-[var(--accent-primary)] text-white rounded-full font-semibold hover:bg-[var(--accent-secondary)] transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );

  const Impact = () => (
    <section className="py-20 bg-[var(--bg-secondary)] text-[var(--text-primary)] relative overflow-hidden polka-subtle">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6bTEyIDEyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnptLTI0IDBjMy4zMSAwIDYgMi42OSA2IDZzLTIuNjkgNi02IDYtNi0yLjY5LTYtNiAyLjY5LTYgNi02eiIgc3Ryb2tlPSIjNzMyOWJlIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative">
        <motion.h2 
          className="text-6xl font-bold text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">Our Impact By Numbers</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="p-8 rounded-2xl bg-[var(--bg-primary)] shadow-xl border border-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-purple-500/10">
                <Users className="w-10 h-10 text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Growing Team</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Over 30 passionate developers, designers, and innovators working together to create meaningful technology solutions. Our diverse team brings expertise across multiple domains, from mobile development to AI.
            </p>
          </motion.div>

          <motion.div 
            className="p-8 rounded-2xl bg-[var(--bg-primary)] shadow-xl border border-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-purple-500/10">
                <Rocket className="w-10 h-10 text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Launched Projects</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Successfully launched multiple applications and platforms that solve real-world problems. From mobile apps to web platforms, our projects are making a tangible difference in how people interact with technology.
            </p>
          </motion.div>

          <motion.div 
            className="p-8 rounded-2xl bg-[var(--bg-primary)] shadow-xl border border-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-purple-500/10">
                <Globe className="w-10 h-10 text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Global Impact</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Our initiatives span across various sectors including education, healthcare, and community development. With multiple ongoing projects, we're continuously expanding our reach and impact in the tech community.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            From concept to deployment, we're building a track record of successful projects that demonstrate our commitment to innovation and excellence in technology.
          </p>
        </motion.div>
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
      <section className="py-20 bg-[var(--bg-secondary)] contact-section polka-pattern">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto contact-form relative z-10">
            <div className="mb-6">
              <label htmlFor="name" className="block text-purple-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-[var(--text-secondary)] bg-[var(--bg-primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] border border-[var(--accent-primary)]/10"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-purple-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-[var(--text-secondary)] bg-[var(--bg-primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] border border-[var(--accent-primary)]/10"
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
                className="w-full px-3 py-2 text-[var(--text-secondary)] bg-[var(--bg-primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] border border-[var(--accent-primary)]/10"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-[var(--accent-primary)] text-white py-2 px-4 rounded-md hover:bg-[var(--accent-secondary)] transition duration-300 flex items-center justify-center"
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
    <footer className="bg-[var(--bg-secondary)] text-[var(--text-secondary)] py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[var(--accent-primary)] mb-4">Tri-Valley Tech</h3>
            <p className="text-sm">Empowering high school innovators to create real-world impact through collaborative projects.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[var(--accent-primary)] mb-4">Quick Links</h4>
            <div className="space-y-8">
              <ul className="space-y-2">
                <li><Link to="/articles" className="hover:text-purple-300 transition duration-300">Articles</Link></li>
                <li><Link to="/team" className="hover:text-purple-300 transition duration-300">Team</Link></li>
                <li><Link to="/projects" className="hover:text-purple-300 transition duration-300">Projects</Link></li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[var(--accent-primary)] mb-4">Contact Us</h4>
            <p className="text-sm">Email: trivalleytechnology@gmail.com</p>
            <p className="text-sm">Phone: (470) 609-2206</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-[var(--accent-primary)] mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={20} />, href: "https://facebook.com" },
                { icon: <Twitter size={20} />, href: "https://twitter.com" },
                { icon: <Instagram size={20} />, href: "https://www.instagram.com/trivalleytech/profilecard/?igsh=NTc4MTIwNjQ2YQ==" },
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

  const TeamMember = ({ name, role, pronouns, bio, image, email, linkedin, portfolio, social, tags }) => {
    return (
      <div className="bg-[#161c24] rounded-lg p-8 flex flex-col items-center text-center">
        <img
          className="w-32 h-32 rounded-full mb-4 object-cover"
          src={image}
          alt={name}
        />
        <h3 className="text-xl font-semibold text-white">{name}</h3>
        {pronouns && <p className="text-sm text-gray-400 mt-1">{pronouns}</p>}
        <p className="text-indigo-400 font-medium mt-1">{role}</p>
        <p className="text-gray-300 mt-4 text-sm">{bio}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-gray-700 text-gray-400 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {email && (
            <p className="text-sm text-gray-400">
              <a href={`mailto:${email}`} className="hover:text-indigo-400">
                {email}
              </a>
            </p>
          )}
          {linkedin && (
            <p className="text-sm text-gray-400">
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                LinkedIn
              </a>
            </p>
          )}
          {portfolio && (
            <p className="text-sm text-gray-400">
              <a href={portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
                Portfolio
              </a>
            </p>
          )}
          {social && (
            <p className="text-sm text-gray-400">{social}</p>
          )}
        </div>
      </div>
    );
  };

  const TeamSection = () => {
    const teamMembers = {
      chiefSuite: [
        {
          name: 'Nikhilesh Suravarjjala',
          role: 'CEO',
          pronouns: 'he/him',
          bio: `As the co-CEO of Tri-Valley Tech, I am passionate about expanding my horizons in web and app development, management, and design. TVT gives me the opportunity to lead innovative tech solutions, from building user-focused platforms to creating impactful applications that address real-world challenges. As a designer, I enjoy exploring creative problem-solving while ensuring our projects meet the needs of the community. Beyond development, I am deeply committed to organizing community events that inspire and empower local youth, fostering connections and opportunities that drive growth and innovation. My goal is to bridge technology with societal impact, helping students turn their ideas into reality while making a lasting difference in their communities.`,
          image: 'https://drive.google.com/uc?export=view&id=1Cv0MPwfkscJ9_I_mjxCgOtxoM8TmlPsZ',
          email: 'niksuravarjjala@gmail.com',
          linkedin: '',
          social: '@nik.suravar',
          tags: ['Development', 'UI/UX Development', 'Event Planning', 'Research', 'Management']
        },
        {
          name: 'Amir Udler',
          role: 'CEO',
          pronouns: 'he/him',
          bio: 'Keep existing bio',
          image: '/images/placeholder-profile.jpg',
          tags: ['Management']
        },
        {
          name: 'Siddharth Alluri',
          role: 'CFO',
          pronouns: 'he/him',
          bio: `As the CFO at Tri-Valley Tech, I manage our finances to make sure our innovative projects are well-funded. My job is to ensure that our financial decisions support our mission of giving students practical, real-world experience. I handle budgeting and resource allocation, working closely with our executive team to make sure we use our funds wisely. This ensures students have the tools and resources they need to engage in their engineering projects that help them learn and grow. At Tri-Valley Tech, we aim to create an environment where students gain the technical skills needed to succeed in the tech industry, while ensuring our resources are effectively managed to support their learning.`,
          image: 'https://drive.google.com/uc?export=view&id=1R_1J6x_LkFG5oVOM4s_tGNAmqQIeqBQB',
          email: 'siddharth.alluri@gmail.com',
          social: 'instagram: siddharth.alluri',
          tags: ['Event Planning', 'Management']
        }
      ],
      officers: [
        {
          name: 'Diva Rawal',
          role: 'Interim COO',
          pronouns: 'she/her',
          bio: `Hi, I'm Diva Rawal, a sophomore at Dublin High School and the COO of Tri-Valley Tech! Over the past two years as class president at my high school, I've had the privilege to grow as a leader and collaborate with others to make a positive impact. I'm always eager to learn and try new things, whether it's exploring video production or creating apps designed to help others. Teaching and supporting those around me is something I'm passionate about, and I'm excited to continue making a difference through my role at Tri-Valley Tech.`,
          image: 'https://drive.google.com/uc?export=view&id=1nGdhcw_hvsEnNXV4t0rd73lUC6pAIJ0y',
          email: 'diva.rawal@gmail.com',
          linkedin: 'https://www.linkedin.com/in/diva-rawal-97a578345/',
          social: 'Instagram: @diva.rawal',
          tags: ['UI/UX Development', 'Graphic Design', 'Event Planning', 'Mentorship', 'Marketing', 'Management']
        },
        {
          name: 'Arjun',
          role: 'Officer',
          pronouns: '',
          bio: 'Information coming soon',
          image: '/images/placeholder-profile.jpg',
          tags: ['Management']
        }
      ],
      development: [
        {
          name: 'Oliver M',
          role: 'Intern',
          pronouns: 'he/him',
          bio: `Hi, my name is Oliver Merham, and I'm currently a sophmore at Dublin High School. I'm passionate about many things, including volleyball, photography,and engineering. In addition to my hobbies, I have big aspirations for my future. I dream of attending prestigious universities at France and pursuing a career at NASA, working on groundbreaking projects like the Mars rover. My favorite quote, "Do stuff now that your future self will thank you for," as it is what I live by. Outside of academics and career aspirations, I enjoy spending time with friends and family, exploring new places, and immersing myself in creative pursuits. Whether it's capturing the perfect shot with my camera or engineering things to make my life and the life of other easier.`,
          image: 'https://drive.google.com/uc?export=view&id=1c77S-lvipmObJmuDJPMHZiYHxcy7f_Wc',
          email: 'olivermerham08@gmail.com',
          portfolio: 'https://sites.google.com/mydusd.org/olivers-portfolio?usp=sharing',
          tags: ['Development']
        },
        {
          name: 'Alex Mao',
          role: 'Active Intern',
          pronouns: 'he/him',
          bio: `As an active intern at Tri-Valley Tech, I'm immersed in hands-on projects that directly contribute to the organization's growth and success. My role is to support various teams by taking on tasks that help streamline operations and push forward innovative initiatives. Whether it's assisting with research, working on technical problems, or contributing to projects, I aim to add value by applying the skills I'm learning in real-time. At Tri-Valley Tech, the internship program is designed not just to build technical skills, but also to give interns like me a deep understanding of how different parts of the organization work together to achieve our goals.`,
          image: 'https://drive.google.com/uc?export=view&id=1P4J435mzo47nGPNqgwq7kJLXKf6mOZvg',
          email: 'alexmao2019@gmail.com',
          social: 'Discord: swiftbutshaky',
          tags: ['Development', 'UI/UX Development']
        }
      ],
      design: [
        {
          name: 'Felix Brassard',
          role: 'Marketing and Design',
          pronouns: 'he/him',
          bio: 'Hi my name is Felix Brassard and I am a student at Dublin High School. I am working with a few peers on an app known as StudyLeaf, which is an ai software that helps make study guides for you such as your very own quizlets. My role in this development is in marketing and design where I seek to advertise this app and also making anything related to the app look appealing to the audience.',
          image: 'https://drive.google.com/uc?export=view&id=1IVeHxsUbMGOC23GVasWX28gjqMCCkZMm',
          email: 'felixjiangbrassard@gmail.com',
          tags: ['Graphic Design', 'Marketing']
        },
        {
          name: 'Tanvi Vangaru',
          role: 'Intern (Designing)',
          pronouns: 'she/her',
          bio: 'I have experience in design, including creating a logo for an app that provides personalized haircare assistance. Through this project, I developed skills in visual branding, creativity, and user-focused design. At TVT, I hope to further apply and expand my design abilities across the company, contributing to various creative projects and enhancing the overall design.',
          image: 'https://drive.google.com/uc?export=view&id=1oCmcykY1SSYZI0V5LqoCrT4WTpTAYnh_',
          email: 't.vangaru2009@gmail.com',
          linkedin: 'https://www.linkedin.com/in/tanvi-vangaru-2434b3349/',
          social: '@tanvivangaru - instagram',
          tags: ['Graphic Design', 'Marketing']
        },
        {
          name: 'Purandhar Ayalasomayajula',
          role: 'Active Intern',
          pronouns: 'he/him',
          bio: 'My name is Purandhar and I am an 8th grader at Wells Middle School. I joined the TVT by introduction from Nikhilesh Suravarjjala. Some of my skills include Design, Marketing, and assistance for others.',
          image: 'https://drive.google.com/uc?export=view&id=1_J375w6wGW5vALgHJ-4ORONccUmH-uY9',
          email: 'purandharayalasomayajula1@gmail.com',
          tags: ['Graphic Design', 'Marketing']
        }
      ]
    };

    return (
      <div className="py-16 bg-[#161c24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Our Team</h2>
            <p className="mt-4 text-xl text-gray-300">
              Meet the passionate individuals behind Tri-Valley Tech
            </p>
          </div>

          {/* Chief Suite Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white mb-8">Chief Suite</h3>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
              {teamMembers.chiefSuite.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>

          {/* Officers Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8">Officers</h3>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
              {teamMembers.officers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>

          {/* Development Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8">Development</h3>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
              {teamMembers.development.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>

          {/* Graphic Design and Socials Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8">Graphic Design and Socials</h3>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
              {teamMembers.design.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AppContent = () => {
    const { isDark } = useTheme();
    
    return (
      <div className="font-sans transition-colors duration-300 bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <ScrollFadeIn delay={0.2}>
          <Header />
        </ScrollFadeIn>
        <main>
          <ScrollFadeIn delay={0.4}>
            <section id="home">
              <Hero />
            </section>
          </ScrollFadeIn>
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
          <ScrollFadeIn>
            <section id="impact">
              <Impact />
            </section>
          </ScrollFadeIn>
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
  };

  const Web = () => {
    return <AppContent />;
  };

export { Header, Footer };
export default Web;