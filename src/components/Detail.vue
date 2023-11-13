<template>
    <div class="tbl">
        <el-text style="margin-left: 10px;" tag="b" type="info" size="large">{{ selectedMonth.month }}</el-text>
        <el-table :data="calendarData.days" border style="width: 100%" :row-style="rowState" table-layout='auto'
            :header-cell-style="headerRowState">
            <el-table-column prop="date" label="日付" width="60" />
            <el-table-column prop="holidayName" label="曜日">
                <template #default="scope">
                    <div style="display: flex; align-items: center;white-space: nowrap;">
                        <span style=" margin-left: 10px">{{ scope.row.dayOfWeek }}</span>
                        <span style="margin-left: 10px;color:red">{{ scope.row.holidayName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="startDate" label="開始時刻" width="150">
                <el-time-select v-model="input" start="09:00" step="00:15" end="23:59" placeholder="00:00" />
            </el-table-column>
            <el-table-column prop="endDate" label="終了時刻" width="150">
                <el-time-select v-model="input" start="09:00" step="00:15" end="23:59" placeholder="00:00" />
            </el-table-column>
            <el-table-column prop="lunchBreak" label="昼休(時間)" width="110" />
            <el-table-column prop="workTime" label="勤務時間" width="100" />
            <el-table-column prop="others" label="備考" width="180">
                <el-input v-model="input" :rows="1" type="textarea" />
            </el-table-column>
            <el-table-column prop="others" label="操作" width="60">
                <el-button :icon="Edit" circle />
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Edit } from '@element-plus/icons-vue'
import useMonth from '../hooks/detailHook/useMonth';

// 選択した月を取得
let selectedMonth = defineProps(['month', 'theme'])

// 選択した月の情報を取得
const { getMonthInfo, calendarData } = useMonth()

onMounted(() => {
    const formattedMonth = selectedMonth.month.replace(/年/, '-').replace(/月/, '')
    getMonthInfo(formattedMonth)
    console.log('@@@', calendarData.value);
})

const input = ref('')

// 行内css
interface daysType {
    date: number,
    dayOfWeek: string,
    isCurrentMonth: boolean,
    holidayName: string,
    lunchBreak: string,
    workTime: string,
    others: string,
    enEdit: boolean
}
const rowState = ({ row, rowIndex }: { row: daysType, rowIndex: number }) => {
    backgroundColor: 'red'
    if (row.dayOfWeek === '土曜日' || row.dayOfWeek === '日曜日' || row.holidayName !== '') {
        console.log(selectedMonth.theme);
        if (!selectedMonth.theme) {
            return {
                backgroundColor: 'rgb(223 223 223)',
                color: 'green'
            }
        } else {
            return {
                backgroundColor: '#292929',
                color: '#8c993f'
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