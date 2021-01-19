import { FastifyRequest, FastifyReply } from 'fastify'
import { getContract, addContract, updateContract, deleteContract } from '../services/Contract'

const contractRoutes = [
    /**
     * Fetch contract
     */
    {
        url: '/contracts/:contractId/payments',
        method: 'get',
        handler: async (req: FastifyRequest, reply: FastifyReply) => getContract(req, reply)
    },
    /**
     * Add contract
     */
    {
        url: '/contracts',
        method: 'post',
        handler: (req: FastifyRequest, reply: FastifyReply) => addContract(req, reply)
    },
    /**
     * Update contract
     */
    {
        url: '/contracts/:contractId',
        method: 'put',
        handler: (req: any, reply: FastifyReply) => updateContract(req, reply)
    },
    /**
     * Delete contract
     */
    {
        url: '/contracts/:contractId',
        method: 'delete',
        handler: async (req: any, reply: FastifyReply) => deleteContract(req, reply)
    },
    {
        url: '/status',
        method: 'get',
        handler: async (_: any, reply: FastifyReply) => {
            return reply.send({ date: new Date(), works: true })
        }
    }
]

export default [...contractRoutes]
