
import { DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock donations data
const recentDonations = [
  {
    id: "1",
    donor: "Rajesh Sharma",
    amount: 5100,
    purpose: "Temple Renovation",
    date: "2023-10-15",
  },
  {
    id: "2",
    donor: "Priya Patel",
    amount: 2100,
    purpose: "Festival Celebration",
    date: "2023-10-14",
  },
  {
    id: "3",
    donor: "Anand Singh",
    amount: 1100,
    purpose: "Daily Pooja",
    date: "2023-10-12",
  },
  {
    id: "4",
    donor: "Meera Desai",
    amount: 11000,
    purpose: "Annadanam Program",
    date: "2023-10-10",
  },
  {
    id: "5",
    donor: "Vikram Mehta",
    amount: 500,
    purpose: "Temple Maintenance",
    date: "2023-10-08",
  },
];

const RecentDonations = () => {
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="h-full card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-primary" />
          Recent Donations
        </CardTitle>
        <CardDescription>Latest contributions to the temple</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentDonations.map((donation) => (
            <div key={donation.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(donation.donor)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{donation.donor}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {donation.purpose}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">₹{donation.amount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(donation.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentDonations;
