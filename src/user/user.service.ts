import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './user.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    public async getAllUsers(page: number = 1): Promise<UserDto[]> {
        return await this.userRepository.find({ take: 10 * (page - 1), skip: 10 * page });
    }

    public async getUserById(userId: string): Promise<User> {
        const target = await this.userRepository.findOne({ where: { userId } });
        if (target) {
            return target;
        } else {
            throw new Error('userId is not exist');
        }
    }

    public async saveUser(userId:string, userName:string): Promise<void> {
        const target = await this.userRepository.findOne({ where: { userId: userId } });
        if (target) {
            await this.userRepository.update({ userId }, { userName });
        } else {
            await this.userRepository.insert({ userName });
        }
    }

    public async deleteUser(userId: string): Promise<void> {
        const target = await this.userRepository.findOne({ where: { userId: userId } });
        if (target) {
            await this.userRepository.delete(userId);
        } else {
            throw new Error('userId is not exist');
        }
    }
}
