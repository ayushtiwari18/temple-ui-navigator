
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, FileDown, Search } from "lucide-react";
import { exportToCSV, exportToPDF } from "@/utils/exportUtils";

interface Column {
  key: string;
  header: string;
}

interface ReportTableProps<T> {
  data: T[];
  columns: Column[];
  title: string;
  exportFileName: string;
}

export function ReportTable<T extends Record<string, any>>({
  data,
  columns,
  title,
  exportFileName,
}: ReportTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>(data);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      );
      setFilteredData(filtered);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    exportToCSV(
      filteredData.map(item => {
        const exportItem: Record<string, any> = {};
        columns.forEach(col => {
          exportItem[col.header] = item[col.key];
        });
        return exportItem;
      }),
      exportFileName
    );
  };

  // Export to PDF
  const handleExportPDF = () => {
    exportToPDF(
      filteredData.map(item => {
        const exportItem: Record<string, any> = {};
        columns.forEach(col => {
          exportItem[col.header] = item[col.key];
        });
        return exportItem;
      }),
      exportFileName
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-medium">{title}</h2>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportCSV}
              className="whitespace-nowrap"
            >
              <FileDown className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportPDF}
              className="whitespace-nowrap"
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={`${rowIndex}-${column.key}`}>
                      {row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={columns.length} 
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {filteredData.length} of {data.length} entries
      </div>
    </div>
  );
}
