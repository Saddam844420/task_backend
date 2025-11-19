import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signInDto';
import { User } from 'generated/prisma';
@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}

@HttpCode(HttpStatus.OK)
@Post('login')
async signIn(@Body() signInDto: SignInDto):Promise<User | any>{
    return this.authService.signIn(signInDto.email,signInDto.password); 
}
}
