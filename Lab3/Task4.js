let calc = function () {
    let args = [];
    for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (acc, val) { return acc + val; }, 0);
};
let wrapper = function (fn) {
    let cache = new Map();
    return function () {
        let args = [];
        for (let _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        let key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log(cache.get(key) + " from cache");
            return cache.get(key);
        }
        else {
            let result = fn.apply(void 0, args);
            cache.set(key, result);
            console.log(result + " calculated");
            return result;
        }
    };
};
let cachedCalc = wrapper(calc);
cachedCalc(2, 2, 3, 2); // 9 calculated
cachedCalc(5, 8, 1); // 14 calculated
cachedCalc(2, 2, 3, 2); // 9 from cache