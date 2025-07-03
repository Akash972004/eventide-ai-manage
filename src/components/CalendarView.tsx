
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Event } from '@/lib/types';
import { EventCard } from './EventCard';
import { format } from 'date-fns';

interface CalendarViewProps {
  events: Event[];
  getEventsByDate: (date: Date) => Event[];
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  getEventsByDate,
  onEditEvent,
  onDeleteEvent,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const selectedDateEvents = getEventsByDate(selectedDate);
  
  // Get dates that have events
  const eventDates = events.map(event => new Date(event.date).toDateString());
  const hasEvent = (date: Date) => eventDates.includes(date.toDateString());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Event Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border-0"
              modifiers={{
                hasEvent: (date) => hasEvent(date),
              }}
              modifiersStyles={{
                hasEvent: {
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  borderRadius: '50%',
                  fontWeight: 'bold',
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>
              Events for {format(selectedDate, 'MMMM dd, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={onEditEvent}
                    onDelete={onDeleteEvent}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No events scheduled for this date.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
