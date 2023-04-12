export const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

export const getClosestMultiplier = (n, multiplier) => {
    let closestMultiplier = n + (multiplier / 2) - 10;
    closestMultiplier = closestMultiplier - (n % multiplier);
    return closestMultiplier;
}

export const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}