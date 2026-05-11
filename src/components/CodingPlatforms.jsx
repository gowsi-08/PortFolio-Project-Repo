import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import {
  SiLeetcode, SiGeeksforgeeks, SiCodeforces, SiCodechef, SiHackerrank
} from 'react-icons/si';
import styles from './CodingPlatforms.module.css';

/** Map platform names → Si icons with fallback */
const PLATFORM_ICONS = {
  'LeetCode':       <SiLeetcode size={22} />,
  'GeeksForGeeks':  <SiGeeksforgeeks size={22} />,
  'Codeforces':     <SiCodeforces size={22} />,
  'CodeChef':       <SiCodechef size={22} />,
  'HackerRank':     <SiHackerrank size={22} />,
};

export default function CodingPlatforms({ data }) {
  const { coding_platforms } = data;

  return (
    <section id="platforms" className={`section ${styles.altBg}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">05 / Coding</span>
          <h2 className="section-title">Competitive Programming</h2>
          <div className="section-line" />
        </div>

        <div className={styles.grid}>
          {coding_platforms.map((p, i) => (
            <motion.a
              key={p.platform}
              href={p.profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`card ${styles.card}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ '--platform-color': p.badge_color }}
            >
              <div className={styles.header}>
                <span className={styles.icon} style={{ color: p.badge_color }}>
                  {PLATFORM_ICONS[p.platform] ?? <FiExternalLink size={22} />}
                </span>
                <FiExternalLink size={13} className={styles.extIcon} />
              </div>

              <div className={styles.platformName}>{p.platform}</div>

              <div className={styles.username}>
                <span className={styles.at}>@</span>{p.username}
              </div>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{p.problems_solved}</span>
                  <span className={styles.statLabel}>Problems</span>
                </div>
                {p.rating && (
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{p.rating}</span>
                    <span className={styles.statLabel}>Rating</span>
                  </div>
                )}
              </div>

              <div
                className={styles.rankBadge}
                style={{
                  background: `${p.badge_color}18`,
                  border: `1px solid ${p.badge_color}40`,
                  color: p.badge_color,
                }}
              >
                {p.rank}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
