export class User {
    id?: number;
    username: string;
    email: string;
    age: number;
    info?: string;
    address: {
        city: string;
        street: string;
    };

    constructor(id: number, username: string, email: string, age: number, info: string, address: { city: string; street: string }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.age = age;
        this.info = info;
        this.address = address;
    }
}