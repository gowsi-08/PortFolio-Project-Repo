import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCode, FiLayout, FiServer, FiDatabase, FiTool, FiMonitor,
  FiCpu, FiPackage
} from 'react-icons/fi';
import styles from './Skills.module.css';

/** Map category names → react-icon component */
const CATEGORY_ICONS = {
  'Languages':       <FiCode size={14} />,
  'Frontend':        <FiLayout size={14} />,
  'Backend':         <FiServer size={14} />,
  'Databases':       <FiDatabase size={14} />,
  'Tools & Platforms': <FiTool size={14} />,
  'OS':              <FiMonitor size={14} />,
  'Cloud':           <FiPackage size={14} />,
};

export default function Skills({ data }) {
  const { skills } = data;
  const [active, setActive] = useState(skills[0]?.category ?? '');

  const activeGroup = skills.find((g) => g.category === active);

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">02 / Skills</span>
          <h2 className="section-title">Tech Stack</h2>
          <div className="section-line" />
        </div>

        {/* Category tabs */}
        <div className={styles.tabs}>
          {skills.map((group) => (
            <button
              key={group.category}
              className={`${styles.tab} ${active === group.category ? styles.tabActive : ''}`}
              onClick={() => setActive(group.category)}
            >
              {CATEGORY_ICONS[group.category] ?? <FiCpu size={14} />}
              {group.category}
            </button>
          ))}
        </div>

        {/* Skills grid — icon + name only, no rating */}
        <motion.div
          key={active}
          className={styles.grid}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
        >
          {activeGroup?.items.map((skill, i) => (
            <motion.div
              key={skill.name}
              className={`card ${styles.skillCard}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <div className={styles.skillIcon}>
                <i className={`${skill.icon} colored`} />
              </div>
              <span className={styles.skillName}>{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
