function anagrama(a,b){
    const sortA = a.split('').sort().join('');
    const sortB = b.split('').sort().join('');
    return sortA===sortB;
}
console.log(anagrama("Stress","strSes"));//true
console.log(anagrama("Stress","rteSssss"));//false