import { Bank } from "./Bank";
import { Fintech } from "./Fintech";
import { Users } from "./Users";
import { UsersAccount } from "./UsersAccount";
export declare class BusinessEntity {
    entityId: number;
    entityModifiedDate: string | null;
    bank: Bank;
    fintech: Fintech;
    users: Users;
    usersAccounts: UsersAccount[];
}
