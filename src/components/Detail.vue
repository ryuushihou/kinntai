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
                                <el-text style="color: black;">{{ scope.row.startTime }}</el-text>
                            </div>
                        </div>
                        <div v-show="selectedMonth.theme">
                            <div v-show="!scope.row.isWorkDay">
                                <el-text style="color: dimgray;">{{ scope.row.startTime }}</el-text>
                            </div>
                            <div v-show="scope.row.isWorkDay">
                                <el-text style="color: ghostwhite;">{{ scope.row.startTime }}</el-text>
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
                                <el-text style="color: black;">{{ scope.row.endTime }}</el-text>
                            </div>
                        </div>
                        <div v-show="selectedMonth.theme">
                            <div v-show="!scope.row.isWorkDay">
                                <el-text style="color: dimgray;">{{ scope.row.endTime }}</el-text>
                            </div>
                            <div v-show="scope.row.isWorkDay">
                                <el-text style="color: ghostwhite;">{{ scope.row.endTime }}</el-text>
                            </div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="昼休(時間)" width="110">
                <template #default="scope">
                    <div v-show="!selectedMonth.theme">
                        <div v-show="scope.row.isWorkDay">
                            <el-text style="color: black;" type="info">{{ scope.row.lunchBreak }}</el-text>
                        </div>
                        <div v-show="!scope.row.isWorkDay">
                            <el-text style="color: darkgray;" type="info">{{ scope.row.lunchBreak }}</el-text>
                        </div>
                    </div>
                    <div v-show="selectedMonth.theme">
                        <div v-show="scope.row.isWorkDay">
                            <el-text style="color: ghostwhite;" type="info">{{ scope.row.lunchBreak }}</el-text>
                        </div>
                        <div v-show="!scope.row.isWorkDay">
                            <el-text style="color: dimgray;" type="info">{{ scope.row.lunchBreak }}</el-text>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="勤務時間" width="100">
                <template #default="scope">
                    <div v-show="!selectedMonth.theme">
                        <div v-show="scope.row.isWorkDay">
                            <el-text style="color: black;" type="info">{{ scope.row.workTime }}</el-text>
                        </div>
                        <div v-show="!scope.row.isWorkDay">
                            <el-text type="info">{{ scope.row.workTime }}</el-text>
                        </div>
                    </div>
                    <div v-show="selectedMonth.theme">
                        <div v-show="scope.row.isWorkDay">
                            <el-text style="color: ghostwhite;" type="info">{{ scope.row.workTime }}</el-text>
                        </div>
                        <div v-show="!scope.row.isWorkDay">
                            <el-text style="color: dimgray;" type="info">{{ scope.row.workTime }}</el-text>
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
                            <el-text style="color: cornflowerblue;" type="info">{{ scope.row.others }}</el-text>
                        </div>
                        <div v-show="!scope.row.isWorkDay">
                            <el-text style="color: cornflowerblue;" type="info">{{ scope.row.others }}</el-text>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column v-if="usebable" prop="enEdit" label="操作" width="60">
                <template #default="scope">
                    <el-button :icon="Edit" circle @click="scope.row.enEdit = !scope.row.enEdit" />
                </template>
            </el-table-column>
        </el-table>
        <div style="height: 40px; display: flex; align-items: center; justify-content: center; text-align: center;">
            <el-text style=" font-size: 30px;color: cornflowerblue;" type="info">合計時間:179</el-text>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { Edit } from '@element-plus/icons-vue'
import useMonth from '../hooks/detailHook/useMonth'
import printJS from 'print-js'

// 選択した月を取得
let selectedMonth = defineProps(['month', 'theme'])

// 選択した月の情報を取得
const { getMonthInfo, calendarData } = useMonth()

// pdf出力
let usebable = ref<boolean>(true)
const pdfExport = () => {
    usebable.value = false
    setTimeout(() => {
        const style = '@page{}' + '@media print {td{border:1px solid #000;text-align:center;height:40px}th{border:1px solid #000}}'
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

watch(() => calendarData.value, () => {
    calendarData.value.days.forEach(day => {
        let startTime = new Date(`1970-01-01T${day.startTime}:00.000Z`)
        let endTime = new Date(`1970-01-01T${day.endTime}:00.000Z`)
        let timeDifference: number = (endTime.getTime() as number) - (startTime.getTime() as number) - (parseFloat(day.lunchBreak) * 60 * 60 * 1000)
        day.workTime = Math.floor(timeDifference / (1000 * 60 * 60)).toString() + '.'
            + Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)).toString()
    })
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
                color: 'darkgray'
            }
        } else {
            return {
                backgroundColor: '#292929',
                color: 'dimgray'
            }
        }
    } else {
        if (!selectedMonth.theme) {
            return {
                color: 'black',
                fontWeight: '500'
            }
        } else {
            return {
                color: 'ghostwhite',
                fontWeight: '500'
            }
        }
    }
}

</script>
<style scoped lang="scss">
.tbl {
    ::v-deep(.el-table .cell) {
        text-align: center;
    }
}
</style>