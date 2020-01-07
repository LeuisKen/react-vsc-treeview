export function getUser() {
    return new Promise<User>(resolve => {
        setTimeout(() => {
            resolve({
                username: 'John',
                email: 'john@example.com',
                collection: ['Add', 'Update', 'Delete']
            });
        }, 1000);
    });
}

export interface User {
    username: string;
    email: string;
    collection: string[];
}
