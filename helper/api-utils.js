export async function getAllEvents() {
    const response = await fetch("https://nextjs-datafetching-54daf-default-rtdb.firebaseio.com/events.json");
    const data = await response.json();
    
    let events = [];
    for( let key in data) {
        events.push({
            id: key,
            ...data[key],
        });
    }
    return events;
}

export async function getFeaturedEvents() {
    const data = await getAllEvents();
    const featuredEvents = data.filter(key => key.isFeatured === true);
    return featuredEvents;
}

export async function getEventById(id) {
    const data = await getAllEvents();
    const event = data.filter(event => event.id === id);
    return event;
}

export async function getEventPaths() {
    const data = await getAllEvents();
    const paths = data.map(event => event.id)
    console.log("From api-utils", paths)
    return paths;
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;
    const events = await getAllEvents();
    let filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
  }