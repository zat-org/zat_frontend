import type { IStartAt } from "~/Models/IStartAt";

function sortByTime(a: IStartAt, b: IStartAt) {
    let d1 = new Date(a.start_at);
    let d2 = new Date(b.start_at);
    return d1.getTime() - d2.getTime();
}

function getIndexOfUpcomingEvent(arr: IStartAt[]) {
    if (!arr || arr.length < 1) return 0;
    
    let currentDate = new Date()
    console.log('Current date:', currentDate.toISOString())
    
    for (let i = 0; i < arr.length; i++) {
        const eventDate = new Date(arr[i].start_at)
        console.log(`Event ${i}: ${eventDate.toISOString()} - ${eventDate >= currentDate ? 'UPCOMING' : 'PAST'}`)
        
        if (eventDate >= currentDate) {
            // Found the first upcoming event
            // Return the previous event (i-1) or 0 if this is the first event
            const resultIndex = i - 1 >= 0 ? i - 1 : 0
            console.log(`Found upcoming event at index ${i}, returning index ${resultIndex}`)
            return resultIndex
        }
    }
    
    // All events are in the past, return the last event
    console.log('All events are in the past, returning last event index:', arr.length - 1)
    return arr.length - 1;
}
export { sortByTime, getIndexOfUpcomingEvent }