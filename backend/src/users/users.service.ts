/**
 * Este servicio maneja las operaciones relacionadas con los usuarios.
 * Utiliza TypeORM para interactuar con la base de datos y gestionar las entidades de usuario.
 *
 */
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(user);
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  /**
   * Maneja los errores de la base de datos.
   * @param error El error lanzado por la base de datos.
   */
  private handleDbErrors(error: any): never {
    // Verifica que el error sea un objeto y que tenga la propiedad 'code'.
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const dbErrorCode = error as { code?: string };

      // Verifica si el código de error es '23505', que indica que el usuario ya existe.
      if (dbErrorCode.code === '23505') throw new BadRequestException('El usuario ya existe');
    }

    console.log(error);

    throw new InternalServerErrorException('Error inesperado, revisar logs');
  }
}
