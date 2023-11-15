import { defineStore } from "pinia";

export const useEventsStore = defineStore("events", () => {
  const event = ref({});
  const events = ref([]);

  const getEvent = computed(() => event.value);
  const getEvents = computed(() => events.value);

  const fetchEvents = async () => {
    try {
      const { data, error } = await useFetch("http://localhost:3000/events");
      events.value = data.value;
    } catch (error) {
      console.error("Unexpected error in fetchEvents:", error);
    }
  };

  const fetchEvent = async (id) => {
    try {
      const { data, error } = await useFetch(`http://localhost:3000/events/${id}`);
      event.value = data.value;
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const addEvent = async () => {
    try {
      const newEvent = {
        id: Math.floor(Math.random() * 1000),
        user: {
          id: Math.floor(Math.random() * 1000),
          name: "John Doe",
        },
        category: "Meeting",
        title: "Team Meeting",
        description: "Discuss project updates",
        location: "Conference Room",
        date: "2023-11-10",
        time: "15:00",
        attendees: ["Alice", "Bob", "Charlie"],
      };

      const { data, error } = await useFetch("http://localhost:3000/events", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (error) {
        console.error("Error adding event:", error);
      } else {
        fetchEvents();
        navigateTo("/");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const updateEvent = async (id) => {
    try {
      const body = JSON.stringify({
        user: {
          id: Math.floor(Math.random() * 1000),
          name: "John Doe updated",
        },
        category: "Meeting",
        title: "Team Meeting updated",
        description: "Discuss project updates",
        location: "Conference Room",
        date: "2023-11-10",
        time: "15:00",
        attendees: ["Alice", "Bob", "Charlie"],
      });

      const { data, error } = await useFetch(`http://localhost:3000/events/${id}`, {
        method: "PATCH",
        body,
      });
      navigateTo("/");
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const { data, error } = await useFetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
      });

      events.value = events.value.filter((event) => event.id !== id);
      navigateTo("/");
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return {
    event,
    events,
    getEvent,
    getEvents,
    fetchEvent,
    fetchEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  };
});
