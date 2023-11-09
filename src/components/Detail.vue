<template>
    <div class="tbl">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日付" width="180" text-align="center" />
            <el-table-column prop="week" label="曜日" width="180" />
            <el-table-column prop="startDate" label="開始" width="110">
                <div style="display: flex;">
                    <el-input v-model="input" placeholder="時" />
                    <el-input style="margin-left: 1px;" v-model="input" placeholder="分" />
                </div>
            </el-table-column>
            <el-table-column prop="endDate" label="終了" width="110">
                <div style="display: flex;">
                    <el-input v-model="input" placeholder="時" />
                    <el-input style="margin-left: 1px;" v-model="input" placeholder="分" />
                </div>
            </el-table-column>
            <el-table-column prop="lunchBreak" label="昼休み(時間)" width="180" />
            <el-table-column prop="workTime" label="勤務時間" width="180" />
            <el-table-column prop="others" label="備考" width="180" />
        </el-table>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
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

</script>
<style scoped lang="scss">
.tbl {
    ::v-deep(.el-table .cell) {
        text-align: center;
    }
}
</style>