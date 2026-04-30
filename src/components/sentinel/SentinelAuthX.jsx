import React, { useState, useMemo } from 'react';
import './Sentinel.css';

const CITIES = {
    'New York': { lat: 40.7128, lon: -74.0060 },
    'London': { lat: 51.5074, lon: -0.1278 },
    'Tokyo': { lat: 35.6762, lon: 139.6503 },
    'San Francisco': { lat: 37.7749, lon: -122.4194 },
    'Dubai': { lat: 25.2048, lon: 55.2708 },
};

const SentinelAuthX = () => {
    const [logins, setLogins] = useState([]);
    const [selectedCity, setSelectedCity] = useState('New York');
    const [outcome, setOutcome] = useState('Success');

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const analyzeLogin = (newLogin, history) => {
        const signals = [];
        let riskScore = 0;

        // 1. Unusual Hours (11 PM - 5 AM)
        const hour = new Date(newLogin.timestamp).getHours();
        if (hour >= 23 || hour <= 5) {
            signals.push({ type: 'UNUSUAL_HOURS', level: 'MEDIUM', icon: '🌙' });
            riskScore += 30;
        }

        // 2. Brute Force Detection (3+ failures in 10 mins)
        const tenMinsAgo = new Date(newLogin.timestamp) - 10 * 60000;
        const recentFailures = history.filter(l =>
            l.outcome === 'Failed' &&
            new Date(l.timestamp) > tenMinsAgo
        );
        if (newLogin.outcome === 'Failed' && recentFailures.length >= 2) {
            signals.push({ type: 'BRUTE_FORCE', level: 'CRITICAL', icon: '⚔️' });
            riskScore += 60;
        }

        // 3. Impossible Travel
        const prevLogin = history[0];
        if (prevLogin) {
            const dist = calculateDistance(
                CITIES[prevLogin.city].lat, CITIES[prevLogin.city].lon,
                CITIES[newLogin.city].lat, CITIES[newLogin.city].lon
            );
            const timeDiff = (new Date(newLogin.timestamp) - new Date(prevLogin.timestamp)) / 3600000; // hours
            const speed = timeDiff > 0 ? dist / timeDiff : 0;

            if (speed > 800 && dist > 100) {
                signals.push({ type: 'IMPOSSIBLE_TRAVEL', level: 'HIGH', icon: '✈️' });
                riskScore += 50;
            }
        }

        const finalScore = Math.min(riskScore, 100);
        let status = 'Safe';
        if (finalScore > 70) status = 'Critical';
        else if (finalScore > 40) status = 'Suspicious';
        else if (finalScore > 0) status = 'Noteworthy';

        return { ...newLogin, signals, riskScore: finalScore, status };
    };

    const injectLogin = () => {
        const newLogin = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            city: selectedCity,
            outcome: outcome,
            ip: `192.168.1.${Math.floor(Math.random() * 255)}`
        };

        const analyzed = analyzeLogin(newLogin, logins);
        setLogins([analyzed, ...logins].slice(0, 10));
    };

    return (
        <div className="sentinel-view animate-fade-in">
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <h2>Sentinel AuthX: Login Stream</h2>
                <p>Real-time authentication auditing and risk scoring.</p>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                    <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="back-button" style={{ margin: 0 }}
                    >
                        {Object.keys(CITIES).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select
                        value={outcome}
                        onChange={(e) => setOutcome(e.target.value)}
                        className="back-button" style={{ margin: 0 }}
                    >
                        <option value="Success">Success</option>
                        <option value="Failed">Failed</option>
                    </select>
                    <button onClick={injectLogin} className="back-button" style={{ margin: 0, background: 'var(--sentinel-accent)', color: '#000', fontWeight: 'bold' }}>
                        Inject Login Event
                    </button>
                </div>
            </div>

            <div className="login-feed">
                {logins.length === 0 && <p style={{ textAlign: 'center', opacity: 0.5 }}>No events recorded. Inject a login to begin.</p>}
                {logins.map(login => (
                    <div key={login.id} className="glass-card animate-fade-in" style={{
                        marginBottom: '1rem',
                        borderLeft: `4px solid ${login.riskScore > 70 ? 'var(--sentinel-danger)' : login.riskScore > 40 ? 'var(--sentinel-warning)' : 'var(--sentinel-border)'}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {login.city} • <span style={{ opacity: 0.7, fontSize: '0.8rem' }}>{login.outcome}</span>
                                {login.signals.map(s => <span key={s.type} title={s.type}>{s.icon}</span>)}
                            </div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>IP: {login.ip} • {new Date(login.timestamp).toLocaleTimeString()}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: login.riskScore > 70 ? 'var(--sentinel-danger)' : login.riskScore > 40 ? 'var(--sentinel-warning)' : 'var(--sentinel-success)'
                            }}>
                                {login.riskScore}
                            </div>
                            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>Risk Score</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SentinelAuthX;
