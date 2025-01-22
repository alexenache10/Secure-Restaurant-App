const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); 

const app = express();

app.use(cors());

app.get('/logs/fast', (req, res) => {
  const filePath = path.join('/var/log/suricata', 'fast.log');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading fast.log');
      return;
    }
    res.send(data);
  });
});

app.get('/logs/eve', (req, res) => {
  const filePath = path.join('/var/log/suricata', 'eve.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading eve.json');
      return;
    }
    res.send(data);
  });
});
app.get('/logs/suspicious_requests', (req, res) => {
    const filePath = path.join('/home/ubuntu/Projects/sprc-project/waf/logs', 'suspicious_requests.log');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading eve.json');
        return;
      }
      res.send(data);
    });
  });
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
