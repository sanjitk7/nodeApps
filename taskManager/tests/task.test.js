const request = require("supertest")
const app = require("../src/index")
const User = require("../src/models/users")
const Task = require("../src/models/tasks")
const { userOneId,userOne,setupdb, taskThree} = require("./fixtures/db")

beforeEach(setupdb)

test("create task", async ()=> {
    const response = await request(app)
    .post("/tasks")
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({"description":"testtesttest"})
    .expect(201)

    const foundTask = await Task.findById(response.body._id)
    expect(foundTask).not.toBeNull()
    expect(foundTask.completed).toEqual(false)
})

test("list all user1 tasks", async ()=>{
    const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body.length).toEqual(2)
})

test("user1 cant delete user2 task", async ()=>{

    await request(app)
    .delete("/tasks")
    .query({ id:taskThree._id})
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(404)

    const foundTaskThreeFromDB = Task.findById(taskThree._id)
    expect(foundTaskThreeFromDB).not.toBeNull()
})