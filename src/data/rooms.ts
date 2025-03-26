
export interface Room {
  id: string;
  name: string;
  type: 'Standard' | 'Deluxe' | 'Family' | 'Dormitory';
  capacity: number;
  price: number;
  available: boolean;
  description: string;
  amenities: string[];
  image?: string;
}

export const rooms: Room[] = [
  {
    id: "room-1",
    name: "Ganesh Room",
    type: "Standard",
    capacity: 2,
    price: 500,
    available: true,
    description: "Comfortable room with basic amenities for devotees.",
    amenities: ["Attached Bathroom", "Hot Water", "Cupboard"],
  },
  {
    id: "room-2",
    name: "Lakshmi Suite",
    type: "Deluxe",
    capacity: 3,
    price: 1000,
    available: true,
    description: "Spacious deluxe room with additional amenities for comfortable stay.",
    amenities: ["Attached Bathroom", "Hot Water", "TV", "AC", "Cupboard"],
  },
  {
    id: "room-3",
    name: "Saraswati Room",
    type: "Standard",
    capacity: 2,
    price: 500,
    available: false,
    description: "Comfortable room with basic amenities for devotees.",
    amenities: ["Attached Bathroom", "Hot Water", "Cupboard"],
  },
  {
    id: "room-4",
    name: "Durga Family Suite",
    type: "Family",
    capacity: 5,
    price: 1500,
    available: true,
    description: "Large family room with multiple beds and spacious living area.",
    amenities: ["Attached Bathroom", "Hot Water", "TV", "AC", "Cupboard", "Mini Kitchen"],
  },
  {
    id: "room-5",
    name: "Krishna Dormitory",
    type: "Dormitory",
    capacity: 8,
    price: 250,
    available: true,
    description: "Shared dormitory for budget travelers and group stays.",
    amenities: ["Shared Bathroom", "Hot Water", "Locker", "Common Area"],
  },
  {
    id: "room-6",
    name: "Rama Deluxe",
    type: "Deluxe",
    capacity: 3,
    price: 1000,
    available: true,
    description: "Elegant room with premium amenities for a comfortable stay.",
    amenities: ["Attached Bathroom", "Hot Water", "TV", "AC", "Cupboard", "Study Table"],
  },
];

// Room service functions
export const getAllRooms = (): Room[] => {
  return rooms;
};

export const getRoomById = (id: string): Room | undefined => {
  return rooms.find(room => room.id === id);
};

export const getAvailableRooms = (): Room[] => {
  return rooms.filter(room => room.available);
};

export const updateRoomAvailability = (id: string, available: boolean): Room | undefined => {
  const roomIndex = rooms.findIndex(room => room.id === id);
  if (roomIndex !== -1) {
    rooms[roomIndex].available = available;
    return rooms[roomIndex];
  }
  return undefined;
};

// Mock bookings
export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  contactNumber: string;
  totalAmount: number;
  createdAt: string;
}

export const bookings: Booking[] = [
  {
    id: "booking-1",
    roomId: "room-2",
    guestName: "Aman Verma",
    checkIn: "2023-10-20",
    checkOut: "2023-10-22",
    numberOfGuests: 2,
    status: "Confirmed",
    paymentStatus: "Paid",
    contactNumber: "9876543210",
    totalAmount: 2000,
    createdAt: "2023-10-15",
  },
  {
    id: "booking-2",
    roomId: "room-4",
    guestName: "Sharma Family",
    checkIn: "2023-10-25",
    checkOut: "2023-10-28",
    numberOfGuests: 4,
    status: "Confirmed",
    paymentStatus: "Paid",
    contactNumber: "9876543211",
    totalAmount: 4500,
    createdAt: "2023-10-16",
  },
  {
    id: "booking-3",
    roomId: "room-1",
    guestName: "Raj Singh",
    checkIn: "2023-10-22",
    checkOut: "2023-10-23",
    numberOfGuests: 1,
    status: "Pending",
    paymentStatus: "Pending",
    contactNumber: "9876543212",
    totalAmount: 500,
    createdAt: "2023-10-17",
  },
  {
    id: "booking-4",
    roomId: "room-5",
    guestName: "Youth Group",
    checkIn: "2023-11-01",
    checkOut: "2023-11-03",
    numberOfGuests: 6,
    status: "Confirmed",
    paymentStatus: "Paid",
    contactNumber: "9876543213",
    totalAmount: 3000,
    createdAt: "2023-10-18",
  },
];

export const getAllBookings = (): Booking[] => {
  return bookings;
};

export const getBookingById = (id: string): Booking | undefined => {
  return bookings.find(booking => booking.id === id);
};

export const getBookingsByRoom = (roomId: string): Booking[] => {
  return bookings.filter(booking => booking.roomId === roomId);
};

export const createBooking = (booking: Omit<Booking, 'id' | 'createdAt'>): Booking => {
  const newBooking: Booking = {
    ...booking,
    id: `booking-${bookings.length + 1}`,
    createdAt: new Date().toISOString().split('T')[0],
  };
  bookings.push(newBooking);
  return newBooking;
};
