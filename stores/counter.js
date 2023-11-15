// import { defineStore } from "pinia";

// export const useCounterStore = defineStore("counter", {
//   state: () => ({
//     count: 4,
//   }),
//   getters: {
//     getCount: (state) => state.count,
//   },
//   actions: {
//     increment() {
//       this.count++;
//     },
//   },
// });

import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(6);
  const getCount = computed(() => count.value);
  const getDoubleCount = computed(() => count.value * 2);
  const increment = () => (count.value += 1);

  return {
    count,
    getCount,
    getDoubleCount,
    increment,
  };
});
