import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose() // expone la propiedad cuando se transforma
  id: string;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  isActive: boolean;

  @Expose()
  roles: string[];
}
