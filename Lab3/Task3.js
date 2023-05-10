function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
let student = [
    {name: "Alan"},
    {surname: "Lipton"},
    {gradeBook: 1324},
    {group: "IA-11"},
    {faculty: "FICT"},
    {subjects:["High Math","JavaScript","Java","WEB"]}
];
console.log(student[2] === deepClone(student)[2]); // false