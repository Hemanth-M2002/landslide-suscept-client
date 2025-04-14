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
  const [showAllReferences, setShowAllReferences] = useState(false);

  // Define references array
  const references = [
    {
      citation: "1. Wang, Z., Liu, Q., & Liu, Y. (2020). Mapping Landslide Susceptibility Using Machine Learning Algorithms and GIS: A Case Study in Shexian County, Anhui Province, China. Symmetry, 12(12), 1954.",
      url: "https://doi.org/10.3390/sym12121954"
    },
    {
      citation: "2. Marjanović, M., Kovačević, M., Bajat, B., & Voženílek, V. (2011). Landslide susceptibility assessment using SVM machine learning algorithm. Engineering Geology, 123(3), 225–234.",
      url: "https://doi.org/10.1016/j.enggeo.2011.09.006"
    },
    {
      citation: "3. Zêzere, J. L., Pereira, S., Melo, R., Oliveira, S. C., & Garcia, R. A. C. (2017). Mapping landslide susceptibility using data-driven methods. Science of The Total Environment, 589, 250–267.",
      url: "https://doi.org/10.1016/j.scitotenv.2017.02.188"
    },
    {
      citation: "4. Hong, H., Shahabi, H., Shirzadi, A., et al. (2019). Landslide susceptibility assessment at the Wuning area, China: A comparison between multi-criteria decision making, bivariate statistical, and machine learning methods. Natural Hazards, 96, 173–212.",
      url: "https://doi.org/10.1007/s11069-018-3536-0"
    },
    {
      citation: "5. Chen, W., Pourghasemi, H. R., & Zhao, Z. (2016). A GIS-based comparative study of Dempster-Shafer, logistic regression, and artificial neural network models for landslide susceptibility mapping. Geocarto International, 32(4), 367–385.",
      url: "https://doi.org/10.1080/10106049.2016.1140824"
    },
    {
      citation: "6. Wang, Y., Fang, Z., & Hong, H. (2019). Comparison of convolutional neural networks for landslide susceptibility mapping in Yanshan County, China. Science of The Total Environment, 666, 975–993.",
      url: "https://doi.org/10.1016/j.scitotenv.2019.02.263"
    },
    {
      citation: "7. Hakim, W. L., Rezaie, F., Nur, A. S., Panahi, M., Khosravi, K., Lee, C. W., & Lee, S. (2022). Convolutional neural network (CNN) with metaheuristic optimization algorithms for landslide susceptibility mapping in Icheon, South Korea. Journal of environmental management, 305, 114367.",
      url: "https://doi.org/10.1016/j.jenvman.2021.114367"
    },
    {
      citation: "8. Zhang, H. K., Qiu, S., Suh, J. W., Luo, D., & Zhu, Z. (2024). Machine learning and deep learning in remote sensing data analysis. Reference Module in Earth Systems and Environmental Sciences.",
      url: "https://doi.org/10.1016/B978-0-443-13220-9.00008-1"
    },
    {
      citation: "9. Yi, Y., Zhang, Z., Zhang, W., Jia, H., & Zhang, J. (2020). Landslide susceptibility mapping using multiscale sampling strategy and convolutional neural network: A case study in Jiuzhaigou region. CATENA, 195, Article 104851.",
      url: "https://doi.org/10.1016/j.catena.2020.104851"
    },
    {
      citation: "10. Zhang, T., Li, Y., Wang, T., et al. (2023). Correction: Evaluation of different machine learning models and novel deep learning-based algorithm for landslide susceptibility mapping. Geoscience Letters, 10(44).",
      url: "https://doi.org/10.1186/s40562-023-00296-5"
    },
    {
      citation: "11. Neteler, M., & Mitasova, H. (2002). Working with raster data. In Open source GIS (Vol. 689, pp. 143–172). Springer, Boston, MA.",
      url: "https://doi.org/10.1007/978-1-4757-3578-9_5"
    },
    {
      citation: "12. Kim, M., et al. (2018). Convolutional neural network-based land cover classification using 2-D spectral reflectance curve graphs with multitemporal satellite imagery. IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing, 11(12), 4604–4617.",
      url: "https://doi.org/10.1109/JSTARS.2018.2880783"
    },
    {
      citation: "13. Azarafza, M., Azarafza, M., Akgün, H., Atkinson, P. M., & Derakhshani, R. (2021). Deep learning-based landslide susceptibility mapping. Scientific Reports, 11(1), 24112.",
      url: "https://doi.org/10.1038/s41598-021-03585-1"
    },
    {
      citation: "14. González, A. (2003). Validation of landslide susceptibility maps: Examples and applications from a case study in northern Spain. Natural Hazards, 105, 14-25.",
      url: ""
    },
    {
      citation: "15. Fleuchaus, P., Blum, P., Wilde, M., Terhorst, B., & Butscher, C. (2021). Retrospective evaluation of landslide susceptibility maps and review of validation practice. Environmental Earth Sciences, 80(15), 485.",
      url: "https://doi.org/10.1007/s12665-021-09770-9"
    },
    {
      citation: "16. van Westen, C.J., Rengers, N. & Soeters, R. Use of Geomorphological Information in Indirect Landslide Susceptibility Assessment. Natural Hazards 30, 399–419 (2003).",
      url: "https://doi.org/10.1023/B:NHAZ.0000007097.42735.9e"
    },
    {
      citation: "17. Taalab, K., Cheng, T., & Zhang, Y. (2018). Mapping landslide susceptibility and types using Random Forest. Big Earth Data, 2(2), 159–178.",
      url: "https://doi.org/10.1080/20964471.2018.1472392"
    }
  ];

  const referencesToShow = showAllReferences ? references : references.slice(0, 5);

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
              <AnimatePresence>
                {referencesToShow.map((ref, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-5 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-all border border-amber-900/20"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-amber-100/90">{ref.citation}</p>
                      <div className="flex gap-2">
                        {ref.url && (
                          <button 
                            onClick={() => window.open(ref.url, '_blank')}
                            className="text-amber-500 hover:text-amber-400 transition-colors"
                            title="View online"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </button>
                        )}
                        <button 
                          onClick={() => console.log('Downloading:', ref.citation)}
                          className="text-amber-500 hover:text-amber-400 transition-colors"
                          title="Download"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAllReferences(!showAllReferences)}
                className="mt-6 w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-amber-500 font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 border border-amber-900/20"
              >
                <span>{showAllReferences ? 'Show Less References' : 'View All References'}</span>
                <ChevronRight 
                  className={`h-4 w-4 transition-transform ${showAllReferences ? 'rotate-90' : ''}`}
                />
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