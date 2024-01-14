//Adjusting UTC time to EDT time - not this is only good for March through November (local times change at 2:00 a.m. EST to 3:00 a.m. EDT on the second Sunday in March, and return from 2:00 a.m. EDT to 1:00 a.m. EST on the first Sunday in November)
export function adjUTCtoEDT(timeToConvert){
    let currentHours = timeToConvert.getUTCHours();
    let hourDiff = 4;
    timeToConvert.setUTCHours(currentHours-hourDiff);
    return timeToConvert;
}

export function adjEDTtoUTC(timeToConvert){
    let currentHours = timeToConvert.getUTCHours();
    let hourDiff = 4;
    timeToConvert.setUTCHours(currentHours+hourDiff);
    return timeToConvert;
}