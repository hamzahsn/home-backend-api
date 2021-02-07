import { IContract, IItem } from '../typings/contract'
import { FastifyRequest, FastifyReply } from 'fastify'
import { nanoid } from 'nanoid'

const contracts: IContract[] = [
    {
        sum: 400,
        items: [
            {
                id: 1366,
                contractId: 17689,
                description: 'Rent payment',
                value: 500,
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
                time: '2016-07-09T00:00:00.00Z',
                isImported: false,
                createdAt: '2016-12-09T12:57:09.708Z',
                updatedAt: '2016-12-09T12:57:09.709Z',
                isDeleted: false
            }
        ]
    }
]

export const getContract = async (req: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { contractId } = req.params as string
    //@ts-ignore
    const { startDate, endDate } = req.query as string
    if (!contractId && !startDate && !endDate) {
        reply.status(400).send('Invalid Input fields')
        return
    }

    // Additionally to requested payment within a specific time frame,
    // the landlord will get the new total sum of a specific time frame of requested payments with specific contractId
    const timeFrameContracts: IContract[] = [{ sum: 0, items: [] }]
    const contractStartDate = new Date(startDate).getMonth()
    const contractEndDate = new Date(endDate).getMonth()

    for (const contract of Object.values(contracts)) {
        for (const payment of Object.values(contract.items)) {
            const monthPayment = new Date(payment.time).getMonth()
            if (
                monthPayment >= contractStartDate &&
                monthPayment <= contractEndDate &&
                payment.contractId.toString() === contractId
            ) {
                timeFrameContracts[0].sum += payment.value
                timeFrameContracts[0].items.push(payment)
            }
        }
    }
    reply.code(200).send(timeFrameContracts)
}

export const addContract = (req: FastifyRequest, reply: FastifyReply) => {
    let newContract = req.body as IItem
    if (!newContract.contractId && !newContract.value) {
        reply.status(400).send('Contract invalid')
        return
    }
    const foundMatchedContract = contracts.find(contract =>
        contract.items.some((payment: IItem) => payment.contractId === newContract.contractId)
    )

    // If a contractId found then a new payment will be added to items, additionally, the total sum will be recalculated
    if (foundMatchedContract) {
        newContract = { ...newContract, id: nanoid() }
        foundMatchedContract.items.push(newContract)
        foundMatchedContract.sum += newContract.value
    } else {
        newContract = { ...newContract, id: nanoid() }
        contracts.push({ sum: newContract.value, items: Array(newContract) })
    }
    reply.status(204).send()
}

export const updateContract = (req: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { paymentId } = req.params as string

    if (!paymentId) {
        reply.status(400).send('No Contract ID provided')
        return
    }

    //@ts-ignore
    if (!req.body.value && !req.body.time && !req.body.description) {
        reply.status(400).send('Contract invalid')
        return
    }

    // If a paymentId found then, payment will be updated, additionally, the total sum will be recalculated
    for (const contract of contracts) {
        for (const [index, payment] of contract.items.entries()) {
            if (payment.id.toString() === paymentId) {
                contract.items[index] = req.body
                contract.sum -= payment.value
                //@ts-ignore
                contract.sum += req.body.value
                reply.status(204).send(req.body)
            }
            reply.status(400).send('Payment not found')
        }
    }
}

export const deleteContract = (req: FastifyRequest, reply: FastifyReply) => {
    //@ts-ignore
    const { paymentId } = req.params as string
    if (!paymentId) {
        reply.status(404).send('Empty contract ID')
        return
    }

    // If a paymentId found then, it will be deleted, additionally, the total sum will be recalculated
    for (const contract of contracts) {
        for (const [index, payment] of contract.items.entries()) {
            if (payment.id.toString() === paymentId) {
                contract.items.splice(index, 1)
                contract.sum -= payment.value
            }
        }
    }
    reply.status(204).send()
}
