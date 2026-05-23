import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, TrendingUp, Shield, Code2, Users, BarChart3 } from 'lucide-react';
import { ORG_MEMBERS } from '../constants';
import { OrgMember } from '../types';

type DeptColor = 'purple' | 'blue' | 'emerald' | 'amber' | 'rose' | 'cyan';

interface OrgCardProps {
  member: OrgMember;
  onSelect: (member: OrgMember) => void;
  deptColor?: DeptColor;
  level?: number;
  index?: number;
}

const deptColorMap: Record<DeptColor, { bg: string; border: string; text: string; icon: string }> = {
  purple: { bg: 'from-purple-500/10 to-indigo-500/10', border: 'border-purple-500/25', text: 'text-purple-400', icon: 'bg-purple-500/15' },
  blue:   { bg: 'from-blue-500/10 to-cyan-500/10',    border: 'border-blue-500/25',   text: 'text-blue-400',   icon: 'bg-blue-500/15' },
  emerald:{ bg: 'from-emerald-500/10 to-teal-500/10', border: 'border-emerald-500/25', text: 'text-emerald-400', icon: 'bg-emerald-500/15' },
  amber:  { bg: 'from-amber-500/10 to-orange-500/10', border: 'border-amber-500/25',  text: 'text-amber-400',  icon: 'bg-amber-500/15' },
  rose:   { bg: 'from-rose-500/10 to-pink-500/10',    border: 'border-rose-500/25',   text: 'text-rose-400',   icon: 'bg-rose-500/15' },
  cyan:   { bg: 'from-cyan-500/10 to-sky-500/10',     border: 'border-cyan-500/25',   text: 'text-cyan-400',   icon: 'bg-cyan-500/15' },
};

const departmentIcons: Record<string, React.FC<{ size?: number }>> = {
  purple: Briefcase,
  blue:   TrendingUp,
  emerald: BarChart3,
  amber:  Users,
  rose:   Shield,
  cyan:   Code2,
};

const OrgCard: React.FC<OrgCardProps> = ({ member, onSelect, deptColor = 'purple', level = 2, index = 0 }) => {
  const colors = deptColorMap[deptColor];
  const DeptIcon = departmentIcons[deptColor] || Briefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(member)}
      className={`relative group cursor-pointer rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} backdrop-blur-sm p-5 flex flex-col items-center text-center overflow-hidden transition-shadow duration-300 hover:shadow-xl`}
      style={{ boxShadow: undefined }}
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)' }}
      />

      {/* Dept icon badge */}
      <div className={`absolute top-3 right-3 w-6 h-6 rounded-lg ${colors.icon} flex items-center justify-center`}>
        <DeptIcon size={12} className={colors.text} />
      </div>

      {/* Avatar */}
      <div className={`w-20 h-20 rounded-2xl overflow-hidden border-2 ${colors.border} mb-4 group-hover:scale-105 transition-transform duration-300 shadow-md`}>
        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
      </div>

      {/* Name & Role */}
      <h3 className="text-white font-bold text-sm leading-tight mb-1">{member.name}</h3>
      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors.icon} ${colors.text} border ${colors.border}`}>
        {member.role}
      </span>

      {/* Tap hint */}
      <p className="text-[10px] text-gray-600 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        Click to view details
      </p>
    </motion.div>
  );
};

// Section dividers
const LevelDivider: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-4 w-full py-2">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600">{label}</span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
  </div>
);

const OrganizationalChart: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<OrgMember | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  return (
    <section id="team" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label justify-center">Our Team</span>
          <h2 className="section-title text-center mx-auto">Organizational Structure</h2>
          <p className="section-subtitle text-center mx-auto mt-4">
            A multidisciplinary team of engineers, strategists, and AI specialists — united by a mission to build intelligent digital systems.
          </p>
        </motion.div>

        {/* LEVEL 1 — Chairperson */}
        <div className="mb-6">
          <LevelDivider label="Board" />
          <div className="flex justify-center mt-4">
            <div className="w-52">
              <OrgCard member={ORG_MEMBERS.chairperson} onSelect={setSelectedMember} deptColor="purple" level={1} index={0} />
            </div>
          </div>
        </div>

        {/* LEVEL 2 — Managing Director */}
        <div className="mb-6">
          <LevelDivider label="Executive Leadership" />
          <div className="flex justify-center mt-4">
            <div className="w-52">
              <OrgCard member={ORG_MEMBERS.managingdirector} onSelect={setSelectedMember} deptColor="rose" level={2} index={0} />
            </div>
          </div>
        </div>

        {/* LEVEL 3 — Directors */}
        <div className="mb-6">
          <LevelDivider label="Directors" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4"
          >
            <OrgCard member={ORG_MEMBERS.directorProject} onSelect={setSelectedMember} deptColor="blue"    level={3} index={0} />
            <OrgCard member={ORG_MEMBERS.directorFinance}  onSelect={setSelectedMember} deptColor="emerald" level={3} index={1} />
            <OrgCard member={ORG_MEMBERS.directorSales}    onSelect={setSelectedMember} deptColor="amber"   level={3} index={2} />
            <OrgCard member={ORG_MEMBERS.directorTech}     onSelect={setSelectedMember} deptColor="cyan"    level={3} index={3} />
          </motion.div>
        </div>

        {/* LEVEL 4 — Teams */}
        <div className="mb-6">
          <LevelDivider label="Operations & Teams" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4"
          >
            <OrgCard member={ORG_MEMBERS.teamProject}  onSelect={setSelectedMember} deptColor="blue"    level={4} index={0} />
            <OrgCard member={ORG_MEMBERS.financeTeam}  onSelect={setSelectedMember} deptColor="emerald" level={4} index={1} />
            <OrgCard member={ORG_MEMBERS.teamSales}    onSelect={setSelectedMember} deptColor="amber"   level={4} index={2} />
            <OrgCard member={ORG_MEMBERS.teamLeader}   onSelect={setSelectedMember} deptColor="cyan"    level={4} index={3} />
          </motion.div>
        </div>

        {/* LEVEL 5 — Engineering */}
        <div>
          <LevelDivider label="Engineering Core" />
          <div className="flex justify-center mt-4">
            <div className="w-64">
              <OrgCard member={ORG_MEMBERS.architects} onSelect={setSelectedMember} deptColor="rose" level={5} index={0} />
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#06060e]/80 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0c0c1d] border border-purple-500/10 rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] shadow-2xl relative overflow-hidden flex flex-col"
            >
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              >
                <X size={20} />
              </button>
              <div className="overflow-y-auto pr-2 pb-4 -mr-2 hide-scrollbar">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 mt-4 sm:mt-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-purple-500/20 flex-shrink-0 shadow-lg">
                    <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center sm:text-left pt-2">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 pr-6">{selectedMember.name}</h3>
                    <p className="text-purple-400 font-medium text-lg">{selectedMember.role}</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-2">About Role</h4>
                    <p className="text-gray-400 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      {selectedMember.details}
                    </p>
                  </div>
                  {selectedMember.experiences && selectedMember.experiences.length > 0 && (
                    <div>
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-2">Experience</h4>
                      <ul className="space-y-2">
                        {selectedMember.experiences.map((exp, idx) => (
                          <motion.li
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            key={idx}
                            className="flex items-start text-gray-400 bg-white/[0.02] p-3 rounded-lg border border-white/5"
                          >
                            <span className="text-purple-400 mr-3 mt-1 text-lg leading-none">•</span>
                            <span>{exp}</span>
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