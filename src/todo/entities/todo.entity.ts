export enum Status {
  PENDING = 'PENDING',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export class Todo {
  id: string;
  title: string;
  description: string;
  status: Status;
}
