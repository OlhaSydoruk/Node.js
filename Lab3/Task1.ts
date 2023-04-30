
function add(number: number): Function {
    let sum: number = number;
    function innerAdd(nextNumber?: number): Function | number {
        if (nextNumber === undefined) {
            return sum;
        }
        sum += nextNumber;
        return innerAdd;
    }
    return innerAdd;
}
console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37