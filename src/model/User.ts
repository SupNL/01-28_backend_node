import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum NivelUsuario {
    COMUM = "comum",
    ADMIN = "admin"
}

@Entity("user")
export default class User {
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column()
    nome : string;

    @Column()
    login : string;

    @Column({
        select : false
    })
    senha : string;

    @Column({
        type : "enum",
        enum : NivelUsuario,
        default : NivelUsuario.COMUM
    })
    nivel : NivelUsuario;
}