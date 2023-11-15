<template>
  <NuxtLayout>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="#DBE1EC" viewBox="0 0 48 48">
        <path
          d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
        />
      </svg>

      <div class="title">
        {{ message }}
      </div>

      <p v-if="statusCode === 404">
        <nuxt-link to="/"> Return to home page </nuxt-link>
      </p>
    </div>
  </NuxtLayout>
</template>

<script setup>
const props = defineProps({
  error: Object,
  default: null,
});

const message = computed(() => {
  return props.error.message;
});

const statusCode = computed(() => {
  return (props.error && props.error.statusCode) || 500;
});

useHead({
  title: message.value,
  meta: [{ name: "description", content: "This is 404 page." }],
});
</script>
