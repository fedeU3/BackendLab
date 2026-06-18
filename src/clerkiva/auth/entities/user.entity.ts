import { Exclude } from 'class-transformer';
import { Role } from '../role.enum';

export class UserEntity {
  id: number;
  usuario: string;
  nombres: string;
  apellidos: string;
  rol: Role;
  sucursal: string;

  // password y token NUNCA deben llegar al cliente.
  // @Exclude() + ClassSerializerInterceptor los omite automáticamente.
  // En Clerkiva actual esto no existe → password viaja en todas las respuestas.
  @Exclude()
  password: string;

  @Exclude()
  token?: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
