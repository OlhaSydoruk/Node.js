
function arrayChangeElement<T>(array: T[], rule:(item: T)=>boolean): T[]{
    let deletedElements: T[] = [];
    for(let i = array.length-1; i>0; i--){
        if(rule(array[i])){
            deletedElements.push(array.splice(i,1)[0])
            }
    }
    return deletedElements;
}
const arrayNumber = [1,2,3,4,5,6,7]
const arrayString = ['Switzerland', 'Germany','Ukraine','England']
console.log(arrayChangeElement(arrayNumber, (item)=>item%2===0));
console.log(arrayNumber)
console.log(arrayChangeElement(arrayString,(item)=>item==='England'));
console.log(arrayString)
