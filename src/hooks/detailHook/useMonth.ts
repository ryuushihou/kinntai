import axios from "axios"
import { ref } from "vue"

export default function () {

    // 指定月のカレンダー情報タイプ
    interface daysType {
        date: number,
        dayOfWeek: string,
        isCurrentMonth: boolean,
        holidayName: string
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

    const getMonthInfo = (targetDate: string) => {

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
        calendarData.value.year = currentDate.getFullYear()
        calendarData.value.month = targetMonth
        calendarData.value.days = []

        let currentDatePointer = new Date(firstDay);
        while (currentDatePointer <= lastDay) {
            const date = currentDatePointer.getDate()
            const dayOfWeek = weekNameConvert(currentDatePointer.getDay())
            const isCurrentMonth = currentDatePointer.getMonth() === currentDate.getMonth()
            const holidayName = ''
            const day = { date, dayOfWeek, isCurrentMonth, holidayName }
            calendarData.value.days.push(day)
            currentDatePointer.setDate(day.date + 1)
        }
        getHolidayInfo(targetDate, calendarData.value.days)
    }

    // 曜日を漢字に変換
    const weekNameConvert = (value: number) => {
        const daysOfWeek = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
        return daysOfWeek[value]
    }

    // 祝日取得
    const getHolidayInfo = async (targetMonth: string, days: daysType[]) => {
        const response: holidayResponseType = await axios.get(`https://api.national-holidays.jp/${targetMonth}`)
        if (response.status === 200) {
            holidaysArr.value = response.data
            days.forEach(item => {
                let itemString: string = String(item.date).padStart(2, '0')
                itemString = targetMonth + '-' + itemString
                holidaysArr.value?.forEach(arrItem => {
                    if (arrItem.date === itemString) {
                        item.holidayName = arrItem.name
                    }
                })
            })
            return ''
        } else {
            return ''
        }
    }

    return {
        calendarData, holidaysArr, getMonthInfo
    }
}



