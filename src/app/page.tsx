"use client";

import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Mail,
  Menu,
  X,
  Clock,
  Rocket,
  Star,
  Compass,
  Flame,
  MapPin,
  Building,
  Globe,
  Shield,
  Award,
  Cloud,
  Cpu,
  Users as TeamIcon,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveLink?: string;
};

type ProjectCategory = "projects";

type NavItem = {
  label: string;
  href: string;
};

type Bat = {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  flapSpeed: number;
  startDelay: number;
};

type Service = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
};

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
};

export default function CaveCodePortfolio() {
  const [activeSection] = useState<ProjectCategory>("projects");
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [crystals, setCrystals] = useState<Array<{ id: number; x: number; y: number; size: number; glow: number }>>([]);
  const [rockfall, setRockfall] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [stalactites, setStalactites] = useState<Array<{ id: number; x: number; y: number; length: number; delay: number }>>([]);
  const [torchFlicker, setTorchFlicker] = useState(1);
  const [bats, setBats] = useState<Bat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const entranceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const isEntranceInView = useInView(entranceRef, { once: true });
  const isProjectsInView = useInView(projectsRef, { once: true });
  const isAboutInView = useInView(aboutRef, { once: true });
  const isContactInView = useInView(contactRef, { once: true });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navItems: NavItem[] = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Company", href: "#company" },
    { label: "Contact", href: "#contact" },
  ];

  const projects: Record<ProjectCategory, Project[]> = {
    projects: [
      {
        id: 1,
        title: "LINMO | Sports & Wellness",
        description: "We developed the frontend of a data-driven dashboard that provides users with a comprehensive overview of fitness, sports, and wellness metrics. The solution focuses on responsive layout architecture, interactive data visualizations (including charts and tables), and efficient state management to ensure smooth navigation, high performance, and a scalable, user-friendly experience across devices.",
        technologies: ["Next.js", "TypeScript", "TailwindCSS", "Redux", "Firebase", "Stripe"],
        liveLink: "https://www.home.linmo.app"
      },
      {
        id: 2,
        title: "Camp Quest",
        description: "A scalable, role-based event management system with Super Admin, Admin, and User roles, supporting full lifecycle management of events, camps, articles, and job listings. The platform implements access control, modular content management, and a responsive, user-friendly dashboard for streamlined operations.",
        technologies: ["Next.js", "TypeScript", "Redux Toolkit", "WebSockets", "TailwindCSS"],
        liveLink: "https://demo.cavecode.dev/healthcare"
      },
      {
        id: 3,
        title: "Bossnet Mobile App",
        description: "For BossNet Social Media, we contributed as both Mobile Application and Backend Developers, designing and implementing an advanced professional networking platform. The mobile application was built with a focus on delivering a seamless, modern, and intuitive user experience, while the backend infrastructure was engineered to support real-time communication, secure authentication, and high-performance data processing. The platform emphasizes scalability, reliability, and usability, setting a strong foundation for efficient professional networking and interaction.",
        technologies: ["React Native", "Node.js", "MongoDB", "AWS", "Firebase", "Redux Toolkit", "Ios", "Android"],
      },
      {
        id: 4,
        title: "Gomago Mobile App",
        description: "Mago is a mobile app for content management, sales tracking, and marketing automation. As a Mobile App Developer, I implemented the UI and design, enhanced user interactions, and integrated APIs for smooth data flow. The app delivers a responsive, intuitive, and visually appealing experience across Android and iOS devices.",
        technologies: ["React Native", "Node.js", "MongoDB", "AWS", "Firebase", "Redux Toolkit", "Ios", "Android"]
      },
      {
        id: 5,
        title: "LessonX Mobile App",
        description: "LessonX is an interactive mobile learning platform aimed at making online education simple, engaging, and accessible. As part of the development team, we focused on debugging critical issues, enhancing UI interactions, and optimizing app performance across Android and iOS. Contributions included improving stability, boosting responsiveness, and ensuring a smooth, reliable, and user-friendly learning experience for all users.",
        technologies: ["React Native", "Node.js", "MongoDB", "AWS", "Firebase", "Redux Toolkit", "Bug Fixes", "Ios", "Android"],
      },
    ],
  };

  const stats = [
    { label: "Projects Delivered", value: "150+", icon: <Rocket className="w-5 h-5 md:w-6 md:h-6" /> },
    { label: "Years Experience", value: "8+", icon: <Clock className="w-5 h-5 md:w-6 md:h-6" /> },
    { label: "Global Clients", value: "80+", icon: <Globe className="w-5 h-5 md:w-6 md:h-6" /> },
    { label: "Team Members", value: "50+", icon: <TeamIcon className="w-5 h-5 md:w-6 md:h-6" /> },
    { label: "Uptime", value: "99.99%", icon: <Shield className="w-5 h-5 md:w-6 md:h-6" /> },
    { label: "Client Satisfaction", value: "98%", icon: <Award className="w-5 h-5 md:w-6 md:h-6" /> },
  ];

  const services: Service[] = [
    {
      id: 1,
      title: "Full Stack Development",
      description: "End-to-end web application development with modern frameworks and cloud infrastructure.",
      icon: <Code className="w-8 h-8 text-amber-glow" />,
      features: ["React/Next.js", "Node.js/Express", "TypeScript", "Cloud Deployment", "CI/CD Pipelines"]
    },
    {
      id: 2,
      title: "Enterprise Solutions",
      description: "Scalable enterprise applications designed for performance, security, and reliability.",
      icon: <Building className="w-8 h-8 text-amber-glow" />,
      features: ["Microservices", "API Development", "Database Design", "Security Implementation", "System Integration"]
    },
    {
      id: 3,
      title: "Mobile Development",
      description: "Cross-platform mobile applications for iOS and Android with native performance.",
      icon: <Smartphone className="w-8 h-8 text-amber-glow" />,
      features: ["React Native", "Flutter", "iOS/Android", "Push Notifications", "App Store Deployment"]
    },
    {
      id: 4,
      title: "Cloud Migration",
      description: "Seamless migration of legacy systems to modern cloud infrastructure.",
      icon: <Cloud className="w-8 h-8 text-amber-glow" />,
      features: ["AWS/Azure/GCP", "Containerization", "Serverless", "Cost Optimization", "Disaster Recovery"]
    },
    {
      id: 5,
      title: "Digital Transformation",
      description: "Comprehensive digital strategy and implementation for business growth.",
      icon: <TrendingUp className="w-8 h-8 text-amber-glow" />,
      features: ["Process Automation", "Data Analytics", "AI Integration", "Workflow Optimization", "Training & Support"]
    },
    {
      id: 6,
      title: "DevOps & CI/CD",
      description: "Automated deployment pipelines and infrastructure as code for rapid delivery.",
      icon: <Cpu className="w-8 h-8 text-amber-glow" />,
      features: ["Docker/Kubernetes", "Jenkins/GitLab", "Monitoring", "Infrastructure as Code", "Performance Tuning"]
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO",
      company: "FinTech Global",
      content: "CaveCode transformed our banking platform with exceptional performance and security. Their team delivered beyond expectations.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Director",
      company: "HealthCare Plus",
      content: "The healthcare system they built is both secure and user-friendly. Their attention to compliance was impressive.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "CEO",
      company: "EduTech Solutions",
      content: "Our learning platform scaled seamlessly to 50,000+ users. CaveCode's expertise was invaluable to our growth.",
      rating: 5
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Operations Director",
      company: "Retail Chain Inc.",
      content: "The e-commerce platform increased our sales by 40%. Professional team and outstanding results.",
      rating: 5
    },
  ];

  useEffect(() => {
    const crystalCount = isMobile ? 60 : 120;
    const crystalsArray = Array.from({ length: crystalCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      glow: Math.random() * 0.5 + 0.5
    }));

    setCrystals(crystalsArray);

    const rockfallCount = isMobile ? 2 : 4;
    const rockfallArray = Array.from({ length: rockfallCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -50,
      delay: Math.random() * 5
    }));
    setRockfall(rockfallArray);

    const stalactiteCount = isMobile ? 20 : 40;
    const stalactitesArray = Array.from({ length: stalactiteCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      length: Math.random() * 40 + 20,
      delay: Math.random() * 2
    }));
    setStalactites(stalactitesArray);

    const batCount = isMobile ? 5 : 10;
    const batsArray = Array.from({ length: batCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 8,
      speed: Math.random() * 0.5 + 0.3,
      direction: Math.random() > 0.5 ? 1 : -1,
      flapSpeed: Math.random() * 0.3 + 0.2,
      startDelay: Math.random() * 5
    }));
    setBats(batsArray);
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTorchFlicker(Math.random() * 0.3 + 0.85);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);

      const sections = ["home", "services", "projects", "company", "brochures", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveNav(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentProjects = projects[activeSection];

  const nextProject = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentProjectIndex((prev) =>
      prev === currentProjects.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [currentProjects.length, isAnimating]);

  const prevProject = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentProjectIndex((prev) =>
      prev === 0 ? currentProjects.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [currentProjects.length, isAnimating]);

  useEffect(() => {
    setCurrentProjectIndex(0);
  }, [activeSection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === "ArrowRight") nextProject();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevProject, nextProject]);

  const sendEmail = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          company: formData.get("company"),
          message: formData.get("message")
        })
      });

      await response.json();

      if (response.ok) {
        toast('Email sent successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setIsLoading(false)
      } else {
        toast('Failed to send email', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setIsLoading(false)
      }
    } catch {
      toast('Network error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setIsLoading(false)
    }
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  // Handle smooth scroll
  const handleSmoothScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  // Calculate background opacity based on scroll
  const caveOpacity = Math.max(0, 1 - scrollProgress * 2);
  const mineralOpacity = Math.min(1, scrollProgress * 2);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Cave Background Effects */}
      <div className="cave-bg" style={{ opacity: caveOpacity }} />
      <div className="mineral-bg" style={{ opacity: mineralOpacity }} />
      <div className="rock-overlay" />

      {/* Crystal Field */}
      <div className="crystal-field">
        {crystals.map(crystal => {
          const sizeClass = crystal.size < 1.5 ? "crystal-small" :
            crystal.size < 2.5 ? "crystal-medium" : "crystal-large";

          return (
            <div
              key={crystal.id}
              className={`crystal ${sizeClass}`}
              style={{
                left: `${crystal.x}vw`,
                top: `${crystal.y}vh`,
                animationDelay: `${crystal.id * 0.1}s`,
                opacity: crystal.glow,
                filter: `hue-rotate(${crystal.id * 3}deg)`
              }}
            />
          );
        })}

        {/* Falling Rocks */}
        {rockfall.map(rock => (
          <div
            key={rock.id}
            className="falling-rock"
            style={{
              left: `${rock.x}%`,
              top: `${rock.y}%`,
              animation: `rockfall 4s ease-in ${rock.delay}s infinite`,
              transform: `rotate(${rock.id * 45}deg)`
            }}
          />
        ))}
      </div>

      {/* Stalactites */}
      <div className="stalactites">
        {stalactites.map(stalactite => (
          <div
            key={stalactite.id}
            className="stalactite"
            style={{
              left: `${stalactite.x}%`,
              top: `${stalactite.y}%`,
              height: `${stalactite.length}px`,
              animation: `drip ${8 + stalactite.delay * 2}s ease-in-out infinite`,
              animationDelay: `${stalactite.delay}s`
            }}
          />
        ))}
      </div>

      {/* Flying Bats */}
      <div className="bats-container">
        {bats.map(bat => (
          <motion.div
            key={bat.id}
            className="bat"
            style={{
              left: `${bat.x}%`,
              top: `${bat.y}%`,
              width: `${bat.size}px`,
              height: `${bat.size}px`,
              filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.5))'
            }}
            animate={{
              x: [0, 100 * bat.direction, 0],
              y: [0, Math.sin(bat.id * 0.5) * 30, 0],
              rotate: [0, 360 * bat.direction],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 15 / bat.speed,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.5, 1],
              delay: bat.startDelay
            }}
          >
            <motion.div
              className="bat-wings"
              animate={{
                scaleY: [1, 1.5, 1],
              }}
              transition={{
                duration: bat.flapSpeed,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="bat-icon"
                fill="currentColor"
                style={{ color: '#4a5568' }}
              >
                <path d="M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5 s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z" />
                <path d="M10,4.5c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S9.45,4.5,10,4.5z M14,4.5c0.55,0,1,0.45,1,1s-0.45,1-1,1 s-1-0.45-1-1S13.45,4.5,14,4.5z" />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 stone-dark backdrop-blur-md">
        <div className="container-padding px-7.5">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/logo.png" width={50} height={50} alt="caveCode" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll(item.href);
                  }}
                  className={`font-medium text-sm lg:text-base transition-all duration-300 ${activeNav === item.label.toLowerCase()
                    ? "text-amber-glow border-b-2 border-amber-glow"
                    : "text-stone-300 hover:text-amber-glow hover:border-b-2 hover:border-amber-glow/50"
                    }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleSmoothScroll("#contact");
                }}
                className="px-4 py-2 md:px-6 md:py-2 bg-linear-to-r from-copper to-amber-glow text-stone-900 font-semibold rounded-full hover:shadow-lg hover:shadow-amber-glow/30 transition-all duration-300 hover:scale-105 text-sm md:text-base"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Flame className="w-3 h-3 md:w-4 md:h-4 inline-block mr-1 md:mr-2" style={{ filter: `brightness(${torchFlicker})` }} />
                Start Project
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-stone-300 hover:text-amber-glow hover:bg-stone-800/50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-stone-800"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(item.href);
                    }}
                    className={`font-medium px-4 py-2 rounded-lg transition-colors text-sm ${activeNav === item.label.toLowerCase()
                      ? "bg-amber-glow/10 text-amber-glow border-l-4 border-amber-glow"
                      : "text-stone-300 hover:bg-stone-800/50 hover:text-amber-glow"
                      }`}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll("#contact");
                  }}
                  className="px-4 py-2 bg-linear-to-r from-copper to-amber-glow text-stone-900 font-semibold rounded-lg text-center hover:shadow-lg hover:shadow-amber-glow/30 transition-all duration-300 text-sm"
                >
                  <Flame className="w-3 h-3 inline-block mr-2" style={{ filter: `brightness(${torchFlicker})` }} />
                  Start Project
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Home/Hero Section */}
      <section id="home" ref={entranceRef} className="pt-24 md:pt-32 pb-12 md:pb-20 px-7.5 sm:px-12.5 relative">
        <div className="container-padding">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-12">
            {/* Hero Content */}
            <motion.div
              className="space-y-4 md:space-y-6 lg:w-1/2"
              initial="hidden"
              animate={isEntranceInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.div>
                <span className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 bg-copper/10 text-copper font-semibold rounded-full text-xs md:text-sm border border-copper/30">
                  <Award className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  Award-Winning Digital Agency
                </span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-tight"
              >
                Mining{" "}
                <span className="text-gradient-cave block md:inline">
                  Digital Innovation
                </span>
              </motion.h1>

              <motion.p
                className="mobile-text-lg text-stone-300 max-w-2xl"
              >
                CaveCode is a premier digital development agency specializing in deep-tech solutions,
                enterprise applications, and innovative web development. We transform businesses
                through cutting-edge technology and exceptional engineering.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 md:gap-4"
              >
                <button
                  onClick={() => handleSmoothScroll("#services")}
                  className="px-6 py-2 md:px-8 md:py-3 bg-linear-to-r from-copper to-amber-glow text-stone-900 font-semibold rounded-full hover:shadow-lg hover:shadow-amber-glow/30 transition-all duration-300 hover:scale-105 text-sm md:text-base flex items-center"
                >
                  <Compass className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                  Explore Services
                </button>
                <button
                  onClick={() => handleSmoothScroll("#contact")}
                  className="px-6 py-2 md:px-8 md:py-3 border border-copper text-copper font-semibold rounded-full hover:bg-copper/10 transition-all duration-300 text-sm md:text-base"
                >
                  Get Free Consultation
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 pt-6 md:pt-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="stone-dark p-3 md:p-4 rounded-xl md:rounded-2xl border border-stone-800"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="flex items-center justify-center space-x-1 md:space-x-2 mb-1 md:mb-2">
                      <div className="text-amber-glow">
                        {stat.icon}
                      </div>
                      <div className="text-lg md:text-2xl font-bold text-gradient-cave">
                        {stat.value}
                      </div>
                    </div>
                    <div className="text-xs md:text-sm text-stone-400 text-center">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div
              className="lg:w-1/2 mt-8 md:mt-0"
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              animate={isEntranceInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative stone-dark rounded-xl md:rounded-2xl p-4 md:p-8 border border-stone-800">
                <div className="absolute -inset-2 md:-inset-4 bg-linear-to-r from-copper to-amber-glow rounded-xl md:rounded-2xl blur-xl opacity-20"></div>

                <div className="relative bg-stone-900 rounded-lg md:rounded-xl overflow-hidden border border-stone-800">
                  <div className="bg-stone-800 px-3 py-2 md:px-4 md:py-3 flex items-center justify-between border-b border-stone-700">
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-600"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-amber-500"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="text-stone-300 text-xs md:text-sm font-mono">company_profile.tsx</div>
                  </div>

                  <div className="p-3 md:p-6 font-mono text-xs md:text-sm">
                    <pre className="text-stone-300 overflow-x-auto">
                      <code>{`const CaveCode = {
  name: "CaveCode Digital Solutions",
  founded: 2020,
  team: "50+ Experts",
  specialization: "Enterprise Digital Transformation",
  services: [
    "Full Stack Development",
    "Cloud Migration",
    "Mobile Applications",
    "AI & Machine Learning",
    "DevOps & CI/CD",
    "Digital Strategy"
  ],
  clients: ["Fortune 500", "Startups", "Government", "Healthcare"],
  successRate: "98%",
  mission: "Transform businesses through innovative technology"
};`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 px-7.5 sm:px-12.5 relative">
        <div className="container-padding">
          <motion.div
            className="text-center mb-8 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-stone-100">
              Our <span className="text-gradient-cave">Services</span>
            </h2>
            <p className="mobile-text-lg text-stone-300 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to drive your business forward
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="service-card rounded-xl md:rounded-2xl p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: service.id * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-copper/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                  {service.icon}
                </div>

                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-stone-100">{service.title}</h3>
                <p className="text-stone-300 text-sm md:text-base mb-4 md:mb-6">{service.description}</p>

                <div className="space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-stone-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-12 md:py-20 px-7.5 sm:px-12.5 relative">
        <div className="container-padding">
          <motion.div
            className="text-center mb-8 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isProjectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-stone-100">
              Featured <span className="text-gradient-cave">Projects</span>
            </h2>
            <p className="mobile-text-lg text-stone-300 max-w-2xl mx-auto mb-6 md:mb-8">
              Transforming industries with innovative digital solutions
            </p>
          </motion.div>

          {/* Project Carousel */}
          <div className="max-w-4xl lg:max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProjectIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="stone-dark rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden border border-stone-800"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Project Image */}
                  <div className="relative h-48 sm:h-64 md:h-72 lg:h-auto lg:w-1/2 min-h-50 md:min-h-75 bg-linear-to-br from-stone-900 via-copper to-amber-glow">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-2 md:space-y-4 p-4 md:p-8">
                        <motion.div
                          className="w-12 h-12 md:w-16 lg:w-20 md:h-16 lg:h-20 bg-stone-100/20 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm border border-stone-100/30"
                          animate={{
                            rotate: 360
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <Code className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-stone-100" />
                        </motion.div>
                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-stone-100 px-2">
                          {currentProjects[currentProjectIndex].title}
                        </h3>
                        <p className="text-amber-glow font-mono text-xs md:text-sm">
                          ENTERPRISE SOLUTION
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 bg-linear-to-t from-stone-900/80 to-transparent">
                      <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                        {currentProjects[currentProjectIndex].technologies.slice(0, isMobile ? 3 : 6).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 md:px-3 md:py-1 bg-stone-900/70 backdrop-blur-sm rounded-full text-xs md:text-sm text-stone-100 border border-stone-100/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-4 md:p-6 lg:p-8 lg:w-1/2">
                    <div className="space-y-3 md:space-y-4 lg:space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2 md:mb-3 lg:mb-4">
                          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-stone-100">
                            {currentProjects[currentProjectIndex].title}
                          </h3>
                          <span className="px-2 py-1 md:px-3 md:py-1 bg-copper/20 text-copper font-semibold rounded-full text-xs md:text-sm border border-copper/30">
                            Case Study #{currentProjectIndex + 1}
                          </span>
                        </div>
                        <p className="text-stone-300 text-sm md:text-base lg:text-lg">
                          {currentProjects[currentProjectIndex].description}
                        </p>
                      </div>

                      <div className="space-y-2 md:space-y-3 lg:space-y-4">
                        <h4 className="font-semibold text-stone-100 text-sm md:text-base">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {currentProjects[currentProjectIndex].technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 md:px-3 md:py-2 bg-stone-900 rounded-lg font-medium text-stone-300 border border-stone-800 text-xs md:text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {
                        currentProjects[currentProjectIndex].liveLink &&
                        <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 pt-3 md:pt-4 lg:pt-6">
                          <a
                            href={currentProjects[currentProjectIndex].liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 md:space-x-2 px-3 py-2 md:px-4 md:py-3 bg-linear-to-r from-copper to-amber-glow text-stone-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-glow/30 transition-all duration-300 hover:scale-105 text-sm md:text-base"
                          >
                            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                            <span>View Demo</span>
                          </a>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-4 md:mt-6 lg:mt-8">
              <motion.button
                onClick={prevProject}
                disabled={isAnimating}
                className="cursor-pointer p-2 md:p-3 rounded-full stone-dark hover:shadow-lg hover:shadow-amber-glow/20 disabled:opacity-50 transition-all duration-300 hover:scale-105 border border-stone-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-stone-300" />
              </motion.button>

              <div className="flex space-x-1 md:space-x-2">
                {currentProjects.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentProjectIndex(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentProjectIndex
                      ? "bg-linear-to-r from-copper to-amber-glow w-4 md:w-6 lg:w-8"
                      : "bg-stone-700 hover:bg-stone-600"
                      }`}
                    aria-label={`Go to project ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextProject}
                disabled={isAnimating}
                className="cursor-pointer p-2 md:p-3 rounded-full stone-dark hover:shadow-lg hover:shadow-amber-glow/20 disabled:opacity-50 transition-all duration-300 hover:scale-105 border border-stone-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-stone-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Section */}
      <section id="company" ref={aboutRef} className="py-12 md:py-20 px-7.5 sm:px-12.5 relative">
        <div className="container-padding">
          <motion.div
            className="text-center mb-8 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isAboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-stone-100">
              About <span className="text-gradient-cave">CaveCode</span>
            </h2>
            <p className="mobile-text-lg text-stone-300 max-w-2xl mx-auto">
              Leading digital innovation since 2020
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8 md:gap-12">
            <motion.div
              className="lg:w-1/2 space-y-4 md:space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={isAboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-3 md:space-y-4">
                <p className="text-stone-300 text-sm md:text-base lg:text-lg">
                  Founded in 2020, CaveCode has rapidly grown into a premier digital development agency
                  with a team of 50+ experts specializing in enterprise solutions, cloud migration,
                  and innovative web development.
                </p>
                <p className="text-stone-300 text-sm md:text-base lg:text-lg">
                  Our mission is to transform businesses through cutting-edge technology. We combine
                  deep technical expertise with strategic thinking to deliver solutions that drive
                  growth, efficiency, and competitive advantage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                <motion.div
                  className="stone-dark p-3 md:p-4 lg:p-6 rounded-xl md:rounded-2xl border border-stone-800"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-bold text-base md:text-lg mb-2 md:mb-4 text-stone-100">Our Mission</h4>
                  <p className="text-stone-300 text-sm">
                    To empower businesses through innovative digital solutions that drive growth and transformation.
                  </p>
                </motion.div>

                <motion.div
                  className="stone-dark p-3 md:p-4 lg:p-6 rounded-xl md:rounded-2xl border border-stone-800"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-bold text-base md:text-lg mb-2 md:mb-4 text-stone-100">Our Vision</h4>
                  <p className="text-stone-300 text-sm">
                    To be the global leader in digital innovation and enterprise transformation.
                  </p>
                </motion.div>

                <motion.div
                  className="stone-dark p-3 md:p-4 lg:p-6 rounded-xl md:rounded-2xl border border-stone-800 sm:col-span-2 lg:col-span-1"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-bold text-base md:text-lg mb-2 md:mb-4 text-stone-100">Our Values</h4>
                  <p className="text-stone-300 text-sm">
                    Innovation, Excellence, Integrity, Collaboration, and Client Success.
                  </p>
                </motion.div>
              </div>

              {/* Testimonials */}
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-stone-100">Client Testimonials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {testimonials.slice(0, 2).map((testimonial) => (
                    <motion.div
                      key={testimonial.id}
                      className="testimonial-card p-4 md:p-6 rounded-xl"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-stone-300 text-sm mb-4 italic">&quot;{testimonial.content}&quot;</p>
                      <div>
                        <p className="font-semibold text-stone-100">{testimonial.name}</p>
                        <p className="text-stone-400 text-sm">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isAboutInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-100 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden border border-stone-800">
                <div className="absolute inset-0 bg-linear-to-br from-stone-900 via-copper to-amber-glow"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-4 md:p-6 lg:p-8 stone-dark rounded-xl md:rounded-2xl border border-stone-100/10 backdrop-blur-sm max-w-md">
                    <Building className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-amber-glow mx-auto mb-3 md:mb-4 lg:mb-6" />
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-stone-100 mb-1 md:mb-2">CaveCode</h3>
                    <p className="text-amber-glow text-sm md:text-base">Digital Innovation Partners</p>
                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-stone-700">
                      <p className="text-stone-300 text-sm">
                        &quot;Transforming businesses through innovative technology since 2020&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-12 md:py-20 px-7.5 sm:px-12.5 relative">
        <div className="container-padding">
          <motion.div
            className="text-center mb-8 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-stone-100">
              Start Your <span className="text-gradient-cave">Project</span>
            </h2>
            <p className="mobile-text-lg text-stone-300 max-w-2xl mx-auto">
              Ready to transform your business? Let&apos;s explore innovative solutions together.
            </p>
          </motion.div>

          <div className="max-w-4xl lg:max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Contact Info */}
              <motion.div
                className="space-y-6 md:space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={isContactInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="stone-dark rounded-xl md:rounded-2xl p-6 md:p-8 border border-stone-800">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-stone-100">Contact Information</h3>

                  <div className="space-y-4 md:space-y-6">
                    <a href="mailto:contact@cavecode.dev">
                      <motion.div
                        className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 hover:bg-stone-800/30 rounded-xl transition-colors border border-transparent hover:border-copper/30"
                        whileHover={{ x: 3 }}
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-r from-copper to-amber-glow rounded-lg md:rounded-xl flex items-center justify-center">
                          <Mail className="w-5 h-5 md:w-6 md:h-6 text-stone-900" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-stone-100 text-sm md:text-base">Email</h4>
                          <p className="text-stone-300 text-xs md:text-sm">contact@cavecode.dev</p>
                        </div>
                      </motion.div>
                    </a>

                    <div className="p-3 md:p-4">
                      <h4 className="font-semibold text-stone-100 text-sm md:text-base mb-2">Business Hours</h4>
                      <p className="text-stone-300 text-xs md:text-sm">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                      <p className="text-stone-300 text-xs md:text-sm">Emergency Support: 24/7</p>
                    </div>
                  </div>
                </div>

                <div className="stone-dark rounded-xl md:rounded-2xl p-6 md:p-8 border border-stone-800">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-stone-100">Why Choose CaveCode?</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-start space-x-2 md:space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <p className="text-stone-300 text-sm md:text-base">50+ Expert Developers</p>
                    </div>
                    <div className="flex items-start space-x-2 md:space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <p className="text-stone-300 text-sm md:text-base">98% Client Satisfaction Rate</p>
                    </div>
                    <div className="flex items-start space-x-2 md:space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <p className="text-stone-300 text-sm md:text-base">24/7 Project Support</p>
                    </div>
                    <div className="flex items-start space-x-2 md:space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                      <p className="text-stone-300 text-sm md:text-base">Flexible Engagement Models</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="stone-dark rounded-xl md:rounded-2xl p-6 md:p-8 border border-stone-800"
                initial={{ opacity: 0, x: 30 }}
                animate={isContactInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-stone-100">Get In Touch</h3>
                <form className="space-y-4 md:space-y-6" onSubmit={sendEmail}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-stone-300 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-lg focus:border-copper focus:ring-1 focus:ring-copper outline-none transition-colors text-stone-100"
                        placeholder="John"
                        required
                        name="firstName"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-stone-300 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-lg focus:border-copper focus:ring-1 focus:ring-copper outline-none transition-colors text-stone-100"
                        placeholder="Doe"
                        required
                        name="lastName"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-lg focus:border-copper focus:ring-1 focus:ring-copper outline-none transition-colors text-stone-100"
                      placeholder="john@company.com"
                      required
                      name="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-stone-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-lg focus:border-copper focus:ring-1 focus:ring-copper outline-none transition-colors text-stone-100"
                      placeholder="Your Company Name"
                      required
                      name="company"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-300 mb-2">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-stone-900 border border-stone-800 rounded-lg focus:border-copper focus:ring-1 focus:ring-copper outline-none transition-colors text-stone-100 resize-none"
                      placeholder="Tell us about your project..."
                      required
                      name="message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="cursor-pointer w-full py-3 md:py-4 bg-linear-to-r from-copper to-amber-glow text-stone-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-glow/30 transition-all duration-300 text-base md:text-lg"
                    disabled={isLoading}
                  >
                    Submit Inquiry
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950/70 border-t border-stone-900 py-8 md:py-12 px-7.5 sm:px-6">
        <div className="container-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building className="w-8 h-8 text-amber-glow" />
                <span className="text-xl font-bold text-gradient-cave">CaveCode</span>
              </div>
              <p className="text-stone-400 text-sm mb-4">
                Premier digital development agency specializing in innovative solutions and enterprise transformation.
              </p>
              <div className="flex space-x-3">
                <a
                  href="https://github.com/cavecode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 stone-dark rounded-full flex items-center justify-center hover:border-amber-glow/50 transition-colors border border-stone-800"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/company/cavecode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 stone-dark rounded-full flex items-center justify-center hover:border-amber-glow/50 transition-colors border border-stone-800"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com/cavecode_agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 stone-dark rounded-full flex items-center justify-center hover:border-amber-glow/50 transition-colors border border-stone-800"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-stone-100 mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll(item.href);
                    }}
                    className="block text-stone-400 hover:text-amber-glow transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-stone-100 mb-4">Services</h4>
              <div className="space-y-2">
                {services.slice(0, 4).map((service) => (
                  <a
                    key={service.id}
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSmoothScroll("#services");
                    }}
                    className="block text-stone-400 hover:text-amber-glow transition-colors text-sm"
                  >
                    {service.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-stone-100 mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Mail className="w-4 h-4 text-amber-glow mt-0.5" />
                  <span className="text-stone-400 text-sm">contact@cavecode.dev</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-amber-glow mt-0.5" />
                  <span className="text-stone-400 text-sm">Abbottabad, PK</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-900 mt-8 md:mt-12 pt-8 text-center text-stone-500 text-xs md:text-sm">
            <p>&copy; {new Date().getFullYear()} CaveCode Digital Solutions. All rights reserved.</p>
            <p className="mt-1 md:mt-2 text-xs">Transforming businesses through innovative technology</p>
          </div>
        </div>
      </footer>

      {/* Scroll Progress Indicator - Hidden on mobile */}
      {!isMobile && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(68, 64, 60, 0.5)"
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#cave-gradient)"
                strokeWidth="4"
                strokeDasharray="283"
                strokeDashoffset={283 - (scrollProgress * 283)}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="cave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-gradient-cave">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}