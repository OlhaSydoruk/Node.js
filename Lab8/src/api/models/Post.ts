export class Post {
    id: number;
    dateCreation: Date;
    title: string;
    text: string;
    userId: number

    constructor(id: number, dateCreation: Date, title: string, text: string, userId: number) {
        this.id = id;
        this.dateCreation = dateCreation;
        this.title = title;
        this.text = text;
        this.userId = userId;
    }
}