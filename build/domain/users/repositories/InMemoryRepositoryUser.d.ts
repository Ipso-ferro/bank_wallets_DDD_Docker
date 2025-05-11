import { User } from "../models/User";
import { RepositoryUser } from "./RepositoryUser";
export declare class InMemoryRepositoryUser implements RepositoryUser {
    private listOfUsers;
    addNewUser(user: User): Promise<void>;
    getUserById(id: string): Promise<User | undefined>;
    getAllUsers(): Promise<User[]>;
}
