import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../../src/database/repository/userRepository'

describe('', () => {
  it("should be able to create a new user", async () => {
    const userRepository = getCustomRepository(UserRepository)
    const user = userRepository.create({
      name: "Manuelly Suzik",
      lastname: "Nunes Melo",
      nickname: "Suzik",
      address: "S sr. 160",
      bio: "Uma desenvolvedora apenas procurando uma oportunidade"
    })
    console.log(user)
    await userRepository.save(user)

    expect(user.name).toBe("Manuelly Suzik")
  })
})
