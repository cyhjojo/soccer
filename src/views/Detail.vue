<template>
  <!--begin::Layout Builder Notice-->
  <div class="card mb-10">
    <div class="card-body d-flex align-items-center py-8 px-3">
      <div class="club text-end">{{ detail?.home_team }}</div>
      <div class="vs">
        <span class="badge badge-light-primary fs-3x">VS</span><br />
        <span
          class="badge badge-light-secondary fs-1x mt-1"
          v-if="detail?.score !== '-'"
          >{{ detail?.score }}</span
        >
      </div>
      <div class="club">{{ detail?.away_team }}</div>
    </div>
  </div>
  <!--end::Layout Builder Notice-->

  <div class="card mb-10">
    <!--begin::Header-->
    <div class="card-header card-header-stretch px-3">
      <ul
        class="nav nav-stretch nav-line-tabs fw-semobold border-0"
        role="tablist"
        id="kt_layout_builder_tabs"
        ref="kt_layout_builder_tabs"
      >
        <li class="nav-item">
          <a
            class="nav-link cursor-pointer"
            :class="{ active: tabIndex === 0 }"
            data-bs-toggle="tab"
            @click="setActiveTab($event)"
            data-tab-index="0"
            role="tab"
          >
            让球
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link cursor-pointer"
            :class="{ active: tabIndex === 1 }"
            data-bs-toggle="tab"
            @click="setActiveTab($event)"
            data-tab-index="1"
            role="tab"
          >
            胜平负
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link cursor-pointer"
            :class="{ active: tabIndex === 2 }"
            data-bs-toggle="tab"
            @click="setActiveTab($event)"
            data-tab-index="2"
            role="tab"
          >
            进球数
          </a>
        </li>
      </ul>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body px-0 pt-0">
      <div class="tab-content p-0" id="kt_tabs">
        <div
          class="tab-pane"
          :class="{ active: tabIndex === 0 }"
          id="kt_builder_main"
        >
          <!-- <div class="table-header">
            <div class="w-75px w-md-200px">
              <el-select v-model="selectVal" placeholder="Select" class="w-100">
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
            <div class="th">
              <span>
                初<i class="ki-duotone ki-arrow-up">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div class="th">
              <span>
                即<i class="ki-duotone ki-arrow-up">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
          </div>
          <div class="d-flex">
            <ul
              class="nav nav-tabs nav-pills border-0 flex-column mb-3 mb-md-0 fs-6"
            >
              <li
                class="nav-item w-75px w-md-200px me-0"
                v-for="(li, idx) in list1"
              >
                <a
                  class="nav-link btn btn-active-light-primary px-0"
                  :class="{ active: idx === 0 }"
                  data-bs-toggle="tab"
                  :href="`#kt_vtab_pane_${idx}`"
                  >{{ li.name }}</a
                >
              </li>
            </ul>
            <ul class="nav flex-column mb-3 mb-md-0 fs-6 table-content">
              <template v-for="(li, idx) in list1">
                <template v-for="(s, sidx) in li?.spreads">
                  <li class="nav-item" v-if="!sidx">
                    <div>{{ s?.begin_score.home_team }}</div>
                    <div>{{ s?.begin_score.spreads }}</div>
                    <div>{{ s?.begin_score.away_team }}</div>
                    <div>{{ s?.end_score.home_team }}</div>
                    <div>{{ s?.end_score.spreads }}</div>
                    <div>{{ s?.end_score.away_team }}</div>
                  </li>
                </template>
              </template>

  
            </ul>
          </div> -->

          <el-table
            :data="list1"
            style="width: 100%"
            row-key="_id"
            :row-class-name="tableRowClassName"
            @sort-change="onSort"
          >
            <el-table-column
              prop="company_name"
              label="公司"
              width="120"
              fixed="left"
              align="center"
            >
              <template #default="scope">
                <span style="margin-left: 10px" v-if="scope.row.company_name">{{
                  scope.row.company_name
                }}</span>
                <span v-else
                  ><el-tag>{{ scope.row.multiple_spreads }}</el-tag></span
                >
              </template>
            </el-table-column>
            <el-table-column
              label="初"
              sortable
              align="center"
              prop="begin_score.spreads"
            >
              <el-table-column
                prop="begin_score.home_team"
                label="主"
                align="center"
              />
              <el-table-column
                prop="begin_score.spreads"
                label="盘"
                align="center"
              />
              <el-table-column
                prop="begin_score.away_team"
                label="客"
                align="center"
              />
            </el-table-column>
            <el-table-column
              label="即"
              sortable
              align="center"
              prop="end_score.spreads"
            >
              <el-table-column
                prop="end_score.home_team"
                label="主"
                align="center"
              />
              <el-table-column
                prop="end_score.spreads"
                label="盘"
                align="center"
              />
              <el-table-column
                prop="end_score.away_team"
                label="客"
                align="center"
              />
            </el-table-column>
          </el-table>
          <el-table
            :data="list1Statistics"
            style="width: 100%"
            :show-header="false"
            row-class-name="yellow-row"
            border
          >
            <el-table-column
              prop="title"
              width="120"
              fixed="left"
              align="center"
            />
            <el-table-column label="初">
              <el-table-column prop="begin_home" label="主" align="center" />
              <el-table-column prop="begin_spreads" label="盘" align="center" />
              <el-table-column prop="begin_away" label="客" align="center" />
            </el-table-column>
            <el-table-column label="即">
              <el-table-column prop="end_home" label="主" align="center" />
              <el-table-column prop="end_spreads" label="盘" align="center" />
              <el-table-column prop="end_away" label="客" align="center" />
            </el-table-column>
          </el-table>
        </div>

        <div
          class="tab-pane"
          :class="{ active: tabIndex === 1 }"
          id="kt_builder_header"
        >
          <div class="table-header">
            <div
              class="w-150px w-md-200px"
              style="height: 40px; line-height: 40px; text-align: center"
            >
              公司筛选
            </div>
            <div class="th">
              <span> 主胜 </span>
            </div>
            <div class="th">
              <span> 平局 </span>
            </div>
            <div class="th">
              <span> 客胜 </span>
            </div>
          </div>
          <div class="d-flex">
            <ul
              class="nav nav-tabs nav-pills border-0 flex-column mb-3 mb-md-0 fs-6"
            >
              <li class="nav-item w-150px w-md-200px me-0">
                <a
                  class="nav-link active btn btn-active-light-primary px-0"
                  data-bs-toggle="tab"
                  href="#kt_vtab_pane_1"
                  >36*</a
                >
              </li>
              <li class="nav-item w-150px w-md-200px me-0">
                <a
                  class="nav-link btn btn-active-light-primary px-0"
                  data-bs-toggle="tab"
                  href="#kt_vtab_pane_2"
                  >Crow*</a
                >
              </li>
              <li class="nav-item w-150px w-md-200px">
                <a
                  class="nav-link btn btn-active-light-primary px-0"
                  data-bs-toggle="tab"
                  href="#kt_vtab_pane_3"
                  >易*</a
                >
              </li>
            </ul>
            <ul class="nav flex-column mb-3 mb-md-0 fs-6 table-content">
              <li class="nav-item">
                <div>0.8</div>
                <div>0.5</div>
                <div>0.92</div>
              </li>
              <li class="nav-item">
                <div>0.8</div>
                <div>0.5</div>
                <div>0.92</div>
              </li>
              <li class="nav-item">
                <div>0.8</div>
                <div>0.5</div>
                <div>0.92</div>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="tab-pane"
          :class="{ active: tabIndex === 2 }"
          id="kt_builder_subheader"
        >
          <div class="table-header">
            <div class="w-75px w-md-200px">
              <el-select v-model="selectVal" placeholder="Select" class="w-100">
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>
            <div class="th">
              <span>
                初<i class="ki-duotone ki-arrow-up">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
            <div class="th">
              <span>
                即<i class="ki-duotone ki-arrow-up">
                  <span class="path1"></span>
                  <span class="path2"></span>
                </i>
              </span>
            </div>
          </div>
          <div class="d-flex">
            <ul
              class="nav nav-tabs nav-pills border-0 flex-column mb-3 mb-md-0 fs-6"
            >
              <li class="nav-item w-75px w-md-200px me-0">
                <a
                  class="nav-link active btn btn-active-light-primary px-0"
                  data-bs-toggle="tab"
                  href="#kt_vtab_pane_1"
                  >36*</a
                >
              </li>
              <li class="nav-item w-75px w-md-200px me-0">
                <a
                  class="nav-link btn btn-active-light-primary px-0"
                  data-bs-toggle="tab"
                  href="#kt_vtab_pane_2"
                  >Crow*</a
                >
              </li>
              <li class="nav-item w-75px w-md-200px">
                <a
                  class="nav-link btn btn-active-light-primary px-0"
                  data-bs-toggle="tab"
                  href="#kt_vtab_pane_3"
                  >易*</a
                >
              </li>
            </ul>
            <ul class="nav flex-column mb-3 mb-md-0 fs-6 table-content">
              <li class="nav-item">
                <div>0.8</div>
                <div>0.5</div>
                <div>0.92</div>
              </li>
              <li class="nav-item">
                <div>0.8</div>
                <div>0.5</div>
                <div>0.92</div>
              </li>
              <li class="nav-item">
                <div>0.8</div>
                <div>0.5</div>
                <div>0.92</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--end::Body-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import { config } from "@/core/helpers/config";
