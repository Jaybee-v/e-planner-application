export interface CreateLessonDto {
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
}
