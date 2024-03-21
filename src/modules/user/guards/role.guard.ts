import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../entities/role.entity";
import { ROLES_KEY } from "src/decorators/roles.decorator";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JWTPayload } from "src/utils/types/jwt_payload";


@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private jwtService: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const request = context.switchToHttp().getRequest()
        let token = await this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException()
        }

        if (!requiredRoles) {
            return true
        }

        try {
            const payload: JWTPayload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            })

            const user_role: string = payload.role

            return requiredRoles.some((role) => {
                // Bullshit type string and enum
                let role_str: string = (role as unknown) as string

                return user_role.includes(role_str)
            })
        } catch (err) {
            throw new UnauthorizedException()
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }

}