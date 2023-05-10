function anagram(firstRow: string, secondRow: string): boolean {
    const sortedFirstRow = firstRow.split('').sort().join('');
    const sortedSecondRow = secondRow.split('').sort().join('');
    return sortedFirstRow === sortedSecondRow;
}
console.log(anagram("Stress","strSes")); // true
console.log(anagram("Stress","rteSssss")); // false