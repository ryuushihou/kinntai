<template>
  <div class="content">
    <div v-if="selectedMonth">
      <div style="display: block; margin-left: auto; width: fit-content;">
        <a href="https://github.com/ryuushihou/kinntai">
          <svg t="1706753412612" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4209" width="64" height="64">
            <path
              d="M512 0C229.283787 0 0.142041 234.942803 0.142041 524.867683c0 231.829001 146.647305 428.553077 350.068189 497.952484 25.592898 4.819996 34.976961-11.38884 34.976961-25.294314 0-12.45521-0.469203-45.470049-0.725133-89.276559-142.381822 31.735193-172.453477-70.380469-172.453477-70.380469-23.246882-60.569859-56.816233-76.693384-56.816234-76.693385-46.493765-32.58829 3.540351-31.948468 3.540351-31.948467 51.356415 3.71097 78.356923 54.086324 78.356923 54.086324 45.683323 80.19108 119.817417 57.072162 148.993321 43.593236 4.649376-33.91059 17.915029-57.029508 32.50298-70.167195-113.675122-13.222997-233.151301-58.223843-233.1513-259.341366 0-57.285437 19.919806-104.163095 52.678715-140.846248-5.246544-13.265652-22.820334-66.626844 4.990615-138.884127 0 0 42.996069-14.076094 140.760939 53.787741 40.863327-11.644769 84.627183-17.445825 128.177764-17.6591 43.465272 0.213274 87.271782 6.014331 128.135109 17.6591 97.679561-67.906489 140.59032-53.787741 140.59032-53.787741 27.938914 72.257282 10.407779 125.618474 5.118579 138.884127 32.844219 36.683154 52.593405 83.560812 52.593405 140.846248 0 201.586726-119.646798 245.990404-233.663158 258.957473 18.341577 16.208835 34.721032 48.199958 34.721032 97.210357 0 70.167195-0.639822 126.7275-0.639823 143.960051 0 14.033439 9.213443 30.370239 35.190235 25.209005 203.250265-69.527373 349.769606-266.123484 349.769605-497.867175C1023.857959 234.942803 794.673558 0 512 0"
              fill="#0bce36" p-id="4210"></path>
          </svg>
        </a>
      </div>
      <div style="height: 30px;">
        <p style="text-align: center;font-weight: 800; transition: font-size 0.3s; font-size: 20px;"
          onmouseover="this.style.fontSize='30px'" onmouseout="this.style.fontSize='20px'">勤務表
        </p>
      </div>
      <div style="display: flex; align-items: center; justify-content: center; text-align: center; margin-top: 20px;">
        <el-text style="margin-left: 10px; font-size: 20px; transition: font-size 0.3s;" tag="b" type="info"
          @mouseover="$event.target.style.fontSize = '24px'" @mouseout="$event.target.style.fontSize = '20px'">
          {{ monthOfSelected }}
        </el-text>
        <div style="margin-left: auto;display: flex;">
          <div @click="backToSelectMonth()"
            style="height: 45px; width: 125px; margin-left: 10px; display: flex; align-items: center;"
            class="transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-brand-primary hover:border-brand-primary cursor-pointer relative bg-white block bg-white border rounded-xl p-4 transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-brand-primary hover:border-brand-primary cursor-pointer relative bg-white">
            <span style="font-weight: 500; font-size: 15px; text-align: center;">月分選択へ</span>
          </div>
          <div @click="print()" style="height: 45px; width: 125px; margin-left: 10px; display: flex; align-items: center;"
            class="transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-brand-primary hover:border-brand-primary cursor-pointer relative bg-white block bg-white border rounded-xl p-4 transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-brand-primary hover:border-brand-primary cursor-pointer relative bg-white">
            <span style="font-weight: 500; font-size: 15px; text-align: center; margin: 0 auto;">PDF出力1</span>
          </div>
          <div @click="save()" style="height: 45px; width: 125px; margin-left: 10px; display: flex; align-items: center;"
            class="transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-brand-primary hover:border-brand-primary cursor-pointer relative bg-white block bg-white border rounded-xl p-4 transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-brand-primary hover:border-brand-primary cursor-pointer relative bg-white">
            <span style="font-weight: 500; font-size: 15px; text-align: center; margin: 0 auto;">保存</span>
          </div>

        </div>
      </div>
      <div style="margin-top: 10px; display: flex; justify-content: center; align-items: center;" class="inline-flex"
        h="30" w="30" m="2" :style="{
          boxShadow: `var(${getCssVarName('dark')})`
        }">
        <Detail ref='detailRef' :month="monthOfSelected" />
      </div>
    </div>
    <div v-if="!selectedMonth">
      <div style="display: block; margin-left: auto; width: fit-content;">
        <a href="https://github.com/ryuushihou/kinntai">
          <svg t="1706753412612" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4209" width="64" height="64">
            <path
              d="M512 0C229.283787 0 0.142041 234.942803 0.142041 524.867683c0 231.829001 146.647305 428.553077 350.068189 497.952484 25.592898 4.819996 34.976961-11.38884 34.976961-25.294314 0-12.45521-0.469203-45.470049-0.725133-89.276559-142.381822 31.735193-172.453477-70.380469-172.453477-70.380469-23.246882-60.569859-56.816233-76.693384-56.816234-76.693385-46.493765-32.58829 3.540351-31.948468 3.540351-31.948467 51.356415 3.71097 78.356923 54.086324 78.356923 54.086324 45.683323 80.19108 119.817417 57.072162 148.993321 43.593236 4.649376-33.91059 17.915029-57.029508 32.50298-70.167195-113.675122-13.222997-233.151301-58.223843-233.1513-259.341366 0-57.285437 19.919806-104.163095 52.678715-140.846248-5.246544-13.265652-22.820334-66.626844 4.990615-138.884127 0 0 42.996069-14.076094 140.760939 53.787741 40.863327-11.644769 84.627183-17.445825 128.177764-17.6591 43.465272 0.213274 87.271782 6.014331 128.135109 17.6591 97.679561-67.906489 140.59032-53.787741 140.59032-53.787741 27.938914 72.257282 10.407779 125.618474 5.118579 138.884127 32.844219 36.683154 52.593405 83.560812 52.593405 140.846248 0 201.586726-119.646798 245.990404-233.663158 258.957473 18.341577 16.208835 34.721032 48.199958 34.721032 97.210357 0 70.167195-0.639822 126.7275-0.639823 143.960051 0 14.033439 9.213443 30.370239 35.190235 25.209005 203.250265-69.527373 349.769606-266.123484 349.769605-497.867175C1023.857959 234.942803 794.673558 0 512 0"
              fill="#0bce36" p-id="4210"></path>
          </svg>
        </a>
      </div>
      <div style="margin-top: 100%;display: flex;align-items: center;">
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
        <div @click="toKinndai()"
          style="height: 45px; width: 130px; margin-left: 10px; display: flex; align-items: center;"
          class="transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-brand-primary hover:border-brand-primary cursor-pointer relative bg-white block bg-white border rounded-xl p-4 transition-all group duration-200 ease-in-out hover:border-l-8 hover:ring-2 ring-brand-primary hover:border-brand-primary cursor-pointer relative bg-white">
          <span style="font-weight: 500; text-align: center;">勤務表へ</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Detail from './components/Detail.vue'
