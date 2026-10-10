import { ProjectMember } from "../projectMembers/projectMembers.types";
import { Task } from "../tasks/tasks.types";

export interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;

  tasks: Task[];
  members: ProjectMember[];
}
