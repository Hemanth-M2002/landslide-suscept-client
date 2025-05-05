import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Mountain, Brain, Database, Map, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LearnMore() {
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
              Understanding Landslide Susceptibility Analysis
            </h1>
            <p className="text-lg text-stone-300 max-w-3xl mx-auto">
              Explore our comprehensive approach to predicting and analyzing landslide risks using advanced machine learning and geological data analysis.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Mountain,
                title: "Geological Analysis",
                description: "Advanced terrain modeling and soil composition assessment for accurate risk prediction."
              },
              {
                icon: Brain,
                title: "Machine Learning",
                description: "Utilizing deep learning models to process and analyze complex geological data patterns."
              },
              {
                icon: Database,
                title: "Data Integration",
                description: "Comprehensive integration of multiple data sources for thorough risk assessment."
              },
              {
                icon: Map,
                title: "Interactive Mapping",
                description: "Real-time visualization of risk zones with detailed analytical overlays."
              },
              {
                icon: AlertTriangle,
                title: "Risk Assessment",
                description: "Sophisticated algorithms for identifying and categorizing potential hazard zones."
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

          {/* Methodology Section */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-amber-400 mb-8 text-center">Our Methodology</h2>
            <div className="bg-stone-800/50 border border-stone-700 rounded-xl p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-amber-300">Data Collection</h3>
                  <p className="text-stone-300">Comprehensive gathering of geological, topographical, and historical landslide data from multiple sources.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-amber-300">Analysis Process</h3>
                  <p className="text-stone-300">Implementation of machine learning algorithms to process and analyze complex datasets for accurate risk prediction.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-amber-300">Risk Mapping</h3>
                  <p className="text-stone-300">Generation of detailed susceptibility maps with multiple risk layers and interactive features.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-stone-800">
        <div className="container max-w-7xl mx-auto px-4 text-center text-stone-400">
          <p>© {new Date().getFullYear()} Landslide Susceptibility Analysis Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}