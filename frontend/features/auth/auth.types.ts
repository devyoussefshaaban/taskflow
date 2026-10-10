import { ProjectMember } from "../projectMembers/projectMembers.types";
import { Project } from "../projects/projects.types";
import { Task } from "../tasks/tasks.types";

export interface User {
  id: string;
  name: string;
  email: string;
  tasks: Task[];
  projects: Project[];
  projectMemberships: ProjectMember[];
}

export interface AuthResponse {
  accessToken: string;
}

export interface ApiErrorResponse {
  message: string | string[];
  statusCode?: number;
}
