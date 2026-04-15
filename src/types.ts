export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface LogFile {
  name: string;
  type: 'file' | 'zip';
}
