import { useState } from 'react';
import { Proposal } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { FileCheck, Info, AlertCircle } from 'lucide-react';

interface ProposalFormProps {
  onSubmit: (proposal: Omit<Proposal, 'id' | 'organizerName' | 'submittedDate' | 'status'>) => void;
  onCancel: () => void;
}

export function ProposalForm({ onSubmit, onCancel }: ProposalFormProps) {
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventDate: '',
    expectedAttendees: 50,
    venue: '',
    eventType: '',
    duration: '',
    budget: '',
    purpose: '',
    safetyMeasures: '',
    notes: ''
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      eventTitle: formData.eventTitle,
      eventDate: formData.eventDate,
      expectedAttendees: formData.expectedAttendees,
      venue: formData.venue,
      notes: `Type: ${formData.eventType} | Duration: ${formData.duration} | Budget: ${formData.budget} | Purpose: ${formData.purpose} | Safety: ${formData.safetyMeasures}${formData.notes ? ' | Additional: ' + formData.notes : ''}`
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Info Alert */}
      <Alert className="bg-[#7DF9FF]/10 border-[#7DF9FF]/30">
        <Info className="w-4 h-4 text-[#7DF9FF]" />
        <AlertDescription className="text-sm text-gray-900">
          Submit this proposal for authority review and approval. Processing typically takes 3-5 business days.
        </AlertDescription>
      </Alert>

      <div className="space-y-5">
        {/* Event Title */}
        <div>
          <Label htmlFor="eventTitle" className="text-sm text-gray-700 mb-1.5">Event Title *</Label>
          <Input
            id="eventTitle"
            value={formData.eventTitle}
            onChange={(e) => handleChange('eventTitle', e.target.value)}
            placeholder="Enter event title"
            className="mt-1.5"
            required
          />
        </div>

        {/* Event Date and Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="eventDate" className="text-sm text-gray-700 mb-1.5">Proposed Event Date *</Label>
            <Input
              id="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={(e) => handleChange('eventDate', e.target.value)}
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <Label htmlFor="duration" className="text-sm text-gray-700 mb-1.5">Event Duration *</Label>
            <Select 
              value={formData.duration} 
              onValueChange={(value) => handleChange('duration', value)}
            >
              <SelectTrigger id="duration" className="mt-1.5">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2 hours">1-2 hours</SelectItem>
                <SelectItem value="Half day">Half day (4 hours)</SelectItem>
                <SelectItem value="Full day">Full day (8 hours)</SelectItem>
                <SelectItem value="Multiple days">Multiple days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Venue */}
        <div>
          <Label htmlFor="venue" className="text-sm text-gray-700 mb-1.5">Venue/Location *</Label>
          <Input
            id="venue"
            value={formData.venue}
            onChange={(e) => handleChange('venue', e.target.value)}
            placeholder="Complete address or venue name"
            className="mt-1.5"
            required
          />
        </div>

        {/* Event Type and Expected Attendees */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="eventType" className="text-sm text-gray-700 mb-1.5">Event Type *</Label>
            <Select 
              value={formData.eventType} 
              onValueChange={(value) => handleChange('eventType', value)}
            >
              <SelectTrigger id="eventType" className="mt-1.5">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Conference">Conference</SelectItem>
                <SelectItem value="Workshop">Workshop</SelectItem>
                <SelectItem value="Festival">Festival</SelectItem>
                <SelectItem value="Exhibition">Exhibition</SelectItem>
                <SelectItem value="Concert">Concert</SelectItem>
                <SelectItem value="Seminar">Seminar</SelectItem>
                <SelectItem value="Community Event">Community Event</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="expectedAttendees" className="text-sm text-gray-700 mb-1.5">Expected Attendees *</Label>
            <Input
              id="expectedAttendees"
              type="number"
              min="1"
              value={formData.expectedAttendees}
              onChange={(e) => handleChange('expectedAttendees', parseInt(e.target.value) || 0)}
              className="mt-1.5"
              required
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <Label htmlFor="budget" className="text-sm text-gray-700 mb-1.5">Estimated Budget *</Label>
          <Select 
            value={formData.budget} 
            onValueChange={(value) => handleChange('budget', value)}
          >
            <SelectTrigger id="budget" className="mt-1.5">
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Under $5,000">Under $5,000</SelectItem>
              <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
              <SelectItem value="$10,000 - $25,000">$10,000 - $25,000</SelectItem>
              <SelectItem value="$25,000 - $50,000">$25,000 - $50,000</SelectItem>
              <SelectItem value="Over $50,000">Over $50,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Purpose */}
        <div>
          <Label htmlFor="purpose" className="text-sm text-gray-700 mb-1.5">Event Purpose & Objectives *</Label>
          <Textarea
            id="purpose"
            value={formData.purpose}
            onChange={(e) => handleChange('purpose', e.target.value)}
            placeholder="Describe the purpose, goals, and expected outcomes of this event"
            rows={3}
            className="mt-1.5"
            required
          />
        </div>

        {/* Safety Measures */}
        <div>
          <Label htmlFor="safetyMeasures" className="text-sm text-gray-700 mb-1.5">Safety & Security Plan *</Label>
          <Textarea
            id="safetyMeasures"
            value={formData.safetyMeasures}
            onChange={(e) => handleChange('safetyMeasures', e.target.value)}
            placeholder="Detail your safety protocols, security arrangements, crowd management, and emergency procedures"
            rows={3}
            className="mt-1.5"
            required
          />
        </div>

        {/* Additional Notes */}
        <div>
          <Label htmlFor="notes" className="text-sm text-gray-700 mb-1.5">Additional Information</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Any other relevant details for the reviewing authority"
            rows={2}
            className="mt-1.5"
          />
        </div>

        {/* Warning Alert */}
        <Alert className="bg-[#F4C2C2]/30 border-[#F08080]/30">
          <AlertCircle className="w-4 h-4 text-[#F08080]" />
          <AlertDescription className="text-sm text-gray-900">
            Required documents: Insurance certificate, detailed site plan, emergency evacuation plan, and relevant permits may be requested during review.
          </AlertDescription>
        </Alert>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel} className="px-6">
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-[#7DF9FF] to-[#4FC3F7] hover:from-[#6DE8EE] hover:to-[#3FB2E6] text-white px-6">
          <FileCheck className="w-4 h-4 mr-2" />
          Submit for Approval
        </Button>
      </div>
    </form>
  );
}
