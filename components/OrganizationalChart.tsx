import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, Briefcase, TrendingUp, Shield, Code2, Users, BarChart3, Network, Cpu, Database } from 'lucide-react';
import { ORG_MEMBERS } from '../constants';
import { OrgMember } from '../types';

type DeptColor = 'purple' | 'blue' | 'emerald' | 'amber' | 'rose' | 'cyan';

const deptColorMap: Record<DeptColor, { bg: string; border: string; text: string; icon: string; hoverGlow: string; hoverBorder: string; ring: string }> = {
  purple: { bg: 'from-purple-950/40 to-indigo-950/40', border: 'border-purple-500/30', text: 'text-purple-400', icon: 'bg-purple-500/20', hoverGlow: 'hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)]', hoverBorder: 'group-hover:border-purple-400', ring: 'border-purple-400' },
  blue:   { bg: 'from-blue-950/40 to-cyan-950/40',    border: 'border-blue-500/30',   text: 'text-blue-400',   icon: 'bg-blue-500/20', hoverGlow: 'hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.4)]', hoverBorder: 'group-hover:border-blue-400', ring: 'border-blue-400' },
  emerald:{ bg: 'from-emerald-950/40 to-teal-950/40', border: 'border-emerald-500/30', text: 'text-emerald-400', icon: 'bg-emerald-500/20', hoverGlow: 'hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]', hoverBorder: 'group-hover:border-emerald-400', ring: 'border-emerald-400' },
  amber:  { bg: 'from-amber-950/40 to-orange-950/40', border: 'border-amber-500/30',  text: 'text-amber-400',  icon: 'bg-amber-500/20', hoverGlow: 'hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)]', hoverBorder: 'group-hover:border-amber-400', ring: 'border-amber-400' },
  rose:   { bg: 'from-rose-950/40 to-pink-950/40',    border: 'border-rose-500/30',   text: 'text-rose-400',   icon: 'bg-rose-500/20', hoverGlow: 'hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.4)]', hoverBorder: 'group-hover:border-rose-400', ring: 'border-rose-400' },
  cyan:   { bg: 'from-cyan-950/40 to-sky-950/40',     border: 'border-cyan-500/30',   text: 'text-cyan-400',   icon: 'bg-cyan-500/20', hoverGlow: 'hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)]', hoverBorder: 'group-hover:border-cyan-400', ring: 'border-cyan-400' },
};

const departmentIcons: Record<string, React.FC<{ size?: number; className?: string }>> = {
  purple: Briefcase,
  blue:   TrendingUp,
  emerald: BarChart3,
  amber:  Users,
  rose:   Shield,
  cyan:   Code2,
};

