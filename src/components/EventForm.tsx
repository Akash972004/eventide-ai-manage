
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Sparkles, X } from 'lucide-react';
import { format } from 'date-fns';
import { Event, EventCategory } from '@/lib/types';
import { eventCategories } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editingEvent?: Event | null;
}

// Mock AI tag generation
const generateAITags = async (description: string): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const tagSuggestions: { [key: string]: string[] } = {
    'react': ['React', 'JavaScript', 'Frontend', 'Development'],
    'music': ['Music', 'Entertainment', 'Arts', 'Performance'],
    'basketball': ['Basketball', 'Sports', 'Tournament', 'Competition'],
    'networking': ['Networking', 'Professional', 'Business', 'Career'],
    'ai': ['AI', 'Machine Learning', 'Technology', 'Innovation'],
    'art': ['Art', 'Creative', 'Exhibition', 'Visual Arts'],
    'conference': ['Conference', 'Learning', 'Education', 'Industry'],
    'workshop': ['Workshop', 'Hands-on', 'Training', 'Skills'],
  };
  
  const lowerDescription = description.toLowerCase();
  const tags: string[] = [];
  
  Object.entries(tagSuggestions).forEach(([keyword, keywordTags]) => {
    if (lowerDescription.includes(keyword)) {
      tags.push(...keywordTags);
    }
  });
  
  // Add some generic tags based on common words
  if (lowerDescription.includes('learn')) tags.push('Education');
  if (lowerDescription.includes('community')) tags.push('Community');
  if (lowerDescription.includes('fun')) tags.push('Entertainment');
  if (lowerDescription.includes('professional')) tags.push('Professional');
  
  // Remove duplicates and return max 5 tags
  return [...new Set(tags)].slice(0, 5);
};

export const EventForm: React.FC<EventFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingEvent,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date(),
    location: '',
    category: '' as EventCategory,
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title,
        description: editingEvent.description,
        date: new Date(editingEvent.date),
        location: editingEvent.location,
        category: editingEvent.category,
        tags: editingEvent.tags,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        date: new Date(),
        location: '',
        category: '' as EventCategory,
        tags: [],
      });
    }
    setTagInput('');
  }, [editingEvent, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.location || !formData.category) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formData);
    onClose();
    toast({
      title: editingEvent ? "Event Updated" : "Event Created",
      description: `${formData.title} has been ${editingEvent ? 'updated' : 'created'} successfully.`,
    });
  };

  const handleGenerateTags = async () => {
    if (!formData.description.trim()) {
      toast({
        title: "Description Required",
        description: "Please add a description before generating tags.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingTags(true);
    try {
      const generatedTags = await generateAITags(formData.description);
      setFormData(prev => ({
        ...prev,
        tags: [...new Set([...prev.tags, ...generatedTags])],
      }));
      toast({
        title: "Tags Generated",
        description: `Generated ${generatedTags.length} relevant tags using AI.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate tags. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingTags(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingEvent ? 'Edit Event' : 'Create New Event'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter event title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your event"
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Event Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && setFormData(prev => ({ ...prev, date }))}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as EventCategory }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {eventCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Event location"
              required
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Tags</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGenerateTags}
                disabled={isGeneratingTags}
                className="text-primary"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {isGeneratingTags ? 'Generating...' : 'Generate with AI'}
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tags"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {editingEvent ? 'Update Event' : 'Create Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
