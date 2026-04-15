export type AIProvider = 'Gemini' | 'OpenAI' | 'Anthropic' | 'ElevenLabs' | 'Midjourney';

export interface AIModel {
  id: string;
  name: string;
  provider: AIProvider;
  specialty: string;
  color: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'blocked' | 'ready' | 'complete';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export type BlockType = 'research' | 'build' | 'media' | 'operations';

export interface Block {
  id: string;
  type: BlockType;
  title: string;
  content: string;
  assignedAIId: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
}

export interface MemoryItem {
  id: string;
  key: string;
  value: string;
  category: 'style' | 'prompt' | 'brand' | 'setting';
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'archived' | 'stalled';
  tasks: Task[];
  blocks: Block[];
  memory: MemoryItem[];
}

export interface SystemHealth {
  tokenUsage: number;
  storageUsage: number;
  costEstimate: number;
  activeExports: number;
  failedTasks: number;
}
