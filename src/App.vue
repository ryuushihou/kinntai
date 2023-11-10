<template>
  <div class="content">
    <div style="display: flex;align-items: center; margin-left: 43%;">
      <el-switch v-model="theme" :active-action-icon="Sunny" :inactive-action-icon="Moon" @click="toggle()" />
      <div style="margin-left: 5px;">
        <a href="https://github.com/ryuushihou/kinntai">
          <svg t="1699592160273" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="6195" width="16" height="16">
            <path
              d="M512 0C229.283787 0 0.142041 234.942803 0.142041 524.867683c0 231.829001 146.647305 428.553077 350.068189 497.952484 25.592898 4.819996 34.976961-11.38884 34.976961-25.294314 0-12.45521-0.469203-45.470049-0.725133-89.276559-142.381822 31.735193-172.453477-70.380469-172.453477-70.380469-23.246882-60.569859-56.816233-76.693384-56.816234-76.693385-46.493765-32.58829 3.540351-31.948468 3.540351-31.948467 51.356415 3.71097 78.356923 54.086324 78.356923 54.086324 45.683323 80.19108 119.817417 57.072162 148.993321 43.593236 4.649376-33.91059 17.915029-57.029508 32.50298-70.167195-113.675122-13.222997-233.151301-58.223843-233.1513-259.341366 0-57.285437 19.919806-104.163095 52.678715-140.846248-5.246544-13.265652-22.820334-66.626844 4.990615-138.884127 0 0 42.996069-14.076094 140.760939 53.787741 40.863327-11.644769 84.627183-17.445825 128.177764-17.6591 43.465272 0.213274 87.271782 6.014331 128.135109 17.6591 97.679561-67.906489 140.59032-53.787741 140.59032-53.787741 27.938914 72.257282 10.407779 125.618474 5.118579 138.884127 32.844219 36.683154 52.593405 83.560812 52.593405 140.846248 0 201.586726-119.646798 245.990404-233.663158 258.957473 18.341577 16.208835 34.721032 48.199958 34.721032 97.210357 0 70.167195-0.639822 126.7275-0.639823 143.960051 0 14.033439 9.213443 30.370239 35.190235 25.209005 203.250265-69.527373 349.769606-266.123484 349.769605-497.867175C1023.857959 234.942803 794.673558 0 512 0"
              fill="#3E75C3" p-id="6196"></path>
          </svg>
        </a>
      </div>
    </div>
    <div v-if="selectedMonth">
      <p style="text-align: center;">勤務表</p>
      <div style="display: flex; justify-content: center; align-items: center;" class="inline-flex" h="30" w="30" m="2"
        :style="{
          boxShadow: `var(${getCssVarName('dark')})`
        }">
        <DetailVue :month="monthOfSelected" />
      </div>
      <div style="text-align: center;margin-top: 20px;">
        <el-button round @click="backToSelectMonth()">月分選択へ</el-button>
        <el-button round>PDF出力</el-button>
        <el-button round>保存</el-button>
      </div>
    </div>
    <div v-if="!selectedMonth" style="margin-top: 20%;display: flex;align-items: center;">
      <svg t="1699624399312" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="7007" width="48" height="48">
        <path
          d="M896 85.333333h-170.666667V42.666667a42.666667 42.666667 0 0 0-85.333333 0v42.666666H384V42.666667a42.666667 42.666667 0 0 0-85.333333 0v42.666666H128a128 128 0 0 0-128 128v682.666667a128 128 0 0 0 128 128h768a128 128 0 0 0 128-128V213.333333a128 128 0 0 0-128-128zM128 170.666667h170.666667v42.666666a42.666667 42.666667 0 0 0 85.333333 0V170.666667h256v42.666666a42.666667 42.666667 0 0 0 85.333333 0V170.666667h170.666667a42.666667 42.666667 0 0 1 42.666667 42.666666v128H85.333333V213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666z m768 768H128a42.666667 42.666667 0 0 1-42.666667-42.666667V426.666667h853.333334v469.333333a42.666667 42.666667 0 0 1-42.666667 42.666667z"
          fill="#333333" p-id="7008"></path>
        <path
          d="M663.04 559.786667l-213.333333 213.333333-90.026667-92.586667a42.666667 42.666667 0 0 0-60.16 0 42.666667 42.666667 0 0 0 0 60.586667l120.746667 120.746667a42.666667 42.666667 0 0 0 30.293333 12.8 42.666667 42.666667 0 0 0 30.293333-12.8l241.493334-241.493334a42.666667 42.666667 0 0 0 0-60.586666 42.666667 42.666667 0 0 0-59.306667 0z"
          fill="#333333" p-id="7009"></path>
      </svg>
      <el-date-picker style="margin-left: 10px;" v-model="monthOfSelected" type="month" value-format="YYYY年MM月"
        size="large" placeholder="月分選択ください" />
      <el-button style="margin-left: 10px;" round @click="toKinndai()">勤務表へ</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue';
import DetailVue from './components/Detail.vue'
import useSelectedMonth from './hooks/appHook/useSelectedMonth'
import useLayout from './hooks/appHook/useLayout'

// 選択した月に関するHooks
const { selectedMonth, monthOfSelected, toKinndai, backToSelectMonth } = useSelectedMonth()

// layoutに関するHooks
const { getCssVarName, theme, toggle } = useLayout()

</script>
<style scoped lang="scss">
.content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>./hooks/appHook/useSelectedMonth./hooks/appHook/useLayout