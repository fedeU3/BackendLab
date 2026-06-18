import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from './role.enum';
import { UserEntity } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  private users: UserEntity[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async onModuleInit(): Promise<void> {
    const hash = (p: string) => bcrypt.hash(p, 10);
    this.users = [
      new UserEntity({
        id: 1,
        usuario: 'admin',
        password: await hash('admin123'),
        rol: Role.ADMIN,
        nombres: 'Federico',
        apellidos: 'Admin',
        sucursal: 'Central',
      }),
      new UserEntity({
        id: 2,
        usuario: 'cajero01',
        password: await hash('cajero123'),
        rol: Role.CAJERO,
        nombres: 'María',
        apellidos: 'García',
        sucursal: 'Central',
      }),
      new UserEntity({
        id: 3,
        usuario: 'consulta',
        password: await hash('consulta123'),
        rol: Role.CONSULTA,
        nombres: 'Juan',
        apellidos: 'Pérez',
        sucursal: 'Norte',
      }),
      new UserEntity({
        id: 4,
        usuario: 'deposito',
        password: await hash('deposito123'),
        rol: Role.DEPOSITO,
        nombres: 'Ana',
        apellidos: 'López',
        sucursal: 'Norte',
      }),
    ];
  }

  async login(dto: LoginDto): Promise<{ token: string }> {
    const user = this.users.find((u) => u.usuario === dto.userID);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    const token = this.jwtService.sign({ id: user.id, rol: user.rol });
    return { token };
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return this.users.find((u) => u.id === id);
  }
}
