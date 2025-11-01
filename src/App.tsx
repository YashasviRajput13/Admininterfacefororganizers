import { useState } from 'react';
import { Header } from './components/Header';
import { EventList } from './components/EventList';
import { EventForm } from './components/EventForm';
import { ProposalForm } from './components/ProposalForm';
import { AIRecommendations } from './components/AIRecommendations';
import { VerifiedProfile } from './components/VerifiedProfile';
import { StatsCards } from './components/StatsCards';
import { NotificationsPanel } from './components/NotificationsPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { Button } from './components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { PlusCircle, FileText, Calendar } from 'lucide-react';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  mode: 'in-person' | 'virtual' | 'hybrid';
  capacity: number;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'cancelled';
  attendees?: number;
  proposalStatus?: 'approved' | 'pending' | 'rejected' | null;
}

export interface Proposal {
  id: string;
  eventTitle: string;
  organizerName: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  eventDate: string;
  expectedAttendees: number;
  venue: string;
  notes?: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Annual technology conference featuring industry leaders',
    date: '2025-11-15',
    time: '09:00',
    location: 'Convention Center, San Francisco',
    mode: 'hybrid',
    capacity: 500,
    category: 'Technology',
    tags: ['conference', 'networking', 'tech'],
    status: 'published',
    attendees: 247,
    proposalStatus: 'approved'
  },
  {
    id: '2',
    title: 'Web Development Workshop',
    description: 'Hands-on workshop for learning modern web development',
    date: '2025-11-08',
    time: '14:00',
    location: 'Online via Zoom',
    mode: 'virtual',
    capacity: 100,
    category: 'Education',
    tags: ['workshop', 'coding', 'web-dev'],
    status: 'published',
    attendees: 78,
    proposalStatus: 'approved'
  },
  {
    id: '3',
    title: 'Startup Pitch Night',
    description: 'Evening event for startups to pitch their ideas to investors',
    date: '2025-11-20',
    time: '18:00',
    location: 'Innovation Hub, Austin',
    mode: 'in-person',
    capacity: 150,
    category: 'Business',
    tags: ['startup', 'pitch', 'investment'],
    status: 'draft',
    attendees: 0,
    proposalStatus: 'pending'
  }
];

const mockProposals: Proposal[] = [
  {
    id: '1',
    eventTitle: 'Tech Conference 2025',
    organizerName: 'Sarah Johnson',
    submittedDate: '2025-10-01',
    status: 'approved',
    eventDate: '2025-11-15',
    expectedAttendees: 500,
    venue: 'Convention Center, San Francisco',
    notes: 'Annual event with confirmed sponsors'
  },
  {
    id: '2',
    eventTitle: 'Community Art Exhibition',
    organizerName: 'Sarah Johnson',
    submittedDate: '2025-10-25',
    status: 'pending',
    eventDate: '2025-12-05',
    expectedAttendees: 200,
    venue: 'City Art Gallery',
    notes: 'Showcasing local artists'
  }
];

