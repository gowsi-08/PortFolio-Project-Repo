import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiTwitter } from 'react-icons/fi';
import styles from './Hero.module.css';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ data }) {
  const { personal } = data;

  const socialLinks = [
    { href: personal.github, icon: <FiGithub size={20} />, label: 'GitHub' },
    { href: personal.linkedin, icon: <FiLinkedin size={20} />, label: 'LinkedIn' },
    { href: `mailto:${personal.email}`, icon: <FiMail size={20} />, label: 'Email' },
    personal.twitter && { href: personal.twitter, icon: <FiTwitter size={20} />, label: 'Twitter' },
  ].filter(Boolean);

  return (
    <section id="hero" className={styles.hero}>
      {/* Ambient blobs */}
      <div className={styles.blobBlue} />
      <div className={styles.blobCyan} />

      <div className={`container ${styles.inner}`}>
        <motion.div
          className={styles.content}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Status badge */}
          {personal.open_to_work && (
            <motion.div variants={item} className={styles.badge}>
              <span className={styles.badgeDot} />
              Open to Work
            </motion.div>
          )}

          {/* Name */}
          <motion.h1 variants={item} className={styles.name}>
            {personal.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p variants={item} className={styles.tagline}>
            {personal.tagline}
          </motion.p>

          {/* Subtitle */}
          <motion.p variants={item} className={styles.subtitle}>
            {personal.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className={styles.ctas}>
            <a
              href={personal.resume_url}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-download-resume"
            >
              <FiDownload size={16} />
              Download Resume
            </a>
            <a
              href="#contact"
              className="btn btn-outline"
              id="hero-contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className={styles.socials}>
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                {icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Avatar */}
        <motion.div
          className={styles.avatarWrap}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.avatarRing} />
          <img
            src={personal.avatar_url}
            alt={personal.name}
            className={styles.avatar}
          />
          <div className={styles.avatarBadge}>
            <span>📍</span> {personal.location}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </motion.div>
    </section>
  );
}
