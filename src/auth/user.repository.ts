import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialDto } from "./dto/auth-credential.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;

    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
  }
}