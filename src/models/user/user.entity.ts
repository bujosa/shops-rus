import mongoose from "mongoose";
import { IUser } from "../../interfaces/user.interface";

export interface IUserModel extends mongoose.Model<IUserDoc> {
  build(user: IUser): IUserDoc;
}

export interface IUserDoc extends mongoose.Document {
  id: string;
  fullName: string;
  affiliate: boolean;
  employee: boolean;
  createdAt: string;
}

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    affiliate: {
      type: Boolean,
      default: false,
    },
    employee: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: String,
      default: new Date().toISOString(),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

userSchema.pre("save", function (next) {
  this.id = this._id;

  next();
});

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export { User };
