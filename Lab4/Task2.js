function arrayChangeElement(array, rule) {
    var deletedElements = [];
    for (var i = array.length - 1; i > 0; i--) {
        if (rule(array[i])) {
            deletedElements.push(array.splice(i, 1)[0]);
        }
    }
    return deletedElements;
}
var arrayNumber = [1, 2, 3, 4, 5, 6, 7];
var arrayString = ['Switzerland', 'Germany', 'Ukraine', 'England'];
console.log(arrayChangeElement(arrayNumber, function (item) { return item % 2 === 0; }));
console.log(arrayNumber);
console.log(arrayChangeElement(arrayString, function (item) { return item === 'England'; }));
console.log(arrayString);
