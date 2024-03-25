import { BaseEntity } from "@common";

export abstract class IAuthService {
    /** 
     * Get service by user type
     * @param userType Type of target user
     * @return BaseAuthService
     * @example this.authService.getService('user')
     */
    abstract getService(userType: UserType): BaseAuthService;
}

export interface BaseAuthService {
    /** 
     * Validate user by username and password
     * @param username Username login
     * @param password Password login
     * @return Promise<BaseAuthEntity>
     * @example this.authService.getService('user').validateUserByUsernamePassword(username, password)
     */
    validateUserByUsernamePassword(username: string, password: string): Promise<BaseAuthEntity>;

    /** 
     * Validate user by its id
     * @param id User's id
     * @return Promise<BaseAuthEntity>
     * @example this.authService.getService('user').validateUserById(uuid)
     */
    validateUserById(id: string): Promise<BaseAuthEntity>;
}

export class BaseAuthEntity extends BaseEntity {
    username!: string;
    password!: string;
}