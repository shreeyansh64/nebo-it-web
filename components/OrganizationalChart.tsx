import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ORG_MEMBERS } from '../constants';
import { OrgMember } from '../types';

const OrgCard: React.FC<{
    member: OrgMember;
    onSelect: (member: OrgMember) => void;
    className?: string;
}> = ({ member, onSelect, className = "" }) => {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(member)}
            className={`relative w-full bg-[#0c0c1d]/80 backdrop-blur-sm border border-purple-500/10 p-4 rounded-xl shadow-lg cursor-pointer flex flex-col items-center text-center group overflow-hidden ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-gray-700 mb-3 group-hover:border-purple-400 transition-colors z-10">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-white font-bold text-sm sm:text-base z-10">{member.name}</h3>
            <p className="text-purple-400 text-xs sm:text-sm font-medium z-10">{member.role}</p>
        </motion.div>
    );
};

const ConnectLine = ({ className = "" }: { className?: string }) => (
    <div className={`bg-purple-500/20 ${className}`} />
);

const OrganizationalChart: React.FC = () => {
    const [selectedMember, setSelectedMember] = useState<OrgMember | null>(null);

    return (
        <section id="team" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className="text-center mb-16">
                    <span className="section-label justify-center">Our Team</span>
                    <h2 className="section-title text-center mx-auto">Organizational Structure</h2>
                </div>

                <div className="w-full overflow-x-auto pb-32 hide-scrollbar">
                    <div className="min-w-[1024px] flex flex-col items-center mx-auto pt-4">
                        <div className="w-56 sm:w-64">
                            <OrgCard member={ORG_MEMBERS.chairperson} onSelect={setSelectedMember} className="border-purple-500/30 shadow-[0_0_20px_rgba(124,58,237,0.1)]" />
                        </div>
                        <ConnectLine className="w-1 h-10" />
                        <div className="w-56 sm:w-64">
                            <OrgCard member={ORG_MEMBERS.managingdirector} onSelect={setSelectedMember} />
                        </div>
                        <ConnectLine className="w-1 h-10" />
                        <div className="w-full max-w-7xl relative mt-0">
                            <ConnectLine className="absolute top-0 left-[10%] right-[10%] h-1" />
                            <div className="flex w-full justify-between">
                                <div className="w-1/5 flex flex-col items-center px-2">
                                    <ConnectLine className="w-1 h-8" />
                                    <OrgCard member={ORG_MEMBERS.directorProject} onSelect={setSelectedMember} />
                                    <ConnectLine className="w-1 h-8" />
                                    <OrgCard member={ORG_MEMBERS.teamProject} onSelect={setSelectedMember} />
                                </div>
                                <div className="w-1/5 flex flex-col items-center px-2">
                                    <ConnectLine className="w-1 h-8" />
                                    <OrgCard member={ORG_MEMBERS.directorFinance} onSelect={setSelectedMember} />
                                    <ConnectLine className="w-1 h-8" />
                                    <OrgCard member={ORG_MEMBERS.financeTeam} onSelect={setSelectedMember} />
                                </div>
                                <div className="w-1/5 flex flex-col items-center px-2">
                                    <ConnectLine className="w-1 h-8" />
                                    <OrgCard member={ORG_MEMBERS.directorSales} onSelect={setSelectedMember} />
                                    <ConnectLine className="w-1 h-8" />
                                    <OrgCard member={ORG_MEMBERS.teamSales} onSelect={setSelectedMember} />
                                </div>
                                <div className="w-1/5 flex flex-col items-center px-2">
                                    <ConnectLine className="w-1 h-8" />
                                    <OrgCard member={ORG_MEMBERS.directorTech} onSelect={setSelectedMember} />
                                    <ConnectLine className="w-1 h-8" />
                                    <OrgCard member={ORG_MEMBERS.teamLeader} onSelect={setSelectedMember} />
                                    <ConnectLine className="w-1 h-8" />
                                    <OrgCard member={ORG_MEMBERS.architects} onSelect={setSelectedMember} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedMember && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#06060e]/80 backdrop-blur-sm"
                        onClick={() => setSelectedMember(null)}>
                        <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }} onClick={(e) => e.stopPropagation()}
                            className="bg-[#0c0c1d] border border-purple-500/10 rounded-2xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] shadow-2xl relative overflow-hidden flex flex-col">
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
                            <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 z-10 text-gray-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
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
                                        <p className="text-gray-400 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">{selectedMember.details}</p>
                                    </div>
                                    {selectedMember.experiences && selectedMember.experiences.length > 0 && (
                                        <div>
                                            <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-2">Experience</h4>
                                            <ul className="space-y-2">
                                                {selectedMember.experiences.map((exp, idx) => (
                                                    <motion.li initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * idx }} key={idx}
                                                        className="flex items-start text-gray-400 bg-white/[0.02] p-3 rounded-lg border border-white/5">
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