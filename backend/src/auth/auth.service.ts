import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/entities/user.entity';

/**
 * Servicio de autenticación que maneja la lógica de negocio para el registro e inicio de sesión de usuarios.
 * Utiliza UsersService para interactuar con la entidad User.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @param createUserDto
   * @returns
   */
  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.usersService.create({
        ...userData,
        password: bcrypt.hashSync(password, 10), // Encripta la contraseña antes de guardarla.j
      });

      // Transforma la entidad User a UserResponseDto antes de devolverla para excluir la contraseña.
      const userResponse = plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });

      return {
        ...userResponse,
        token: this.getJwtToken({ id: userResponse.id }),
      };
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  /**
   * @param loginDto
   * @returns
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas'); // Usuario no encontrado

    // Contraseña incorrecta
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales incorrectas');

    const userResponse = plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }); // Retorna el usuario sin la contraseña
    return {
      ...userResponse,
      token: this.getJwtToken({ id: userResponse.id }),
    };
  }

  checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

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
