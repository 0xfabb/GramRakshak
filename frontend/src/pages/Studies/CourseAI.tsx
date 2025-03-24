import { useState, useEffect, useRef } from 'react';
import { CircularProgress } from '@mui/material';
// Import icons
import SendIcon from '@mui/icons-material/Send';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CodeIcon from '@mui/icons-material/Code';
import ShieldIcon from '@mui/icons-material/Shield';
import PsychologyIcon from '@mui/icons-material/Psychology';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

// Define TypeScript interfaces
interface Message {
  sender: 'user' | 'ai';
  content: string;
}

interface Resource {
  id: number;
  type: 'video' | 'article';
  title: string;
  description: string;
  image: string;
  duration?: string;
  readTime?: string;
  url: string;
  tags: string[];
}

interface CourseResources {
  programming: Resource[];
  cybersecurity: Resource[];
  artificial_intelligence: Resource[];
  [key: string]: Resource[];
}

// Sample course data - in a real app, you'd fetch this from an API
const courseResources = {
  programming: [
    {
      id: 1,
      type: 'video',
      title: 'Advanced JavaScript Techniques',
      description: 'Learn about closures, prototypes, and ES6+ features',
      image: 'https://source.unsplash.com/random/300x200?javascript',
      duration: '45 min',
      url: 'https://example.com/js-advanced',
      tags: ['JavaScript', 'Advanced', 'Web Development']
    },
    {
      id: 2,
      type: 'article',
      title: 'Understanding React Hooks',
      description: 'A comprehensive guide to React hooks and functional components',
      image: 'https://source.unsplash.com/random/300x200?react',
      readTime: '12 min',
      url: 'https://example.com/react-hooks',
      tags: ['React', 'Frontend', 'Hooks']
    },
    {
      id: 3,
      type: 'video',
      title: 'Python for Data Science',
      description: 'Introduction to NumPy, Pandas and data visualization',
      image: 'https://source.unsplash.com/random/300x200?python',
      duration: '60 min',
      url: 'https://example.com/python-data-science',
      tags: ['Python', 'Data Science', 'NumPy']
    },
  ],
  cybersecurity: [
    {
      id: 4,
      type: 'article',
      title: 'Ethical Hacking Fundamentals',
      description: 'Learn the basics of penetration testing and ethical hacking',
      image: 'https://source.unsplash.com/random/300x200?security',
      readTime: '15 min',
      url: 'https://example.com/ethical-hacking',
      tags: ['Cybersecurity', 'Ethical Hacking', 'Pentesting']
    },
    {
      id: 5,
      type: 'video',
      title: 'Network Security Protocols',
      description: 'Understanding SSL/TLS, IPsec, and other security protocols',
      image: 'https://source.unsplash.com/random/300x200?network',
      duration: '55 min',
      url: 'https://example.com/network-security',
      tags: ['Network', 'Security', 'Protocols']
    },
  ],
  artificial_intelligence: [
    {
      id: 6,
      type: 'video',
      title: 'Introduction to Machine Learning',
      description: 'Understanding supervised and unsupervised learning techniques',
      image: 'https://source.unsplash.com/random/300x200?ai',
      duration: '65 min',
      url: 'https://example.com/intro-ml',
      tags: ['Machine Learning', 'AI', 'Data Science']
    },
    {
      id: 7,
      type: 'article',
      title: 'Building Neural Networks with TensorFlow',
      description: 'Step-by-step guide to creating neural networks',
      image: 'https://source.unsplash.com/random/300x200?neural',
      readTime: '20 min',
      url: 'https://example.com/tensorflow-guide',
      tags: ['TensorFlow', 'Neural Networks', 'Deep Learning']
    },
  ]
};

// Sample suggested topics
const suggestedTopics = [
  'JavaScript Basics', 
  'Python Data Structures', 
  'Cybersecurity Best Practices', 
  'React Components', 
  'Machine Learning Algorithms',
  'Network Security',
  'Database Design'
];

