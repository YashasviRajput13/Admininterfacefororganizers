import { Calendar, Bell, Settings, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
}

export function Header({ onOpenNotifications, onOpenSettings }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#7DF9FF] to-[#4FC3F7] text-white p-2.5 rounded-lg shadow-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-gray-900">EventPro</h2>
              <p className="text-xs text-gray-500">Organizer Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-gray-100"
              onClick={onOpenNotifications}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#F08080] rounded-full"></span>
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-gray-100"
              onClick={onOpenSettings}
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>

            <div className="w-px h-6 bg-gray-200 mx-2"></div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 px-3 hover:bg-gray-100">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-[#7DF9FF] to-[#4FC3F7] text-white text-sm">
                      SJ
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm text-gray-900">Sarah Johnson</p>
                      <CheckCircle className="w-3.5 h-3.5 text-[#7DF9FF] fill-[#7DF9FF]" />
                    </div>
                    <p className="text-xs text-gray-500">Verified Organizer</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-[#7DF9FF] to-[#4FC3F7] text-white">
                        SJ
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <p className="text-sm">Sarah Johnson</p>
                        <CheckCircle className="w-4 h-4 text-[#7DF9FF] fill-[#7DF9FF]" />
                      </div>
                      <Badge className="bg-gradient-to-r from-[#7DF9FF] to-[#4FC3F7] hover:from-[#7DF9FF] hover:to-[#4FC3F7] text-white border-0 text-xs mb-1.5">
                        Verified Organizer
                      </Badge>
                      <p className="text-xs text-gray-500">ID: ORG-2024-5847</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={onOpenSettings}>Account Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing & Plans</DropdownMenuItem>
                <DropdownMenuItem>Help Center</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-[#F08080]">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
