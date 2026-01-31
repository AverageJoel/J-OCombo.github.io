# Add Event to J&O Combo Website

Add a new event to the Event Calendar on the index.html page.

## Instructions

1. Ask the user for event details:
   - Event type: one-time or recurring
   - Venue/event name
   - Date (specific date for one-time, or pattern like "every 2nd Sunday" for recurring)
   - Time (start and end)
   - Location (city, state)
   - Description (optional custom text)

2. Edit `index.html` and add the new event to the `<section class="posts">` inside the Event Calendar article.

3. Event HTML template for one-time events:
```html
<article style="text-align: center; max-width: 300px;">
  <header>
    <span class="date" style="font-size: 1.25em; font-weight: bold;">[DATE]</span>
    <h2>[EVENT NAME]</h2>
  </header>
  <p style="text-align: center;">[DESCRIPTION] at [VENUE] in [LOCATION].</p>
</article>
```

4. For recurring events with auto-calculated dates, use the JavaScript pattern with a unique ID.

5. Place new events AFTER the recurring Nirvana event (recurring event always comes first).

6. After adding, ask if user wants to commit and push the changes.
