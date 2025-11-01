import { Event, Proposal } from '../App';
import { Card, CardContent } from './ui/card';
import { Calendar, Users, TrendingUp, FileCheck } from 'lucide-react';

interface StatsCardsProps {
  events: Event[];
  proposals: Proposal[];
}

export function StatsCards({ events, proposals }: StatsCardsProps) {
  const totalAttendees = events.reduce((sum, event) => sum + (event.attendees || 0), 0);
  const publishedEvents = events.filter(e => e.status === 'published').length;
  const approvedProposals = proposals.filter(p => p.status === 'approved').length;

  const stats = [
    {
      label: 'Total Events',
      value: events.length,
      icon: Calendar,
      color: 'text-[#7DF9FF]',
      bg: 'bg-gradient-to-br from-[#7DF9FF]/10 to-[#4FC3F7]/10',
      change: '+2 this month'
    },
    {
      label: 'Total Attendees',
      value: totalAttendees,
      icon: Users,
      color: 'text-[#F08080]',
      bg: 'bg-gradient-to-br from-[#F4C2C2]/30 to-[#F08080]/10',
      change: '+12% from last month'
    },
    {
      label: 'Published Events',
      value: publishedEvents,
      icon: TrendingUp,
      color: 'text-[#7DF9FF]',
      bg: 'bg-gradient-to-br from-[#7DF9FF]/10 to-[#F4C2C2]/10',
      change: `${publishedEvents} active`
    },
    {
      label: 'Approved Proposals',
      value: approvedProposals,
      icon: FileCheck,
      color: 'text-[#F08080]',
      bg: 'bg-gradient-to-br from-[#F4C2C2]/30 to-[#F08080]/10',
      change: `${proposals.filter(p => p.status === 'pending').length} pending`
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${stat.bg} rounded-lg border border-gray-100`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-2xl text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
