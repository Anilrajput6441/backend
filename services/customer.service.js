import prisma from '../config/db.js';

export const createCustomer = async (data) => {
  try {
    return await prisma.customer.create({ data });
  } catch (err) {
    if (err.code === 'P2002') {
      throw {
        status: 409,
        message: 'Email or phone already exists'
      };
    }
    throw err;
  }
};

export const getCustomers = async (page, limit) => {
  const skip = (page - 1) * limit;

  const [data, totalRecords] = await Promise.all([
    prisma.customer.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.customer.count()
  ]);

  return {
    page,
    limit,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
    data
  };
};

export const getCustomerById = async (id) => {
  const customer = await prisma.customer.findUnique({
    where: { id }
  });

  if (!customer) {
    throw { status: 404, message: 'Customer not found' };
  }

  return customer;
};

export const updateCustomer = async (id, data) => {
  try {
    return await prisma.customer.update({
      where: { id },
      data
    });
  } catch (err) {
    if (err.code === 'P2025') {
      throw { status: 404, message: 'Customer not found' };
    }
    throw err;
  }
};

export const deleteCustomer = async (id) => {
  try {
    await prisma.customer.delete({ where: { id } });
    return { message: 'Customer deleted successfully' };
  } catch {
    throw { status: 404, message: 'Customer not found' };
  }
};
