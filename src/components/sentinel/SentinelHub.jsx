import React, { useState } from 'react';
import './Sentinel.css';
import SentinelAuthX from './SentinelAuthX';
import ResilienceObserver from './ResilienceObserver';
import AnalystChallenge from './AnalystChallenge';
import TerminalChallenge from './TerminalChallenge';

const SentinelHub = () => {
    const [activeProject, setActiveProject] = useState(null);

    const projects = [
        {
            id: 'authx',
            title: 'Sentinel AuthX',
            description: 'Login Anomaly Detector: Impossible Travel & Brute Force identification.',
            badge: 'Security',
            component: <SentinelAuthX onBack={() => setActiveProject(null)} />
        },
        {
            id: 'resilience',
            title: 'Resilience Observer',
            description: 'Systems Anomaly Simulator: Real-time operational log analysis.',
            badge: 'Data Ops',
            component: <ResilienceObserver onBack={() => setActiveProject(null)} />
        },
        {
            id: 'analyst',
            title: 'Analyst Challenge',
            description: 'Threat Hunter Simulator: Procedural audit scenarios and ranking.',
            badge: 'Interactive',
            component: <AnalystChallenge onBack={() => setActiveProject(null)} />
        },
        {
            id: 'terminal',
            title: 'Terminal Challenge',
            description: 'VFS Shell: Linux-based security auditing and malware hunting.',
            badge: 'Advanced',
            component: <TerminalChallenge onBack={() => setActiveProject(null)} />
        }
    ];

    if (activeProject) {
        const project = projects.find(p => p.id === activeProject);
        return (
            <div className="sentinel-suite">
                <button className="back-button" onClick={() => setActiveProject(null)}>
                    ← Back to Mission Control
                </button>
                {project.component}
            </div>
        );
    }

    return (
        <div className="sentinel-suite animate-fade-in">
            <header className="sentinel-header">
                <span className="badge badge-low">Operational</span>
                <h1>Sentinel Security Hub</h1>
                <p>Advanced Auditing & Systems Resilience Simulation</p>
            </header>

            <div className="sentinel-grid">
                {projects.map(project => (
                    <div
                        key={project.id}
                        className="glass-card project-card"
                        onClick={() => setActiveProject(project.id)}
                    >
                        <span className="badge badge-medium">{project.badge}</span>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="card-footer" style={{ marginTop: 'auto', color: 'var(--sentinel-accent)', fontSize: '0.8rem' }}>
                            Initialize Module →
                        </div>
                    </div>
                ))}
            </div>

            <div className="mission-metrics glass-card" style={{ marginTop: '3rem', textAlign: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1,000+</div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>Scenarios</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>5</div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>Security Vectors</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Real-time</div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>Pattern Analysis</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SentinelHub;
