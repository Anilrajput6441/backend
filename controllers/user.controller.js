import { getAllUsersService, getUserByIdService, updateUserRoleService } from "../services/user.service.js";

export const getAllUsers = async(req, res, next) => {
    try {
        const user = await getAllUsersService();
        res.status(200).json({ user });
    } catch (error) {
        next(error)
    }
};

export const getUserById = async(req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        res.status(200).json({ user });
    } catch (error) {
        next(error)
    }
};


export const updateUserRole = async(req, res, next) => {
    try {
        const user = await updateUserRoleService(req.params.id, req.body.role);
        res.status(200).json({ user });
    } catch (error) {
        next(error)
    }
};
