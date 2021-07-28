import IUser from "../Models/User";
import api from "../utils/api";

class UserService {

    static async get(id?: number) {
        try {
            const response = await api.get(`/user/${id}`);
            return response.data;
        }
        catch (e) {
            return {
                status: 400
            }
        }
    }

    static async getAll() {

        try {
            const response = await api.get(`/user`);
            return response.data;
        }
        catch (e) {
            return {
                status: 400
            }
        }
    }

    static async store(data: IUser) {

        try{
            const response = await api.post(`/user`, data);
            return response.data;
        }
        catch(e){
            return {
                status: 400
            }
        }

    }

    static async update() {

    }

    static async delete() {

    }

}

export default UserService;

