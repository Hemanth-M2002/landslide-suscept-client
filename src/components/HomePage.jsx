import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Info, Layers, MapPin, Menu } from "lucide-react";
import EarthVisualization from "./EarthVisualization";
import FeatureCard from "./FeatureCard";

function HomePage() {
  const navigate = useNavigate();
  const [isEarthLoaded, setIsEarthLoaded] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      const starCount = 150; // Fixed number of stars for consistency

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${Math.random() * 3 + 1}px`,
          animationDuration: `${Math.random() * 5 + 3}s`,
          animationDelay: `${Math.random() * 5}s`,
          animationType: Math.random() > 0.5 ? 'twinkle' : 'pulse',
          opacity: Math.random() * 0.5 + 0.3,
        });
      }

      setStars(newStars);
    };

    generateStars();
  }, []);

  const handleNavigate = () => {
    if (isEarthLoaded) {
      navigate("/map-view");
    } else {
      console.log("Waiting for Earth to load...");
      alert("Please wait for the Earth visualization to load before exploring the map.");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEarthLoaded(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-stone-900 to-stone-950 text-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-stone-800 bg-stone-900/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 font-bold text-stone-50">
            <Layers className="h-6 w-6 text-amber-500" />
            <span>ALSA</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              to="/feature-page"
              className="text-sm font-medium hover:text-amber-400 transition-colors"
            >
              Features
            </Link>
            <Link
              to="/soon"
              className="text-sm font-medium hover:text-amber-400 transition-colors"
            >
              About
            </Link>
            <Link
              to="/research"
              className="text-sm font-medium hover:text-amber-400 transition-colors"
            >
              Research
            </Link>
            <Link
              to="/team"
              className="text-sm font-medium hover:text-amber-400 transition-colors"
            >
              Contact
            </Link>
          </nav>
          <button className="md:hidden p-2 rounded hover:bg-stone-800">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Hero Section with 3D Earth */}
      <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10">
          <EarthVisualization onLoaded={() => setIsEarthLoaded(true)} />
          {!isEarthLoaded && (
            <div className="h-full w-full flex items-center justify-center text-stone-300">
              Loading Earth...
            </div>
          )}
        </div>

        <div className="container relative z-20 flex flex-col items-center text-center gap-6 py-24 max-w-7xl mx-auto px-4">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
              Advanced Landslide Susceptibility Analysis Using Hybrid Deep Learning Models
            </h1>
            <p className="mx-auto max-w-[700px] text-stone-300 md:text-xl">
              Advanced landslide susceptibility mapping and analysis to protect communities and infrastructure worldwide.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={handleNavigate}
              className={`bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded flex items-center ${
                !isEarthLoaded ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isEarthLoaded}
            >
              Explore Map
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
            <button className="border border-stone-700 text-stone-200 hover:bg-stone-800 px-6 py-2 rounded">
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-950 to-transparent z-20" />
      </section>

      {/* Star animation container that wraps features, CTA and footer */}
      <div className="relative">
        {/* Star animation background */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {stars.map((star) => (
            <div
              key={star.id}
              className={`absolute rounded-full ${star.animationType === 'twinkle' ? 'animate-[twinkle_ease-in-out_infinite]' : 'animate-[pulse_ease-in-out_infinite]'}`}
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animationDuration: star.animationDuration,
                animationDelay: star.animationDelay,
                opacity: star.opacity,
                backgroundColor: Math.random() > 0.7 ? '#fbbf24' : '#ffffff',
                boxShadow: `0 0 ${parseInt(star.size) * 3}px ${parseInt(star.size) * 1.5}px rgba(251, 191, 36, ${Math.random() * 0.3 + 0.2})`,
                filter: 'brightness(1.2)',
              }}
            />
          ))}
        </div>

        {/* Add custom animation keyframes */}
        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { 
              opacity: 0.4; 
              transform: scale(0.9);
              filter: brightness(1);
            }
            50% { 
              opacity: 1;
              transform: scale(1.3);
              filter: brightness(1.5);
            }
          }
          
          @keyframes pulse {
            0%, 100% { 
              opacity: 0.6;
              filter: brightness(1);
            }
            50% { 
              opacity: 1;
              filter: brightness(1.8);
            }
          }
        `}</style>

        {/* Features Section */}
        <section id="features" className="relative z-10 py-16 bg-stone-950/90">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-amber-400">
                Advanced Landslide Analysis
              </h2>
              <p className="mt-4 text-stone-400 max-w-2xl mx-auto">
                Our platform combines geological data, machine learning, and real-time monitoring to predict landslide susceptibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Layers className="h-10 w-10 text-amber-500" />}
                title="Geological Mapping"
                description="Multi-layered geological data analysis with advanced terrain modeling and soil composition assessment."
                className="hover:bg-stone-800 hover:shadow-lg hover:shadow-amber-500/50 cursor-pointer transition-transform duration-300 transform hover:scale-105"
              />
              <FeatureCard
                icon={<MapPin className="h-10 w-10 text-amber-500" />}
                title="Risk Assessment"
                description="Identify high-risk zones with precision using our proprietary risk assessment algorithms."
                className="hover:bg-stone-800 hover:shadow-lg hover:shadow-amber-500/50 cursor-pointer transition-transform duration-300 transform hover:scale-105"
              />
              <FeatureCard
                icon={<Info className="h-10 w-10 text-amber-500" />}
                title="Real-time Monitoring"
                description="Continuous monitoring of soil conditions, rainfall, and ground movement with early warning systems."
                className="hover:bg-stone-800 hover:shadow-lg hover:shadow-amber-500/50 cursor-pointer transition-transform duration-300 transform hover:scale-105"
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative z-10 py-16 bg-gradient-to-r from-amber-900/30 to-stone-900/30 border-y border-amber-900/20">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="bg-stone-900/60 border border-stone-800 rounded backdrop-blur-sm">
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-amber-400">Ready to explore landslide data?</h3>
                  <p className="text-stone-300">
                    Access our interactive maps and analysis tools to understand landslide risks in your area.
                  </p>
                </div>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded">
                  Access Dashboard
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 py-8 bg-stone-950/80 backdrop-blur-sm border-t border-stone-900">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 font-bold text-stone-50">
              <Layers className="h-5 w-5 text-amber-500" />
              <span>Landslide Susceptibility</span>
            </div>
            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} Landslide Susceptibility Project. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default HomePage;