function add(number) {
    var sum = number;
    function innerAdd(nextNumber) {
        if (nextNumber === undefined) {
            return sum;
        }
        sum += nextNumber;
        return innerAdd;
    }
    return innerAdd;
}
console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37