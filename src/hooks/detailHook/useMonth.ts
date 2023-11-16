import axios from "axios"
import { computed, ref } from "vue"
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
        enEdit: boolean
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
        calendarData.value.year = currentDate.getFullYear()
        calendarData.value.month = targetMonth
        calendarData.value.days = []

        // 目標月の勤務表既存データがあれば、読み込む
        let existCalendarData: boolean = false
        calendarDataInfo.calendarDataArr.forEach(arr => {
            if (arr.year === targettYear && arr.month === targetMonth) {
                calendarData.value.days = arr.days
                existCalendarData = true
            }
        })

        if (!existCalendarData) {
            let currentDatePointer = new Date(firstDay);
            while (currentDatePointer <= lastDay) {
                const date = currentDatePointer.getDate()
                const dayOfWeek = weekNameConvert(currentDatePointer.getDay())
                const isCurrentMonth = currentDatePointer.getMonth() === currentDate.getMonth()
                const holidayName = ''
                const lunchBreak = '1.00'
                const enEdit = false

                // 作業開始日と終了日
                let startTime = ref<string>('00:00')
                let endTime = ref<string>('02:00')
                // 毎日作業総時間
                const workTime = computed(() => {
                    let startTime2 = new Date(`1970-01-01T${startTime.value}:00.000Z`)
                    let endTime2 = new Date(`1970-01-01T${endTime.value}:00.000Z`)
                    let timeDifference: number = (endTime2.getTime() as number) - (startTime2.getTime() as number)
                    return Math.floor(timeDifference / (1000 * 60 * 60)).toString() + '.'
                        + Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)).toString()
                })

                // 備考
                const others = ref<string>('')

                const day = ref({ date, dayOfWeek, isCurrentMonth, holidayName, startTime, endTime, lunchBreak, workTime, others, enEdit })
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

    return {
        calendarData, holidaysArr, getMonthInfo
    }
}



