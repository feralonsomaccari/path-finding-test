export const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

export const getClosestMultiplier = (n, multiplier) => {
    let closestMultiplier = n + (multiplier / 2) - 10;
    closestMultiplier = closestMultiplier - (n % multiplier);
    return closestMultiplier;
}
