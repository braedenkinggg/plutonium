const { Schema, model } = require("mongoose");
const argon2 = require("argon2");

const userSchema = new Schema({
        username: {
            type: String,
            required: true,
            index: {
                unique: true,
            },
            min: 3,
            max: 20,
        },

        name: {
            first: { type: String },
            last: { type: String },
        },

        email: {
            type: String,
            required: true,
            index: {
                unique: true,
            },
            min: 3,
            max: 35,
        },

        password: {
            type: String,
            required: true,
            min: 8,
        },

        url: {
            type: String,
        },

        github: {
            type: String,
        },
    },
    { toJSON: { virtuals: true } }
);

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    const hash = await argon2.hash(this.password);
    this.password = hash;

    return next();
});

userSchema.methods.verifyPwd = async function(clientPwd) {
    try {
        return await argon2.verify(this.password, clientPwd);
    } catch (err) {
        return false;
    }
}

userSchema.virtual("posts", {
    ref: "blogposts",
    localField: "_id",
    foreignField: "author"
});

const User = model("users", userSchema);

module.exports = User;