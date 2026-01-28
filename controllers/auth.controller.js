import { loginService, registerService } from "../services/auth.service.js";


export const register = async (req, res, next) => {
    try {
        console.log(req.body)
        const user = await registerService(req.body);
        res.status(201).json({ user });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
   try {
     const user = await loginService(req.body);
     res.status(200).json({ user });
   } catch (error) {
     next(error);
   }
}   