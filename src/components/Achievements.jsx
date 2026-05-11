import { motion } from 'framer-motion';
import {
  FiExternalLink, FiAward, FiBookOpen, FiStar,
  FiCheckCircle, FiGlobe, FiTrendingUp
} from 'react-icons/fi';
import styles from './Achievements.module.css';

/** Map YAML icon emojis → react-icons */
const ICON_MAP = {
  '🏆': <FiAward size={20} />,
  '🎓': <FiBookOpen size={20} />,
  '☁️': <FiGlobe size={20} />,
  '📊': <FiTrendingUp size={20} />,
  '🥇': <FiStar size={20} />,
  '🌐': <FiGlobe size={20} />,
  '💡': <FiCheckCircle size={20} />,
};

function AchIcon({ emoji }) {
  return ICON_MAP[emoji] ?? <FiAward size={20} />;
}

export default function Achievements({ data }) {
  const { achievements } = data;
  const certs  = achievements.filter((a) => a.type === 'certification');
  const awards = achievements.filter((a) => a.type === 'achievement');

  const renderCard = (item, i) => (
    <motion.div
      key={i}
      className={`card ${styles.card}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.45 }}
    >
      <div className={styles.iconWrap}>
        <AchIcon emoji={item.icon} />
      </div>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{item.title}</h3>
          {item.credential_url && (
            <a
              href={item.credential_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.credLink}
              aria-label="View credential"
            >
              <FiExternalLink size={13} />
            </a>
          )}
        </div>
        <p className={styles.issuer}>{item.issuer}</p>
        <span className={styles.date}>{item.date}</span>
      </div>
    </motion.div>
  );

  return (
    <section id="achievements" className={`section ${styles.altBg}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">06 / Achievements</span>
          <h2 className="section-title">Certifications & Awards</h2>
          <div className="section-line" />
        </div>

        <div className={styles.columns}>
          <div className={styles.col}>
            <h3 className={styles.colTitle}>
              <FiBookOpen size={14} /> Certifications
            </h3>
            <div className={styles.list}>{certs.map(renderCard)}</div>
          </div>
          <div className={styles.col}>
            <h3 className={styles.colTitle}>
              <FiAward size={14} /> Achievements
            </h3>
            <div className={styles.list}>{awards.map(renderCard)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
