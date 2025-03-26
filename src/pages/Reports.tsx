
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportTable } from "@/components/reports/ReportTable";
import { getAllBookings, getAllRooms, Room, Booking } from "@/data/rooms";

// Mock donors data
const donors = [
  {
    id: "1",
    name: "Aditya Sharma",
    email: "aditya@example.com",
    contact: "9876543210",
    totalDonations: 25000,
    lastDonation: "2023-10-15",
    address: "123 Temple Street, Mumbai",
  },
  {
    id: "2",
    name: "Priya Singh",
    email: "priya@example.com",
    contact: "9876543211",
    totalDonations: 15000,
    lastDonation: "2023-10-10",
    address: "456 Park Avenue, Delhi",
  },
  {
    id: "3",
    name: "Raj Patel",
    email: "raj@example.com",
    contact: "9876543212",
    totalDonations: 8000,
    lastDonation: "2023-10-05",
    address: "789 Main Road, Pune",
  },
  {
    id: "4",
    name: "Meera Joshi",
    email: "meera@example.com",
    contact: "9876543213",
    totalDonations: 12000,
    lastDonation: "2023-09-28",
    address: "101 Green Avenue, Bangalore",
  },
  {
    id: "5",
    name: "Ravi Kumar",
    email: "ravi@example.com",
    contact: "9876543214",
    totalDonations: 30000,
    lastDonation: "2023-09-20",
    address: "234 Temple Road, Chennai",
  },
];

// Mock donations data
const donations = [
  {
    id: "d-1",
    donorId: "1",
    donorName: "Aditya Sharma",
    amount: 5000,
    date: "2023-10-15",
    purpose: "Temple Renovation",
    paymentMethod: "UPI",
    receiptNumber: "RCP-2023-001",
  },
  {
    id: "d-2",
    donorId: "2",
    donorName: "Priya Singh",
    amount: 3000,
    date: "2023-10-10",
    purpose: "Festival Celebration",
    paymentMethod: "Credit Card",
    receiptNumber: "RCP-2023-002",
  },
  {
    id: "d-3",
    donorId: "3",
    donorName: "Raj Patel",
    amount: 1000,
    date: "2023-10-05",
    purpose: "Daily Pooja",
    paymentMethod: "Cash",
    receiptNumber: "RCP-2023-003",
  },
  {
    id: "d-4",
    donorId: "4",
    donorName: "Meera Joshi",
    amount: 2000,
    date: "2023-09-28",
    purpose: "Annadanam",
    paymentMethod: "UPI",
    receiptNumber: "RCP-2023-004",
  },
  {
    id: "d-5",
    donorId: "5",
    donorName: "Ravi Kumar",
    amount: 10000,
    date: "2023-09-20",
    purpose: "Temple Maintenance",
    paymentMethod: "Bank Transfer",
    receiptNumber: "RCP-2023-005",
  },
];

const Reports = () => {
  const [rooms] = useState<Room[]>(getAllRooms());
  const [bookings] = useState<Booking[]>(getAllBookings());

  const roomColumns = [
    { key: "name", header: "Room Name" },
    { key: "type", header: "Type" },
    { key: "capacity", header: "Capacity" },
    { key: "price", header: "Price (₹)" },
    { key: "available", header: "Available" },
  ];

  // Convert boolean to Yes/No for display
  const formattedRooms = rooms.map(room => ({
    ...room,
    available: room.available ? "Yes" : "No"
  }));

  const bookingColumns = [
    { key: "id", header: "Booking ID" },
    { key: "guestName", header: "Guest Name" },
    { key: "checkIn", header: "Check In" },
    { key: "checkOut", header: "Check Out" },
    { key: "numberOfGuests", header: "Guests" },
    { key: "status", header: "Status" },
    { key: "totalAmount", header: "Amount (₹)" },
  ];

  const donorColumns = [
    { key: "name", header: "Donor Name" },
    { key: "email", header: "Email" },
    { key: "contact", header: "Contact" },
    { key: "totalDonations", header: "Total (₹)" },
    { key: "lastDonation", header: "Last Donation" },
  ];

  const donationColumns = [
    { key: "donorName", header: "Donor Name" },
    { key: "amount", header: "Amount (₹)" },
    { key: "date", header: "Date" },
    { key: "purpose", header: "Purpose" },
    { key: "paymentMethod", header: "Payment Method" },
    { key: "receiptNumber", header: "Receipt No." },
  ];

  return (
    <Layout>
      <div className="section-container">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-bold">Reports</h1>
          <p className="text-muted-foreground">View and export temple data</p>
        </div>
        
        <Tabs defaultValue="donors" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="donors">
            <ReportTable
              data={donors}
              columns={donorColumns}
              title="Donor Reports"
              exportFileName="donors_report"
            />
          </TabsContent>
          
          <TabsContent value="donations">
            <ReportTable
              data={donations}
              columns={donationColumns}
              title="Donation Reports"
              exportFileName="donations_report"
            />
          </TabsContent>
          
          <TabsContent value="rooms">
            <ReportTable
              data={formattedRooms}
              columns={roomColumns}
              title="Room Reports"
              exportFileName="rooms_report"
            />
          </TabsContent>
          
          <TabsContent value="bookings">
            <ReportTable
              data={bookings}
              columns={bookingColumns}
              title="Booking Reports"
              exportFileName="bookings_report"
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
