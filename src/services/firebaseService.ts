import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy,
  onSnapshot,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { Event, Employee, Schedule, Vote, Poll, PollVote } from '../types';

// Authentication Services
export const signUp = async (email: string, password: string, userData: Partial<Employee>) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create employee profile
    await addDoc(collection(db, 'employees'), {
      uid: user.uid,
      email: user.email,
      ...userData,
      createdAt: Timestamp.now(),
      isActive: true
    });
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

// Employee Services
export const getEmployeeByUid = async (uid: string): Promise<Employee | null> => {
  try {
    const q = query(collection(db, 'employees'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Employee;
    }
    return null;
  } catch (error) {
    console.error('Error fetching employee:', error);
    return null;
  }
};

export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'employees'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Employee[];
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
};

export const updateEmployee = async (employeeId: string, data: Partial<Employee>) => {
  try {
    const employeeRef = doc(db, 'employees', employeeId);
    await updateDoc(employeeRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    throw error;
  }
};

// Event Services
export const createEvent = async (eventData: Omit<Event, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'events'), {
      ...eventData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getEvents = async (): Promise<Event[]> => {
  try {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Event[];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const updateEvent = async (eventId: string, data: Partial<Event>) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    await updateDoc(eventRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    await deleteDoc(doc(db, 'events', eventId));
  } catch (error) {
    throw error;
  }
};

// Poll Services
export const createPoll = async (pollData: Omit<Poll, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'polls'), {
      ...pollData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getPolls = async (): Promise<Poll[]> => {
  try {
    const q = query(collection(db, 'polls'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Poll[];
  } catch (error) {
    console.error('Error fetching polls:', error);
    return [];
  }
};

export const getPollById = async (pollId: string): Promise<Poll | null> => {
  try {
    const docRef = doc(db, 'polls', pollId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Poll;
    }
    return null;
  } catch (error) {
    console.error('Error fetching poll:', error);
    return null;
  }
};

export const updatePoll = async (pollId: string, data: Partial<Poll>) => {
  try {
    const pollRef = doc(db, 'polls', pollId);
    await updateDoc(pollRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    throw error;
  }
};

export const deletePoll = async (pollId: string) => {
  try {
    await deleteDoc(doc(db, 'polls', pollId));
  } catch (error) {
    throw error;
  }
};

// Poll Vote Services
export const submitPollVote = async (voteData: Omit<PollVote, 'id' | 'createdAt'>) => {
  try {
    // Check if user already voted for this poll
    const q = query(
      collection(db, 'pollVotes'),
      where('pollId', '==', voteData.pollId),
      where('voterId', '==', voteData.voterId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Update existing vote
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        ...voteData,
        updatedAt: Timestamp.now()
      });
      return querySnapshot.docs[0].id;
    } else {
      // Create new vote
      const docRef = await addDoc(collection(db, 'pollVotes'), {
        ...voteData,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    }
  } catch (error) {
    throw error;
  }
};

export const getPollVotes = async (pollId: string): Promise<PollVote[]> => {
  try {
    const q = query(collection(db, 'pollVotes'), where('pollId', '==', pollId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PollVote[];
  } catch (error) {
    console.error('Error fetching poll votes:', error);
    return [];
  }
};

// Schedule Services
export const saveSchedule = async (scheduleData: Omit<Schedule, 'id'>) => {
  try {
    // Check if schedule already exists for this employee
    const q = query(
      collection(db, 'schedules'), 
      where('employeeId', '==', scheduleData.employeeId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Update existing schedule
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        ...scheduleData,
        updatedAt: Timestamp.now()
      });
      return querySnapshot.docs[0].id;
    } else {
      // Create new schedule
      const docRef = await addDoc(collection(db, 'schedules'), {
        ...scheduleData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    }
  } catch (error) {
    throw error;
  }
};

export const getScheduleByEmployee = async (employeeId: string): Promise<Schedule | null> => {
  try {
    const q = query(collection(db, 'schedules'), where('employeeId', '==', employeeId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Schedule;
    }
    return null;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return null;
  }
};

export const getAllSchedules = async (): Promise<Schedule[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'schedules'));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Schedule[];
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return [];
  }
};

// Vote Services
export const submitVote = async (voteData: Omit<Vote, 'id' | 'createdAt'>) => {
  try {
    // Check if user already voted for this event
    const q = query(
      collection(db, 'votes'),
      where('eventId', '==', voteData.eventId),
      where('employeeId', '==', voteData.employeeId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      // Update existing vote
      const docRef = querySnapshot.docs[0].ref;
      await updateDoc(docRef, {
        ...voteData,
        updatedAt: Timestamp.now()
      });
      return querySnapshot.docs[0].id;
    } else {
      // Create new vote
      const docRef = await addDoc(collection(db, 'votes'), {
        ...voteData,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    }
  } catch (error) {
    throw error;
  }
};

export const getVotesByEvent = async (eventId: string): Promise<Vote[]> => {
  try {
    const q = query(collection(db, 'votes'), where('eventId', '==', eventId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Vote[];
  } catch (error) {
    console.error('Error fetching votes:', error);
    return [];
  }
};

// Real-time listeners
export const subscribeToEvents = (callback: (events: Event[]) => void) => {
  const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Event[];
    callback(events);
  });
};

export const subscribeToPolls = (callback: (polls: Poll[]) => void) => {
  const q = query(collection(db, 'polls'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (querySnapshot) => {
    const polls = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Poll[];
    callback(polls);
  });
};

export const subscribeToVotes = (eventId: string, callback: (votes: Vote[]) => void) => {
  const q = query(collection(db, 'votes'), where('eventId', '==', eventId));
  return onSnapshot(q, (querySnapshot) => {
    const votes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Vote[];
    callback(votes);
  });
};

export const subscribeToPollVotes = (pollId: string, callback: (votes: PollVote[]) => void) => {
  const q = query(collection(db, 'pollVotes'), where('pollId', '==', pollId));
  return onSnapshot(q, (querySnapshot) => {
    const votes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as PollVote[];
    callback(votes);
  });
};

// Analytics Services
export const getAvailabilityAnalytics = async (startDate: Date, endDate: Date) => {
  try {
    const schedules = await getAllSchedules();
    const employees = await getAllEmployees();
    
    // Calculate availability for each day in the range
    const analytics = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][dayOfWeek];
      
      let availableCount = 0;
      let totalEmployees = employees.length;
      
      schedules.forEach(schedule => {
        const daySchedule = schedule.workingHours[dayName as keyof typeof schedule.workingHours];
        if (daySchedule && daySchedule.isWorking) {
          availableCount++;
        }
      });
      
      analytics.push({
        date: new Date(currentDate),
        availableCount,
        totalEmployees,
        availabilityPercentage: totalEmployees > 0 ? (availableCount / totalEmployees) * 100 : 0
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return analytics;
  } catch (error) {
    console.error('Error calculating availability analytics:', error);
    return [];
  }
};