'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Eye, Target, RefreshCw } from 'lucide-react';
import SectionHeading from './SectionHeading';

const trustPoints = [
  {
    icon: MessageCircle,
    title: 'Direct Communication',
    description: 'Work directly with the team handling your project.',
  },
  {
    icon: Eye,
    title: 'Transparent Process',
    description: 'Clear requirements, milestones and communication throughout development.',
  },
  {
    icon: Target,
    title: 'Practical Solutions',
    description: 'Technology chosen around the actual needs of the business.',
  },
  {
    icon: RefreshCw,
    title: 'Long-Term Thinking',
    description: 'Products designed to be maintainable and ready for future improvements.',
  },
];

export default function TrustSection() {
  return (
    <section className="section-padding bg-[#050B18] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-violet-600/5 rounded-full blur-[100px]" />

      <div className="container-custom relative">
        <div className="text-center mb-14">
          <SectionHeading
            badge="How We Work With You"
            title="Built Around"
            highlight="Your Business"
            subtitle="Every project starts with understanding the business behind it. We work closely with clients to understand their goals, challenges and requirements before turning them into a practical digital solution."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="glass-card p-6 h-full hover:border-purple-500/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/4 to-violet-500/4 opacity-0 hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-purple-400" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
