// Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром.

let student=[{
    name: "Alan",
    surname:"Lipton",
    gradeBook: 1324,
    group: "IA-11",
    faculty: "FICT",
    subjects:["High Math","JavaScript","Java","WEB"]
}]
let copy = structuredClone(student);

function print(object){
    console.log(object.name,object.surname,object.gradeBook,object.group,object.faculty,object.subjects)
}
console.log("Student");
print(student)
console.log("Copy")
print(copy)
console.log(student.name===copy.name)
