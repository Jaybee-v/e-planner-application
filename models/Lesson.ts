import { InstructorM } from "./Instructor";
import { RiderM } from "./Rider";

export interface LessonM {
  id: string;
  hostId: string;
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

export interface LessonTableM {
  id: string;
  hostId: string;
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
  instructor: InstructorM;
  participantsIdentity: RiderM[];
}
