import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { X, ArrowRight, ExternalLink } from 'lucide-react';

const PortfolioPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(PROJECTS.map(p => p.category))];
    return cats;
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-label">Our Work</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Projects <span className="gradient-text">Crafted With Purpose</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Explore our portfolio of enterprise-grade digital solutions built for government, 
            infrastructure, and industry leaders across India.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                onClick={() => setSelectedProject(project)}
                className="nebo-card overflow-hidden group cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c1d] via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors flex items-center justify-center">
                    <div className="bg-white text-gray-900 px-5 py-2.5 rounded-full font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2">
                      View Case Study
                      <ExternalLink size={14} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-semibold tracking-wider uppercase text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-3 mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {project.shortDescription}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#06060e]/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0c0c1d] rounded-2xl shadow-2xl border border-purple-500/10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-full min-h-[300px] overflow-hidden">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-10 space-y-5">
                  <span className="text-xs font-semibold tracking-wider uppercase text-purple-400">{selectedProject.category}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedProject.title}</h2>
                  <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                    {selectedProject.description && <p>{selectedProject.description}</p>}
                    {selectedProject.points && selectedProject.points.length > 0 && (
                      <ul className="space-y-2">
                        {selectedProject.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="pt-4">
                    <a href="/#/contact" className="btn-primary text-sm !py-3">
                      <span>Start Similar Project</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default PortfolioPage;
