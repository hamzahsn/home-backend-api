import { FastifyReply } from 'fastify'
import { getContract, addContract, updateContract, deleteContract } from '../services/Contract'

const contractRoutes = [
    /**
     * Fetch contract
     */
    {
        url: '/contracts/:contractId/payments',
        method: 'get',
        handler: getContract
    },
    /**
     * Add contract
     */
    {
        url: '/contracts',
        method: 'post',
        handler: addContract
    },
    /**
     * Update contract
     */
    {
        url: '/contracts/:paymentId',
        method: 'put',
        handler: updateContract
    },
    /**
     * Delete contract
     */
    {
        url: '/contracts/:paymentId',
        method: 'delete',
        handler: deleteContract
    },
    {
        url: '/status',
        method: 'get',
        handler: (_: any, reply: FastifyReply) => {
            return reply.send({ date: new Date(), works: true })
        }
    }
]

export default [...contractRoutes]
