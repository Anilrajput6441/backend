import prisma from '../config/db.js';


export const createTask = async (data) => {

    const user = await prisma.user.findUnique({
        where: { id: data.assignedTo }
    });

    if (!user || user.role !== 'EMPLOYEE') {
        throw {
            status: 400,
            message: 'Assigned user must be an EMPLOYEE'
        };
    }


    const customer = await prisma.customer.findUnique({
        where: { id: data.customerId }
    });

    if (!customer) {
        throw {
            status: 404,
            message: 'Customer not found'
        };
    }

    return prisma.task.create({
        data
    });
};

export const getTasks = async (user) => {
    if (user.role === 'ADMIN') {
        return prisma.task.findMany({
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                },
                customer: {
                    select: { id: true, name: true, email: true, phone: true }
                }
            }
        });
    }

    return prisma.task.findMany({
        where: { assignedTo: user.userId },
        include: {
            customer: {
                select: { id: true, name: true, email: true, phone: true }
            }
        }
    });
};


export const updateTaskStatus = async (taskId, status, user) => {
    const task = await prisma.task.findUnique({
        where: { id: taskId }
    });

    if (!task) {
        throw { status: 404, message: 'Task not found' };
    }


    if (user.role === 'EMPLOYEE' && task.assignedTo !== user.userId) {
        throw { status: 403, message: 'Forbidden' };
    }

    return prisma.task.update({
        where: { id: taskId },
        data: { status }
    });
};
