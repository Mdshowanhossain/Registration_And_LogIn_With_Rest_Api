const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({

    firstName: {
        type: String,
        min: 2,
        require: true,
    },
    lastName: {
        type: String,
        min: 3,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('This Email Is Invalid')
            }
        }
    },
    password: {
        type: String,
        require: true,
        min: 4
    },
    cPassword: {
        type: String,
        require: true,
    },
    mobile: {
        type: Number,
        require: true,
        unique: true,
        min: 10,
    },
    age: {
        type: Number,
        require: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

employeeSchema.pre("save", async function (next) {

    if (this.isModified()) {
        this.password = await bcrypt.hash(this.password, 10)
        this.cPassword = undefined
    }
    next();
})

const employeeRegister = new mongoose.model("EmployeeRegistration", employeeSchema)
module.exports = employeeRegister;