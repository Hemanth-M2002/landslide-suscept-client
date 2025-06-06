import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Brain, Database, Map, Mountain, Code, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-stone-800 bg-stone-900/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-stone-200 hover:text-amber-400 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
              About Our Project
            </h1>
            <p className="text-lg text-stone-300 max-w-3xl mx-auto">
              Advanced Landslide Susceptibility Analysis (ALSA) - A comprehensive solution for predicting and analyzing landslide risks using cutting-edge technology.
            </p>
          </motion.div>

          {/* Project Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Brain,
                title: "Machine Learning",
                description: "Implementation of hybrid deep learning models for accurate landslide prediction"
              },
              {
                icon: Database,
                title: "Data Integration",
                description: "Comprehensive geological and environmental data processing and analysis"
              },
              {
                icon: Map,
                title: "Interactive Mapping",
                description: "Real-time visualization of risk zones with detailed analytical overlays"
              },
              {
                icon: Mountain,
                title: "Terrain Analysis",
                description: "Advanced terrain modeling and soil composition assessment"
              },
              {
                icon: Code,
                title: "Modern Tech Stack",
                description: "Built with React, TailwindCSS, and advanced visualization libraries"
              },
              {
                icon: Server,
                title: "Robust Backend",
                description: "Scalable architecture for handling complex geological computations"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-stone-800/50 border border-stone-700 rounded-xl p-6 hover:bg-stone-800 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-xl font-semibold text-amber-400 mb-2">{feature.title}</h3>
                <p className="text-stone-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Project Details Section */}
          <section className="mb-16">
            <div className="bg-stone-800/50 border border-stone-700 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-amber-400 mb-8">Project Details</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-amber-300">Purpose</h3>
                  <p className="text-stone-300">
                    Our project aims to revolutionize landslide risk assessment by combining advanced machine learning techniques with comprehensive geological data analysis.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-amber-300">Technology Stack</h3>
                  <p className="text-stone-300">
                    Built using React, TailwindCSS, Three.js for 3D visualization, and advanced mapping libraries for geospatial data representation.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-amber-300">Key Features</h3>
                  <ul className="text-stone-300 list-disc list-inside space-y-2">
                    <li>Interactive 3D Earth visualization</li>
                    <li>Real-time risk zone mapping</li>
                    <li>Advanced analytics dashboard</li>
                    <li>Comprehensive research documentation</li>
                    <li>Team collaboration platform</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-stone-800">
        <div className="container max-w-7xl mx-auto px-4 text-center text-stone-400">
          <p>© {new Date().getFullYear()} Advanced Landslide Susceptibility Analysis. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}