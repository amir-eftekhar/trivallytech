import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaNewspaper, FaCode, FaPalette, FaRocket, FaServer, FaBox, FaArrowLeft, FaUsers, FaPlus } from 'react-icons/fa';
import { Header, Footer } from './page.jsx';
import { articles as additionalArticles } from './data/articles.js';
import { Plus } from 'lucide-react';
import { articlesApi } from './lib/supabase';
import { isAdmin } from './lib/adminAuth';

// Fallback articles data
const fallbackArticles = [
  {
    id: 'article-1',
    title: "Creating our website",
    excerpt: "Explore the diverse range of technologies, libraries, and tools that have come together to create our dynamic website, providing a seamless and engaging experience for our visitors.",
    icon: <FaCode className="text-[var(--accent-primary)] text-4xl mb-4" />,
    contributors: ["Amir Eftekhar"],
    content: `Creating our website 

Creating a compelling and user-friendly website is a blend of art and technology. At Tri-Valley Tech, our mission to empower young innovators is reflected not only in our initiatives but also in the digital platform we've built to support them. This article explores the diverse range of technologies, libraries, and tools that have come together to create our dynamic website, providing a seamless and engaging experience for our visitors.

React.js: Building a Robust Foundation

Our website is built on React.js, a leading JavaScript library developed by Facebook. React's component-based architecture allows us to break down the user interface into reusable, self-contained pieces, making the development process more efficient and the codebase easier to maintain. Each section of our website, from the header to the footer, is encapsulated within its own React component. This modular approach not only promotes reusability but also simplifies collaboration among our development team, as different members can work on separate components without causing conflicts. React's powerful state management capabilities, particularly through hooks like useState and useEffect, enable our website to respond dynamically to user interactions and system events. For instance, the state of the mobile menu is managed using useState, allowing it to toggle smoothly based on user clicks. Additionally, useEffect is utilized to handle side effects such as listening for scroll events, which adjust the styling of the header to enhance user experience as they navigate the page. This responsiveness ensures that our website feels alive and interactive, providing users with a seamless browsing experience.

Tailwind CSS: Designing with Precision

To achieve a modern and visually appealing design, we rely on Tailwind CSS, a utility-first CSS framework that offers unparalleled flexibility and control over styling. Unlike traditional CSS frameworks that provide predefined components, Tailwind allows us to apply utility classes directly within our HTML, enabling precise customization without the need for extensive custom CSS. This approach accelerates the design process and ensures consistency across different sections of the website.
Tailwind's comprehensive set of utility classes, such as bg-gradient-to-br for gradient backgrounds and text-purple-400 for text coloration, allows us to craft sophisticated and responsive designs effortlessly. The framework's responsive design utilities ensure that our website looks and functions beautifully on all devices, from mobile phones to large desktop screens. By leveraging Tailwind's capabilities, we can maintain a consistent design language throughout the website while also being able to swiftly adapt to design changes or new requirements.

Framer Motion: Bringing Animations to Life

To enhance the user experience with smooth and engaging animations, we incorporate Framer Motion, a powerful animation library for React. Framer Motion simplifies the creation of complex animations and transitions, allowing us to add motion to our website without the need for intricate animation code.
With Framer Motion, we animate various elements such as the header's entrance, button interactions, and section transitions. For example, the header gracefully slides into view with a spring-like motion when the page loads, creating a welcoming effect. Buttons throughout the site feature subtle scaling animations on hover and tap, making interactions feel more responsive and tactile. Additionally, sections like the mobile menu utilize animated transitions to appear and disappear seamlessly, ensuring that navigation remains fluid and intuitive. These animations not only enhance the visual appeal of the website but also guide users' attention to key elements, improving overall usability.

Lucide-React: Enhancing Visual Communication

Visual elements play a crucial role in conveying information and enhancing the aesthetic appeal of our website. We use Lucide-React, a versatile icon library, to incorporate a wide range of icons that complement our design and functionality needs. Lucide-React offers a comprehensive collection of scalable and customizable icons, ensuring consistency and clarity across the website.Icons such as Users, Rocket, Lightbulb, and Globe are strategically used to represent different sections and features, making navigation more intuitive. Social media icons like Facebook, Twitter, Instagram, and Linkedin are seamlessly integrated into the footer, providing users with clear pathways to connect with us on various platforms. By utilizing Lucide-React, we ensure that our icons are not only visually appealing but also maintain high quality across different devices and screen resolutions, contributing to a cohesive and professional visual identity.

TypeWriter Component: Adding Interactive Flair to Text

To make our textual content more engaging, we developed a custom TypeWriter component. This component simulates the effect of typing text dynamically, adding a layer of interactivity and modernity to our website. The TypeWriter effect draws users' attention to key messages, making the content more memorable and impactful.
The TypeWriter component leverages React's useState and useEffect hooks to manage the display of text character by character, controlled by a specified delay. This effect is applied to various headings and sections, such as the main headline "Empowering Young Innovators" and key feature titles. By animating the text in this manner, we create a sense of progression and anticipation, encouraging users to engage more deeply with our content. The subtle animation adds a dynamic touch without overwhelming the user, maintaining a balance between interactivity and readability.

React Router DOM: Facilitating Seamless Navigation

Effective navigation is essential for a positive user experience, and React Router DOM plays a crucial role in achieving this. As a standard library for routing in React applications, React Router DOM enables seamless navigation between different sections and pages without requiring full page reloads. This results in faster transitions and a smoother browsing experience. In our website, the Link component from React Router DOM is used to create navigable links that direct users to specific sections like "Projects" or "Join Us". This ensures that users can effortlessly move through the site, accessing the information they seek without unnecessary delays. Additionally, by maintaining the application's state during navigation, React Router DOM helps preserve user context, making the browsing experience more intuitive and user-friendly.

State Management with Hooks: Ensuring Responsiveness

React's useState and useEffect hooks are fundamental in managing the state and side effects within our application. These hooks allow us to create interactive and responsive components that react to user inputs and system events in real-time.
For instance, the useState hook manages the visibility of the mobile menu, toggling its display based on user interaction. Similarly, the useEffect hook listens for scroll events to adjust the header's styling dynamically, providing visual feedback as users navigate the page. This responsiveness ensures that our website feels interactive and alive, enhancing the overall user experience.

Hosting and Deployment: GitHub Pages and SquareSpace Domains

Ensuring that our website is accessible to users worldwide involves strategic choices in hosting and domain management. We selected GitHub Pages for hosting and SquareSpace for domain management, leveraging the strengths of both platforms to deliver a reliable and professional online presence.
GitHub Pages offers seamless integration with our Git repositories, allowing us to host our website directly from our GitHub repository with minimal configuration. This not only simplifies the deployment process but also ensures that our site benefits from GitHub's robust infrastructure, providing high availability and uptime. GitHub Pages supports static site hosting, making it an ideal choice for our React-based application, which can be efficiently built and served as static assets.
For domain registration and management, we opted for SquareSpace Domains due to its user-friendly interface and reliable services. SquareSpace allows us to secure a memorable and professional domain name that aligns with our brand identity. Integrating SquareSpace with GitHub Pages ensures that our domain points correctly to our hosted site, maintaining brand consistency and accessibility. Additionally, SquareSpace provides essential domain management features, such as DNS configuration and domain privacy, enhancing the security and professionalism of our online presence.

Package Management with npm: Streamlining Development

npm (Node Package Manager) is an indispensable tool in modern web development, managing the dependencies and packages required for our project. By utilizing npm, we efficiently install and manage libraries like React, Framer Motion, Lucide-React, and Tailwind CSS, ensuring that our project remains up-to-date and consistent across different development environments.The package.json file serves as a blueprint for our project, keeping track of all dependencies and scripts necessary for building, testing, and deploying the application. This allows for easy collaboration among team members, as they can quickly set up the project by installing the required packages with a single command. Moreover, npm scripts automate repetitive tasks, such as building the project for production or running development servers, streamlining our workflow and reducing the potential for errors.

Asset Management: Optimizing Images and Media for Performance

Managing assets like images and media is crucial for website performance and user engagement. We employ several strategies to optimize these assets, ensuring quick loading times and a visually appealing experience. Images are optimized to balance quality and performance, ensuring that visuals remain crisp and clear across various devices without significantly impacting loading speeds. By using scalable formats and compressing assets, we enhance performance and reduce the time it takes for pages to render, improving overall user satisfaction. Embedded media, such as interactive 3D elements and responsive iframes, are carefully integrated to maintain aspect ratios and ensure that they adapt seamlessly to different screen sizes. This approach allows us to provide rich multimedia content that engages users without compromising the website's performance.

Interactive Elements and Animations: Creating an Engaging User Journey

Beyond foundational technologies, our website incorporates various interactive elements and animations to create a captivating user journey. These features not only enhance the aesthetic appeal of the site but also guide users through the content in an intuitive manner.
One standout feature is the RotatingCube component, an interactive 3D cube that utilizes CSS transformations and animations to rotate and display different facets, each representing key aspects of Tri-Valley Tech. This cube serves as a focal point in the Hero section, drawing users' attention and inviting them to explore more about our mission and values. The dynamic rotation and visually appealing design make the cube both informative and engaging, providing a memorable visual element that differentiates our website from others.

Additionally, Framer Motion's AnimatePresence and motion components manage the entrance and exit animations of elements like the mobile menu and section transitions. These animations ensure that elements appear and disappear smoothly, enhancing the overall fluidity of the website. Subtle hover and tap effects on interactive elements such as buttons and icons provide immediate visual feedback, making interactions feel more responsive and engaging. These micro-interactions contribute to a polished and professional user experience, encouraging users to interact more deeply with the content.

Deployment Strategies: Ensuring Reliability and Scalability

Deploying our website involves strategic considerations to ensure reliability and scalability. Hosting on GitHub Pages provides us with a robust infrastructure capable of handling varying traffic loads, ensuring that our site remains accessible to our audience at all times. Additionally, by integrating continuous deployment workflows, we can automatically deploy updates and changes as they are pushed to our GitHub repository. This ensures that our website remains up-to-date with the latest features and improvements without manual intervention.

Moreover, by leveraging GitHub's version control capabilities, we maintain a clear and organized development history, making it easier to track changes, revert to previous versions if necessary, and collaborate effectively as a team. This streamlined deployment process not only enhances our productivity but also ensures that our website remains reliable and performant as it grows and evolves.

`

  },


  {
    id: 'article-2',
    title: "Why Join Tri-Valley Tech",
    excerpt: "Discover the compelling reasons to become part of Tri-Valley Tech, from hands-on experience and collaborative projects to mentorship and portfolio building opportunities.",
    contributors: ["Nikhilesh Suravarjjala"],
    icon: <FaUsers className="text-[var(--accent-primary)] text-4xl mb-4" />,
    content: `
At Tri-Valley Tech (TVT), we believe that high school students are capable of creating real-world change through innovation and collaboration. Our nonprofit organization offers students a unique platform to take their skills to the next level while making a positive impact in their communities.
Here's why joining TVT is a great opportunity:
Hands-on Experience in Technology and Engineering: 
TVT provides members with the chance to dive deep into fields like computer science, web development, and engineering. You'll get the opportunity to work on cutting-edge projects, learning practical skills that go beyond the classroom.


Collaborative Real-World Projects: 
As part of our team, you won't just work on hypothetical problems—you'll contribute to real-time engineering projects with clear goals and measurable outcomes. This experience is invaluable for students interested in pursuing careers in STEM, as it provides a true taste of what it's like to work on a project from start to finish.

Mentorship and Skill Development: 
TVT connects you with experienced mentors who can help guide you through your projects and personal growth. Whether you're a tech enthusiast, a budding entrepreneur, or an environmental activist, you'll gain skills that will help you in your future career, from project management to technical problem-solving.

A Strong Portfolio for College Applications: Colleges and employers are always looking for students who demonstrate initiative, teamwork, and problem-solving abilities. By working on impactful projects at TVT, you'll build a portfolio that showcases your skills and your dedication to using technology for good.
Volunteer Hours for Productivity: One of the most unique benefits of TVT is the ability to earn volunteer hours, not only for your direct contributions but also for productive discussions and collaboration on platforms like Discord. It's a great way to maximize your involvement while earning hours that make a difference for your community and college applications.

By joining TVT, you're not just gaining technical experience; you're becoming part of a community that shares your passion for creating change. Whether you're interested in technology, environmental causes, or another field, there's a place for you at TVT.
Ready to turn your ideas into reality? Join us today and start making an impact! 
`

  
  },
  ...additionalArticles
];
const ArticleWidget = ({ article, onClick }) => {
  const previewLength = 300;
  const preview = article.excerpt.slice(0, previewLength) + (article.excerpt.length > previewLength ? '...' : '');

  return (
    <motion.div
      className="bg-[var(--bg-primary)] p-6 rounded-lg shadow-lg cursor-pointer mb-8 border border-[var(--accent-primary)]/10"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(article)}
    >
      <div className="flex items-center mb-4">
        {article.icon || <FaNewspaper className="text-[var(--accent-primary)] text-4xl mb-4" />}
        <div className="ml-4">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{article.title}</h3>
          <p className="text-sm text-[var(--text-secondary)] italic mt-1">
            Key contributors: {article.contributors?.join(", ") || "Unknown"}
          </p>
        </div>
      </div>
      <p className="text-[var(--text-secondary)] text-lg">{preview}</p>
      <div className="mt-4 flex justify-end">
        <span className="relative z-10 text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] transition duration-300">Read more →</span>
      </div>
    </motion.div>
  );
};

