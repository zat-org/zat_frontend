import type { IStartAt } from "~/Models/IStartAt";

function sortByTime(a: IStartAt, b: IStartAt) {
    let d1 = new Date(a.start_at);
    let d2 = new Date(b.start_at);
    return d1.getTime() - d2.getTime();
}

function getIndexOfUpcomingEvent(arr: IStartAt[]) {
    if (!arr || arr.length < 1) return 0;
    let currentDate = new Date()
    for (let i = 0; i < arr.length; i++) {
        if (new Date(arr[i].start_at) >= currentDate) {
            return i - 1 >= 0 ? i - 1 : 0
        }
    }
    return arr.length - 1;
}
export { sortByTime, getIndexOfUpcomingEvent }