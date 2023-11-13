<template>
    <div class="tbl">
        <el-table :data="calendarData.days" border style="width: 100%" :row-style="rowState" table-layout='auto'
            :header-cell-style="headerRowState">
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
                        <el-time-select v-model="scope.row.startTime" start="09:00" step="00:15" end="23:59"
                            placeholder="00:00" />
                    </div>
                    <div v-show="!scope.row.enEdit">
                        <el-text style="color: green;">{{ scope.row.startTime
                        }}</el-text>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="endDate" label="終了時刻" width="150">
                <template #default="scope">
                    <div v-show="scope.row.enEdit">
                        <el-time-select v-model="scope.row.endTime" start="09:00" step="00:15" end="23:59"
                            placeholder="00:00" />
                    </div>
                    <div v-show="!scope.row.enEdit">
                        <el-text style="color: green;">{{ scope.row.endTime }}</el-text>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="昼休(時間)" width="110">
                <template #default="scope">
                    <el-text type="info">{{ scope.row.lunchBreak }}</el-text>
                </template>
            </el-table-column>
            <el-table-column label="勤務時間" width="100">
                <template #default="scope">
                    <el-text type="info">{{ scope.row.workTime }}</el-text>
                </template>
            </el-table-column>
            <el-table-column prop="others" label="備考" width="180">
                <template #default="scope">
                    <div v-show="scope.row.enEdit">
                        <el-input v-model="scope.row.others" :rows="1" type="textarea" />
                    </div>
                    <div v-show="!scope.row.enEdit">
                        <el-text type="info">{{ scope.row.others }}</el-text>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="enEdit" label="操作" width="60">
                <template #default="scope">
                    <el-tooltip content="Bottom center" effect="customized">
                        <el-button :icon="Edit" circle @click="scope.row.enEdit = !scope.row.enEdit" />
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script lang="ts" setup>
import { onMounted } from 'vue';
import { Edit } from '@element-plus/icons-vue'
import useMonth from '../hooks/detailHook/useMonth';

// 選択した月を取得
let selectedMonth = defineProps(['month', 'theme'])

// 選択した月の情報を取得
const { getMonthInfo, calendarData } = useMonth()

// データ関する操作

onMounted(() => {
    const formattedMonth = selectedMonth.month.replace(/年/, '-').replace(/月/, '')
    getMonthInfo(formattedMonth)
})

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
    enEdit: boolean
}
const rowState = ({ row, rowIndex }: { row: daysType, rowIndex: number }) => {
    backgroundColor: 'red'
    if (row.dayOfWeek === '土曜日' || row.dayOfWeek === '日曜日' || row.holidayName !== '') {
        if (!selectedMonth.theme) {
            return {
                backgroundColor: 'rgb(223 223 223)',
                color: 'rgb(14 127 194)'
            }
        } else {
            return {
                backgroundColor: '#292929',
                color: 'rgb(56 111 153)'
            }
        }
    }
}

// ヘッダcss
const headerRowState = ({ row, rowIndex }: { row: string, rowIndex: string }) => {
    if (rowIndex == '0') {
        return {
            // backgroundColor: '#E8E9E9 !important'
        };
    }
};

</script>
<style scoped lang="scss">
.tbl {
    ::v-deep(.el-table .cell) {
        text-align: center;
    }
}
</style>