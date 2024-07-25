import { User } from "../Types/Entities";

export const useUser = async (authToken: string): Promise<User | null> => {
    return { id: 1, name: "John Doe" };
};