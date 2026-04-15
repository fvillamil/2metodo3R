import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, RefreshCw, ChevronLeft, Archive } from 'lucide-react';
import { LogFile } from '../types';

const LogView: React.FC = () => {
  const [files, setFiles] = useState<LogFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/logs/list');
      const data = await res.json();
      setFiles(data.files);
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
    setLoading(false);
  };

  const viewContent = async (filename: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/logs/content?filename=${filename}`);
      const text = await res.text();
      setContent(text);
      setSelectedFile(filename);
    } catch (err) {
      console.error('Error viewing log:', err);
    }
    setLoading(false);
  };

  const downloadFile = (filename: string) => {
    window.open(`/api/logs/download?filename=${filename}`, '_blank');
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <a href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <ChevronLeft size={24} />
            </a>
            <h1 className="text-3xl font-serif font-bold">LogView <span className="text-fuchsia-500">Secreto</span></h1>
          </div>
          <button 
            onClick={fetchFiles}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Actualizar
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* File List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Archivos de Log</h2>
            {files.length === 0 && !loading && (
              <p className="text-gray-600 italic">No hay logs registrados aún.</p>
            )}
            {files.map((file, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={file.name}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between group ${
                  selectedFile === file.name 
                    ? 'bg-fuchsia-500/10 border-fuchsia-500/50' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() => file.type === 'file' && viewContent(file.name)}
                >
                  {file.type === 'zip' ? <Archive size={20} className="text-amber-500" /> : <FileText size={20} className="text-fuchsia-400" />}
                  <span className="text-sm font-medium truncate max-w-[180px]">{file.name}</span>
                </div>
                <button 
                  onClick={() => downloadFile(file.name)}
                  className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded-lg transition-all"
                  title="Descargar"
                >
                  <Download size={16} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Content Viewer */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
              {selectedFile ? `Contenido: ${selectedFile}` : 'Selecciona un archivo para ver'}
            </h2>
            <div className="bg-[#12121a] border border-white/10 rounded-2xl p-6 h-[700px] overflow-y-auto font-mono text-xs leading-relaxed text-gray-300 scrollbar-thin scrollbar-thumb-white/10">
              {selectedFile ? (
                <pre className="whitespace-pre-wrap">{content}</pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-4">
                  <FileText size={48} opacity={0.2} />
                  <p>Los chats se guardan automáticamente por día.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogView;
