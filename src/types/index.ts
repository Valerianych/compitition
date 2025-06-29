import { Timestamp } from 'firebase/firestore';

export interface Employee {
  id?: string;
  uid: string;
  name: string;
  nickname?: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  isActive: boolean;
  notificationSettings?: {
    vkId?: string;
    telegramChatId?: number;
    telegramUsername?: string;
    notificationTypes: {
      newEvent: boolean;
      eventUpdate: boolean;
      eventReminder: boolean;
      eventCancelled: boolean;
      friendJoined: boolean;
      optimalTimeFound: boolean;
    };
  };
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface Event {
  id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  link?: string;
  photos?: string[];
  capacity: number;
  category: 'hangout' | 'cinema' | 'cafe' | 'nature' | 'home' | 'sport' | 'culture' | 'other';
  price: string;
  organizerId: string;
  attendees: string[];
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  comments: Comment[];
  reviews: Review[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Poll {
  id?: string;
  title: string;
  description: string;
  category: 'place' | 'activity' | 'time' | 'other';
  organizerId: string;
  organizerName: string;
  options: PollOption[];
  votes: PollVote[];
  settings: {
    multipleChoice: boolean;
    anonymous: boolean;
    showResults: boolean;
    endDate?: string;
    endTime?: string;
  };
  status: 'active' | 'closed' | 'draft';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PollOption {
  id: string;
  title: string;
  description?: string;
  photos?: string[];
  link?: string;
  price?: string;
  address?: string;
  pros?: string[];
  cons?: string[];
  additionalInfo?: string;
}

export interface PollVote {
  id?: string;
  pollId: string;
  voterId: string;
  voterName: string;
  selectedOptions: string[];
  comment?: string;
  createdAt: Timestamp;
}

export interface Comment {
  id?: string;
  eventId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Timestamp;
}

export interface Review {
  id?: string;
  eventId: string;
  authorId: string;
  authorName: string;
  rating: number;
  content: string;
  photos?: string[];
  createdAt: Timestamp;
}

export interface Schedule {
  id?: string;
  employeeId: string;
  workingHours: {
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
    sunday: DaySchedule;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface DaySchedule {
  isWorking: boolean;
  startTime: string;
  endTime: string;
}

export interface Vote {
  id?: string;
  eventId: string;
  employeeId: string;
  availability: 'available' | 'maybe' | 'unavailable';
  preferredTimes: string[];
  comments?: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface Notification {
  id?: string;
  recipientId: string;
  title: string;
  message: string;
  type: 'event_created' | 'event_updated' | 'event_cancelled' | 'reminder' | 'friend_joined' | 'system';
  isRead: boolean;
  eventId?: string;
  createdAt: Timestamp;
}

export interface OptimalTimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  availableFriends: string[];
  totalFriends: number;
  availabilityPercentage: number;
}