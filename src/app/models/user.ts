
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Length } from 'class-validator'
import { v4 } from 'uuid'
@Entity("users")
@Unique(['nickname'])
export default class Users {

  @PrimaryColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column()
  lastname: string;
  @Column()
  @Length(5, 30, { message: "O nickname deve ter no mínimo 5 e no máximo 30 caracteres" })
  nickname: string;
  @Column()
  address: string;
  @Column()
  @Length(0, 100, { message: "Sua bio não pode ser maior que 100 caracteres" })
  bio: string;
  @CreateDateColumn()
  createdAt!: Date;
  @CreateDateColumn()
  updatedAt!: Date;

  //postgres não aceita o @GeneratePrimaryColunm UUID
  @BeforeInsert()
  createUUID() {
    this.id = v4()
  }
}
