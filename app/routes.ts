import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("project/:projectId", "routes/dashboard.tsx"),
    // API routes for static JSON simulation
    route("api/v1/projects/*", "routes/api.projects.ts"),
    route("api/v1/documents/*", "routes/api.documents.ts"),
    route("api/v1/code-elements/*", "routes/api.code.ts"),
] satisfies RouteConfig;
