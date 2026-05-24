import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import styles from './Footer.module.css';

export default function Footer({ data }) {
  const { personal } = data;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            <span className={styles.bracket}>&lt;</span>
            {personal.name.split(' ')[0]}
            <span className={styles.bracket}>/&gt;</span>
          </span>
          <p className={styles.copy}>© {year} {personal.name}.</p>
        </div>

        <div className={styles.socials}>
          {personal.github && (
            <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FiGithub size={18} />
            </a>
          )}
          {personal.linkedin && (
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin size={18} />
            </a>
          )}
          {personal.email && (
            <a href={`mailto:${personal.email}`} aria-label="Email">
              <FiMail size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