import { themeName } from "@/core/helpers/documentation";
import { commonStore } from "@/stores/common";
import { useRoute } from "vue-router";

const LS_BUILDER_TAB_NAME =
  "layoutBuilderTabIndex_" + import.meta.env.VITE_APP_DEMO;

export default defineComponent({
  name: "layout-builder",
  components: {},
  setup() {
    const tabIndex = ref(0);
    const detail: any = ref(null);
    const store = commonStore();
    const route = useRoute();
    const list1: any = ref([]);
    const list1Statistics: any = ref([]);

    onMounted(() => {
      console.log(route.query);
      // set the tab from previous
      // tabIndex.value = parseInt(
      //   localStorage.getItem(LS_BUILDER_TAB_NAME) || "0"
      // );
      detail.value = JSON.parse(localStorage.getItem("soccer-detail") || "");
      getDetail(route.query.match_id);
    });

    const onSort = (e) => {
      console.log(e);
    };

    const tableRowClassName = ({
      row,
      rowIndex,
    }: {
      row: any;
      rowIndex: number;
    }) => {
      if (!row.company_name) {
        return "sub-row";
      }
      return "";
    };

    const getDetail = (match_id) => {
      store.fetchScores([match_id]).then((res) => {
        handleDatum(res);
      });
    };

    const handleDatum = (data) => {
      const companyMap = {};
      const companyIndex = {};
      let statistics = [
        // max
        {
          title: "最大值",
          begin_home: null,
          begin_spreads: null,
          begin_away: null,
          end_home: null,
          end_spreads: null,
          end_away: null,
        },
        // min
        {
          title: "最小值",
          begin_home: null,
          begin_spreads: null,
          begin_away: null,
          end_home: null,
          end_spreads: null,
          end_away: null,
        },
      ];

      const target = {};
      data.forEach((da) => {
        if (da?.is_sum === "min" || da?.is_sum === "max") {
          return;
        }
        console.log(da, 2222);
        if (!target[da["company_id"]]) {
          target[da["company_id"]] = {};
        }

        target[da["company_id"]][da["multiple_spreads"]] = da;
        // 比较 初始化
        if (!statistics[0]?.begin_home) {
          statistics = [
            // max
            {
              title: "最大值",
              begin_home: da?.begin_score?.home_team,
              begin_spreads: da?.begin_score?.spreads,
              begin_away: da?.begin_score?.away_team,
              end_home: da?.end_score?.home_team,
              end_spreads: da?.end_score?.spreads,
              end_away: da?.end_score?.away_team,
            },
            // min
            {
              title: "最小值",
              begin_home: da?.begin_score?.home_team,
              begin_spreads: da?.begin_score?.spreads,
              begin_away: da?.begin_score?.away_team,
              end_home: da?.end_score?.home_team,
              end_spreads: da?.end_score?.spreads,
              end_away: da?.end_score?.away_team,
            },
          ];
        } else {
          // begin_home
          if (
            (statistics[0].begin_home as never) < da?.begin_score?.home_team
          ) {
            statistics[0].begin_home = da?.begin_score?.home_team;
          } else if (
            (statistics[1].begin_home as never) > da?.begin_score?.home_team
          ) {
            statistics[1].begin_home = da?.begin_score?.home_team;
          }
          // begin_spreads
          if (
            (statistics[0].begin_spreads as never) < da?.begin_score?.spreads
          ) {
            statistics[0].begin_spreads = da?.begin_score?.spreads;
          } else if (
            (statistics[1].begin_spreads as never) > da?.begin_score?.spreads
          ) {
            statistics[1].begin_spreads = da?.begin_score?.spreads;
          }
          // begin_away
          if (
            (statistics[0].begin_away as never) < da?.begin_score?.away_team
          ) {
            statistics[0].begin_away = da?.begin_score?.away_team;
          } else if (
            (statistics[1].begin_away as never) > da?.begin_score?.away_team
          ) {
            statistics[1].begin_away = da?.begin_score?.away_team;
          }
          // end_home
          if ((statistics[0].end_home as never) < da?.end_score?.home_team) {
            statistics[0].end_home = da?.end_score?.home_team;
          } else if (
            (statistics[1].end_home as never) > da?.end_score?.home_team
          ) {
            statistics[1].end_home = da?.end_score?.home_team;
          }
          // end_spreads
          if ((statistics[0].end_spreads as never) < da?.end_score?.spreads) {
            statistics[0].end_spreads = da?.end_score?.spreads;
          } else if (
            (statistics[1].end_spreads as never) > da?.end_score?.spreads
          ) {
            statistics[1].end_spreads = da?.end_score?.spreads;
          }
          // end_away
          if ((statistics[0].end_away as never) < da?.end_score?.away_team) {
            statistics[0].end_away = da?.end_score?.away_team;
          } else if (
            (statistics[1].end_away as never) > da?.end_score?.away_team
          ) {
            statistics[1].end_away = da?.end_score?.away_team;
          }
        }
      });
      console.log(statistics, 1111111111);
      list1Statistics.value = statistics;
      for (const i in target) {
        const rank = {
          盘2: 1,
          盘3: 2,
          盘4: 3,
          盘5: 4,
          盘6: 5,
          盘7: 6,
          盘8: 7,
          盘9: 8,
          盘10: 9,
        };
        const spreads: any = [];
        for (const j in target[i]) {
          const temp = target[i][j];
          if (temp?.company_name) {
            companyMap[temp?.company_id] = temp?.company_name;
            companyIndex[temp?.company_id] = list1.value.length;
          }
          console.log(temp);

          if (!rank[j]) {
            list1.value.push({
              ...temp,
              children: [],
            });
          } else {
            spreads[rank[j]] = temp;
          }
        }
        console.log(spreads);
        list1.value[list1.value.length - 1].children = spreads;
      }
      console.log(list1.value, statistics);
    };

    /**
     * Set active tab when the tab get clicked
     * @param event
     */
    const setActiveTab = (event: any) => {
      tabIndex.value = parseInt(event.target.getAttribute("data-tab-index"));
      // keep active tab
      localStorage.setItem(LS_BUILDER_TAB_NAME, tabIndex.value.toString());
    };

    const selectVal = ref("全场");
    const options = ref(["全场", "半场"]);

    return {
      onSort,
      tableRowClassName,
      tabIndex,
      selectVal,
      options,
      detail,
      config,
      setActiveTab,
      themeName,
      getAssetPath,
      list1,
      list1Statistics,
    };
  },
});
</script>
<style scoped lang="scss">
.vs {
  width: 75px;
  text-align: center;
}
.club {
  width: calc((100% - 75px) / 2);
  font-size: 1.4rem;
}
.table-header {
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  background: var(--bg-color-1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  .th {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      margin-left: 4px;
    }
  }
}
.table-content {
  width: calc(100% - 75px);
  .nav-item {
    display: flex;
    justify-content: space-around;
    padding: calc(0.775rem + 1px) 0;
    border-bottom: 1px dashed var(--bs-border-dashed-color) !important;
    div {
      flex: 1;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap; //溢出不换行
    }
  }
}
</style>
<style lang="scss">
.table-header {
  .el-input__wrapper {
    box-shadow: none;
  }
}
.el-table tr {
  &.sub-row {
    background-color: #edf4fa;
  }
  &.yellow-row {
    background-color: #FDFCCC;
  }
}
.el-table__body-wrapper tr td.el-table-fixed-column--left {
  // background-color: transparent;
}
</style>
