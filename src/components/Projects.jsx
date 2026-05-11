import { motion } from 'framer-motion';
import {
  FiGithub, FiExternalLink, FiMap, FiHeart, FiBook,
  FiFileText, FiFolder, FiCode, FiShoppingCart, FiDollarSign,
  FiGitPullRequest, FiBox, FiZap, FiGlobe
} from 'react-icons/fi';
import styles from './Projects.module.css';

/** Map YAML thumbnail string → react-icon */
const THUMB_ICONS = {
  '🗺️': <FiMap size={28} />,
  '🐾': <FiHeart size={28} />,
  '📚': <FiBook size={28} />,
  '📝': <FiFileText size={28} />,
  '📂': <FiFolder size={28} />,
  '💻': <FiCode size={28} />,
  '🛒': <FiShoppingCart size={28} />,
  '💰': <FiDollarSign size={28} />,
  '🤖': <FiGitPullRequest size={28} />,
  '🚀': <FiZap size={28} />,
  '🌐': <FiGlobe size={28} />,
};

function ThumbIcon({ value }) {
  return THUMB_ICONS[value] ?? <FiBox size={28} />;
}

export default function Projects({ data }) {
  const { projects } = data;
  const featured = projects.filter((p) => p.featured);
  const others   = projects.filter((p) => !p.featured);

  const ProjectCard = ({ project, large = false }) => (
    <motion.div
      className={`card ${styles.card} ${large ? styles.large : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
    >
      {large && (
        <div className={styles.featuredBadge}>
          <FiZap size={11} />
          Featured
        </div>
      )}

      <div className={styles.thumbnail}>
        <ThumbIcon value={project.thumbnail} />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.description}</p>

        <div className={styles.tags}>
          {project.tech_stack.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <div className={styles.links}>
          {project.github_url && (
            <a href={project.github_url} className={styles.link} target="_blank" rel="noopener noreferrer">
              <FiGithub size={14} /> Code
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} className={`${styles.link} ${styles.linkPrimary}`} target="_blank" rel="noopener noreferrer">
              <FiExternalLink size={14} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">04 / Projects</span>
          <h2 className="section-title">Things I've Built</h2>
          <div className="section-line" />
        </div>

        <div className={styles.featuredGrid}>
          {featured.map((p) => <ProjectCard key={p.title} project={p} large />)}
        </div>

        {others.length > 0 && (
          <>
            <h3 className={styles.othersTitle}>Other Projects</h3>
            <div className={styles.othersGrid}>
              {others.map((p) => <ProjectCard key={p.title} project={p} />)}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
