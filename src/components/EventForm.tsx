import { useState, useEffect } from 'react';
import { Event } from '../App';
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
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { X, Sparkles, Loader2, Wand2, Info } from 'lucide-react';

interface EventFormProps {
  event?: Event | null;
  onSubmit: (event: Omit<Event, 'id' | 'attendees'>) => void;
  onCancel: () => void;
}

const categories = [
  'Technology',
  'Business',
  'Education',
  'Arts & Culture',
  'Sports & Fitness',
  'Food & Drink',
  'Music',
  'Health & Wellness',
  'Community',
  'Other'
];

export function EventForm({ event, onSubmit, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    mode: 'in-person' as Event['mode'],
    capacity: 50,
    category: '',
    status: 'draft' as Event['status'],
    proposalStatus: null as Event['proposalStatus']
  });

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        location: event.location,
        mode: event.mode,
        capacity: event.capacity,
        category: event.category,
        status: event.status,
        proposalStatus: event.proposalStatus || null
      });
      setTags(event.tags);
    }
  }, [event]);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const generateDescription = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const suggestions = {
        'Technology': `Join us for an immersive ${formData.title || 'technology event'} designed to bring together innovators, developers, and tech enthusiasts. This ${formData.mode} event will feature cutting-edge demonstrations, expert-led sessions, and unparalleled networking opportunities. Whether you're a seasoned professional or just starting your journey, you'll gain valuable insights into the latest trends and technologies shaping our digital future.`,
        
        'Business': `Discover new opportunities at ${formData.title || 'our business event'}, where industry leaders and entrepreneurs converge to share insights and forge meaningful connections. This ${formData.mode} gathering offers a unique platform for professionals to exchange ideas, explore innovative business strategies, and build lasting partnerships.`,
        
        'Education': `Transform your learning journey at ${formData.title || 'this educational event'}, offering comprehensive training and skill development opportunities. This ${formData.mode} program combines expert instruction with hands-on practice, ensuring participants gain practical knowledge they can apply immediately.`,
        
        'Arts & Culture': `Immerse yourself in creativity at ${formData.title || 'this cultural celebration'}, showcasing diverse artistic expressions and cultural heritage. This ${formData.mode} event brings together artists, performers, and culture enthusiasts in a vibrant celebration of human creativity.`,
        
        'default': `Experience ${formData.title || 'an exceptional event'} that brings people together for meaningful engagement and shared experiences. This ${formData.mode} gathering is thoughtfully designed to deliver value, foster connections, and create lasting memories.`
      };

      const description = suggestions[formData.category as keyof typeof suggestions] || suggestions.default;
      setAiSuggestion(description);
      setIsGenerating(false);
    }, 2000);
  };

  const applyAISuggestion = () => {
    setFormData(prev => ({ ...prev, description: aiSuggestion }));
    setAiSuggestion('');
  };

  const enhanceDescription = () => {
    if (!formData.description) {
      generateDescription();
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const enhanced = formData.description + 
        `\n\nWhat to Expect:\n• Engaging presentations from industry experts\n• Interactive Q&A sessions\n• Networking opportunities with peers\n• Practical takeaways you can implement immediately\n\nDon't miss this opportunity to be part of something extraordinary!`;
      
      setAiSuggestion(enhanced);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-5">
        {/* Event Title */}
        <div>
          <Label htmlFor="title" className="text-sm text-gray-700 mb-1.5">Event Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter a compelling event title"
            className="mt-1.5"
            required
          />
        </div>

        {/* AI Description Generator */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label htmlFor="description" className="text-sm text-gray-700">Description *</Label>
            <div className="flex gap-2">
              {formData.description && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={enhanceDescription}
                  disabled={isGenerating}
                  className="text-xs h-7 border-[#7DF9FF]/30 text-[#7DF9FF] hover:bg-[#7DF9FF]/10"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-3 h-3 mr-1.5" />
                      Enhance with AI
                    </>
                  )}
                </Button>
              )}
              {!formData.description && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateDescription}
                  disabled={isGenerating || !formData.title || !formData.category}
                  className="text-xs h-7 border-[#7DF9FF]/30 text-[#7DF9FF] hover:bg-[#7DF9FF]/10"
                >
                  {isGenerating ? (
                    <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3 mr-1.5" />
                  )}
                  Generate with AI
                </Button>
              )}
            </div>
          </div>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Provide a detailed description of your event"
            rows={5}
            className="mt-1.5"
            required
          />
          <p className="text-xs text-gray-500 mt-1.5">
            Use AI to generate or enhance your event description
          </p>
        </div>

        {/* AI Suggestion Alert */}
        {aiSuggestion && (
          <Alert className="bg-gradient-to-r from-[#7DF9FF]/10 to-[#F4C2C2]/20 border-[#7DF9FF]/30">
            <Sparkles className="w-4 h-4 text-[#7DF9FF]" />
            <AlertDescription>
              <div className="space-y-3">
                <p className="text-sm text-gray-900">AI-Generated Suggestion:</p>
                <div className="bg-white rounded-lg p-3 border border-[#7DF9FF]/20">
                  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{aiSuggestion}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={applyAISuggestion}
                    className="bg-gradient-to-r from-[#7DF9FF] to-[#4FC3F7] hover:from-[#6DE8EE] hover:to-[#3FB2E6] text-white h-8"
                  >
                    Use This Description
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setAiSuggestion('')}
                    className="h-8"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date" className="text-sm text-gray-700 mb-1.5">Event Date *</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="mt-1.5"
              required
            />
          </div>
          <div>
            <Label htmlFor="time" className="text-sm text-gray-700 mb-1.5">Start Time *</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="mt-1.5"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-sm text-gray-700 mb-1.5">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Venue address or online platform"
            className="mt-1.5"
            required
          />
        </div>

        {/* Mode and Capacity */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="mode" className="text-sm text-gray-700 mb-1.5">Event Mode *</Label>
            <Select 
              value={formData.mode} 
              onValueChange={(value: Event['mode']) => handleChange('mode', value)}
            >
              <SelectTrigger id="mode" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-person">In-Person</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="capacity" className="text-sm text-gray-700 mb-1.5">Maximum Capacity *</Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              value={formData.capacity}
              onChange={(e) => handleChange('capacity', parseInt(e.target.value) || 0)}
              className="mt-1.5"
              required
            />
          </div>
        </div>

        {/* Category and Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category" className="text-sm text-gray-700 mb-1.5">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleChange('category', value)}
            >
              <SelectTrigger id="category" className="mt-1.5">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status" className="text-sm text-gray-700 mb-1.5">Publication Status *</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: Event['status']) => handleChange('status', value)}
            >
              <SelectTrigger id="status" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <Label htmlFor="tags" className="text-sm text-gray-700 mb-1.5">Tags & Keywords</Label>
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type a tag and press Enter"
            className="mt-1.5"
          />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 gap-1.5 px-2.5 py-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1.5">
            Add relevant tags to help attendees discover your event
          </p>
        </div>

        {/* Info Alert */}
        <Alert className="bg-[#7DF9FF]/10 border-[#7DF9FF]/30">
          <Info className="w-4 h-4 text-[#7DF9FF]" />
          <AlertDescription className="text-sm text-gray-900">
            Events requiring venue permissions should be submitted through the Proposals tab for authority approval.
          </AlertDescription>
        </Alert>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">
        <Button type="button" variant="outline" onClick={onCancel} className="px-6">
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-[#7DF9FF] to-[#4FC3F7] hover:from-[#6DE8EE] hover:to-[#3FB2E6] text-white px-6">
          {event ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
}
