import React, { useState } from 'react';
import { resetPassword, requestPasswordReset } from '../api';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRequestReset = async () => {
        try {
            await requestPasswordReset(email);
            setSuccess('Un email de réinitialisation a été envoyé.');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue.');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await resetPassword({ email, password, token });
            setSuccess('Mot de passe réinitialisé avec succès.');
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue.');
        }
    };

    return (
        <div>
            <h1>Réinitialisation du mot de passe</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <div>
                <h2>Demander une réinitialisation</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleRequestReset}>Envoyer</button>
            </div>
            <div>
                <h2>Réinitialiser le mot de passe</h2>
                <form onSubmit={handleResetPassword}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Nouveau mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Réinitialiser</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
