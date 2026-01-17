import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import './Auth.css';
import { Loader2 } from 'lucide-react';

export const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const [storeUrl, setStoreUrl] = useState('');
    const [consumerKey, setConsumerKey] = useState('');
    const [consumerSecret, setConsumerSecret] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const success = await login({ storeUrl, consumerKey, consumerSecret });
            if (!success) {
                setError('Connection failed. Please check your credentials and ensure the store URL is correct.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>WooCommerce Editor</h2>
                    <p>Connect your store to start editing</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Store URL</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="example.com"
                            value={storeUrl}
                            onChange={(e) => setStoreUrl(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Consumer Key</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="ck_..."
                            value={consumerKey}
                            onChange={(e) => setConsumerKey(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Consumer Secret</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="cs_..."
                            value={consumerSecret}
                            onChange={(e) => setConsumerSecret(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : 'Connect Store'}
                    </button>
                </form>
            </div>
        </div>
    );
};
