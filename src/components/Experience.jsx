import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar } from 'react-icons/fi';
import styles from './Experience.module.css';

/**
 * Company logos: drop PNG/SVG files into src/assets/ named exactly as
 * the logo_asset field in portfolio.yaml (e.g. "zoho.png", "priga.png").
 * If no file is found, a styled initial badge is shown as fallback.
 */

// Eagerly import all images from the assets folder
const assetModules = import.meta.glob('../assets/*', { eager: true, query: '?url', import: 'default' });

function getLogoUrl(filename) {
  if (!filename) return null;
  const key = `../assets/${filename}`;
  return assetModules[key] ?? null;
}

function CompanyLogo({ filename, name, color }) {
  const src = getLogoUrl(filename);

  if (src) {
    return (
      <div className={styles.logoWrap}>
        <img src={src} alt={`${name} logo`} className={styles.logoImg} />
      </div>
    );
  }

  // Fallback: styled initial badge
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <div
      className={styles.logoWrap}
      style={{ background: `${color}15`, border: `1.5px solid ${color}30` }}
    >
      <span className={styles.logoInitials} style={{ color }}>
        {initials}
      </span>
    </div>
  );
}

export default function Experience({ data }) {
  const { experience } = data;

  return (
    <section id="experience" className={`section ${styles.altBg}`}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">03 / Experience</span>
          <h2 className="section-title">Work Experience</h2>
          <div className="section-line" />
        </div>

        <div className={styles.timeline}>
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              className={styles.entry}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Timeline spine */}
              <div className={styles.spine}>
                <div
                  className={styles.spineDot}
                  style={{ borderColor: exp.logo_color, background: `${exp.logo_color}20` }}
                />
                {i < experience.length - 1 && <div className={styles.spineLine} />}
              </div>

              {/* Card */}
              <div className={`card ${styles.card}`}>
                {/* Card header row */}
                <div className={styles.cardHeader}>
                  <CompanyLogo
                    filename={exp.logo_asset}
                    name={exp.company}
                    color={exp.logo_color}
                  />

                  <div className={styles.cardTitle}>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <span className={styles.company}>{exp.company}</span>
                  </div>

                  <div className={styles.metaGroup}>
                    <span className={styles.metaItem}>
                      <FiCalendar size={12} />
                      {exp.duration}
                    </span>
                    <span className={styles.metaItem}>
                      <FiMapPin size={12} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className={styles.divider} />

                {/* Bullets */}
                <ul className={styles.bullets}>
                  {exp.description.map((b, j) => (
                    <li key={j} className={styles.bullet}>
                      <span className={styles.bulletDot} style={{ background: exp.logo_color }} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className={styles.tags}>
                  {exp.tech_stack.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
