import app from '../index'

describe('Contract API', () => {
    beforeAll(() => {})

    it('Should return error when there is a wrong router', async done => {
        const response = await app.inject({
            method: 'get',
            url: '/random'
        })
        expect(response.statusCode).toBe(404)
        done()
    })
})
