import { defineStore } from "pinia"

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

const useCalendarDataStore = defineStore('calendarData', {
    state: () => {
        return {
            calendarDataArr: [] as calendarDataInfo[],
        }
    },
    persist: true

})
export default useCalendarDataStore