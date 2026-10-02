const http = require('http');
const fs = require('fs');
const path = require('path');
const {
  FLEET_DATA,
  AIRCRAFT_DETAILS,
  COMPONENT_DETAILS,
  FAULT_GRAPHS,
  DIGITAL_TWIN,
  SIMULATOR_DATA,
  PLANNING_DATA,
  SPARES_DATA,
  LEARNING_DATA,
  AUDIT_DATA,
  ASSISTANT_KNOWLEDGE_BASE
} = require('./api-data');
const {
  getDrishtiAircraftData,
  DRISHTI_PARTS_LIBRARY
} = require('./drishti-data');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

function sendJson(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURI(parsedUrl.pathname);

  // ==========================================
  // REST API ROUTING (/api/...)
  // ==========================================
  if (pathname.startsWith('/api/')) {
    // 1. Fleet Overview
    if (pathname === '/api/fleet') {
      sendJson(res, FLEET_DATA);
      return;
    }

    // 2. Aircraft Detail (/api/aircraft/:id)
    if (pathname.startsWith('/api/aircraft/')) {
      const id = pathname.replace('/api/aircraft/', '');
      const data = AIRCRAFT_DETAILS[id] || AIRCRAFT_DETAILS['AC-107'];
      sendJson(res, data);
      return;
    }

    // 3. Component Detail (/api/component/:id)
    if (pathname.startsWith('/api/component/')) {
      const id = pathname.replace('/api/component/', '');
      const data = COMPONENT_DETAILS[id] || COMPONENT_DETAILS['AC-107-HYD-PUMP'];
      sendJson(res, data);
      return;
    }

    // 4. Fault Dependency Graph (/api/fault-graph/:id)
    if (pathname.startsWith('/api/fault-graph/')) {
      const id = pathname.replace('/api/fault-graph/', '');
      const data = FAULT_GRAPHS[id] || FAULT_GRAPHS['AC-107-HYD-PUMP'];
      sendJson(res, data);
      return;
    }

    // 5. Digital Health Twin (/api/twin/:id)
    if (pathname.startsWith('/api/twin/')) {
      const id = pathname.replace('/api/twin/', '');
      const data = DIGITAL_TWIN[id] || DIGITAL_TWIN['AC-107'];
      sendJson(res, data);
      return;
    }

    // 5b. DRISHTI 3D Aircraft Health Explorer (/api/drishti/:aircraft_id)
    if (pathname.startsWith('/api/drishti/')) {
      const sub = pathname.replace('/api/drishti/', '');
      const parts = sub.split('/');
      const aircraftId = parts[0] || 'AC-107';

      // Part detail: /api/drishti/:aircraft_id/parts/:part_id
      if (parts[1] === 'parts' && parts[2]) {
        const partId = parts[2].toLowerCase();
        const acParts = DRISHTI_PARTS_LIBRARY[aircraftId] || DRISHTI_PARTS_LIBRARY['AC-107'] || [];
        const part = acParts.find(p => 
          p.componentId.toLowerCase() === partId || 
          p.meshKey.toLowerCase() === partId ||
          p.componentId.toLowerCase().includes(partId) ||
          partId.includes(p.meshKey.toLowerCase())
        ) || acParts[0];

        // Log part inspection to audit trail
        if (AUDIT_DATA && AUDIT_DATA.logs && part) {
          AUDIT_DATA.logs.unshift({
            id: `LOG-${Date.now()}`,
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
            user: 'Maintenance Engineer',
            action: `DRISHTI-3D Inspection: Component ${part.name} (${part.componentId}) on ${aircraftId}`,
            level: 'INFO'
          });
        }
        sendJson(res, part || { error: 'Part not found' });
        return;
      }

      // Aircraft 3D model and predictive summary
      const aircraftData = getDrishtiAircraftData(aircraftId);
      sendJson(res, aircraftData);
      return;
    }

    // Live Telemetry Stream / Jitter endpoint
    if (pathname === '/api/telemetry/live') {
      const jitter = (base, amp) => +(base + (Math.random() * 2 - 1) * amp).toFixed(2);
      sendJson(res, {
        timestamp: new Date().toISOString(),
        'hyd-pump-3b': {
          pressure: jitter(3055, 35),
          temp: jitter(88.4, 1.2),
          vibration: jitter(4.82, 0.25),
          flowRate: jitter(41.8, 0.9),
          cavitationIndex: jitter(0.42, 0.04)
        },
        'engine-port': {
          egt: jitter(678, 12),
          rpm: jitter(98.4, 0.4),
          vibration: jitter(1.8, 0.1)
        }
      });
      return;
    }

    // 6. What-If Simulator
    if (pathname === '/api/simulator') {
      sendJson(res, SIMULATOR_DATA);
      return;
    }

    // 7. Maintenance Planning
    if (pathname === '/api/planning') {
      sendJson(res, PLANNING_DATA);
      return;
    }

    // 8. Spares Management
    if (pathname === '/api/spares') {
      sendJson(res, SPARES_DATA);
      return;
    }

    // 9. Prediction & Learning
    if (pathname === '/api/learning') {
      if (req.method === 'POST') {
        // Retrain model endpoint
        const updatedLearning = JSON.parse(JSON.stringify(LEARNING_DATA));
        updatedLearning.currentMetrics.accuracy = 99.1;
        updatedLearning.currentMetrics.rmseDays = 0.88;
        updatedLearning.currentMetrics.falsePositiveRate = 1.3;
        updatedLearning.lastRetrained = new Date().toISOString();
        updatedLearning.message = 'Model weights successfully updated with 48 verified ground-depot maintenance outcomes.';
        sendJson(res, updatedLearning);
        return;
      }
      sendJson(res, LEARNING_DATA);
      return;
    }

    // 10. Audit Log & Data Quality
    if (pathname === '/api/audit') {
      sendJson(res, AUDIT_DATA);
      return;
    }

    // 11. Knowledge Assistant
    if (pathname === '/api/assistant') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        let query = '';
        try {
          const parsed = JSON.parse(body || '{}');
          query = (parsed.query || '').toLowerCase();
        } catch (e) {
          query = '';
        }

        let answer = "Based on Sudarshan's maintenance records, all operational units comply with Air Force Technical Directives. Please specify an aircraft tail (e.g. AC-107, AC-103) or subsystem for focused diagnostic logs [Record Database: DB-SUD-2026].";
        for (const item of ASSISTANT_KNOWLEDGE_BASE) {
          if (item.keywords.some(kw => query.includes(kw))) {
            answer = item.answer;
            break;
          }
        }

        sendJson(res, { query, answer, timestamp: new Date().toISOString() });
      });
      return;
    }

    sendJson(res, { error: 'API route not found' }, 404);
    return;
  }

  // ==========================================
  // STATIC FILE SERVING
  // ==========================================
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  const filePath = path.join(__dirname, reqPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  const stat = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Handle range requests for video streaming
  const range = req.headers.range;
  if (range && ext === '.mp4') {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType
    });
    file.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': stat.size,
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Sudarshan server with REST API running at http://localhost:${PORT}/`);
});
