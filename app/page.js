'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateQR = async (e) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a URL or text');
      return;
    }

    setLoading(true);
    setError('');
    setQrCode(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate QR code');
      }

      setQrCode(data.qrCode);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="container">
      <header className="header">
        <h1 className="title">QR Code Generator</h1>
        <p className="subtitle">
          Simple, free, and instant QR codes.
        </p>
      </header>

      <div className="card">
        <form onSubmit={generateQR}>
          <div className="input-group">
            <label htmlFor="url" className="input-label">
              Enter URL or Text
            </label>
            <input
              type="text"
              id="url"
              className="input"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              disabled={loading}
            />
            {error && <p className="error">{error}</p>}
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Generating...' : 'Generate QR Code'}
          </button>
        </form>

        {qrCode && (
          <div className="qr-container">
            <div className="qr-image">
              <img src={qrCode} alt="Generated QR Code" />
            </div>
            <button onClick={downloadQR} className="btn btn-secondary">
              Download PNG
            </button>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Free & Open Source</p>
      </footer>
    </main>
  );
}
