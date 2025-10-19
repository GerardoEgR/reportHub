/**
 * Este servicio maneja las operaciones relacionadas con los usuarios.
 * Utiliza TypeORM para interactuar con la base de datos y gestionar las entidades de usuario.
 *
 */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.usersRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10), // Encripta la contraseña antes de guardarla.j
      });

      await this.usersRepository.save(user);

      // Transforma la entidad User a UserResponseDto antes de devolverla para excluir la contraseña.
      return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
      // TODO: retornar el JWT de acceso
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async findOneByEmail(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        id: true,
        fullName: true,
        isActive: true,
        roles: true,
      },
    });
    if (!user) throw new UnauthorizedException('Credenciales incorrectas'); // Usuario no encontrado

    // Contraseña incorrecta
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales incorrectas');

    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }); // Retorna el usuario sin la contraseña
  }

  // findOneById(id: string) {
  //   return this.usersRepository.findOneBy({ id });
  // }
  // findAll() {
  //   return `This action returns all users`;
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
