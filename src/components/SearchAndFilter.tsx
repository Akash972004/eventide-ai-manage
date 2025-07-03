
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, List, Calendar } from 'lucide-react';
import { EventCategory, ViewType } from '@/lib/types';
import { eventCategories } from '@/lib/mock-data';

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: EventCategory | 'all';
  onCategoryChange: (value: EventCategory | 'all') => void;
  viewType: ViewType;
  onViewTypeChange: (value: ViewType) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  viewType,
  onViewTypeChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search events by title, description, or location..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {eventCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Discover Events</h2>
        
        <div className="flex items-center border rounded-lg">
          <Button
            variant={viewType === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewTypeChange('list')}
            className="rounded-r-none"
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
          <Button
            variant={viewType === 'calendar' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewTypeChange('calendar')}
            className="rounded-l-none"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};
