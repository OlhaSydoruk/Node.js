import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        nullable: false
    })
    username: string;

    @Column({
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    age: number;

    @Column({
        nullable: true
    })
    info: string;

    @Column('json', {
        nullable: true
    })
    address: { city: string; street: string };


    constructor(id: number, username: string, email: string, age: number, info: string, address: { city: string; street: string }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.age = age;
        this.info = info;
        this.address = address;
    }
}
