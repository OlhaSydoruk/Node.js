import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm"
import {UserEntity} from "./UserEntity.js";

@Entity('posts')
export class PostEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    dateCreation: Date;

    @Column({
        nullable: false
    })
    title: string;

    @Column({
        nullable: false
    })
    text: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity;


    constructor(id: number, dateCreation: Date, title: string, text: string, user: UserEntity) {
        this.id = id;
        this.dateCreation = dateCreation;
        this.title = title;
        this.text = text;
        this.user = user;
    }
}
