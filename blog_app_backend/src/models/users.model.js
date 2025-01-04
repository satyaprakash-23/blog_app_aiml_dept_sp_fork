import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    enrollment: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      // required: true, // -> Its not mandatory! We'll provide a default avatar in case of no avatar.
      default:
        "https://res.cloudinary.com/dx5dlghqe/image/upload/v1735927377/genderNeutralAvatar_ywbjph.png",
    },
    refreshToken: {
      type: String,
      // required: true, -> Of course, it should not be a required field.
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// export const User = mongoose.model("User", userSchema);
// Instead of the above line, we can write this as below:-
const User = mongoose.model("User", userSchema);
// export User; -> Wrong
export {User};