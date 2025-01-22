// App.js (Polling Every 5 Seconds for Logs)
import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [activeTab, setActiveTab] = useState("fastLog");
  const [fastLogData, setFastLogData] = useState([]);
  const [eveJsonData, setEveJsonData] = useState([]);
  const [suspiciousRequestsData, setSuspiciousRequestsData] = useState([]);

  useEffect(() => {
    const fetchLogs = () => {
      // Fetch fast.logS
      fetch("http://192.168.149.174:3001/logs/fast")
        .then((response) => response.text())
        .then((data) => {
          const logs = data.split("\n").filter(Boolean).map((line) => {
            const match = line.match(/^([\S]+)\s+\[\*\*\]\s+\[.*\]\s+(.*)\s+\[\*\*\]\s+\[.*\]\s+\[.*\]\s+\{(\w+)}\s+(\S+):(\d+)\s+->\s+(\S+):(\d+)/);
            if (match) {
              const [, timestamp, event, protocol, srcIP, srcPort, destIP, destPort] = match;
              return { timestamp, event, protocol, srcIP, srcPort, destIP, destPort };
            }
            return null;
          }).filter(Boolean);
          setFastLogData(logs.slice(-10));
        })
        .catch((err) => console.error("Error fetching fast.log:", err));

      // Fetch eve.json
      fetch("http://192.168.149.174:3001/logs/eve")
        .then((response) => response.text())
        .then((data) => {
          const logs = data.split("\n").filter(Boolean).map((line) => {
            try {
              const parsed = JSON.parse(line);
              const { timestamp, event_type, src_ip, dest_ip, proto } = parsed;
              return { timestamp, eventType: event_type, srcIP: src_ip, destIP: dest_ip, protocol: proto };
            } catch (error) {
              console.error("Error parsing JSON line:", error);
              return null;
            }
          }).filter(Boolean);
          setEveJsonData(logs.slice(-10));
        })
        .catch((err) => console.error("Error fetching eve.json:", err));

      // Fetch suspicious_requests.log
      fetch("http://192.168.149.174:3001/logs/suspicious_requests")
        .then((response) => response.text())
        .then((data) => {
          const logs = data.split("\n").filter(Boolean); // Keep raw lines
          setSuspiciousRequestsData(logs.slice(-10));
        })
        .catch((err) => console.error("Error fetching suspicious_requests.log:", err));
    };

    fetchLogs(); // Initial fetch
    const interval = setInterval(fetchLogs, 5000); // Poll every 5 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <div className="App">
      <h1>Logs dashboard</h1>

      <div className="tabs">
        <button
          className={activeTab === "fastLog" ? "active-tab" : ""}
          onClick={() => setActiveTab("fastLog")}
        >
          Fast Log
        </button>
        <button
          className={activeTab === "eveJson" ? "active-tab" : ""}
          onClick={() => setActiveTab("eveJson")}
        >
          EVE JSON
        </button>
        <button
          className={activeTab === "suspiciousRequests" ? "active-tab" : ""}
          onClick={() => setActiveTab("suspiciousRequests")}
        >
          Suspicious Requests
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "fastLog" && (
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Event</th>
                <th>Protocol</th>
                <th>Source IP</th>
                <th>Source Port</th>
                <th>Destination IP</th>
                <th>Destination Port</th>
              </tr>
            </thead>
            <tbody>
              {fastLogData.map((log, index) => (
                <tr key={index}>
                  <td>{log.timestamp}</td>
                  <td>{log.event}</td>
                  <td>{log.protocol}</td>
                  <td>{log.srcIP}</td>
                  <td>{log.srcPort}</td>
                  <td>{log.destIP}</td>
                  <td>{log.destPort}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === "eveJson" && (
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Event Type</th>
                <th>Protocol</th>
                <th>Source IP</th>
                <th>Destination IP</th>
              </tr>
            </thead>
            <tbody>
              {eveJsonData.map((log, index) => (
                <tr key={index}>
                  <td>{log.timestamp}</td>
                  <td>{log.eventType}</td>
                  <td>{log.protocol}</td>
                  <td>{log.srcIP}</td>
                  <td>{log.destIP}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === "suspiciousRequests" && (
          <table>
            <thead>
              <tr>
                <th>Raw Log Line</th>
              </tr>
            </thead>
            <tbody>
              {suspiciousRequestsData.map((log, index) => (
                <tr key={index}>
                  <td>{log}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
