import { EntityRepository, Repository } from 'typeorm'
//importando o móduto de usuário que vai ser armazenado no repositório
import User from '../../app/models/user'

@EntityRepository(User)
class UserRepository extends Repository<User>{ }

export { UserRepository }
