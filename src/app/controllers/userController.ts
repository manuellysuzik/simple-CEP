import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../../database/repository/userRepository'



class UserController {

  async create(req: Request, res: Response) {
    const dados = req.body
    const userRepository = getCustomRepository(UserRepository)

    const nicknameExists = await userRepository
      .findOne({ where: { nickname: dados.nickname } })

    console.log(dados)
    if (nicknameExists) {
      return res.status(400).json({
        message: "O usuário já está cadastrado em nosso sistema, por favor , escolha outro"
      })
    }

    const createUser = userRepository.create({ ...dados })

    try {
      await userRepository.save(createUser)

      return res.status(201).json({ createUser })
    } catch (err) {
      return res.status(500).json({
        message: "não foi possível criar o seu user",
        error: err.message
      })
    }

  }
  async index(req: Request, res: Response) {
    const { name, lastname } = req.body

    const userRepository = getCustomRepository(UserRepository)

    if (!name && !lastname) {
      const users = await getCustomRepository(UserRepository)
        .createQueryBuilder("users")
        .getMany()

      let result = users.map(item => {
        return {
          nome: item.name,
          sobrenome: item.lastname
        }
      })

      return res.json(result)
    }

    try {

      const result = await userRepository.find({
        where: [{ name }, { lastname }],
        select: ["name", "lastname"]
      })

      return res.status(200).json({
        result
      })
    } catch (err) {
      return res.status(404).json(
        {
          message: "Não foi possível encontrar esse usuário",
          error: err.message
        })
    }

  }
  async show(req: Request, res: Response) {
    const { id } = req.params

    const userRepository = getCustomRepository(UserRepository)

    const userExists = await userRepository.findOne({ id })

    if (!userExists) {
      return res.status(404).json({ message: "Esse ID não existe" })
    }

    return res.status(200).json({
      nome: userExists.name,
      sobrenome: userExists.lastname,
      nickname: userExists.nickname
    })

  }
  async update(req: Request, res: Response) {
    const { id } = req.params

    const { address, lastname, nickname } = req.body

    const userRepository = getCustomRepository(UserRepository)
    if (nickname) {
      try {
        const userExists = await userRepository.findOne({ id })

        await userRepository.save({
          id,
          nickname
        })

        return res.status(200).json(await userRepository.findOne({ id }))
      } catch (err) {
        if (err.code === "22P02") {
          return res.json({ message: "ID inválido" })
        }
      }
    }
    try {
      await userRepository.save({
        id,
        address,
        lastname,
      })

      return res.status(200).json(await userRepository.findOne({ id }))
    } catch (err) {
      return res.status(err.statusCode()).json({
        message: "Não foi possível atualizar o usuário",
        error: err.message
      })
    }
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params

    const userRepository = getCustomRepository(UserRepository)

    const userExists = await userRepository.findOne({ id })

    if (!userExists) {
      return res.status(404).json({ error: "Esse usuário não existe" })
    }

    try {
      await userRepository.delete(userExists)

      return res.status(204).json({ message: "Usuário excluído com sucesso" })

    } catch (err) {
      return res.status(500).json({
        message: "Não foi possível excluir esse usuário",
        error: err.message
      })
    }
  }
}

export default new UserController
