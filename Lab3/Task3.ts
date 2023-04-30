function deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}
const student = [
    {name: "Alan"},
    {surname: "Lipton"},
    {gradeBook: 1324},
    {group: "IA-11"},
    {faculty: "FICT"},
    {subjects:["High Math","JavaScript","Java","WEB"]}
]
console.log(student[1] === deepClone(student)[1]); // false
