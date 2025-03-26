
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import StatCard from "@/components/dashboard/StatCard";
import RecentDonations from "@/components/dashboard/RecentDonations";
import { Calendar, Clock, DollarSign, BarChart3, Hotel, Users } from "lucide-react";
import { getAllRooms, getAvailableRooms, getAllBookings } from "@/data/rooms";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalBookings: 0,
    availableRooms: 0,
    totalRooms: 0,
    devoteeVisits: 0,
    upcomingEvents: 0,
  });

  // Calculate statistics
  useEffect(() => {
    const calculateStats = () => {
      const rooms = getAllRooms();
      const availableRooms = getAvailableRooms();
      const bookings = getAllBookings();
      
      setStats({
        totalDonations: 186500, // Mock value
        totalBookings: bookings.length,
        availableRooms: availableRooms.length,
        totalRooms: rooms.length,
        devoteeVisits: 934, // Mock value
        upcomingEvents: 3, // Mock value
      });
    };
    
    calculateStats();
  }, []);

  return (
    <Layout>
      <div className="section-container">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Dutt Mandir Management System</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Donations"
            value={`₹${stats.totalDonations.toLocaleString()}`}
            description="This month"
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          
          <StatCard
            title="Room Bookings"
            value={stats.totalBookings}
            description={`${stats.availableRooms} rooms available`}
            icon={<Hotel className="h-4 w-4" />}
            trend={{ value: 5, isPositive: true }}
          />
          
          <StatCard
            title="Devotee Visits"
            value={stats.devoteeVisits}
            description="This week"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 3, isPositive: true }}
          />
          
          <StatCard
            title="Today's Schedule"
            value="4 Events"
            description="Next: Aarti at 7:00 PM"
            icon={<Clock className="h-4 w-4" />}
          />
          
          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents}
            description="This month"
            icon={<Calendar className="h-4 w-4" />}
          />
          
          <StatCard
            title="Room Occupancy"
            value={`${Math.round(((stats.totalRooms - stats.availableRooms) / stats.totalRooms) * 100)}%`}
            description={`${stats.totalRooms - stats.availableRooms} out of ${stats.totalRooms} rooms occupied`}
            icon={<BarChart3 className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <RecentDonations />
          
          <div className="bg-white border rounded-lg p-6 shadow-sm h-full card-hover">
            <h3 className="text-lg font-medium mb-4">Room Availability</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Standard Rooms</span>
                <div className="w-32 bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: '25%' }}
                  ></div>
                </div>
                <span className="text-sm font-medium">25%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Deluxe Rooms</span>
                <div className="w-32 bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: '50%' }}
                  ></div>
                </div>
                <span className="text-sm font-medium">50%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Family Suites</span>
                <div className="w-32 bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: '75%' }}
                  ></div>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Dormitories</span>
                <div className="w-32 bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: '90%' }}
                  ></div>
                </div>
                <span className="text-sm font-medium">90%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
