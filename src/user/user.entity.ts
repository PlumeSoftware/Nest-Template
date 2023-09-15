import { BaseReq, } from "../../lib/common";
import { BaseEntity, Column, Entity, Generated, PrimaryColumn } from "typeorm";

@Entity({ name: "user" })
export class User extends BaseEntity {
  @PrimaryColumn({ name: "user_id", type: "varchar" })
  @Generated("uuid")
  userId: string;
  @Column({ name: "user_name", type: "varchar", length: 30, nullable: true })
  userName: string;
  @Column({ name: "create_time", type: "datetime" })
  create_time: Date;
  @Column({ name: "update_time", nullable: true, type: "datetime" })
  update_time: Date;
  @Column({ name: "create_user", nullable: true, type: "varchar" })
  create_user: string;
  @Column({ name: "update_user", nullable: true, type: "varchar" })
  update_user: string;
}

export interface UserReq extends BaseReq {
  readonly userId: string;
  readonly userName: string;
}

export class UserDto {
  userId: string;
  userName: string;

  constructor(user: User) {
    this.userId = user.userId;
    this.userName = user.userName;
  }
}

