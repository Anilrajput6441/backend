import prisma from "../config/db.js"


export const getAllUsersService = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    })
    return users
}
export const getUserByIdService = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id }, select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        }
    })

    if(!user) throw { status: 404, message: "User not found" }

    return user
}
export const updateUserRoleService = async (id, role) => {

    // Validate role
    if (!role || !['ADMIN', 'EMPLOYEE'].includes(role)) {
        throw { status: 400, message: "Role must be ADMIN or EMPLOYEE" };
    }

    const user = await prisma.user.update({
        where: { id },
        data: { role }
    })
    
    if(!user) throw { status: 404, message: "User not found" }
    return user
}
