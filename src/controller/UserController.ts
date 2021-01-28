import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import User from "../model/User";
import { hashData } from '../services/HashService';

export default {
    index(req : Request, res : Response) : Promise<Response> {
        const userRepository = getRepository(User);
        return new Promise((resolve) => {
            userRepository.find().then(users => {
                resolve(res.json(users));
            })
        })
    },

    show(req : Request, res : Response) : Promise<Response> {
        const { id } = req.params;
        const userRepository = getRepository(User);
        return new Promise((resolve) => {
            userRepository.findOneOrFail(id).then(user => {
                resolve(res.json(user));
            }).catch(() => {
                resolve(res.sendStatus(404));
            })
        })
    },

    create(req : Request, res : Response) : Promise<Response> {
        const { nome, login, senha } = req.body;
        return new Promise((resolve) => {
            // hash na senha, utilizei o bcrypt para isso
            hashData(senha)
            .then(hashed => {
                const userRepository = getRepository(User);
                const user = userRepository.create({
                    nome, 
                    login,
                    senha : hashed
                });
                return userRepository.save(user);
            })
            .then(user => {
                const {senha, ...semSenha} = user;
                resolve(res.status(201).json(semSenha));
            })
            .catch(err => {
                // apenas para debug
                console.log(err);
                resolve(res.sendStatus(500));
            }) 
        })
    },

    remove(req : Request, res : Response) : Promise<Response> {
        const { id } = req.params;
        return new Promise((resolve) => {
            const userRepository = getRepository(User);
            userRepository.delete({ id : Number(id) }).then(deleteResult => {
                resolve(res.sendStatus(204));
            })
        })
    }
}