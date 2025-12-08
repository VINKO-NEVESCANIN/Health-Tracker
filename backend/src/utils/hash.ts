import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};


//import bcrypt from "bcrypt";
//
//export const hashPassword = async (password: string) => {
//  return bcrypt.hash(password, 10);
//};
//
//export const comparePassword = async (password: string, hash: string) => {
//  return bcrypt.compare(password, hash);
//};
