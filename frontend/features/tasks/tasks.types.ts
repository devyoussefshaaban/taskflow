enum Status {
  TODO,
  ASSIGNED,
  IN_PROGRESS,
  COMPLETED,
}

enum Priority {
  LOW,
  MEDIUM,
  HIGH,
  URGENT,
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  priority: Priority;

  userId: number;
  projectId: number;
}
