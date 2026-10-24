'use client';

import { useState, useEffect } from 'react';

export interface Booking {
  id: string;
  workerId: number;
  workerName: string;
  skill: string;
  rate: number;
  originalRate: number;
  status: 'arriving' | 'in_progress' | 'completed' | 'cancelled';
  schedule: string;
  address: string;
  eta: string;
  date: string;
  jobDescription?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'partner';
  address: string;
  avatarInitial: string;
  partnerDetails?: {
    skill: string;
    experience: string;
    hourlyRate: number;
    idType: string;
    idNumber: string;
    idDocumentName: string;
    isVerified: boolean;
    verificationDate: string;
  };
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Aarav Patel',
  email: 'aarav.patel@example.com',
  phone: '+91 98765 43210',
  role: 'customer',
  address: 'Indiranagar 100ft Road, Bangalore',
  avatarInitial: 'A',
};

const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'BK-8921',
    workerId: 1,
    workerName: 'Rajesh Kumar',
    skill: 'Plumber',
    rate: 320,
    originalRate: 350,
    status: 'arriving',
    schedule: 'Immediate (ASAP)',
    address: 'Indiranagar 100ft Road, Bangalore',
    eta: '12 mins',
    date: 'Today, 11:30 AM',
    jobDescription: 'Kitchen sink pipe blockage and inspection',
  },
  {
    id: 'BK-8419',
    workerId: 2,
    workerName: 'Priya Sharma',
    skill: 'Cleaner',
    rate: 280,
    originalRate: 300,
    status: 'completed',
    schedule: 'Completed yesterday',
    address: 'Indiranagar 100ft Road, Bangalore',
    eta: 'Finished',
    date: 'Yesterday, 3:00 PM',
    jobDescription: 'Deep cleaning living room and balconies',
  },
];

const PRESET_ADDRESSES = [
  { id: '1', title: 'Home', address: 'Indiranagar 100ft Road, Bangalore', tag: 'Primary' },
  { id: '2', title: 'Work Office', address: 'Koramangala 4th Block, 80ft Road, Bangalore', tag: 'Office' },
  { id: '3', title: 'Parents House', address: 'HSR Layout Sector 2, Bangalore', tag: 'Secondary' },
  { id: '4', title: 'South Mumbai Flat', address: 'Andheri West, Link Road, Mumbai', tag: 'Vacation' },
];

export function useUserStore() {
  const [profile, setProfileState] = useState<UserProfile>(DEFAULT_PROFILE);
  const [bookings, setBookingsState] = useState<Booking[]>(DEFAULT_BOOKINGS);
  const [savedAddresses, setSavedAddresses] = useState(PRESET_ADDRESSES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('fixo_user_profile');
      if (storedProfile) {
        setProfileState(JSON.parse(storedProfile));
      }

      const storedBookings = localStorage.getItem('fixo_user_bookings');
      if (storedBookings) {
        setBookingsState(JSON.parse(storedBookings));
      }

      const storedAddresses = localStorage.getItem('fixo_saved_addresses');
      if (storedAddresses) {
        setSavedAddresses(JSON.parse(storedAddresses));
      }
    } catch {
      // Fallback to defaults if parsing fails
    }
    setIsLoaded(true);
  }, []);

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setProfileState((prev) => {
      const updated: UserProfile = {
        ...prev,
        ...newProfile,
        avatarInitial: (newProfile.name || prev.name).trim().charAt(0).toUpperCase() || 'U',
      };
      try {
        localStorage.setItem('fixo_user_profile', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const setAddress = (address: string) => {
    updateProfile({ address });
  };

  const addBooking = (newBooking: Omit<Booking, 'id' | 'date'>) => {
    const fullBooking: Booking = {
      ...newBooking,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Just now',
    };
    setBookingsState((prev) => {
      const updated = [fullBooking, ...prev];
      try {
        localStorage.setItem('fixo_user_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    return fullBooking;
  };

  const cancelBooking = (id: string) => {
    setBookingsState((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b));
      try {
        localStorage.setItem('fixo_user_bookings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const addCustomAddress = (title: string, address: string) => {
    const newEntry = {
      id: Date.now().toString(),
      title,
      address,
      tag: 'Custom',
    };
    setSavedAddresses((prev) => {
      const updated = [newEntry, ...prev];
      try {
        localStorage.setItem('fixo_saved_addresses', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    setAddress(address);
  };

  return {
    profile,
    bookings,
    savedAddresses,
    isLoaded,
    updateProfile,
    setAddress,
    addBooking,
    cancelBooking,
    addCustomAddress,
  };
}
