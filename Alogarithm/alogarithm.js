function alogarithm1(l, t) {
    let sum= 0
    let result = []
    for (let i = 1; i <= l; i++) {
        sum += i
        result.push(i)
        if (sum === t) {
            break
        }
        console.log(sum);

    }
    return result
   
}
console.log(alogarithm1(4,8));