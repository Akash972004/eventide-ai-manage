
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Calendar, MapPin } from 'lucide-react';
import { Event } from '@/lib/types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const categoryColors = {
  Technical: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Cultural: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Sports: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Social: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
};

export const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {format(new Date(event.date), 'MMM dd, yyyy • h:mm a')}
            </div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {event.title}
            </h3>
          </div>
          <Badge className={categoryColors[event.category]}>
            {event.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm line-clamp-3">
          {event.description}
        </p>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {event.location}
        </div>
        
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{event.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(event)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(event.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
