import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const archiveOldLogs = async () => {
    const logDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDir)) return;
    const currentMonth = getCurrentMonth();
    const items = fs.readdirSync(logDir);

    for (const item of items) {
      const itemPath = path.join(logDir, item);
      if (fs.statSync(itemPath).isDirectory() && item !== currentMonth) {
        const zipPath = path.join(logDir, `${item}.zip`);
        try {
          const archiverModule = await import('archiver');
          const archiver = archiverModule.default;
          const output = fs.createWriteStream(zipPath);
          const archive = archiver('zip', { zlib: { level: 9 } });
          output.on('close', () => fs.rmSync(itemPath, { recursive: true, force: true }));
          archive.pipe(output);
          archive.directory(itemPath, false);
          await archive.finalize();
        } catch (err) { console.error('Error archiving:', err); }
      }
    }
  };

  // Initial archive check
  archiveOldLogs();

  app.post('/api/log-chat', (req, res) => {
    const { message, role, timestamp } = req.body;
    const logDir = path.join(__dirname, 'logs');
    const monthDir = path.join(logDir, getCurrentMonth());
    if (!fs.existsSync(monthDir)) {
      fs.mkdirSync(monthDir, { recursive: true });
      archiveOldLogs();
    }
    const logFile = path.join(monthDir, `${new Date().toISOString().split('T')[0]}.txt`);
    fs.appendFileSync(logFile, `[${timestamp}] ${role}: ${message}\n`);
    res.json({ success: true });
  });

  app.get('/api/logs/list', (req, res) => {
    const logDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDir)) return res.json({ files: [] });
    
    const currentMonth = getCurrentMonth();
    const monthDir = path.join(logDir, currentMonth);
    
    let files: any[] = [];
    if (fs.existsSync(monthDir)) {
      files = fs.readdirSync(monthDir)
        .filter(f => f.endsWith('.txt'))
        .map(f => ({ name: `${currentMonth}/${f}`, type: 'file' }));
    }
    
    const zips = fs.readdirSync(logDir)
      .filter(f => f.endsWith('.zip'))
      .map(f => ({ name: f, type: 'zip' }));
      
    res.json({ files: [...files, ...zips] });
  });

  app.get('/api/logs/content', (req, res) => {
    const filename = req.query.filename as string;
    if (!filename) return res.status(400).send('Filename required');
    
    const filePath = path.join(__dirname, 'logs', filename);
    if (!fs.existsSync(filePath)) return res.status(404).send('File not found');
    
    res.send(fs.readFileSync(filePath, 'utf8'));
  });

  app.get('/api/logs/download', (req, res) => {
    const filename = req.query.filename as string;
    if (!filename) return res.status(400).send('Filename required');
    
    const filePath = path.join(__dirname, 'logs', filename);
    if (!fs.existsSync(filePath)) return res.status(404).send('File not found');
    
    res.download(filePath);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
