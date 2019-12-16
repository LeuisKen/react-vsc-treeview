export function getUser() {
    return new Promise<User>(resolve => {
        setTimeout(() => {
            resolve({
                username: 'John',
                email: 'john@example.com',
                collection: ['one', 'two', 'three']
            });
        }, 1000);
    });
}

export interface User {
    username: string;
    email: string;
    collection: string[];
}
