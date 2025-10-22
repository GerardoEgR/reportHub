import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Auth } from './decorators/auth/auth.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { GetUser } from './decorators/get-user/get-user.decorator';
import { User } from '../users/entities/user.entity';

/**
 * Controlador de autenticación que maneja las rutas de registro e inicio de sesión.
 * Utiliza AuthService para la lógica de negocio.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth(ValidRoles.admin)
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
