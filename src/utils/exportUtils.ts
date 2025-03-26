
import { Room, Booking } from "@/data/rooms";

// Function to export data to CSV format
export const exportToCSV = (data: any[], fileName: string) => {
  // Get headers from the first object in the data array
  const headers = Object.keys(data[0]);
  
  // Create CSV header row
  const csvHeader = headers.join(',');
  
  // Create CSV content rows
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header];
      // Handle strings with commas by wrapping in quotes
      return typeof value === 'string' && value.includes(',') 
        ? `"${value}"` 
        : value;
    }).join(',');
  });
  
  // Combine header and rows
  const csvString = [csvHeader, ...csvRows].join('\n');
  
  // Create a blob and download
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Export room data
export const exportRoomsData = (rooms: Room[], format: 'csv') => {
  const formattedData = rooms.map(room => ({
    'Room Name': room.name,
    'Type': room.type,
    'Capacity': room.capacity,
    'Price': room.price,
    'Available': room.available ? 'Yes' : 'No',
    'Description': room.description,
    'Amenities': room.amenities.join(', ')
  }));
  
  if (format === 'csv') {
    exportToCSV(formattedData, 'rooms_data');
  }
};

// Export booking data
export const exportBookingsData = (bookings: Booking[], format: 'csv') => {
  const formattedData = bookings.map(booking => ({
    'Booking ID': booking.id,
    'Room ID': booking.roomId,
    'Guest Name': booking.guestName,
    'Check In': booking.checkIn,
    'Check Out': booking.checkOut,
    'Guests': booking.numberOfGuests,
    'Status': booking.status,
    'Payment': booking.paymentStatus,
    'Contact': booking.contactNumber,
    'Amount': booking.totalAmount,
    'Booked On': booking.createdAt
  }));
  
  if (format === 'csv') {
    exportToCSV(formattedData, 'bookings_data');
  }
};

// Function to implement PDF export in the future
export const exportToPDF = (data: any[], fileName: string) => {
  // This would use a library like jspdf
  // For now, we'll just show an alert
  console.log('PDF export would go here', data, fileName);
  
  alert(`PDF export of ${fileName} would happen here with a real implementation using jspdf`);
};
