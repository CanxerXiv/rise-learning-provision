-- Add event-specific fields to news_events table
ALTER TABLE news_events
ADD COLUMN IF NOT EXISTS event_date DATE,
ADD COLUMN IF NOT EXISTS event_time TEXT,
ADD COLUMN IF NOT EXISTS event_location TEXT;

-- Add comment to columns
COMMENT ON COLUMN news_events.event_date IS 'Date of the event (only for items with category=event)';
COMMENT ON COLUMN news_events.event_time IS 'Time of the event (only for items with category=event)';
COMMENT ON COLUMN news_events.event_location IS 'Location of the event (only for items with category=event)';
