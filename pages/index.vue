<template>
  <div>
    <h1>Events</h1>
    <div class="btns">
      <button class="action-button" @click="addEvent">Add Event</button>
    </div>
    <EventCard v-for="(event, index) in events" :key="index" :event="event" :data-index="index" />
  </div>
</template>

<script setup>
import { useEventsStore } from "@/stores/events";

useHead({
  title: "My Events",
  meta: [{ name: "description", content: "My amazing events site." }],
});

const store = useEventsStore();

// const events = computed(() => store.events);
const { events } = storeToRefs(store);

const { fetchEvents, addEvent, updateEvent, deleteEvent } = store;

await fetchEvents();

// const { data: events, error } = await useAsyncData("events", () => $fetch("http://localhost:3000/events"));
</script>

<style scoped>
.btns {
  margin-bottom: 40px;
}
.action-button {
  margin-right: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.action-button:hover {
  background-color: #45a049;
}
</style>