const CourseAI: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    { sender: 'ai', content: "Hello! I'm your AI learning assistant. What would you like to learn about today?" }
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('programming');
  const [savedResources, setSavedResources] = useState<number[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Mock function to simulate Gemini API call
  const askGemini = async (userQuery: string): Promise<string> => {
    setLoading(true);
    
    // In a real app, you would call the actual Gemini API here
    // For demo purposes, we'll simulate a delay and response
    return new Promise((resolve) => {
      setTimeout(() => {
        let response: string;
        if (userQuery.toLowerCase().includes('javascript')) {
          response = "JavaScript is a high-level programming language primarily known for adding interactivity to web pages. Key concepts include variables, functions, DOM manipulation, and asynchronous programming with promises. Would you like me to explain any specific JavaScript concept in more detail?";
        } else if (userQuery.toLowerCase().includes('python')) {
          response = "Python is a versatile, high-level programming language known for its readability and simplicity. It's widely used in data science, web development, automation, and AI. Python's key features include dynamic typing, comprehensive standard library, and extensive third-party packages. What specific aspect of Python would you like to learn more about?";
        } else if (userQuery.toLowerCase().includes('cybersecurity')) {
          response = "Cybersecurity involves protecting systems, networks, and programs from digital attacks. Key concepts include encryption, authentication, vulnerability assessment, and threat modeling. Would you like to learn about specific cybersecurity techniques or best practices?";
        } else {
          response = "That's an interesting topic! I can help you learn about it step by step. Let's start with the fundamentals. Would you like me to recommend some resources or explain core concepts first?";
        }
        resolve(response);
        setLoading(false);
      }, 1500);
    });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { sender: 'user', content: message };
    setChatHistory([...chatHistory, userMessage]);
    setMessage('');
    
    // Get AI response
    const aiResponse = await askGemini(message);
    const aiMessage: Message = { sender: 'ai', content: aiResponse };
    setChatHistory(prev => [...prev, aiMessage]);
  };

  const handleSuggestionClick = (topic: string) => {
    setMessage(topic);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleCategoryChange = (newValue: string) => {
    setCategory(newValue);
  };

  const toggleSaveResource = (id: number) => {
    if (savedResources.includes(id)) {
      setSavedResources(savedResources.filter(resourceId => resourceId !== id));
    } else {
      setSavedResources([...savedResources, id]);
    }
  };

  // Auto-scroll to bottom of chat when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 py-8 px-4">
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-2 bg-purple-600 text-white rounded-xl mb-4">
          <SchoolIcon className="text-3xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">AI Learning Hub</h1>
        <p className="text-gray-600 max-w-xl mx-auto">Explore, learn, and grow with AI-powered guidance and curated educational resources</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Assistant Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4 px-6">
            <h2 className="text-white text-xl font-semibold flex items-center">
              <PsychologyIcon className="mr-2" />
              AI Learning Assistant
            </h2>
          </div>
          
          {/* Chat Messages */}
          <div className="h-[450px] overflow-y-auto p-6 bg-gray-50 flex flex-col space-y-4">
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`${
                  msg.sender === 'user' 
                    ? 'ml-auto bg-indigo-600 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' 
                    : 'mr-auto bg-white shadow-md text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl border border-gray-200'
                } p-4 max-w-[75%]`}
              >
                <p className="text-sm md:text-base">{msg.content}</p>
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-white shadow-md text-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl border border-gray-200 p-4 max-w-[75%] flex items-center">
                <CircularProgress size={20} className="mr-2 text-indigo-600" />
                <p>Thinking...</p>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about any topic..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !message.trim()}
                className={`p-3 rounded-full ${
                  loading || !message.trim() 
                    ? 'bg-gray-200 text-gray-400' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                } transition-colors`}
              >
                <SendIcon />
              </button>
            </div>
            
            {/* Suggested Topics */}
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2 flex items-center">
                <LightbulbIcon className="text-yellow-500 mr-1" fontSize="small" />
                Suggested Topics:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(topic)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-indigo-100 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Learning Resources Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4 px-6">
            <h2 className="text-white text-xl font-semibold">Learning Resources</h2>
          </div>
          
          {/* Category Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => handleCategoryChange('programming')}
              className={`flex items-center justify-center py-4 px-6 ${
                category === 'programming'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <CodeIcon className="mr-2" />
              <span>Programming</span>
            </button>
            <button
              onClick={() => handleCategoryChange('cybersecurity')}
              className={`flex items-center justify-center py-4 px-6 ${
                category === 'cybersecurity'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ShieldIcon className="mr-2" />
              <span>Cybersecurity</span>
            </button>
            <button
              onClick={() => handleCategoryChange('artificial_intelligence')}
              className={`flex items-center justify-center py-4 px-6 ${
                category === 'artificial_intelligence'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <PsychologyIcon className="mr-2" />
              <span>AI & ML</span>
            </button>
          </div>
          
          {/* Resource Cards */}
          <div className="p-6 overflow-y-auto h-[510px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courseResources[category].map((resource) => (
                <div 
                  key={resource.id} 
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 border border-gray-200"
                >
                  <div className="relative">
                    <img 
                      src={resource.image} 
                      alt={resource.title}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveResource(resource.id);
                      }}
                      className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      {savedResources.includes(resource.id) ? (
                        <BookmarkIcon className="text-indigo-600" />
                      ) : (
                        <BookmarkBorderIcon className="text-gray-600" />
                      )}
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-4">
                      <div className="flex items-center text-white">
                        {resource.type === 'video' ? (
                          <>
                            <PlayCircleOutlineIcon className="mr-1" fontSize="small" />
                            <span className="text-xs">{resource.duration} video</span>
                          </>
                        ) : (
                          <>
                            <ArticleIcon className="mr-1" fontSize="small" />
                            <span className="text-xs">{resource.readTime} read</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <a 
                      href={resource.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      View Resource
                      <ArrowForwardIosIcon fontSize="small" className="ml-1" style={{ fontSize: '0.8rem' }} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Browse All Button */}
            <div className="flex justify-center mt-8">
              <button className="px-6 py-2.5 bg-white border border-indigo-600 text-indigo-600 rounded-full flex items-center hover:bg-indigo-50 transition-colors">
                Browse All Resources
                <ArrowForwardIosIcon fontSize="small" className="ml-1" style={{ fontSize: '0.8rem' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAI;