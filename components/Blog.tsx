import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Calendar, Terminal } from 'lucide-react';

const MOCK_BLOGS = [
  { 
    id: '1', 
    title: 'Decoupling the Monolith: A Post-Mortem', 
    author: 'Sarah Chen, Lead Architect', 
    date: 'Feb 22, 2026', 
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800', 
    description: 'How we migrated a 5-year-old legacy system to a Go-based event-driven architecture.', 
    content: 'Scaling a monolithic application eventually hits a ceiling. In this deep dive, we explore our recent migration to an event-driven microservices architecture using Go and Kafka. We discuss the pain points of distributed data transactions, our strategy for zero-downtime database slicing, and how we ultimately reduced API latency by 43% across our core services.' 
  },
  { 
    id: '2', 
    title: 'WebAssembly & Rust: The Frontend Frontier', 
    author: 'Marcus Johnson, Staff Engineer', 
    date: 'Mar 17, 2026', 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800', 
    description: 'Breaking the JavaScript monopoly for high-compute tasks in the browser.', 
    content: 'JavaScript is fast, but for heavy computational tasks like client-side video processing and real-time 3D rendering, it can bottleneck. By compiling Rust down to WebAssembly (Wasm), we achieved near-native performance directly in the browser. This article walks through our Rust-to-Wasm pipeline and how we integrate it seamlessly with our existing React ecosystem.' 
  },
  { 
    id: '3', 
    title: 'Zero-Trust Security in CI/CD Pipelines', 
    author: 'Elena Rodriguez, DevSecOps', 
    date: 'Apr 30, 2026', 
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800', 
    description: 'Implementing strict least-privilege access across automated deployment workflows.', 
    content: 'Supply chain attacks are the new perimeter threat. Securing your code repository is no longer enough; the pipeline itself must be hardened. We break down our implementation of a Zero-Trust model within GitHub Actions, utilizing ephemeral runners, short-lived OIDC tokens for AWS authentication, and automated container image signing.' 
  },
  { 
    id: '4', 
    title: 'RAG vs Fine-Tuning for Enterprise LLMs', 
    author: 'Dr. Alan Turing, Head of AI', 
    date: 'May 05, 2026', 
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800', 
    description: 'Evaluating architectural choices for implementing generative AI in B2B SaaS.', 
    content: 'When adding LLM capabilities to enterprise software, context is everything. Should you fine-tune an open-source model like Llama 3, or build a Retrieval-Augmented Generation (RAG) pipeline? We compare the cost, latency, and hallucination rates of both approaches based on our recent deployment for a Fortune 500 fintech client.' 
  },
  { 
    id: '5', 
    title: 'Mastering React Server Components', 
    author: 'David Kim, UI/UX Engineer', 
    date: 'June 12, 2026', 
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800', 
    description: 'Drastically reducing client-side bundle sizes without sacrificing interactivity.', 
    content: 'React Server Components (RSC) fundamentally shift how we think about rendering. By pushing heavy dependencies to the server and streaming UI components directly to the client, we reduced our initial load times by over 60%. This guide covers our transition strategy and the mental model required to separate server and client boundaries effectively.' 
  }
];

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<typeof MOCK_BLOGS[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedBlogs = showAll ? MOCK_BLOGS : MOCK_BLOGS.slice(0, 3);

  return (
    <section id="engineering-blog" className="py-32 bg-[var(--bg-primary)] border-t border-slate-900">
      <div className="container mx-auto px-6">
        
        {/* Editorial Header */}
        <div className="mb-16">
          <span className="text-cyan-500 font-mono text-sm tracking-widest uppercase block mb-4">
            Engineering Log
          </span>
          <h2 className="text-4xl md:text-7xl font-black var(--text-main) tracking-tighter leading-none uppercase">
            Architecting the <br/> Digital Frontier
          </h2>
        </div>

        {/* Animated Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {displayedBlogs.map((post) => (
              <motion.div 
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelectedPost(post)}
                className="flex flex-col group cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-slate-900 border border-slate-800 relative">
                  <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                  />
                </div>
                <div className="text-cyan-600 font-mono text-xs mb-3 uppercase tracking-wider flex items-center gap-2">
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4 group-hover:text-cyan-400 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.description}
                </p>
                <div className="mt-auto flex items-center gap-2 text-slate-300 text-xs font-mono uppercase tracking-tighter border-b border-slate-700 group-hover:border-cyan-500 group-hover:text-cyan-400 w-fit pb-1 transition-all">
                  Read Documentation <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Toggle */}
        <div className="mt-20">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 border border-slate-700 rounded-md font-mono text-xs text-slate-300 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all uppercase tracking-widest"
          >
            {showAll ? 'Collapse Directory ↑' : 'Access Full Archive →'}
          </button>
        </div>
      </div>

      {/* Full Modal Restoration */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-xl shadow-2xl border border-slate-700 flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-5/12 min-h-[300px] md:h-auto relative border-r border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 md:bg-gradient-to-r md:from-transparent md:to-slate-900" />
                <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
              </div>

              <div className="w-full md:w-7/12 p-8 md:p-12 space-y-6 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2 bg-cyan-950/50 px-3 py-1 rounded-sm"><Calendar size={14}/> {selectedPost.date}</span>
                  <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-sm"><Terminal size={14}/> {selectedPost.author}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-100 leading-tight tracking-tight">
                  {selectedPost.title}
                </h2>
                <div className="h-1 w-16 bg-cyan-500 rounded-full" />
                <p className="text-slate-300 text-lg leading-relaxed font-light">
                  {selectedPost.content}
                </p>
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-md">
                  <p className="text-slate-400 leading-relaxed text-sm font-mono border-l-2 border-cyan-500 pl-4">
                    <span className="text-cyan-500">{"// TL;DR: "}</span>
                    {selectedPost.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;