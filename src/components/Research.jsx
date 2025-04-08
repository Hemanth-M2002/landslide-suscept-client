import React, { useState, useEffect } from 'react';
import { BookOpen, Map, Mountain, Database, ExternalLink, Download, ChevronRight, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export default function Research() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="research-page"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-[#1a1a1a]"
      >
        {/* Rest of the component remains the same */}
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[400px] bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1590739293831-5f16b7c8121c?auto=format&fit=crop&q=80&w=1920")',
          }}
        >
          <div className="absolute inset-0 bg-black/70">
            <div className="container mx-auto px-4 h-full flex items-center">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white max-w-2xl"
              >
                <Button
                  variant="text"
                  className="p-2 hover:bg-stone-800 rounded-full text-stone-50 mb-4"
                  component={Link}
                  to="/"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-5xl font-bold mb-4 text-amber-400">Landslide Susceptibility Research</h1>
                <p className="text-xl mb-6 text-amber-100">Comprehensive Analysis of the Nilgiri District</p>
                <a 
                  href="#tools" 
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 transition-colors px-6 py-3 rounded-lg font-semibold"
                >
                  Explore Research
                  <ChevronRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tools Section */}
        <div id="tools" className="container mx-auto px-4 py-16">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#242424] rounded-xl shadow-xl p-8 mb-12 border border-amber-900/20"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-amber-400">
              <Database className="h-8 w-8 text-amber-500" />
              Tools & Resources Used
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 border border-amber-900/30 rounded-xl hover:border-amber-500/50 transition-colors bg-[#1a1a1a]"
              >
                <h3 className="font-semibold text-xl mb-3 flex items-center gap-2 text-amber-300">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/d/df/ArcGIS_logo.png" 
                    alt="ArcGIS Logo" 
                    className="w-8 h-8 object-contain bg-white p-1 rounded"
                  />
                  ArcGIS Pro
                </h3>
                <p className="text-amber-100/80 mb-4">
                  Utilized ArcGIS Pro for advanced spatial analysis, mapping, and visualization of landslide susceptibility factors in the Nilgiri district.
                </p>
                <a 
                  href="https://www.esri.com/en-us/arcgis/products/arcgis-pro" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:text-amber-400 font-medium flex items-center gap-1"
                >
                  Learn more about ArcGIS Pro
                  <ExternalLink className="h-4 w-4" />
                </a>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-6 border border-amber-900/30 rounded-xl hover:border-amber-500/50 transition-colors bg-[#1a1a1a]"
              >
                <h3 className="font-semibold text-xl mb-3 text-amber-300">Bushok Research Platform</h3>
                <p className="text-amber-100/80 mb-4">
                  Integrated comprehensive geological data and resources from the Bushok platform for enhanced analysis and validation of research findings.
                </p>
                <a 
                  href="#" 
                  className="text-amber-500 hover:text-amber-400 font-medium flex items-center gap-1"
                >
                  Access Bushok Platform
                  <ExternalLink className="h-4 w-4" />
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* References Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#242424] rounded-xl shadow-xl p-8 border border-amber-900/20"
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-amber-400">
              <BookOpen className="h-8 w-8 text-amber-500" />
              References
            </h2>
            <div className="space-y-4">
              {[
                "[1] Wang, Z., Liu, Q., & Liu, Y. (2020). Mapping Landslide Susceptibility Using Machine Learning Algorithms and GIS: A Case Study in Shexian County, Anhui Province, China. Symmetry, 12(12), 1954.",
                "[2] Marjanović, M., Kovačević, M., Bajat, B., & Voženílek, V. (2011). Landslide susceptibility assessment using SVM machine learning algorithm. Engineering Geology, 123(3), 225–234.",
                "[3] Zêzere, J. L., Pereira, S., Melo, R., Oliveira, S. C., & Garcia, R. A. C. (2017). Mapping landslide susceptibility using data-driven methods. Science of The Total Environment, 589, 250–267.",
              ].map((ref, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="p-5 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-all cursor-pointer border border-amber-900/20"
                >
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-amber-100/90">{ref}</p>
                    <Download className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  </div>
                </motion.div>
              ))}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                className="mt-6 w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-amber-500 font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-amber-900/20"
              >
                <span>View All References</span>
                <Map className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="bg-[#141414] text-white py-12 mt-16 border-t border-amber-900/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <Mountain className="h-8 w-8 text-amber-500" />
                <div>
                  <h3 className="font-bold text-xl text-amber-400">Landslide Susceptibility Research</h3>
                  <p className="text-amber-200/70">Nilgiri District Case Study</p>
                </div>
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-amber-200/70 hover:text-amber-400 transition-colors">About</a>
                <a href="#" className="text-amber-200/70 hover:text-amber-400 transition-colors">Contact</a>
                <a href="#" className="text-amber-200/70 hover:text-amber-400 transition-colors">Resources</a>
              </div>
              <p className="text-amber-200/50">© 2024 Research Project</p>
            </div>
          </div>
        </footer>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full shadow-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}