const FullArticle = ({ article, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-5"></div>
    <Header />
    <div className="container mx-auto px-4 py-20 mt-20 relative z-10">
      <button
        onClick={onClose}
        className="flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-8 transition-colors duration-200"
      >
        <FaArrowLeft className="mr-2" /> Back to Articles
      </button>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
      >
        {article.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-[var(--text-secondary)] italic mb-12"
      >
        By {article.contributors?.join(", ") || "Unknown"}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="prose prose-lg max-w-none text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap"
      >
        {article.content}
      </motion.div>
    </div>
    <Footer />
  </motion.div>
);

const Article = () => {
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState(fallbackArticles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    loadArticles();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const adminStatus = await isAdmin();
    setIsAdminUser(adminStatus);
  };

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await articlesApi.getArticles();
      // Combine Supabase articles with fallback articles
      const combinedArticles = [...(data || []), ...fallbackArticles];
      setArticles(combinedArticles);
      setError(null);
    } catch (err) {
      console.error('Error loading articles:', err);
      // If there's an error, use fallback articles
      setArticles(fallbackArticles);
      setError('Error loading articles from database. Showing cached articles.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddArticle = () => {
    if (!isAdminUser) {
      return;
    }
    navigate('/articles/create');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {selectedArticle ? (
        <FullArticle
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      ) : (
        <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-5"></div>
          <Header />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 py-20 mt-20"
          >
            <div className="flex justify-between items-center mb-12 relative z-20">
              <motion.h1
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Tri-Valley Tech Articles
              </motion.h1>
              {isAdminUser && (
                <button
                  onClick={handleAddArticle}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-primary)]/90 transition-colors cursor-pointer relative z-20"
                  style={{ position: 'relative' }}
                >
                  <Plus size={20} className="mr-2" />
                  Add Article
                </button>
              )}
            </div>
            {error && (
              <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-500 px-4 py-2 rounded-lg mb-6 text-center">
                {error}
              </div>
            )}
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[var(--text-secondary)] text-lg">No articles found.</p>
              </div>
            ) : (
              articles.map((article) => (
                <ArticleWidget
                  key={article.id}
                  article={article}
                  onClick={setSelectedArticle}
                />
              ))
            )}
          </motion.div>
          <Footer />
        </div>
      )}
    </AnimatePresence>
  );
};

export default Article;