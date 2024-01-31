<template>
    <div id="tbl" class="tbl">
        <el-table :data="calendarData.days" border style="width: 100%" :row-style="rowState" table-layout='auto'>
            <el-table-column prop="date" label="日付" width="60" />
            <el-table-column label="曜日">
                <template #default="scope">
                    <div style="display: flex; align-items: center;white-space: nowrap;">
                        <span style=" margin-left: 10px">{{ scope.row.dayOfWeek }}</span>
                        <span style="margin-left: 10px;color:red">{{ scope.row.holidayName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="開始時刻" width="150">
                <template #default="scope">
                    <div v-show="scope.row.enEdit">
                        <el-time-select v-model="scope.row.startTime" start="00:00" step="00:15" end="23:59"
                            placeholder="00:00" />
                    </div>
                    <div v-show="!scope.row.enEdit">
                        <div v-show="!selectedMonth.theme">
                            <div v-show="!scope.row.isWorkDay">
                                <el-text style="color: darkgray;">{{ scope.row.startTime }}</el-text>
                            </div>
                            <div v-show="scope.row.isWorkDay">
                                <el-text style="color: black;font-size:20px">{{ scope.row.startTime }}</el-text>
                            </div>
                        </div>
                        <div v-show="selectedMonth.theme">
                            <div v-show="!scope.row.isWorkDay">
                                <el-text style="color: dimgray;">{{ scope.row.startTime }}</el-text>
                            </div>
                            <div v-show="scope.row.isWorkDay">
                                <el-text style="color: gainsboro;font-size:20px">{{ scope.row.startTime }}</el-text>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="endDate" label="終了時刻" width="150">
                <template #default="scope">
                    <div v-show="scope.row.enEdit">
                        <el-time-select v-model="scope.row.endTime" start="00:00" step="00:15" end="23:59"
                            placeholder="00:00" />
                    </div>
                    <div v-show="!scope.row.enEdit">
                        <div v-show="!selectedMonth.theme">
                            <div v-show="!scope.row.isWorkDay">
                                <el-text style="color: darkgray;">{{ scope.row.endTime }}</el-text>
                            </div>
                            <div v-show="scope.row.isWorkDay">
                                <el-text style="color: black;font-size:20px">{{ scope.row.endTime }}</el-text>
                            </div>
                        </div>
                        <div v-show="selectedMonth.theme">
                            <div v-show="!scope.row.isWorkDay">
                                <el-text style="color: dimgray;">{{ scope.row.endTime }}</el-text>
                            </div>
                            <div v-show="scope.row.isWorkDay">
                                <el-text style="color: gainsboro;font-size:20px">{{ scope.row.endTime }}</el-text>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="昼休(時間)" width="110">
                <template #default="scope">
                    <div v-show="!selectedMonth.theme">
                        <div v-show="scope.row.enEdit">
                            <div v-show="scope.row.isWorkDay">
                                <el-select v-model="scope.row.lunchBreak" class="m-2" placeholder="Select">
                                    <el-option v-for="item in lunchBreakOptions" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                            <div v-show="!scope.row.isWorkDay">
                                <el-select v-model="scope.row.lunchBreak" class="m-2" placeholder="Select">
                                    <el-option v-for="item in lunchBreakOptions" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                        </div>
                        <div v-show="!scope.row.enEdit">
                            <div v-show="scope.row.isWorkDay">
                                <el-text style="color: black;font-size:20px" type="info">{{ scope.row.lunchBreak
                                }}</el-text>
                            </div>
                            <div v-show="!scope.row.isWorkDay">
                                <el-text style="color: darkgray;" type="info">{{ scope.row.lunchBreak }}</el-text>
                            </div>
                        </div>
                    </div>
                    <div v-show="selectedMonth.theme">
                        <div v-show="scope.row.enEdit">
                            <div v-show="scope.row.isWorkDay">
                                <el-select v-model="scope.row.lunchBreak" class="m-2" placeholder="Select">
                                    <el-option v-for="item in lunchBreakOptions" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                            <div v-show="!scope.row.isWorkDay">
                                <el-select v-model="scope.row.lunchBreak" class="m-2" placeholder="Select">
                                    <el-option v-for="item in lunchBreakOptions" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                        </div>
                        <div v-show="!scope.row.enEdit">
                            <div v-show="scope.row.isWorkDay">
                                <el-text style="color: gainsboro;font-size:20px" type="info">{{ scope.row.lunchBreak
                                }}</el-text>
                            </div>
                            <div v-show="!scope.row.isWorkDay">
                                <el-text style="color: dimgray;" type="info">{{ scope.row.lunchBreak }}</el-text>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="勤務時間" width="100">
                <template #default="scope">
                    <div v-show="!selectedMonth.theme">
                        <div v-show="scope.row.isWorkDay">
                            <el-text style="color: black;font-size:20px" type="info">{{ parseFloat(scope.row.workTime) < 0
                                ? '0.0' : scope.row.workTime }}</el-text>
                        </div>
                        <div v-show="!scope.row.isWorkDay">
                            <el-text type="info">{{ parseFloat(scope.row.workTime) < 0 ? '0.0' : scope.row.workTime
                            }}</el-text>
                        </div>
                    </div>
                    <div v-show="selectedMonth.theme">
                        <div v-show="scope.row.isWorkDay">
                            <el-text style="color: gainsboro;font-size:20px" type="info">{{ parseFloat(scope.row.workTime) <
                                0 ? '0.0' : scope.row.workTime }}</el-text>
                        </div>
                        <div v-show="!scope.row.isWorkDay">
                            <el-text style="color: dimgray;" type="info">{{ parseFloat(scope.row.workTime) < 0 ? '0.0' :
                                scope.row.workTime }}</el-text>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="others" label="備考" width="180">
                <template #default="scope">
                    <div v-show="scope.row.enEdit">
                        <el-input v-model="scope.row.others" :rows="1" type="textarea" />
                    </div>
                    <div v-show="!scope.row.enEdit">
                        <div v-show="scope.row.isWorkDay">
                            <el-text style="color: cornflowerblue;font-size:20px" type="info">{{ scope.row.others
                            }}</el-text>
                        </div>
                        <div v-show="!scope.row.isWorkDay">
                            <el-text style="color: cornflowerblue;font-size:20px" type="info">{{ scope.row.others
                            }}</el-text>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column v-if="usebable" prop="enEdit" label="操作" width="250">
                <template #default="scope">
                    <el-button v-show="!scope.row.enEdit" :icon="Lock" @click="scope.row.enEdit = !scope.row.enEdit" />
                    <el-button v-show="scope.row.enEdit" :icon="Unlock" @click="scope.row.enEdit = !scope.row.enEdit" />
                    <el-button @click="autoInput(scope.row)">
                        <i>
                            <svg t="1706715252068" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="8733" width="16" height="16">
                                <path
                                    d="M119.641581 374.317228h34.583114l102.449976 260.272914h-32.484139l-27.686481-72.864422H76.962421l-27.686482 72.864422H17.191606L119.641581 374.317228zM86.457784 536.538019h100.550903l-49.175988-130.136457h-1.499268L86.457784 536.538019zM282.861884 374.317228h29.985359v160.721523c0 25.787408 5.697218 45.077989 17.091654 57.971693 12.194046 13.593363 31.084822 20.390044 56.87223 20.390044 25.487555 0 44.478282-6.796681 56.872231-20.390044 11.394436-13.39346 17.191606-32.684041 17.191605-57.971693V374.317228H490.760371v160.421669c0 33.783504-8.595803 59.670864-25.88736 77.662079-17.691362 18.291069-43.778624 27.386628-77.961932 27.386628-34.28326 0-60.17062-8.995608-77.662079-26.986823-17.491459-18.291069-26.287164-44.178429-26.287165-77.961933V374.317228zM523.144558 374.317228h213.195901v25.88736h-91.855149v234.385554h-29.485603V400.204588h-91.855149V374.317228zM974.724061 408.200683c21.389556 24.987799 32.084334 57.172084 32.084333 96.552855 0 38.881015-10.694778 70.865398-32.084333 95.853197-22.58897 25.987311-53.47389 38.980966-92.554808 38.980966-38.881015 0-69.566032-12.993655-92.254953-38.980966-21.389556-24.488043-32.084334-56.472426-32.084334-95.853197 0-39.580673 10.694778-71.665007 32.084334-96.253001 22.58897-26.187213 53.47389-39.380771 92.554807-39.380771 39.080918 0.099951 69.865886 13.093607 92.254954 39.080917z m-162.920449 18.690874c-15.992191 19.690386-24.088238 45.677696-24.088239 77.961933 0 32.084334 7.996096 57.971694 24.088239 77.662079 16.791801 20.390044 40.180381 30.585066 70.365641 30.585065 29.885408 0 53.373939-9.99512 70.365642-29.885407 16.292045-19.890288 24.388092-46.077501 24.388092-78.361737 0-32.783992-8.096047-59.171108-24.388092-79.061396-16.791801-19.890288-40.080429-29.885408-69.965837-29.885408-30.185261-0.099951-53.773743 10.294973-70.765446 30.984871z"
                                    p-id="8734"></path>
                                <path
                                    d="M998.11264 332.637579c-14.19307 0-25.587506-11.494388-25.587506-25.587506v-76.762518c0-98.751781-80.360761-179.112543-179.112542-179.112543H230.487457c-98.751781 0-179.112543 80.360761-179.112542 179.112543v76.762518c0 14.19307-11.494388 25.587506-25.587507 25.587506S0.199902 321.143192 0.199902 307.050073v-76.762518C0.199902 103.249585 103.549439 0 230.487457 0h562.925135c127.03797 0 230.287555 103.349536 230.287554 230.287555v76.762518c0 14.093119-11.394436 25.587506-25.587506 25.587506zM793.412592 1023.500244H230.487457C103.449488 1023.500244 0.199902 920.150708 0.199902 793.212689v-76.762518c0-14.19307 11.494388-25.587506 25.587506-25.587506s25.587506 11.494388 25.587507 25.587506v76.762518c0 98.751781 80.360761 179.112543 179.112542 179.112543h562.925135c98.751781 0 179.112543-80.360761 179.112542-179.112543v-76.762518c0-14.19307 11.494388-25.587506 25.587506-25.587506 14.19307 0 25.587506 11.494388 25.587506 25.587506v76.762518c0 127.03797-103.249585 230.287555-230.287554 230.287555z"
                                    p-id="8735"></path>
                            </svg>
                        </i>
                    </el-button>
                    <el-button :icon="Delete" @click="resetRow(scope.row)" />
                </template>
            </el-table-column>
        </el-table>
        <div style="height: 40px; text-align: center;margin-top: 10px;">
            <div v-show="!selectedMonth.theme">
                <el-text style=" font-size: 30px;color: black;font-weight: 500;" type="info">合計時間:<span
                        style="color: red;">{{
                            totalWorkTimeTemp < 0 ? 0 : totalWorkTimeTemp }}</span></el-text>
            </div>
            <div v-show="selectedMonth.theme">
                <el-text style=" font-size: 30px;color: gainsboro;font-weight: 500;" type="info">合計時間:
                    <span style="color: red;">{{ totalWorkTimeTemp < 0 ? 0 : totalWorkTimeTemp }}</span>
                </el-text>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { Lock, Unlock, Delete } from '@element-plus/icons-vue'
import useMonth from '../hooks/detailHook/useMonth'
import printJS from 'print-js'

// 選択した月を取得
let selectedMonth = defineProps(['month', 'theme'])

// 選択した月の情報と関連Hooks取得
const { getMonthInfo, calendarData, autoInput, resetRow } = useMonth()

// pdf出力
let usebable = ref<boolean>(true)
const pdfExport = () => {
    usebable.value = false
    setTimeout(() => {
        const style = '@page{}' + '@media print {td{border:1px solid #000;text-align:center;height:40px;font-weight:500}th{border:1px solid #000}}'
        printJS({
            printable: 'tbl',
            type: 'html',
            scanStyles: false,
            style: style,
            targetStyle: ['*']
        })
        usebable.value = true
    })
}

defineExpose({ pdfExport, calendarData })

onMounted(() => {
    const formattedMonth = selectedMonth.month.replace(/年/, '-').replace(/月/, '')
    getMonthInfo(formattedMonth)
})

// 合計時間
let totalWorkTimeTemp = ref<number>(0)

watch(() => calendarData.value.days, () => {
    totalWorkTimeTemp.value = 0
    calendarData.value.days.forEach(day => {
        let startTime = new Date(`1970-01-01T${day.startTime}:00.000Z`);
        let endTime = new Date(`1970-01-01T${day.endTime}:00.000Z`);
        let timeDifference: number = (endTime.getTime() as number) - (startTime.getTime() as number) - (parseFloat(day.lunchBreak) * 60 * 60 * 1000);

        // 時
        let hours = Math.floor(timeDifference / (1000 * 60 * 60));

        // 分　15分→0.25
        let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        let roundedMinutes = Math.round(minutes / 15) * 15;

        // 60分であれば、1時間を増える
        if (roundedMinutes === 60) {
            hours += 1;
            roundedMinutes = 0;
        }

        // 00.00
        day.workTime = (hours + roundedMinutes / 60).toFixed(2);

        totalWorkTimeTemp.value += parseFloat(day.workTime);
    });

}, { deep: true })

// 行内css
interface daysType {
    date: number,
    dayOfWeek: string,
    isCurrentMonth: boolean,
    holidayName: string,
    startTime: string,
    endTime: string
    lunchBreak: string,
    workTime: string,
    others: string,
    enEdit: boolean,
    isWorkDay: boolean
}

const rowState = ({ row }: { row: daysType }) => {
    if (row.dayOfWeek === '土曜日' || row.dayOfWeek === '日曜日' || row.holidayName !== '') {
        row.isWorkDay = false
        if (!selectedMonth.theme) {
            return {
                backgroundColor: 'rgb(223 223 223)',
                color: 'darkgray',
                fontSize: '15px'
            }
        } else {
            return {
                backgroundColor: '#292929',
                color: 'dimgray',
                fontSize: '15px'
            }
        }
    } else {
        if (!selectedMonth.theme) {
            return {
                color: 'black',
                fontSize: '20px'
            }
        } else {
            return {
                color: 'gainsboro',
                fontSize: '20px'
            }
        }
    }
}

const lunchBreakOptions = [
    {
        value: '0.00',
        label: '0.00'
    },
    {
        value: '0.50',
        label: '0.50'
    },
    {
        value: '1.00',
        label: '1.00'
    },
    {
        value: '2.00',
        label: '2.00'
    },
    {
        value: '3.00',
        label: '3.00'
    }
]

</script>
<style scoped lang="scss">
.tbl {
    ::v-deep(.el-table .cell) {
        text-align: center;
    }
}
</style>