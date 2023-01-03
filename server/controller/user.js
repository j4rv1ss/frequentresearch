import bcrypt from "bcrypt";

import { User } from "../model/user.js";

import tryCatch from "../middleware/tryCatch.js";
import { isPhone, isPassword, isEmail } from "../utils/validation.js";

import Error from "../utils/error.js";

export const signup = tryCatch(async (req, res, next) => {
  let data = req.body;
  let { firstname, lastname, email, phone, password } = data;

  if (!firstname.match(/^[a-zA-Z]{2,20}$/)) {
    return next(new Error(`First Name only contain letters`, 400));
  }
  data.firstname = firstname[0].toUpperCase() + firstname.slice(1);

  if (!lastname.match(/^[a-zA-Z]{2,20}$/)) {
    return next(new Error(`Last Name only contain letters`, 400));
  }
  data.lastname = lastname[0].toUpperCase() + lastname.slice(1);
  if (!isPhone(phone)) {
    return next(new Error(`Please provide Indian valid number`, 400));
  }
  if (!isEmail(email)) {
    return next(new Error(`Email is not valid`, 400));
  }

  const isEmailUnique = await User.findOne({ email });
  if (isEmailUnique) {
    return next(new Error(`This email is already registered`, 400));
  }

  if (!isPassword(password)) {
    return next(
      new Error(`Password Suggestion : 8-15 digits contains !@#$%^&*`, 400)
    );
  }
  data.password = await bcrypt.hash(password, 12);

  const saveData = await User.create(data);

  let id = { _id: saveData._id };
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  };

  return res
    .status(201)
    .cookie("id", id, options)
    .send({ success: true, data: saveData, id: id });
});
