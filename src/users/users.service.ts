import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto copy';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly user: Repository<User>
    ) { }

    async createUser(userData: CreateUserDto) {
        const user = this.user.create(userData)
        user.password = await bcrypt.hash(user.password, 10)
        return this.user.save(user)
    }

    async updateUser(id: number, userData: UpdateUserDto) {
        if (userData.password) {
            userData.password = await bcrypt.hash(userData.password, 10)
        }
        return this.user.update({ id }, userData)
    }

    async login(email: string, password: string) {
        const user = await this.user.findOne({
            select: ['id', 'password'],
            where: { email }
        })
        if (await bcrypt.compare(password, user.password))
            return 'OK'
        else
            return 'False password or email'
    }

    findById(id: number) {
        return this.user.find({
            relations: { photos: true },
            where: { id }
        })
    }

    async findAll() {
        // return (await this.user.find()).map(({password, ...rest}) => rest)
        return this.user.find({
            relations: { profile: true }
        })
    }
}
