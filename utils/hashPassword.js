import bcrypt from "bcryptjs";

const hashPass = async (pass) => {
  return await bcrypt.hash(pass, 10);
};
export default hashPass;
