const calc = (...args: number[]): number => args.reduce((acc, val) => acc + val, 0);
const wrapper = (fn: (...args: number[]) => number): ((...args: number[]) => number) => {
    let cache: Map<string, number> = new Map();
    return function (...args: number[]): number {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log(cache.get(key) + " from cache");
            return cache.get(key)!;
        } else {
            const result = fn(...args);
            cache.set(key, result);
            console.log(result + " calculated");
            return result;
        }
    };
};

const cachedCalc = wrapper(calc);
cachedCalc(2, 2, 3, 2); // 9 calculated
cachedCalc(5, 8, 1); // 14 calculated
cachedCalc(2, 2, 3); // 7 from cache