import { motion } from 'framer-motion';
import { FiMapPin, FiCheckCircle } from 'react-icons/fi';
import styles from './About.module.css';

const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About({ data }) {
  const { about, personal } = data;

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">01 / About</span>
          <h2 className="section-title">Who I Am</h2>
          <div className="section-line" />
        </div>

        <div className={styles.grid}>
          {/* Bio */}
          <motion.div
            className={styles.bioCard}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.terminalBar}>
              <span className={styles.dot} style={{ background: '#FF5F57' }} />
              <span className={styles.dot} style={{ background: '#FFBD2E' }} />
              <span className={styles.dot} style={{ background: '#28C840' }} />
              <span className={styles.terminalTitle}>about.txt</span>
            </div>
            <p className={styles.bio}>{about.bio}</p>

            <div className={styles.metaRow}>
              <span className={styles.meta}>
                <FiMapPin size={14} />
                {personal.location}
              </span>
              {personal.open_to_work && (
                <span className={`${styles.meta} ${styles.metaGreen}`}>
                  <FiCheckCircle size={14} />
                  Open to Work
                </span>
              )}
            </div>
          </motion.div>

          {/* Highlights */}
          <div className={styles.highlights}>
            {about.highlights.map((h, i) => (
              <motion.div
                key={i}
                className={`card ${styles.highlight}`}
                custom={i}
                variants={itemVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className={styles.highlightArrow}>→</span>
                <p>{h}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
