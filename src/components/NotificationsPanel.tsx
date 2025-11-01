import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bell, Calendar, CheckCircle, FileText, Users, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface NotificationsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Notification {
  id: string;
  type: 'event' | 'approval' | 'attendance' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'approval',
    title: 'Proposal Approved',
    message: 'Your event "Tech Conference 2025" has been approved by the authorities.',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'attendance',
    title: 'High Registration Rate',
    message: 'Web Development Workshop has reached 78% capacity.',
    time: '5 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'event',
    title: 'Event Reminder',
    message: 'Your event "Web Development Workshop" starts in 3 days.',
    time: '1 day ago',
    read: true
  },
  {
    id: '4',
    type: 'system',
    title: 'New Feature Available',
    message: 'AI-powered description generator is now available for all events.',
    time: '2 days ago',
    read: true
  }
];

export function NotificationsPanel({ open, onOpenChange }: NotificationsPanelProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'approval':
        return <FileText className="w-4 h-4" />;
      case 'attendance':
        return <Users className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'system':
        return <Bell className="w-4 h-4" />;
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'approval':
        return 'bg-[#7DF9FF]/10 text-[#7DF9FF]';
      case 'attendance':
        return 'bg-[#F4C2C2]/50 text-[#F08080]';
      case 'event':
        return 'bg-[#F08080]/10 text-[#F08080]';
      case 'system':
        return 'bg-gray-100 text-gray-600';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-[#F08080] hover:bg-[#F08080] text-white border-0 text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors ${
                notification.read 
                  ? 'bg-white border-gray-200' 
                  : 'bg-[#7DF9FF]/5 border-[#7DF9FF]/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getIconColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm text-gray-900">{notification.title}</p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-[#7DF9FF] rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-4 pt-4 border-t">
          <Button 
            variant="outline" 
            className="flex-1 text-[#7DF9FF] border-[#7DF9FF]/30 hover:bg-[#7DF9FF]/10"
          >
            Mark all as read
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
