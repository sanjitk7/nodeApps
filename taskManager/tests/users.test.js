const request = require("supertest")
const app = require("../src/index")
const User = require("../src/models/users")
const { userOneId,userOne,setupdb} = require("./fixtures/db")




beforeEach(setupdb)

test("create user", async ()=>{
    const response = await request(app).post("/users").send({
        name:"Test User",
        email:"Test1@example.com",
        password:"Hello12344"
    }).expect(201)

    // Assert DB Update
    const foundUser = await User.findById(response.body.newUser._id)
    expect(foundUser).not.toBeNull()

    // Assert object values
    expect(response.body).toMatchObject({
        newUser: {
            name:"Test User",
            email:"test1@example.com"
    },
    token: foundUser.tokens[0].token
})
    expect(foundUser.password).not.toBe(userOne.password)
})

test("login user", async ()=>{
    const response = await request(app).post("/users/login").send({
        email: userOne.email,
        password:userOne.password
    }).expect(200)

    const foundUser = await User.findById(userOneId)
    expect(response.body.token).toBe(foundUser.tokens[1].token)
})

test("login user fail with non-existant user", async ()=>{
    await request(app).post("/users/login").send({
        email: "emaildoesntexist@doestexistland.com",
        password:"randomstring"
    }).expect(400)
})

test("Should get profile for user", async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test("Should not get profile for invalid token", async () => {
    const invalidToken = "hbraehbfahsbg"
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send()
        .expect(401)
})

test("Should delete user", async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const foundUser = await User.findById(userOneId)
    expect(foundUser).toBeNull()
})

test("Should not delete user for invalid auth", async () => {
    const invalidToken = "hbraehbfahsbg"
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${invalidToken}`)
        .send()
        .expect(401)
})

// test("upload pic", async()=>{
//     await request(app)
//     .post("/users/me/avatar")
//     .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
//     .send("avatar","tests/fixtures/profile-pic.jpg")
//     .expect(200)

//     // const foundUser = await User.findById(userOneId)
//     // expect(foundUser.avatar).toEqual(expect.any(Buffer))
// })

test("user updates valid auth", async ()=> {
    const response = await request(app)
    .patch("/users/me")
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "new change"})
    .expect(200)
    const foundUser = await User.findById(userOneId)
    expect(foundUser.name).toBe("new change")

})

test("user updates invalid field", async ()=> {
    const response = await request(app)
    .patch("/users/me")
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "new change"})
    .expect(400)

})