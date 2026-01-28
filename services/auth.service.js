import bcrypt from "bcrypt"
import prisma from "../config/db.js"
import jwt from "jsonwebtoken"

export const registerService = async ({ name, email, password, role }) => {
    console.log("register service")
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw { status: 409, message: "Email already exists" };
  }

  const normalizedRole = role?.toUpperCase();
  
  if (!normalizedRole || !['ADMIN', 'EMPLOYEE'].includes(normalizedRole)) {
    throw { status: 400, message: "Invalid role. Must be 'admin' or 'employee'" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role: normalizedRole },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const loginService = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  return {
    accessToken: token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
