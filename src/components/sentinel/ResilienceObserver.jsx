import React, { useState, useEffect, useMemo } from 'react';
import './Sentinel.css';

const SERVICES = ['API-Gateway', 'Auth-Service', 'Database-Core', 'CDN-Edge'];
const LOG_LEVELS = ['INFO', 'WARN', 'ERROR', 'CRITICAL'];

const ResilienceObserver = () => {
    const [logs, setLogs] = useState([]);
    const [metrics, setMetrics] = useState({
        throughput: 0,
        errorRate: 0,
        avgLatency: 0
    });

    // Simulated log generator
    useEffect(() => {
        const interval = setInterval(() => {
            const isAnomaly = Math.random() > 0.8;
            const service = SERVICES[Math.floor(Math.random() * SERVICES.length)];
            const level = isAnomaly ? (Math.random() > 0.5 ? 'ERROR' : 'CRITICAL') : (Math.random() > 0.8 ? 'WARN' : 'INFO');
            const latency = isAnomaly ? 300 + Math.random() * 500 : 20 + Math.random() * 80;

            const newLog = {
                id: Math.random().toString(36).substr(2, 9),
                timestamp: new Date().toLocaleTimeString(),
                service,
                level,
                message: level === 'CRITICAL' ? `High latency cluster detected in ${service}` :
                    level === 'ERROR' ? `Connection timeout on ${service}` : `Service ${service} health check passed.`,
                latency: Math.round(latency)
            };

            setLogs(prev => [newLog, ...prev].slice(0, 20));
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    // Calculate real-time metrics
    useEffect(() => {
        if (logs.length === 0) return;

        const errors = logs.filter(l => l.level === 'ERROR' || l.level === 'CRITICAL').length;
        const avgLat = logs.reduce((acc, l) => acc + l.latency, 0) / logs.length;

        setMetrics({
            throughput: Math.floor(Math.random() * 50) + 100, // Simulated requests/sec
            errorRate: ((errors / logs.length) * 100).toFixed(1),
            avgLatency: avgLat.toFixed(0)
        });
    }, [logs]);

    return (
        <div className="sentinel-view animate-fade-in">
            <div className="resilience-dashboard">
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                    <h2>Systems Resilience Observer</h2>
                    <p>Live operational log processing and pattern recognition.</p>
                </div>

                <div className="sentinel-grid" style={{ marginBottom: '2rem' }}>
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--sentinel-accent)' }}>{metrics.throughput}</div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Requests / Sec</div>
                    </div>
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: metrics.errorRate > 15 ? 'var(--sentinel-danger)' : 'var(--sentinel-success)' }}>
                            {metrics.errorRate}%
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Anomaly Frequency</div>
                    </div>
                    <div className="glass-card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: metrics.avgLatency > 200 ? 'var(--sentinel-warning)' : 'var(--sentinel-text)' }}>
                            {metrics.avgLatency}ms
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Avg. Latency</div>
                    </div>
                </div>

                <div className="glass-card">
                    <h3 style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        Operational Log Stream
                        <span className="badge badge-low" style={{ fontSize: '0.6rem' }}>Live Connection Established</span>
                    </h3>
                    <div className="log-stream" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {logs.map(log => (
                            <div key={log.id} style={{
                                fontFamily: 'monospace',
                                fontSize: '0.8rem',
                                padding: '0.5rem 0',
                                borderBottom: '1px solid var(--sentinel-border)',
                                display: 'flex',
                                gap: '1rem',
                                color: log.level === 'CRITICAL' ? 'var(--sentinel-danger)' : log.level === 'ERROR' ? 'var(--sentinel-warning)' : '#888'
                            }}>
                                <span style={{ opacity: 0.5 }}>[{log.timestamp}]</span>
                                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>{log.level}</span>
                                <span style={{ fontWeight: 'bold', color: 'var(--sentinel-accent)' }}>{log.service}</span>
                                <span>{log.message}</span>
                                <span style={{ marginLeft: 'auto', opacity: 0.5 }}>{log.latency}ms</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <h3>Service Health Analysis</h3>
                    <div className="sentinel-grid" style={{ marginTop: '1rem' }}>
                        {SERVICES.map(service => {
                            const serviceError = logs.filter(l => l.service === service && (l.level === 'ERROR' || l.level === 'CRITICAL')).length;
                            return (
                                <div key={service} className="glass-card" style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 'bold' }}>{service}</span>
                                        <span style={{ color: serviceError > 2 ? 'var(--sentinel-danger)' : 'var(--sentinel-success)' }}>
                                            {serviceError > 2 ? 'Degraded' : 'Nominal'}
                                        </span>
                                    </div>
                                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${Math.max(10, 100 - serviceError * 20)}%`,
                                            background: serviceError > 2 ? 'var(--sentinel-danger)' : 'var(--sentinel-success)',
                                            transition: 'width 0.5s ease'
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResilienceObserver;
