import { api } from "@/lib/api";
import API_ROUTES from '@/lib/apiRoutes';

export interface DocumentData {
  _id: string;
  _key: string;
  name: string;
  description: string;
  data: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDocumentRequest {
  name: string;
  description: string;
  node_id: string;
}

export interface UpdateDocumentRequest {
  id: string;
  name?: string;
  description?: string;
  data?: string;
}

// Backend shape we receive from API
interface BackendDocumentRaw {
  _id?: string;
  id?: string;
  _key?: string;
  key?: string;
  name: string;
  description: string;
  data: string;
  created_at: string;
  updated_at: string;
}

const getKeyFromId = (id: string): string =>
  id.includes("/") ? id.split("/").pop() as string : id;

const mapBackendDocument = (d: BackendDocumentRaw): DocumentData => ({
  _id: d._id ?? d.id!,
  _key: d._key ?? d.key!,
  name: d.name,
  description: d.description,
  data: d.data,
  created_at: d.created_at,
  updated_at: d.updated_at,
});

export const documentsApi = {
  getDocuments: async (nodeId: string): Promise<DocumentData[]> => {
    const response = await api(`${API_ROUTES.DOCUMENTS}${nodeId}`);
    const list = response as unknown as BackendDocumentRaw[];
    return list.map(mapBackendDocument);
  },

  createDocument: async (payload: CreateDocumentRequest): Promise<DocumentData> => {
    // POST requests are disabled for now
    throw new Error('POST requests are disabled. Use static JSON files instead.');
  },

  updateDocument: async (payload: UpdateDocumentRequest): Promise<DocumentData> => {
    // PUT requests are disabled for now
    throw new Error('PUT requests are disabled. Use static JSON files instead.');
  },

  deleteDocument: async (documentId: string, nodeId: string): Promise<void> => {
    // DELETE requests are disabled for now
    throw new Error('DELETE requests are disabled. Use static JSON files instead.');
  },
};

