import { ref } from "vue"
import { ElMessage } from 'element-plus'

export default function () {
    // 月を選択した場合、勤務表を表示する
    let selectedMonth = ref<boolean>(false)
    // 選択した月
    let monthOfSelected = ref<string>('')

    // 月を選択後に勤務表作成画面へ遷移
    const toKinndai = () => {
        if ((monthOfSelected.value === '') || (monthOfSelected.value === null)) {
            ElMessage.error('月分を選択ください')
            return
        }
        selectedMonth.value = !selectedMonth.value
    }

    // 月を選択へ戻る
    const backToSelectMonth = () => {
        selectedMonth.value = false
    }

    return {
        selectedMonth, monthOfSelected, toKinndai, backToSelectMonth
    }
}

