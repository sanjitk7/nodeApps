setTimeout(()=> {
    console.log("2 seconds are up!")
},2000)

// A call back function is a function that is passed as an argument into another function.
// For eg, setTimeout(callback, time) takes in a function and time as arguments, executes the fn after the 'time'
// that is setTimeout is a fn that waits and executes its callback fn and that is the role of the function itself

//another example is the argument in filter()

const list = ["Sanjit","Kumar", "GoDaddy", "Rookie"]
const shortNames = list.filter((name) => {
    return name.length <= 5
})
console.log(shortNames)

//but we cant use a return value to construct a asynchronous function because it wont execute untill main finishes executing but we 
//would expect the return of the asynchrounous fn before main terminates which is paradoxical
// lets sim the asynch fn using setTimeout use callback

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
        latitude: 0,
        longitude: 0
    }
    callback(data)
},2000)
}

geocode("Erode",(data) => {
    console.log(data)
})

//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (no1, no2, callbackFn) => {
    setTimeout(() => {
        sum = no1 + no2
        callbackFn(sum)
    },2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})
