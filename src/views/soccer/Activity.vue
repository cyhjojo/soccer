<template>
  <!--begin::Timeline-->
  <div></div>
  <div class="card">
    <!--begin::Card head-->
    <div class="card-header card-header-center px-3">
      <!--begin::Title-->
      <div class="card-title d-flex align-items-center">
        <KTIcon
          icon-name="calendar-8"
          icon-class="fs-1 text-primary me-3 lh-0"
        />

        <h3 class="fw-bold m-0 text-gray-800">即时</h3>
      </div>
      <!--end::Title-->

      <!--begin::Toolbar-->
      <div class="card-toolbar m-0">
        <el-checkbox-group v-model="stage">
          <el-checkbox-button :key="1" :value="1" :label="1">
            初
          </el-checkbox-button>
          <el-checkbox-button :key="2" :value="2" :label="2">
            即
          </el-checkbox-button>
        </el-checkbox-group>
        <a
          class="btn btn-sm btn-light-primary ms-2"
          @click="search"
          v-loading.fullscreen.lock="fullscreenLoading"
          >搜索</a
        >
        <!--begin::Tab nav-->
        <ul
          class="nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0 fw-bold d-none"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <a
              id="kt_activity_today_tab"
              class="nav-link justify-content-center text-active-gray-800 active"
              data-bs-toggle="tab"
              role="tab"
              href="#kt_activity_today"
            >
              Today
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a
              id="kt_activity_week_tab"
              class="nav-link justify-content-center text-active-gray-800"
              data-bs-toggle="tab"
              role="tab"
              href="#kt_activity_week"
            >
              Week
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a
              id="kt_activity_month_tab"
              class="nav-link justify-content-center text-active-gray-800"
              data-bs-toggle="tab"
              role="tab"
              href="#kt_activity_month"
            >
              Month
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a
              id="kt_activity_year_tab"
              class="nav-link justify-content-center text-active-gray-800 text-hover-gray-800"
              data-bs-toggle="tab"
              role="tab"
              href="#kt_activity_year"
            >
              2021
            </a>
          </li>
        </ul>
        <!--end::Tab nav-->
      </div>
      <!--end::Toolbar-->
    </div>
    <!--end::Card head-->

    <!--begin::Card body-->
    <div class="card-body px-3">
      <!--begin::Tab Content-->
      <div class="tab-content">
        <!--begin::Tab panel-->
        <div
          id="kt_activity_today"
          class="card-body p-0 tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="kt_activity_today_tab"
        >
          <!--begin::Timeline-->
          <div class="timeline">
            <template v-for="li in list" v-bind:key="li?._id">
              <KTActivityItem1 :data="li" @click="view(li)"></KTActivityItem1>
            </template>
            <el-empty description="暂无数据" v-if="!list.length" />
          </div>
          <!--end::Timeline-->
        </div>
        <!--end::Tab panel-->
      </div>
      <!--end::Tab Content-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Timeline-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted } from "vue";
import KTActivityItem1 from "@/views/soccer/Item1.vue";
import { commonStore } from "@/stores/common";

export default defineComponent({
  name: "profile-activity",
  components: {
    KTActivityItem1,
  },
  setup() {
    const fullscreenLoading = ref(false);
    const store = commonStore();
    const list = ref([]);
    const stage = ref([1]);
    let bak = {};

    onMounted(() => {
      bak = JSON.parse(localStorage.getItem("stage") || "{}");
    });

    const init = (params?) => {
      const stage = params?.stage || 0;
      if (bak[stage] && new Date().getTime() - bak[stage]?.time <= 120000) {
        console.log(new Date().getTime() - bak[stage]?.time);
        list.value = bak[stage]?.list;
        fullscreenLoading.value = false;
        return;
      }
      store
        .fetchMatches(params)
        .then((res) => {
          console.log(res);
          list.value = res;
          if (res.length) {
            bak[stage] = { time: new Date().getTime(), list: list.value };
            localStorage.setItem("stage", JSON.stringify(bak));
          }

          fullscreenLoading.value = false;
        })
        .catch((err) => {
          fullscreenLoading.value = false;
        });
    };
    const view = (data) => {
      console.log(data);
      localStorage.setItem("soccer-detail", JSON.stringify(data));
      // router.push({ name: "detail", query: { match_id: data?.match_id } });
      // window.open(`#/detail?match_id=${data?.match_id}`);
      window.open(`https://m.titan007.com/asian/${data?.match_id}.htm`);
    };

    const onStageChange = (e) => {
      console.log(e);
      const sum = e?.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      let params;
      if (sum) {
        params = { stage: sum };
        init(params);
      } else {
        init();
      }
    };

    const search = () => {
      if (fullscreenLoading.value) {
        return;
      }
      fullscreenLoading.value = true;
      onStageChange(stage.value);
    };
    return {
      fullscreenLoading,
      search,
      list,
      view,
      getAssetPath,
      stage,
      onStageChange,
    };
  },
});
</script>
<style lang="scss">
.timeline {
  min-height: 50ch;
}
</style>
