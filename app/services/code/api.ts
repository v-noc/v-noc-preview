import { api } from "@/lib/api";
import API_ROUTES from '@/lib/apiRoutes';

export interface CodeData {
  file_id: string;
  file_name: string;
  file_path: string;
  node_type: string;
  qname: string;
  code: string;
}

export const codeApi = {
  getCode: (elementId: string): Promise<CodeData> => api(`${API_ROUTES.CODE_ELEMENTS}${elementId}/read-code`),
  writeCode: (elementId: string, code: string): Promise<void> => {
    // POST requests are disabled for now
    throw new Error('POST requests are disabled. Use static JSON files instead.');
  },
}