import useSelectedMonth from './hooks/appHook/useSelectedMonth'
import useLayout from './hooks/appHook/useLayout'
import useCalendarDataStore from './store/calendarData'
import { ElMessage } from 'element-plus'

// 選択した月に関するHooks
const { selectedMonth, monthOfSelected, toKinndai, backToSelectMonth } = useSelectedMonth()

// layoutに関するHooks
const { getCssVarName } = useLayout()

// pdf出力
let detailRef = ref()
const print = () => {
  if (detailRef.value) {
    detailRef.value.pdfExport()
  }
}

// 保存
let calendarDataInfo = useCalendarDataStore()
const save = () => {
  // const formattedMonth = monthOfSelected.value.replace(/年/, '-').replace(/月/, '')
  // const [year, month] = formattedMonth.split('-')
  // let existCalendarData: boolean = false
  // calendarDataInfo.calendarDataArr.forEach(arr => {
  //   arr.days.forEach(day => day.enEdit = false)
  //   if (arr.year === parseInt(year) && arr.month === parseInt(month)) {
  //     arr = detailRef.value.calendarData
  //     existCalendarData = true
  //   }
  // })
  // if (!existCalendarData) {
  //   calendarDataInfo.calendarDataArr.push(detailRef.value.calendarData)
  // }
  calendarDataInfo.calendarDataArr.push(detailRef.value.calendarData)

  ElMessage({
    showClose: true,
    message: '保存しました',
    type: 'success',
  })
}

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
</style>