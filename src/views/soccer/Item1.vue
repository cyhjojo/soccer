<template>
  <!--begin::Timeline item-->
  <div class="timeline-item" >
    <!--begin::Timeline line-->
    <!-- <div class="timeline-line w-40px"></div> -->
    <!--end::Timeline line-->

    <!--begin::Timeline icon-->
    <!-- <div class="timeline-icon symbol symbol-circle symbol-40px me-4">
      <div class="symbol-label bg-light">
        <KTIcon icon-name="message-text-2" icon-class="fs-2 text-gray-500" />
      </div>
    </div> -->
    <!--end::Timeline icon-->

    <!--begin::Timeline content-->
    <div class="timeline-content mb-8 mt-n1">
      <!--begin::Timeline heading-->
      <div class="mb-3 d-flex justify-content-between">
        <div class="left d-flex">
          <!--begin::Title-->
          <div :class="`fs-5 fw-semobold text-${data?.color || 'success'}`">
            {{ data?.league }}
          </div>
          <!--begin::Description-->
          <div class="d-flex align-items-center ms-3">
            <!--begin::Info-->
            <div class="text-muted">{{ data?.event_time }}</div>
            <!--end::Info-->
          </div>
          <!--end::Description-->
          <!--end::Title-->
        </div>
        <!--begin::Action-->
        <a  class="btn btn-link p-0"
          ><i class="ki-duotone ki-entrance-left fs-2x">
            <span class="path1"></span>
            <span class="path2"></span> </i
        ></a>
        <!--end::Action-->
      </div>
      <!--end::Timeline heading-->

      <!--begin::Timeline details-->
      <div class="overflow-auto">
        <!--begin::Record-->
        <div
          class="d-flex align-items-center border border-dashed border-gray-300 rounded px-2 py-3 mb-2"
        >
          <!--begin::Title-->
          <a
            
            class="fs-5 text-dark text-hover-primary fw-semobold club text-end"
            >{{ data?.home_team }}</a
          >
          <!--end::Title-->
          <!--begin::Progress-->
          <div class="text-center vs">
            <span class="badge badge-light-primary">VS</span>
          </div>
          <!--end::Progress-->
          <!--begin::Title-->
          <a
            
            class="fs-5 text-dark text-hover-primary fw-semobold club"
            >{{ data?.away_team }}</a
          >
          <!--end::Title-->

          <!--begin::Action-->
          <!-- <a href="#" class="btn btn-sm btn-light btn-active-light-primary"
            >View</a
          > -->
          <!--end::Action-->
        </div>
        <!--end::Record-->
      </div>
      <!--end::Timeline details-->
    </div>
    <!--end::Timeline content-->
  </div>
  <!--end::Timeline item-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { spread } from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "item-1",
  props: {
    data: Object
  },
  components: {},
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
<style scoped lang="scss">
.vs {
  width: 75px;
}
.club {
  flex: calc((100% - 75px) / 2);
}
</style>
