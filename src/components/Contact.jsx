import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { saveToGitHub } from '../utils/githubStorage';
import styles from './Contact.module.css';

export default function Contact({ data }) {
  const { contact } = data;
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setFormState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await saveToGitHub(formState);
      
      setStatus('sent');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Failed to save form submission:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const links = [
    { icon: <FiMail size={17} />, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: <FiLinkedin size={17} />, label: 'LinkedIn', value: 'Connect with me', href: contact.linkedin },
    { icon: <FiGithub size={17} />, label: 'GitHub', value: 'Check my code', href: contact.github },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">08 / Contact</span>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-line" />
        </div>

        <div className={styles.grid}>
          {/* Left */}
          <motion.div
            className={styles.left}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={styles.heading}>{contact.heading}</h3>
            <p className={styles.sub}>{contact.subheading}</p>

            {contact.availability && (
              <div className={styles.avail}>
                <span className={styles.availDot} />
                {contact.availability}
              </div>
            )}

            <div className={styles.links}>
              {links.map(({ icon, label, value, href }) => (
                <a key={label} href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
                  <div className={styles.linkIcon}>{icon}</div>
                  <div>
                    <div className={styles.linkLabel}>{label}</div>
                    <div className={styles.linkValue}>{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className={`card ${styles.form}`}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.field}>
              <label htmlFor="contact-name" className={styles.label}>Your Name</label>
              <input id="contact-name" name="name" type="text" required className={styles.input}
                placeholder="Jane Doe" value={formState.name} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-email" className={styles.label}>Email</label>
              <input id="contact-email" name="email" type="email" required className={styles.input}
                placeholder="jane@company.com" value={formState.email} onChange={handleChange} />
            </div>

            <div className={styles.field}>
              <label htmlFor="contact-message" className={styles.label}>Message</label>
              <textarea id="contact-message" name="message" required rows={5}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="I'd love to discuss an opportunity..."
                value={formState.message} onChange={handleChange} />
            </div>

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div key="done" className={styles.successMsg}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <FiCheck size={16} /> Message sent successfully!
                </motion.div>
              ) : status === 'error' ? (
                <motion.div key="err" className={styles.errorMsg}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <FiAlertCircle size={16} /> Failed to send. Try again.
                </motion.div>
              ) : (
                <motion.button key="btn" type="submit" className={`btn btn-primary ${styles.submitBtn}`}
                  id="contact-submit" disabled={status === 'sending'}
                  initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <FiSend size={14} /> {status === 'sending' ? 'Sending…' : 'Send Message'}
                </motion.button>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
