<template>
  <!--begin::Dashboard-->
  <Activity></Activity>
  <!--end::Dashboard-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Activity from "@/views/soccer/Activity.vue";

export default defineComponent({
  name: "main-dashboard",
  components: {
    Activity,
  },
});
</script>
