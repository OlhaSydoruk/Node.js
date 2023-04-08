
const calc = (a, b, c) => a + b + c;
const wrapper = (f) => {
    let cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log(cache.get(key) + " from cache");
        } else {
            cache.set(key, f(...args));
            console.log(f(...args) + " calculated");
        }
    }
};
const cachedCalc = wrapper(calc);
cachedCalc(2, 2, 3); // 7 calculated
cachedCalc(5, 8, 1); // 14 calculated
cachedCalc(2, 2, 3); // 7 from cache