const OrgNode = ({ member, deptColor = 'cyan', onClick }: { member: OrgMember; deptColor?: DeptColor; onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const colors = deptColorMap[deptColor];
  const DeptIcon = departmentIcons[deptColor] || Network;

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      className={`relative group cursor-pointer w-[90%] max-w-[320px] md:w-48 lg:w-56 rounded-xl border ${colors.border} ${colors.hoverBorder} bg-gradient-to-br ${colors.bg} backdrop-blur-md p-5 flex flex-col items-center text-center transition-all duration-500 ${colors.hoverGlow}`}
    >
      {/* Cybernetic corners */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent ${colors.hoverBorder} rounded-tl-sm transition-colors duration-300`} />
      <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-transparent ${colors.hoverBorder} rounded-tr-sm transition-colors duration-300`} />
      <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-transparent ${colors.hoverBorder} rounded-bl-sm transition-colors duration-300`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-transparent ${colors.hoverBorder} rounded-br-sm transition-colors duration-300`} />

      {/* Dept Icon */}
      <div className={`absolute top-3 right-3 w-7 h-7 rounded-md ${colors.icon} flex items-center justify-center`}>
        <DeptIcon size={14} className={colors.text} />
      </div>

      {/* Avatar with spinning ring */}
      <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border border-slate-700/50 mb-4 group-hover:border-transparent transition-colors duration-500`} style={{ transform: "translateZ(30px)" }}>
         <motion.div 
           animate={{ rotate: 360 }} 
           transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} 
           className={`absolute inset-0 rounded-full border border-transparent border-t-2 border-r-2 ${colors.ring} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
         />
         <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full bg-[#0a0f1c]" />
      </div>

      <h3 className="text-white font-bold text-sm sm:text-base leading-tight mb-2" style={{ transform: "translateZ(20px)" }}>{member.name}</h3>
      <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded border border-transparent ${colors.icon} ${colors.text} group-hover:${colors.hoverBorder} transition-colors uppercase tracking-widest`} style={{ transform: "translateZ(10px)" }}>
        {member.role}
      </span>
    </motion.div>
  );
};

const DataLine = ({ height = 'h-12', delay = 0 }: { height?: string, delay?: number }) => (
  <div className={`w-[2px] ${height} bg-slate-800/60 relative overflow-hidden`}>
    <motion.div
      className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
      animate={{ top: ['-100%', '200%'] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay }}
    />
  </div>
);

const HorizontalLine = () => (
  <div className="w-[75%] h-[2px] bg-slate-800/60 relative flex">
    <div className="w-1/2 h-full relative overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 h-full w-[150px] bg-gradient-to-l from-transparent via-cyan-400 to-transparent"
        animate={{ right: ['-150px', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
    <div className="w-1/2 h-full relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-full w-[150px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{ left: ['-150px', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  </div>
);

const OrganizationalChart: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<OrgMember | null>(null);

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#020617] border-y border-slate-800">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e90a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e90a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Network size={14} /> Organizational Structure
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            NEURAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">HIERARCHY</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            The central nervous system of Nebo IT. A multidisciplinary architecture of engineers, strategists, and AI specialists united to build intelligent digital systems.
          </p>
        </motion.div>

        {/* Mobile View: Cards Grid */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 pb-16 justify-items-center">
          <OrgNode member={ORG_MEMBERS.chairperson} deptColor="purple" onClick={() => setSelectedMember(ORG_MEMBERS.chairperson)} />
          <OrgNode member={ORG_MEMBERS.managingdirector} deptColor="rose" onClick={() => setSelectedMember(ORG_MEMBERS.managingdirector)} />
          <OrgNode member={ORG_MEMBERS.directorProject} deptColor="blue" onClick={() => setSelectedMember(ORG_MEMBERS.directorProject)} />
          <OrgNode member={ORG_MEMBERS.teamProject} deptColor="blue" onClick={() => setSelectedMember(ORG_MEMBERS.teamProject)} />
          <OrgNode member={ORG_MEMBERS.directorFinance} deptColor="emerald" onClick={() => setSelectedMember(ORG_MEMBERS.directorFinance)} />
          <OrgNode member={ORG_MEMBERS.financeTeam} deptColor="emerald" onClick={() => setSelectedMember(ORG_MEMBERS.financeTeam)} />
          <OrgNode member={ORG_MEMBERS.directorSales} deptColor="amber" onClick={() => setSelectedMember(ORG_MEMBERS.directorSales)} />
          <OrgNode member={ORG_MEMBERS.teamSales} deptColor="amber" onClick={() => setSelectedMember(ORG_MEMBERS.teamSales)} />
          <OrgNode member={ORG_MEMBERS.directorTech} deptColor="cyan" onClick={() => setSelectedMember(ORG_MEMBERS.directorTech)} />
          <OrgNode member={ORG_MEMBERS.teamLeader} deptColor="cyan" onClick={() => setSelectedMember(ORG_MEMBERS.teamLeader)} />
          <OrgNode member={ORG_MEMBERS.architects} deptColor="cyan" onClick={() => setSelectedMember(ORG_MEMBERS.architects)} />
        </div>

        {/* Desktop View: Interactive Tree */}
        <div className="hidden md:block w-full overflow-x-auto pb-16 hide-scrollbar cursor-grab active:cursor-grabbing">
          <div className="flex flex-col items-center w-full min-w-[1100px] px-8">
            
            {/* Level 1: Chairperson */}
            <OrgNode member={ORG_MEMBERS.chairperson} deptColor="purple" onClick={() => setSelectedMember(ORG_MEMBERS.chairperson)} />
            <DataLine height="h-12" delay={0} />

            {/* Level 2: Managing Director */}
            <OrgNode member={ORG_MEMBERS.managingdirector} deptColor="rose" onClick={() => setSelectedMember(ORG_MEMBERS.managingdirector)} />
            <DataLine height="h-12" delay={0.2} />

            {/* Horizontal Split */}
            <HorizontalLine />

            {/* Level 3, 4, 5: The 4 Branches */}
            <div className="flex w-full justify-between">
              
              {/* Branch 1 */}
              <div className="w-1/4 flex flex-col items-center">
                <DataLine height="h-12" delay={0.4} />
                <OrgNode member={ORG_MEMBERS.directorProject} deptColor="blue" onClick={() => setSelectedMember(ORG_MEMBERS.directorProject)} />
                <DataLine height="h-12" delay={0.6} />
                <OrgNode member={ORG_MEMBERS.teamProject} deptColor="blue" onClick={() => setSelectedMember(ORG_MEMBERS.teamProject)} />
              </div>

              {/* Branch 2 */}
              <div className="w-1/4 flex flex-col items-center">
                <DataLine height="h-12" delay={0.5} />
                <OrgNode member={ORG_MEMBERS.directorFinance} deptColor="emerald" onClick={() => setSelectedMember(ORG_MEMBERS.directorFinance)} />
                <DataLine height="h-12" delay={0.7} />
                <OrgNode member={ORG_MEMBERS.financeTeam} deptColor="emerald" onClick={() => setSelectedMember(ORG_MEMBERS.financeTeam)} />
              </div>

              {/* Branch 3 */}
              <div className="w-1/4 flex flex-col items-center">
                <DataLine height="h-12" delay={0.6} />
                <OrgNode member={ORG_MEMBERS.directorSales} deptColor="amber" onClick={() => setSelectedMember(ORG_MEMBERS.directorSales)} />
                <DataLine height="h-12" delay={0.8} />
                <OrgNode member={ORG_MEMBERS.teamSales} deptColor="amber" onClick={() => setSelectedMember(ORG_MEMBERS.teamSales)} />
              </div>

              {/* Branch 4 (Deepest) */}
              <div className="w-1/4 flex flex-col items-center">
                <DataLine height="h-12" delay={0.7} />
                <OrgNode member={ORG_MEMBERS.directorTech} deptColor="cyan" onClick={() => setSelectedMember(ORG_MEMBERS.directorTech)} />
                <DataLine height="h-12" delay={0.9} />
                <OrgNode member={ORG_MEMBERS.teamLeader} deptColor="cyan" onClick={() => setSelectedMember(ORG_MEMBERS.teamLeader)} />
                <DataLine height="h-12" delay={1.1} />
                <OrgNode member={ORG_MEMBERS.architects} deptColor="cyan" onClick={() => setSelectedMember(ORG_MEMBERS.architects)} />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Holographic Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020617]/90 backdrop-blur-xl"
            onClick={() => setSelectedMember(null)}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0, rotateX: 10 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.95, y: -20, opacity: 0, rotateX: -10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)] relative overflow-hidden flex flex-col"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Animated Grid Background for Modal */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e91a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e91a_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 text-slate-400 hover:text-cyan-400 hover:rotate-90 transition-all duration-300 p-2 rounded-full hover:bg-cyan-500/10"
              >
                <X size={24} />
              </button>

              <div className="relative z-10 overflow-y-auto pr-2 pb-4 -mr-2 hide-scrollbar">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-8 mt-4 sm:mt-0">
                  {/* Image Wrapper */}
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0 group">
                    <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full" />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute inset-[-4px] border border-transparent border-t-cyan-400 border-b-cyan-400 rounded-full opacity-70" />
                    <img src={selectedMember.image} alt={selectedMember.name} className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full bg-[#0a0f1c]" />
                  </div>
                  
                  <div className="text-center sm:text-left pt-2 flex-1">
                    <h3 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">{selectedMember.name}</h3>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                       <Network size={16} className="text-cyan-400" />
                       <p className="text-cyan-400 font-bold text-sm uppercase tracking-widest">{selectedMember.role}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-5 sm:p-6 backdrop-blur-md">
                    <h4 className="flex items-center gap-2 text-sm uppercase tracking-widest text-slate-400 font-bold mb-3 border-b border-slate-700/50 pb-3">
                      <Database size={16} className="text-cyan-500" /> System Profile
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                      {selectedMember.details}
                    </p>
                  </div>

                  {selectedMember.experiences && selectedMember.experiences.length > 0 && (
                    <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-5 sm:p-6 backdrop-blur-md">
                      <h4 className="flex items-center gap-2 text-sm uppercase tracking-widest text-slate-400 font-bold mb-4 border-b border-slate-700/50 pb-3">
                        <Cpu size={16} className="text-cyan-500" /> Operational Matrix
                      </h4>
                      <ul className="space-y-3">
                        {selectedMember.experiences.map((exp, idx) => (
                          <motion.li
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx, type: "spring" }}
                            key={idx}
                            className="flex items-start text-slate-300 group"
                          >
                            <span className="mt-1.5 mr-3 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                            <span className="text-sm sm:text-base leading-relaxed">{exp}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OrganizationalChart;