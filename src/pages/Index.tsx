
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { EventCard } from '@/components/EventCard';
import { CalendarView } from '@/components/CalendarView';
import { EventForm } from '@/components/EventForm';
import { useEvents } from '@/hooks/useEvents';
import { Event, ViewType } from '@/lib/types';

const Index = () => {
  const {
    events,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsByDate,
  } = useEvents();

  const [viewType, setViewType] = useState<ViewType>('list');
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setIsEventFormOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsEventFormOpen(true);
  };

  const handleFormSubmit = (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
    } else {
      addEvent(eventData);
    }
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCreateEvent={handleCreateEvent} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          viewType={viewType}
          onViewTypeChange={setViewType}
        />
        
        {viewType === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onEdit={handleEditEvent}
                  onDelete={handleDeleteEvent}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-muted-foreground">
                  <p className="text-lg mb-2">No events found</p>
                  <p>Try adjusting your search or create a new event!</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <CalendarView
            events={events}
            getEventsByDate={getEventsByDate}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        )}
      </main>
      
      <EventForm
        isOpen={isEventFormOpen}
        onClose={() => setIsEventFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingEvent={editingEvent}
      />
    </div>
  );
};

export default Index;
