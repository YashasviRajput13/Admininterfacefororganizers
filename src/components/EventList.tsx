import { Event } from '../App';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { MoreVertical, Pencil, Trash2, Copy, MapPin, Users, Calendar, Clock, CheckCircle } from 'lucide-react';

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onDuplicate: (event: Event) => void;
}

export function EventList({ events, onEdit, onDelete, onDuplicate }: EventListProps) {
  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'published':
        return 'bg-[#7DF9FF]/10 text-[#7DF9FF] border border-[#7DF9FF]/30 hover:bg-[#7DF9FF]/10';
      case 'draft':
        return 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-100';
      case 'cancelled':
        return 'bg-[#F08080]/10 text-[#F08080] border border-[#F08080]/30 hover:bg-[#F08080]/10';
    }
  };

  const getModeColor = (mode: Event['mode']) => {
    switch (mode) {
      case 'in-person':
        return 'bg-[#7DF9FF]/10 text-[#7DF9FF] border border-[#7DF9FF]/20 hover:bg-[#7DF9FF]/10';
      case 'virtual':
        return 'bg-[#F4C2C2]/50 text-[#F08080] border border-[#F08080]/20 hover:bg-[#F4C2C2]/50';
      case 'hybrid':
        return 'bg-gradient-to-r from-[#7DF9FF]/10 to-[#F4C2C2]/30 text-gray-700 border border-[#7DF9FF]/20 hover:from-[#7DF9FF]/10 hover:to-[#F4C2C2]/30';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getCapacityPercentage = (attendees: number = 0, capacity: number) => {
    return Math.round((attendees / capacity) * 100);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="text-xs text-gray-600">Event</TableHead>
            <TableHead className="text-xs text-gray-600">Date & Time</TableHead>
            <TableHead className="text-xs text-gray-600">Location</TableHead>
            <TableHead className="text-xs text-gray-600">Mode</TableHead>
            <TableHead className="text-xs text-gray-600">Attendance</TableHead>
            <TableHead className="text-xs text-gray-600">Category</TableHead>
            <TableHead className="text-xs text-gray-600">Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-16">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#7DF9FF]/10 to-[#F4C2C2]/20 rounded-full flex items-center justify-center mb-4">
                    <Calendar className="w-8 h-8 text-[#7DF9FF]" />
                  </div>
                  <h3 className="text-gray-900 mb-2">No events yet</h3>
                  <p className="text-sm text-gray-500">Create your first event to get started</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => {
              const percentage = getCapacityPercentage(event.attendees, event.capacity);
              return (
                <TableRow key={event.id} className="hover:bg-gray-50">
                  <TableCell className="max-w-xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-gray-900">{event.title}</p>
                        {event.proposalStatus === 'approved' && (
                          <CheckCircle className="w-4 h-4 text-[#7DF9FF] fill-[#7DF9FF] flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1">{event.description}</p>
                      {event.tags.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {event.tags.slice(0, 3).map((tag, idx) => (
                            <span 
                              key={idx}
                              className="text-xs bg-gradient-to-r from-[#7DF9FF]/10 to-[#F4C2C2]/10 text-gray-600 px-2 py-0.5 rounded border border-[#7DF9FF]/20"
                            >
                              {tag}
                            </span>
                          ))}
                          {event.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{event.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {event.time}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-gray-600 max-w-[200px]">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`${getModeColor(event.mode)} text-xs capitalize`}>
                      {event.mode}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-900">{event.attendees || 0}</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-600">{event.capacity}</span>
                      </div>
                      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            percentage >= 80 ? 'bg-gradient-to-r from-[#7DF9FF] to-[#4FC3F7]' : 
                            percentage >= 50 ? 'bg-[#F08080]' : 
                            'bg-gray-400'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-gray-700">{event.category}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`${getStatusColor(event.status)} text-xs capitalize`}>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(event)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDuplicate(event)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => onDelete(event.id)}
                          className="text-[#F08080]"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
