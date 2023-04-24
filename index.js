const {
    default: mongoose
} = require("mongoose");

const User = require('./User');

const connectDatabase = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/StudyControl")
        console.log("connected")
    }
    catch (error) {
        console.error(error)
    }
}
connectDatabase()
const newUser = new User({
    username: 'Ngoc',
    password: 'ngocars2002'
});

const writeDB = async () => {
    await User.create({
        username: "john_doe",
        password: "password123",
        age: 35,
        salary: 50000
    },

        {
            username: "bob_johnson",
            password: "password789",
            age: 42
        },

        {
            username: "sarah_wong",
            password: "passwordabc",
            age: 29,
            salary: 55000
        },

        {
            username: "tom_jones",
            password: "passworddef",
            age: 45,
            salary: 75000
        });
}
// writeDB()

const findDB = async () => {
    const users = await User.find()
        .or([
            { age: { $gte: 18 } },
            { salary: { $gte: 50000 } }
        ])
        .and([
            {
                $or: [
                    { username: { $regex: /john/i } },

                ]
            }
        ])
        .sort({ createAt: -1 })
        .limit(10)
        .select('username age')

    console.log(users)
}
findDB()



// User.updateOne(
//     { username: 'bob_johnson' },
//     {
//         salary: 30000
//     }
// )
//     .then(data => console.log(data))
//     .catch(error => console.error(error))

const deleteOne = async () => {
    await User.deleteOne({ username: 'Ngoc' })
}

// deleteOne()

const deleteAll = async () => {
    await User.deleteMany({})
}
// deleteAll()

