<template>
    <div class="tbl">
        <el-text style="margin-left: 10px;" tag="b" type="info" size="large">{{ selectedMonth.month }}</el-text>
        <el-table :data="tableData" border style="width: 100%" :row-style="rowState" :header-cell-style="headerRowState">
            <el-table-column prop="date" label="日付" width="110" />
            <el-table-column prop="week" label="曜日" width="70" />
            <el-table-column prop="startDate" label="開始時刻" width="130">
                <el-time-select v-model="input" start="09:00" step="00:15" end="23:59" placeholder="00:00" />
            </el-table-column>
            <el-table-column prop="endDate" label="終了時刻" width="130">
                <el-time-select v-model="input" start="09:00" step="00:15" end="23:59" placeholder="00:00" />
            </el-table-column>
            <el-table-column prop="lunchBreak" label="昼休(時間)" width="100" />
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
import { ref } from 'vue';
import { Edit } from '@element-plus/icons-vue'

// 選択した月を取得
// let selectedMonth = defineProps<{ monthOfSelected: string }>()
let selectedMonth = defineProps(['month'])

const input = ref('')
const tableData = [
    {
        date: '2023-11-10',
        week: '月曜日',
        startDate: '09:00',
        endDate: '18:00',
        lunchBreak: '1.00',
        workTime: '8.00',
        others: ''
    },
    {
        date: '2023-11-11',
        week: '火曜日',
        startDate: '09:00',
        endDate: '18:00',
        lunchBreak: '1.00',
        workTime: '8.00',
        others: ''
    },
]

// 行内css
const rowState = ({ row, rowIndex }: { row: string, rowIndex: string }) => {
    if (rowIndex == '1') {
        return {
            // backgroundColor: 'red'
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