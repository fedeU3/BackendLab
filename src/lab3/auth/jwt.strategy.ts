import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: number;   // 'sub' es la convención JWT para el ID del sujeto (usuario)
  email: string;
  role: string;
}

export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

/**
 * Estrategia JWT de Passport — define cómo validar un token JWT.
 *
 * PassportStrategy(Strategy) combina la estrategia passport-jwt con el
 * sistema de DI de NestJS. Al inyectarse, se registra automáticamente
 * con el nombre 'jwt' (el default de la estrategia).
 *
 * Flujo cuando llega un request con Bearer token:
 *   1. ExtractJwt.fromAuthHeaderAsBearerToken() extrae el token del header.
 *   2. La estrategia verifica la firma con secretOrKey.
 *   3. Si es válido, llama a validate() con el payload decodificado.
 *   4. El resultado de validate() se guarda en request.user.
 *   5. JwtAuthGuard retorna true y el handler se ejecuta.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // rechaza tokens expirados
      secretOrKey: 'lab3-secret', // en producción usar process.env.JWT_SECRET
    });
  }

  // validate() recibe el payload ya decodificado (sin necesidad de verificar firma aquí).
  // Lo que retorna se convierte en request.user — accesible con @CurrentUser().
  validate(payload: JwtPayload): AuthUser {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
