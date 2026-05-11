import { useState } from 'react';
import { FiLock, FiTrash2, FiDownload, FiArrowLeft, FiMail, FiUser, FiClock } from 'react-icons/fi';
import { fetchResponsesFromGitHub, deleteResponseFromGitHub } from '../utils/githubStorage';
import styles from './Admin.module.css';

export default function Admin({ password: yamlPassword }) {
  const [authed, setAuthed] = useState(false);
  const [storedPass, setStoredPass] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResponses = async (pass) => {
    setLoading(true);
    try {
      // Check password against YAML config
      if (pass !== yamlPassword) {
        throw new Error('bad_password');
      }

      const data = await fetchResponsesFromGitHub();
      setResponses(data);
      setAuthed(true);
      setStoredPass(pass);
      setError('');
    } catch (e) {
      if (e.message === 'bad_password') {
        setError('Incorrect password. Try again.');
      } else {
        setError('Cannot fetch responses from GitHub. Check your token and repository.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchResponses(input);
    setInput('');
  };

  const handleDelete = async (id) => {
    try {
      const response = responses.find(r => r.id === id);
      if (response) {
        await deleteResponseFromGitHub(response.filename, response.sha);
        setResponses((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete response:', error);
      alert('Failed to delete response. Please try again.');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Delete all responses? This cannot be undone.')) return;
    
    try {
      // Delete all responses one by one
      for (const response of responses) {
        await deleteResponseFromGitHub(response.filename, response.sha);
      }
      setResponses([]);
    } catch (error) {
      console.error('Failed to clear all responses:', error);
      alert('Failed to clear all responses. Some may still remain.');
      // Refresh the list to see what's left
      const remainingData = await fetchResponsesFromGitHub();
      setResponses(remainingData);
    }
  };

  const handleDownloadCSV = () => {
    if (responses.length === 0) return;
    const headers = ['timestamp', 'name', 'email', 'message'];
    const rows = responses.map((r) =>
      headers.map((h) => `"${(r[h] || '').replace(/"/g, '""')}"`).join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form-responses-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleBack = () => { window.location.hash = ''; };

  // ── Login Screen ──
  if (!authed) {
    return (
      <div className={styles.loginWrap}>
        <form className={styles.loginCard} onSubmit={handleLogin}>
          <div className={styles.lockIcon}><FiLock size={28} /></div>
          <h2 className={styles.loginTitle}>Admin Access</h2>
          <p className={styles.loginSub}>Enter the admin password to view form responses.</p>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={styles.loginInput}
            placeholder="Password"
            autoFocus
            disabled={loading}
          />
          {error && <p className={styles.loginError}>{error}</p>}
          <button type="submit" className={`btn btn-primary ${styles.loginBtn}`} disabled={loading}>
            <FiLock size={14} /> {loading ? 'Checking…' : 'Unlock'}
          </button>
          <button type="button" className={styles.backLink} onClick={handleBack}>
            <FiArrowLeft size={14} /> Back to portfolio
          </button>
        </form>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack}>
          <FiArrowLeft size={16} /> Back
        </button>
        <h1 className={styles.title}>Form Responses</h1>
        <span className={styles.count}>{responses.length} total</span>
        <div className={styles.actions}>
          <button className={`btn btn-outline ${styles.actionBtn}`} onClick={handleDownloadCSV} disabled={responses.length === 0}>
            <FiDownload size={14} /> CSV
          </button>
          <button className={`btn btn-outline ${styles.actionBtn} ${styles.danger}`} onClick={handleClearAll} disabled={responses.length === 0}>
            <FiTrash2 size={14} /> Clear All
          </button>
        </div>
      </div>

      {responses.length === 0 ? (
        <div className={styles.empty}>
          <FiMail size={40} />
          <p>No form responses yet.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {responses.map((r) => (
            <div key={r.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.cardMeta}>
                  <span className={styles.metaItem}><FiUser size={13} /> {r.name}</span>
                  <span className={styles.metaItem}><FiMail size={13} /> <a href={`mailto:${r.email}`}>{r.email}</a></span>
                </div>
                <div className={styles.cardRight}>
                  <span className={styles.time}><FiClock size={12} /> {new Date(r.timestamp).toLocaleString()}</span>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(r.id)} title="Delete">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
              <p className={styles.message}>{r.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
