export interface TimeSlot {
  id: string;
  title: string;
  start: Date;
  end: Date;
  sessionDuration: number;
  breakDuration: number;
  isRecurring?: boolean;
  recurringDays?: string[];
}