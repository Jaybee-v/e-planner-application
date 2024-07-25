export interface LessonM {
  id: string;
  hostId: string;
  title: string;
  type: string;
  description: string;
  date: Date;
  instructorId: string;
  maxParticipants: number;
  startTime: string;
  endTime: string;
  levelRequired: number;
  createdAt: Date;
  updatedAt: Date;
}
