/**
 * Interface for login payload
 */
export interface LoginPayload{
    username: string;
    password: string;
}
/**
 * Interface for Login response
 */
export interface LoginResponseModel {
    is_success: boolean;
    data: DataModel
}
/**
 * Interface for Login data
 */
export interface DataModel {
    token: string;
}