import bcrypt from "bcryptjs";

const comparePass = async (inputPass, hashedPass) => {
  return await bcrypt.compare(inputPass, hashedPass);
};
export default comparePass;