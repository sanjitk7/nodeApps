//shorthand while initialising

const Name = "Sanjit"
const Sex = "M"
const University = "VIT Vellore"

const sanjitInfo = {
    Name,
    Gender: Sex,
    College: University
}

// destructure an object

const product = {
    name: "GRE PREP BOOK",
    price: "$100",
    netWeight: "570g",
}

// const { name:productName, price="$120", rating, type ="book" } = product
// console.log(productName,rating,type,price)

const transaction = (type, { name, price}) => {
    console.log(name, price)
}

transaction("Purchase", product)