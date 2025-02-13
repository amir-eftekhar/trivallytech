import React, { useState, useEffect } from 'react';
import { motion} from 'framer-motion';
import { Header } from './page.jsx';

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

const FounderCard = ({ name, role, image, bio }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimatingText, setIsAnimatingText] = useState(false);
  
    const handleFlip = () => {
      if (!isFlipped) {
        setIsAnimatingText(true);
      }
      setIsFlipped(!isFlipped);
    };
  
    return (
      <motion.div 
        className="w-80 h-80 cursor-pointer perspective"
        onClick={handleFlip}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="w-full h-full relative preserve-3d transition-transform duration-500"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          {/* Front of the card */}
          <div className="absolute w-full h-full backface-hidden bg-gray-800 rounded-lg shadow-neon overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-4">
              <h3 className="text-xl font-bold text-purple-400">{name}</h3>
              <p className="text-gray-300">{role}</p>
            </div>
          </div>
          
          {/* Back of the card */}
          <div className="absolute w-full h-full backface-hidden bg-gray-800 rounded-lg shadow-neon overflow-hidden rotate-y-180 p-4">
            <h3 className="text-xl font-bold text-purple-400 mb-2">{name}</h3>
            <p className="text-gray-300 text-sm h-64 overflow-y-auto">
              {isAnimatingText ? <TypeWriter text={bio} /> : bio}
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  };
  
const Meet = () => {
  const founders = [
    {
      name: "Amir Eftekhar",
      role: "CEO & Co-founder",
      image: "/api/placeholder/200/200",
      bio: "alsdkj lkajsdlkja lkjdlaksjd lkajsdlk laksjdl lwkjlkjlakjdlkj glfksj laslkj asldfkjalskdfj alsfkj lksfdj lsakfj slkfj sflkj lfdsk jlkdsfj lskdfj sldfj lskdjf lskdjf ls dfkljllkfdj lskfjd l sldkfj l slfjllsdkfj  lfdlksdj lskdjf lkjdf skfj lksjf lasdfj lkd flkdf lsdkf ldkf lksdfj sldfk "
    },
    {
      name: "Arjun Carkraborthy",
      role: "CFO & co-founder",
      image: "/api/placeholder/200/200",
      bio: "alsdkj lkajsdlkja lkjdlaksjd lkajsdlk laksjdl lwkjlkjlakjdlkj glfksj laslkj asldfkjalskdfj alsfkj lksfdj lsakfj slkfj sflkj lfdsk jlkdsfj lskdfj sldfj lskdjf lskdjf ls dfkljllkfdj lskfjd l sldkfj l slfjllsdkfj  lfdlksdj lskdjf lkjdf skfj lksjf lasdfj lkd flkdf lsdkf ldkf lksdfj sldfk "
    },
    {
      name: "Siddarth Aluri",
      role: "COO & Co-founder",
      image: "/api/placeholder/200/200",
      bio: "alsdkj lkajsdlkja lkjdlaksjd lkajsdlk laksjdl lwkjlkjlakjdlkj glfksj laslkj asldfkjalskdfj alsfkj lksfdj lsakfj slkfj sflkj lfdsk jlkdsfj lskdfj sldfj lskdjf lskdjf ls dfkljllkfdj lskfjd l sldkfj l slfjllsdkfj  lfdlksdj lskdjf lkjdf skfj lksjf lasdfj lkd flkdf lsdkf ldkf lksdfj sldfk ."
    },
   
  ];

  return (
    <div>
      <Header />
      <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">Meet the Founders</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {founders.map((founder, index) => (
              <FounderCard key={index} {...founder} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Meet;