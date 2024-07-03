//since mongo works with models, we import mongoose in every model file
import mongoose from "mongoose";


// defining the model schema(the way it stores data)
const UserSchema = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});

//actual model to be generated on the database based on the schema and export it to actually deploy on it

export const UserModel = mongoose.model("users", UserSchema)
