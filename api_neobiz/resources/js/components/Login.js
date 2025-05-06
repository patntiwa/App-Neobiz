import React, { useState } from 'react';
import { login } from '../api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const [error, setError] = useState('');
    const [isTwoFactorRequired, setIsTwoFactorRequired] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password, twoFactorCode });
            if (response.data.two_factor_required) {
                setIsTwoFactorRequired(true);
            } else {
                window.location.href = '/dashboard';
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue.');
        }
    };

    return (
        <div>
            <h1>Connexion</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isTwoFactorRequired && (
                    <input
                        type="text"
                        placeholder="Code à deux facteurs"
                        value={twoFactorCode}
                        onChange={(e) => setTwoFactorCode(e.target.value)}
                    />
                )}
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
