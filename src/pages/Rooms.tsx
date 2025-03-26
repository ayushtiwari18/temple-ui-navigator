
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import RoomCard from "@/components/rooms/RoomCard";
import { Room, getAllRooms, updateRoomAvailability } from "@/data/rooms";
import { Button } from "@/components/ui/button";
import { RoomForm } from "@/components/rooms/RoomForm";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>(getAllRooms());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEditRoom = (updatedRoom: Room) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === updatedRoom.id ? updatedRoom : room
      )
    );
    
    toast({
      title: "Room updated",
      description: `${updatedRoom.name} has been updated successfully.`,
    });
  };

  const handleAddRoom = (newRoom: Room) => {
    setRooms(prevRooms => [...prevRooms, newRoom]);
    setIsDialogOpen(false);
    
    toast({
      title: "Room added",
      description: `${newRoom.name} has been added successfully.`,
    });
  };

  const handleToggleAvailability = (roomId: string) => {
    setRooms(prevRooms => 
      prevRooms.map(room => {
        if (room.id === roomId) {
          const updatedRoom = { ...room, available: !room.available };
          updateRoomAvailability(roomId, updatedRoom.available);
          return updatedRoom;
        }
        return room;
      })
    );
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Layout>
      <div className="section-container">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold">Room Management</h1>
            <p className="text-muted-foreground">Manage temple accommodations</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Room
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
                <DialogDescription>
                  Enter the details for the new accommodation
                </DialogDescription>
              </DialogHeader>
              <RoomForm 
                onSubmit={handleAddRoom}
                onCancel={handleCloseDialog}
              />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard 
              key={room.id} 
              room={room} 
              onEditRoom={handleEditRoom}
              isAdmin={true}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Rooms;
