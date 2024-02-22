import axios from "axios"
import { ref } from "vue"
import useCalendarDataStore from "../../store/calendarData"

export default function () {

    // 指定月のカレンダー情報タイプ
    interface daysType {
        date: number,
        dayOfWeek: string,
        isCurrentMonth: boolean,
        holidayName: string,
        startTime: string,
        endTime: string,
        lunchBreak: string,
        workTime: string,
        others: string,
        enEdit: boolean,
        isWorkDay: boolean
    }
    interface calendarDataInfo {
        year: number,
        month: number,
        days: daysType[],
    }

    // 指定月のカレンダー情報
    let calendarData = ref<calendarDataInfo>({
        year: 0,
        month: 0,
        days: []
    })

    // 祝日情報タイプ定義
    interface holidayArrType {
        date: string,
        name: string,
        type: string,
    }
    interface holidayResponseType {
        data: [
            {
                date: string,
                name: string,
                type: string,
            }
        ],
        status: number
    }

    let holidaysArr = ref<holidayArrType[]>()

    // 勤務表データ作成
    const getMonthInfo = (targetDate: string) => {

        let calendarDataInfo = useCalendarDataStore()

        const [year, month] = targetDate.split('-')
        // 目標年
        const targettYear = parseInt(year)
        // 目標月
        const targetMonth = parseInt(month)
        // 現時点の日付
        const currentDate = new Date()
        // 指定月の一日
        const firstDay = new Date(targettYear, +targetMonth - 1, 1)
        // 指定月の最後日
        const lastDay = new Date(targettYear, +targetMonth, 0)

        //　カレンダーオブジェクト作成
        calendarData.value.year = parseInt(year)
        calendarData.value.month = targetMonth
        calendarData.value.days = []

        // 目標月の勤務表既存データがあれば、読み込む
        let existCalendarData: boolean = false
        calendarDataInfo.calendarDataArr = calendarDataInfo.calendarDataArr.filter(arr => {
            if (arr.year === targettYear && arr.month === targetMonth) {
                arr.days.forEach(day => day.enEdit = false)
                calendarData.value.days = JSON.parse(JSON.stringify(arr.days))
                existCalendarData = true
            }
            // 今年以外のデータを削除
            return arr.year === currentDate.getFullYear();
        });

        if (!existCalendarData) {
            let currentDatePointer = new Date(firstDay);
            while (currentDatePointer <= lastDay) {
                const date = currentDatePointer.getDate()
                const dayOfWeek = weekNameConvert(currentDatePointer.getDay())
                const isCurrentMonth = currentDatePointer.getMonth() === currentDate.getMonth()
                const holidayName = ''
                const lunchBreak = '0.00'
                const enEdit = false
                const startTime = ref<string>('00:00')
                const endTime = ref<string>('00:00')
                const workTime = ref<string>('0.0')
                const others = ref<string>('')
                const isWorkDay = ref<boolean>(true)

                const day = ref({ date, dayOfWeek, isCurrentMonth, holidayName, startTime, endTime, lunchBreak, workTime, others, enEdit, isWorkDay })
                calendarData.value.days.push(day.value)
                currentDatePointer.setDate(day.value.date + 1)
            }

            // 祝日取得と設定
            getHolidayInfo(targetDate, calendarData.value.days)
        }
    }

    // 曜日を漢字に変換
    const weekNameConvert = (value: number) => {
        const daysOfWeek: string[] = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
        return daysOfWeek[value]
    }

    const getHolidayInfo = async (targetMonth: string, days: daysType[]) => {
        const response: holidayResponseType = await axios.get(`https://api.national-holidays.jp/${targetMonth}`)
        if (response.status === 200) {
            holidaysArr.value = response.data
            days.forEach(item => {
                // 休日場合、昼休時間を00:00に設定
                if (['土曜日', '日曜日'].includes(item.dayOfWeek)) {
                    item.lunchBreak = '0.00'
                }
                // 祝日名設定
                let itemString: string = String(item.date).padStart(2, '0')
                itemString = targetMonth + '-' + itemString
                holidaysArr.value?.forEach(arrItem => {
                    if (arrItem.date === itemString) {
                        item.holidayName = arrItem.name
                        // 昼休時間を00:00に設定
                        item.lunchBreak = '0.00'
                    }
                })
            })
            return ''
        } else {
            return ''
        }
    }


    interface daysType {
        date: number,
        dayOfWeek: string,
        isCurrentMonth: boolean,
        holidayName: string,
        startTime: string,
        endTime: string,
        lunchBreak: string,
        workTime: string,
        others: string,
        enEdit: boolean,
        isWorkDay: boolean
    }
    // autoInput
    const autoInput = (value: daysType) => {
        value.startTime = '09:00'
        value.endTime = '18:00'
        value.lunchBreak = '1.00'
    }
    // resetRow
    const resetRow = (value: daysType) => {
        value.startTime = '00:00'
        value.endTime = '00:00'
        value.lunchBreak = '0.00'
        value.others = ''
    }

    return {
        calendarData, holidaysArr, getMonthInfo, autoInput, resetRow
    }
}



