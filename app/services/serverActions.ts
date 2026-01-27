import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Server-side utilities to read static JSON files from the public folder.
 * These simulate API calls by reading from static JSON files.
 */

const PUBLIC_DIR = join(process.cwd(), 'public');

/**
 * Read a JSON file from the public folder
 */
function readJsonFile<T>(filePath: string): T {
  try {
    const fullPath = join(PUBLIC_DIR, filePath);
    const fileContent = readFileSync(fullPath, 'utf-8');
    return JSON.parse(fileContent) as T;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    }
    throw new Error(`Failed to read JSON file: ${filePath}. ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Check if a file exists
 */
function fileExists(filePath: string): boolean {
  try {
    const fullPath = join(PUBLIC_DIR, filePath);
    readFileSync(fullPath, 'utf-8');
    return true;
  } catch {
    return false;
  }
}

/**
 * Server actions for Projects
 */
export const projectActions = {
  /**
   * Get all projects from projects.json
   */
  getProjects: () => {
    return readJsonFile<any[]>('projects.json');
  },

  /**
   * Get a project tree by _key
   * Reads from projects/{_key}.json
   */
  getProjectByKey: (_key: string) => {
    return readJsonFile<any>(`projects/${_key}.json`);
  },
};

/**
 * Server actions for Documents
 */
export const documentActions = {
  /**
   * Get documents for a node by _key
   * Reads from docs/{_key}.json
   */
  getDocumentsByKey: (_key: string) => {
    const filePath = `docs/${_key}.json`;
    if (!fileExists(filePath)) {
      return [];
    }
    return readJsonFile<any[]>(filePath);
  },
};

/**
 * Server actions for Code
 */
export const codeActions = {
  /**
   * Get code for an element by _key
   * Reads from code/{_key}.json
   */
  getCodeByKey: (_key: string) => {
    return readJsonFile<any>(`code/${_key}.json`);
  },
};
