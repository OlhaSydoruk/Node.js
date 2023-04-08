//Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного.
function toMass(string) {
    let listChar = [];
    for (let char of string) {
        listChar.push(char)
    }
    return listChar;
}


let anagrama = function (a, b) {
    let listB = toMass(b);
    let listA = toMass(a);
    let flag = true;
    listB.forEach((i) => {
        listA.includes(i) ? listA = listA.filter(el => el !== i) : flag = false
    });
    return flag;
}

console.log("It`s anagrama ?   " + anagrama('stre', 'ster'))