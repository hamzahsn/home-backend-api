import { IContract } from '../typings/contract'
import { FastifyRequest, FastifyReply } from 'fastify'

const contracts: IContract | any = {
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
    const payments = [...contracts.items]
    if (!contractId && !startDate && !endDate) {
        reply.status(400).send('Invalid Input fields')
        return
    }
    const dates = []
    const start = new Date(startDate).getMonth()
    const end = new Date(endDate).getMonth()
    for (const contract of payments) {
        const month = new Date(contract.time).getMonth()
        if (month >= start && month <= end) {
            dates.push(contract)
        }
    }
    reply.status(200).send(dates)
}

export const addContract = (_: FastifyRequest, reply: FastifyReply) => {
    reply.send('ADD CONTRACT')
}

//TODO
export const updateContract = (_: FastifyRequest, reply: FastifyReply) => {
    reply.send('ADD CONTRACT')
}

//TODO
export const deleteContract = (_: FastifyRequest, reply: FastifyReply) => {
    reply.send('ADD CONTRACT')
}
