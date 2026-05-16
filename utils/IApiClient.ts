export interface IApiClient{
    get<T>(url: string, headers?: Record<string, string>):Promise<T>
    put<T, B>(url: string, body: B, headers?: Record<string, string>):Promise<T> 
    post<T, B>(url: string, body: B, headers?: Record<string, string>):Promise<T>
    patch<T, B>(url: string, body: B, headers?: Record<string,string>):Promise<T>
    delete<T>(url: string, headers?: Record<string, string>):Promise<T>
}