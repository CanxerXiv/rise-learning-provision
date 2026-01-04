# Quick Fix: Add Event Fields Only

Since your database already has the base tables and policies, you only need to add the event fields. Run this simpler SQL in your Supabase SQL Editor:

```sql
-- Add event-specific fields to news_events table
ALTER TABLE public.news_events
ADD COLUMN IF NOT EXISTS event_date DATE,
ADD COLUMN IF NOT EXISTS event_time TEXT,
ADD COLUMN IF NOT EXISTS event_location TEXT;

-- Add comments to columns
COMMENT ON COLUMN public.news_events.event_date IS 'Date of the event (only for items with category=event)';
COMMENT ON COLUMN public.news_events.event_time IS 'Time of the event (only for items with category=event)';
COMMENT ON COLUMN public.news_events.event_location IS 'Location of the event (only for items with category=event)';
```

That's it! This will only add the three new columns without trying to recreate existing tables or policies.

After running this:
1. Refresh your browser
2. The event management features should work
3. You can create events with date, time, and location in the Admin dashboard
