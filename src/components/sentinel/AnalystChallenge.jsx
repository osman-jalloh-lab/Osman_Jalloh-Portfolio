import React, { useState, useEffect } from 'react';
import './Sentinel.css';

const RANKS = [
    { name: 'Trainee', min: 0 },
    { name: 'Junior Analyst', min: 6 },
    { name: 'Senior Analyst', min: 16 },
    { name: 'Lead Threat Hunter', min: 31 },
    { name: 'Sentinel Commander', min: 46 }
];

const AnalystChallenge = () => {
    const [score, setScore] = useState(0);
    const [strikes, setStrikes] = useState(0);
    const [scenario, setScenario] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const generateScenario = () => {
        const types = ['IMPOSSIBLE_TRAVEL', 'BRUTE_FORCE', 'USER_AGENT_MISMATCH', 'UNUSUAL_HOURS'];
        const type = types[Math.floor(Math.random() * types.length)];
        const isAnomalous = Math.random() > 0.4;

        let scenarioData = {
            id: Math.random(),
            type,
            isAnomalous,
            details: {}
        };

        if (type === 'IMPOSSIBLE_TRAVEL') {
            scenarioData.details = isAnomalous ?
                { loc1: 'New York', loc2: 'Tokyo', time: '1 hour' } :
                { loc1: 'New York', loc2: 'London', time: '12 hours' };
        } else if (type === 'BRUTE_FORCE') {
            scenarioData.details = isAnomalous ?
                { failures: 8, window: '2 mins' } :
                { failures: 1, window: '2 mins' };
        } else if (type === 'USER_AGENT_MISMATCH') {
            scenarioData.details = isAnomalous ?
                { device: 'Workstation-01', agent: 'Linux / Firefox 120', history: 'Windows / Chrome 121' } :
                { device: 'Workstation-01', agent: 'Windows / Chrome 121', history: 'Windows / Chrome 121' };
        } else {
            scenarioData.details = isAnomalous ?
                { time: '03:14 AM' } :
                { time: '02:30 PM' };
        }

        setScenario(scenarioData);
        setFeedback(null);
    };

    useEffect(() => {
        generateScenario();
    }, []);

    const handleAudit = (isSuspicious) => {
        if (isSuspicious === scenario.isAnomalous) {
            setScore(s => s + 1);
            setFeedback({ correct: true, text: 'Correct! Risk identified.' });
            setTimeout(generateScenario, 1500);
        } else {
            const newStrikes = strikes + 1;
            setStrikes(newStrikes);
            setFeedback({ correct: false, text: 'Incorrect identification. Security breach simulated.' });
            if (newStrikes >= 2) {
                setGameOver(true);
            } else {
                setTimeout(generateScenario, 2000);
            }
        }
    };

    const getRank = () => {
        return RANKS.reverse().find(r => score >= r.min)?.name || 'Trainee';
    };

    const resetGame = () => {
        setScore(0);
        setStrikes(0);
        setGameOver(false);
        generateScenario();
    };

    if (gameOver) {
        return (
            <div className="sentinel-view animate-fade-in text-center" style={{ textAlign: 'center' }}>
                <div className="glass-card" style={{ padding: '3rem' }}>
                    <h1 style={{ color: 'var(--sentinel-danger)', fontSize: '3rem' }}>GAME OVER</h1>
                    <p>Your analyst credentials have been revoked.</p>
                    <div style={{ margin: '2rem 0' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{score}</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>CASES AUDITED</div>
                        <div style={{ fontSize: '1.2rem', color: 'var(--sentinel-accent)', marginTop: '0.5rem' }}>Final Rank: {getRank()}</div>
                    </div>
                    <button className="back-button" onClick={resetGame} style={{ background: 'var(--sentinel-accent)', color: '#000', padding: '1rem 2rem' }}>
                        RE-AUTHORIZE SESSION
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="sentinel-view animate-fade-in">
            <div className="challenge-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2>Analyst Challenge: Gamer Mode</h2>
                    <p> procedural threat-hunting scenario engine</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>CURRENT RANK</div>
                    <div style={{ color: 'var(--sentinel-accent)', fontWeight: 'bold' }}>{getRank()}</div>
                </div>
            </div>

            <div className="stats-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{score}</div>
                    <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>MASTERED</div>
                </div>
                <div className="glass-card" style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{2 - strikes}</div>
                    <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>LIVES REMAINING</div>
                </div>
            </div>

            <div className="glass-card scenario-card" style={{ padding: '2rem', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <span className="badge badge-medium">AWAITING AUDIT</span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Vector: {scenario?.type.replace('_', ' ')}</span>
                </div>

                {scenario && (
                    <div className="scenario-details" style={{ flex: 1 }}>
                        {scenario.type === 'IMPOSSIBLE_TRAVEL' && (
                            <div style={{ fontSize: '1.1rem' }}>
                                User logged in from <span style={{ color: 'var(--sentinel-accent)' }}>{scenario.details.loc1}</span> and
                                then from <span style={{ color: 'var(--sentinel-accent)' }}>{scenario.details.loc2}</span> within
                                <span style={{ color: 'var(--sentinel-warning)' }}> {scenario.details.time}</span>.
                            </div>
                        )}
                        {scenario.type === 'BRUTE_FORCE' && (
                            <div style={{ fontSize: '1.1rem' }}>
                                System recorded <span style={{ color: 'var(--sentinel-danger)' }}>{scenario.details.failures} failed login attempts</span>
                                within a <span style={{ color: 'var(--sentinel-warning)' }}>{scenario.details.window}</span> window.
                            </div>
                        )}
                        {scenario.type === 'USER_AGENT_MISMATCH' && (
                            <div style={{ fontSize: '1.1rem' }}>
                                Current session for <span style={{ color: 'var(--sentinel-accent)' }}>{scenario.details.device}</span> uses
                                <span style={{ color: 'var(--sentinel-warning)' }}> {scenario.details.agent}</span>.
                                Historical data shows <span style={{ opacity: 0.6 }}>{scenario.details.history}</span>.
                            </div>
                        )}
                        {scenario.type === 'UNUSUAL_HOURS' && (
                            <div style={{ fontSize: '1.1rem' }}>
                                Operational access requested at <span style={{ color: 'var(--sentinel-danger)' }}>{scenario.details.time}</span> (Local Server Time).
                            </div>
                        )}
                    </div>
                )}

                {feedback && (
                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        borderRadius: '8px',
                        background: feedback.correct ? 'rgba(62, 255, 139, 0.1)' : 'rgba(255, 62, 62, 0.1)',
                        color: feedback.correct ? 'var(--sentinel-success)' : 'var(--sentinel-danger)',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        {feedback.text}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button
                        disabled={!!feedback}
                        onClick={() => handleAudit(false)}
                        className="back-button" style={{ flex: 1, margin: 0, borderColor: 'var(--sentinel-success)' }}
                    >
                        RESOLVE AS SAFE
                    </button>
                    <button
                        disabled={!!feedback}
                        onClick={() => handleAudit(true)}
                        className="back-button" style={{ flex: 1, margin: 0, borderColor: 'var(--sentinel-danger)', color: 'var(--sentinel-danger)' }}
                    >
                        FLAG AS ANOMALY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnalystChallenge;
