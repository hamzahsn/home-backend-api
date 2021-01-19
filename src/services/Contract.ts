import { IContract, IItem } from '../typings/contract'
import { FastifyRequest, FastifyReply } from 'fastify'

const contracts: IContract = {
    sum: 0,
    items: [
        {
            id: 1366,
            contractId: 17689,
            description: 'Rent payment',
            value: 100,
            time: '2016-12-09T00:00:00.00Z',
            isImported: false,
            createdAt: '2016-12-09T12:57:31.393Z',
            updatedAt: '2016-12-09T12:57:31.393Z',
            isDeleted: false
        },
        {
            id: 1365,
            contractId: 17689,
            description: 'Rent to be paid',
            value: -100,
            time: '2016-12-09T00:00:00.00Z',
            isImported: false,
            createdAt: '2016-12-09T12:57:09.708Z',
            updatedAt: '2016-12-09T12:57:09.709Z',
            isDeleted: false
        }
    ]
}

export const getContract = (req: FastifyRequest, reply: FastifyReply) => {
    const { contractId } = req.params as any
    const { startDate, endDate } = req.query as any
    if (!contractId && !startDate && !endDate) {
        reply.status(400).send('Invalid Input fields')
        return
    }
    const dates = []
    const start = new Date(startDate).getMonth()
    const end = new Date(endDate).getMonth()
    for (const contract of contracts.items) {
        const month = new Date(contract.time).getMonth()
        if (month >= start && month <= end) {
            dates.push(contract)
        }
    }
    reply.status(200).send(dates)
}

export const addContract = (req: FastifyRequest, reply: FastifyReply) => {
    const newContract = req.body as IItem
    if (!newContract.id || !newContract.id || !newContract.value) {
        reply.status(400).send('Contract invalid')
        return
    }

    const contractId = contracts.items.find((contract: IItem) => contract.id === newContract.id)
    if (contractId) {
        reply.status(404).send('Contract already exist')
        return
    }

    contracts.items.push(newContract)
    reply.send(newContract)
}

//TODO
export const updateContract = (req: FastifyRequest, reply: FastifyReply) => {
    const { contractId } = req.params as any
    if (!contractId) {
        reply.status(404).send('Empty contract ID')
        return
    }

    const foundContract = contracts.items.findIndex((contract: IItem) => contract.id === parseInt(contractId))
    if (foundContract) {
        contracts.items[foundContract] = req.body
        console.log('"\x1b[34m', 'found', foundContract)
    }
    reply.status(200).send(req.body)
}

//TODO
export const deleteContract = (_: FastifyRequest, reply: FastifyReply) => {
    reply.send('ADD CONTRACT')
}
