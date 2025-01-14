import fs from 'fs';
import path from 'path';


const suspiciousPatterns = [
  /\$/g,                          // Simbolul $ (MongoDB NoSQL Injection)
  /\{/g,                          // Acoladă deschisă {
  /\}/g,                          // Acoladă închisă }
  /\.\$where/g,                   // Operator MongoDB $where
  /\$regex/g,                     // Operator MongoDB $regex
  /\$gt/g,                        // Operator MongoDB $gt (greater than)
  /\$lt/g,                        // Operator MongoDB $lt (less than)
  /\$gte/g,                       // Operator MongoDB $gte (greater than or equal)
  /\$lte/g,                       // Operator MongoDB $lte (less than or equal)
  /\$eq/g,                        // Operator MongoDB $eq (equals)
  /\$ne/g,                        // Operator MongoDB $ne (not equals)
  /UNION.*SELECT/gi,              // SQL Injection simplu
  /SELECT.*FROM/gi,               // Interogări SQL de tip SELECT
  /INSERT.*INTO/gi,               // SQL Injection cu INSERT
  /UPDATE.*SET/gi,                // SQL Injection cu UPDATE
  /DELETE.*FROM/gi,               // SQL Injection cu DELETE
  /DROP.*TABLE/gi,                // SQL Injection cu DROP TABLE
  /--/g,                          // SQL comment exploitable
  /;.*$/g,                        // Închidere de instrucțiune SQL
  /<script>/gi,                   // XSS cu <script>
  /<\/script>/gi,                 // Închidere XSS </script>
  /onerror=/gi,                   // XSS evenimente
  /onload=/gi,                    // XSS evenimente
  /javascript:/gi,                // URL-uri de tip JavaScript:
  /%3Cscript%3E/gi,               // Encodare pentru <script>
  /%3C\/script%3E/gi,             // Encodare pentru </script>
  /\.\./g,                        // Directory traversal
  /\/etc\/passwd/gi,              // Tentative de a accesa /etc/passwd
  /\/etc\/shadow/gi,              // Tentative de a accesa /etc/shadow
  /cmd.exe/gi,                    // Atacuri pe Windows
  /powershell/gi,                 // Atacuri cu PowerShell
  /nc.exe/gi,                     // Utilizarea netcat (nc.exe)
  /&&/g,                          // Chain commands Linux/Windows
  /\|\|/g,                        // Chain commands Linux/Windows
  /`.*`/g,                        // Comenzi shell Linux
  /ping\s+/gi,                    // Tentative de atac DoS cu ping
  /curl\s+/gi,                    // Utilizarea abuzivă a curl
  /wget\s+/gi,                    // Utilizarea abuzivă a wget
];

const logFilePath = path.resolve('logs/suspicious_requests.log');

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const logSuspiciousRequest = (info) => {
  const logEntry = `[${new Date().toISOString()}] ${JSON.stringify(info)}\n`;
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
};

export const detectAndLogAttacks = (req, res, next) => {
  try {
    const data = { ...req.body, ...req.query, ...req.params };
    let isSuspicious = false;
   
    for (const key in data) {
       
      const value = String(data[key]);
      if (suspiciousPatterns.some((pattern) => pattern.test(value))) {
        isSuspicious = true;
        break;
      }
    }
    if (isSuspicious) {
      const logEntry = {
        ip: req.ip,
        endpoint: req.originalUrl,
        method: req.method,
        userAgent: req.headers['user-agent'] || 'Unknown',
        data,
        reason: 'Detected suspicious patterns in request',
      };

      logSuspiciousRequest(logEntry);

      return res.status(400).json({
        message: 'Suspicious request detected and logged',
        details: 'Your request contained patterns that are not allowed',
      });
    }

    next();
  } catch (error) {
    console.error('Error in detection middleware:', error, {
      ip: req.ip,
      endpoint: req.originalUrl,
      method: req.method,
      data: req.body,
    });
    res.status(500).send('Internal server error');
  }
};
