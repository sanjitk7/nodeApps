const add = (a,b) => {
    return new Promise((resolve, reject) => {
        if (a <0 || b<0){
            return reject("Negative Numbers not allowed")
        }
        setTimeout(()=>{
            resolve(a+b)
        },2000)
    })
}

const doWork = async () => {
    const sum1 = await add(100,7)
    const sum2 = await add(sum1,-3)
    return sum2
}

doWork().then(result => {
    console.log("sum2:",result)
}).catch(e => {
    console.log("e ",e)
})