<template>
  <div>
    <div class="btns">
      <button class="action-button" @click="updateEvent(id)">Update Event</button>
      <button class="action-button" @click="deleteEvent(id)">Delete Event</button>
    </div>
    <div class="event-header">
      <span class="eyebrow"> @{{ event.time }} on {{ event.date }} </span>
      <h1 class="title">
        {{ event.title }}
      </h1>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <span name="map">
      <h2>Location</h2>
    </span>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>
      Attendees
      <span class="badge -fill-gradient">
        {{ event.attendees ? event.attendees.length : 0 }}
      </span>
    </h2>
    <ul class="list-group">
      <li v-for="(attendee, index) in event.attendees" :key="index" class="list-item">
        <b>{{ attendee }}</b>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useEventsStore } from "@/stores/events";

const route = useRoute();

const id = computed(() => {
  return route.params.id;
});

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id);

// const { data: event, error } = await useAsyncData("event", () => $fetch("http://localhost:3000/events/" + id.value));
// if (!event.value) {
//   throw createError({ statusCode: 503, statusMessage: "Unable to fetch event #" + id.value, fatal: true });
// }

const store = useEventsStore();
console.log(store);

const { event } = storeToRefs(store);

const { fetchEvent, updateEvent, deleteEvent } = store;

await fetchEvent(id.value);

useHead({
  title: event.value.title + " #" + id.value,
  meta: [{ hid: "description", name: "description", content: "What you need to know about Event #" + id.value }],
});
</script>

<style scoped>
.prompt-box {
  position: relative;
  overflow: hidden;
  padding: 1em;
  margin-bottom: 24px;
  transform: scaleY(1);
}
.prompt-box > .title {
  margin: 0 0 0.5em;
}
.prompt-box > .title > .meta {
  margin-left: 10px;
}
.prompt-box > .actions {
  display: flex;
  align-items: center;
}
.prompt-box > button {
  margin-right: 0.5em;
}
.prompt-box > button:last-of-type {
  margin-right: 0;
}
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
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
