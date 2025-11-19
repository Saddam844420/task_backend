import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

   

    async signIn(email:string, password:string):Promise<any>{
        const user = await this.userService.findOne(email);
        if(!user){
             throw new BadRequestException({
                    status: false,
                    message: `Email not registered`,
                  });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
             throw new BadRequestException({
                    status: false,
                    message: `Invalid credentials`,
                  });
        }

         const payload = { sub: user.id, username: user.name,companyId:user.companyId,role:user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
        
    }

}
