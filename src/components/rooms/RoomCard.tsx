
import { useState } from "react";
import { Room } from "@/data/rooms";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Users, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RoomForm } from "./RoomForm";

interface RoomCardProps {
  room: Room;
  onBookRoom?: (roomId: string) => void;
  onEditRoom?: (roomData: Room) => void;
  isAdmin?: boolean;
}

const RoomCard = ({ room, onBookRoom, onEditRoom, isAdmin = false }: RoomCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Card className="h-full overflow-hidden card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{room.name}</CardTitle>
            <CardDescription>{room.type} Room</CardDescription>
          </div>
          <Badge variant={room.available ? "default" : "secondary"}>
            {room.available ? "Available" : "Booked"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">{room.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm">
              <Bed className="h-4 w-4 mr-1" />
              <span>Capacity:</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span className="font-medium">{room.capacity}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm">Price:</div>
            <div className="font-bold text-primary">₹{room.price}/night</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm font-medium">Amenities:</div>
            <div className="flex flex-wrap gap-1">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="text-xs flex items-center bg-muted px-2 py-1 rounded-md">
                  <Check className="h-3 w-3 mr-1 text-primary" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        {isAdmin ? (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">Edit Room</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Room</DialogTitle>
                <DialogDescription>
                  Update room details and availability
                </DialogDescription>
              </DialogHeader>
              <RoomForm 
                initialData={room} 
                onSubmit={(data) => {
                  if (onEditRoom) {
                    onEditRoom(data);
                  }
                  handleCloseDialog();
                }}
                onCancel={handleCloseDialog}
              />
            </DialogContent>
          </Dialog>
        ) : (
          <Button 
            className="w-full" 
            disabled={!room.available}
            onClick={() => onBookRoom && onBookRoom(room.id)}
          >
            {room.available ? "Book Now" : "Not Available"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
