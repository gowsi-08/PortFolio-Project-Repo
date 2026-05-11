import { motion } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';
import styles from './Education.module.css';

export default function Education({ data }) {
  const { education } = data;

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">07 / Education</span>
          <h2 className="section-title">Academic Background</h2>
          <div className="section-line" />
        </div>

        <div className={styles.list}>
          {education.map((edu, i) => (
            <motion.div
              key={i}
              className={`card ${styles.card}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Color strip */}
              <div
                className={styles.strip}
                style={{ background: edu.logo_color }}
              />

              <div className={styles.inner}>
                <div className={styles.top}>
                  <div>
                    <h3 className={styles.institution}>{edu.institution}</h3>
                    <p className={styles.degree}>
                      {edu.degree} · <em>{edu.branch}</em>
                    </p>
                    <p className={styles.meta}>
                      <FiMapPin size={12} />
                      {edu.location}
                    </p>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.yearRange}>{edu.year_range}</div>
                    <div
                      className={styles.cgpa}
                      style={{ color: edu.logo_color }}
                    >
                      {edu.cgpa}
                    </div>
                  </div>
                </div>

                {edu.highlights?.length > 0 && (
                  <ul className={styles.highlights}>
                    {edu.highlights.map((h, j) => (
                      <li key={j} className={styles.highlight}>
                        <span className={styles.bullet} />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