export default function App() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState('events');

  const handleCreateEvent = (eventData: Omit<Event, 'id' | 'attendees'>) => {
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
      attendees: 0
    };
    setEvents([newEvent, ...events]);
    setIsEventDialogOpen(false);
  };

  const handleUpdateEvent = (eventData: Omit<Event, 'id' | 'attendees'>) => {
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...eventData, id: event.id, attendees: event.attendees }
          : event
      ));
      setEditingEvent(null);
      setIsEventDialogOpen(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleDuplicate = (event: Event) => {
    const duplicatedEvent: Event = {
      ...event,
      id: Date.now().toString(),
      title: `${event.title} (Copy)`,
      status: 'draft',
      attendees: 0,
      proposalStatus: null
    };
    setEvents([duplicatedEvent, ...events]);
  };

  const handleEventDialogClose = () => {
    setIsEventDialogOpen(false);
    setEditingEvent(null);
  };

  const handleSubmitProposal = (proposalData: Omit<Proposal, 'id' | 'organizerName' | 'submittedDate' | 'status'>) => {
    const newProposal: Proposal = {
      ...proposalData,
      id: Date.now().toString(),
      organizerName: 'Sarah Johnson',
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setProposals([newProposal, ...proposals]);
    setIsProposalDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile and Stats Section */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
          <div className="xl:col-span-8">
            <VerifiedProfile />
          </div>
          <div className="xl:col-span-4">
            <AIRecommendations events={events} />
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards events={events} proposals={proposals} />

        {/* Main Content */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-gray-900 mb-1">Event Management</h2>
                  <p className="text-sm text-gray-500">
                    {activeTab === 'events' 
                      ? 'Manage and track all your events'
                      : 'Track authority approval requests'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <TabsList className="bg-gray-100">
                    <TabsTrigger value="events" className="data-[state=active]:bg-white">
                      <Calendar className="w-4 h-4 mr-2" />
                      Events
                    </TabsTrigger>
                    <TabsTrigger value="proposals" className="data-[state=active]:bg-white">
                      <FileText className="w-4 h-4 mr-2" />
                      Proposals
                    </TabsTrigger>
                  </TabsList>
                  <div className="h-8 w-px bg-gray-200"></div>
                  {activeTab === 'events' ? (
                    <Button 
                      onClick={() => setIsEventDialogOpen(true)}
                      className="bg-gradient-to-r from-[#7DF9FF] to-[#4FC3F7] hover:from-[#6DE8EE] hover:to-[#3FB2E6] text-white"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setIsProposalDialogOpen(true)}
                      variant="outline"
                      className="border-[#7DF9FF] text-[#7DF9FF] hover:bg-[#7DF9FF]/10"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      New Proposal
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <TabsContent value="events" className="mt-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <EventList 
                  events={events}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                />
              </div>
            </TabsContent>

            <TabsContent value="proposals" className="mt-6">
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="p-6">
                  <div className="space-y-4">
                    {proposals.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-16 h-16 bg-[#7DF9FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="w-8 h-8 text-[#7DF9FF]" />
                        </div>
                        <h3 className="text-gray-900 mb-2">No proposals yet</h3>
                        <p className="text-gray-500 mb-6">Submit your first proposal to get started</p>
                        <Button 
                          onClick={() => setIsProposalDialogOpen(true)}
                          className="bg-gradient-to-r from-[#7DF9FF] to-[#4FC3F7] hover:from-[#6DE8EE] hover:to-[#3FB2E6] text-white"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Submit Proposal
                        </Button>
                      </div>
                    ) : (
                      proposals.map((proposal) => (
                        <div 
                          key={proposal.id}
                          className="border border-gray-200 rounded-lg p-6 hover:border-[#7DF9FF] hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-gray-900 mb-1">{proposal.eventTitle}</h3>
                              <p className="text-sm text-gray-500">Submitted {new Date(proposal.submittedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                            <div>
                              {proposal.status === 'approved' && (
                                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-[#7DF9FF]/10 text-[#7DF9FF] border border-[#7DF9FF]/30">
                                  Approved
                                </span>
                              )}
                              {proposal.status === 'pending' && (
                                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-[#F4C2C2]/50 text-[#F08080] border border-[#F08080]/30">
                                  Pending Review
                                </span>
                              )}
                              {proposal.status === 'rejected' && (
                                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200">
                                  Rejected
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Event Date</p>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <p className="text-sm text-gray-900">{new Date(proposal.eventDate).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Venue</p>
                              <p className="text-sm text-gray-900 truncate">{proposal.venue}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Expected Attendees</p>
                              <p className="text-sm text-gray-900">{proposal.expectedAttendees}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Status</p>
                              <p className="text-sm text-gray-900 capitalize">{proposal.status}</p>
                            </div>
                          </div>
                          {proposal.notes && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <p className="text-sm text-gray-600">{proposal.notes}</p>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={isEventDialogOpen} onOpenChange={handleEventDialogClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </DialogTitle>
          </DialogHeader>
          <EventForm 
            event={editingEvent}
            onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
            onCancel={handleEventDialogClose}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isProposalDialogOpen} onOpenChange={setIsProposalDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit Event Proposal to Authority</DialogTitle>
          </DialogHeader>
          <ProposalForm 
            onSubmit={handleSubmitProposal}
            onCancel={() => setIsProposalDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <NotificationsPanel 
        open={isNotificationsOpen}
        onOpenChange={setIsNotificationsOpen}
      />

      <SettingsPanel 
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </div>
  );
}
