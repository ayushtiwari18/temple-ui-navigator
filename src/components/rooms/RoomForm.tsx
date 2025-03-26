
import { useState } from "react";
import { Room } from "@/data/rooms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";

interface RoomFormProps {
  initialData?: Room;
  onSubmit: (data: Room) => void;
  onCancel: () => void;
}

export const RoomForm = ({
  initialData,
  onSubmit,
  onCancel,
}: RoomFormProps) => {
  const [formData, setFormData] = useState<Room>(
    initialData || {
      id: `room-${Math.floor(Math.random() * 1000)}`,
      name: "",
      type: "Standard",
      capacity: 2,
      price: 500,
      available: true,
      description: "",
      amenities: ["Attached Bathroom", "Hot Water"],
    }
  );

  const [amenityInput, setAmenityInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value as Room['type'] }));
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, available: checked }));
  };

  const handleAddAmenity = () => {
    if (amenityInput.trim() !== "" && !formData.amenities.includes(amenityInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()],
      }));
      setAmenityInput("");
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Room Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Ganesh Room"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Room Type</Label>
            <Select
              value={formData.type}
              onValueChange={handleTypeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Deluxe">Deluxe</SelectItem>
                <SelectItem value="Family">Family</SelectItem>
                <SelectItem value="Dormitory">Dormitory</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              min={1}
              value={formData.capacity}
              onChange={handleNumberChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="price">Price per night (₹)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            value={formData.price}
            onChange={handleNumberChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the room and its features"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Amenities</Label>
          <div className="flex gap-2">
            <Input
              value={amenityInput}
              onChange={(e) => setAmenityInput(e.target.value)}
              placeholder="Add an amenity"
            />
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleAddAmenity}
            >
              Add
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.amenities.map((amenity, index) => (
              <div key={index} className="bg-muted flex items-center gap-1 px-2 py-1 rounded-md text-sm">
                <span>{amenity}</span>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveAmenity(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="available"
            checked={formData.available}
            onCheckedChange={handleAvailabilityChange}
          />
          <Label htmlFor="available">Room is available</Label>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </DialogFooter>
    </form>
  );
};
