const Token = artifacts.require('./Token')

require('chai').use(require('chai-as-promised')).should()

contract('token', ([user1, user2]) => {
    let eth_decimals = 18
    let token

    beforeEach(async () => {
        token = await Token.new()
    })

    describe('deployement', () => {
        it('tracks the name', async () => {
            const name = await token.name()
            name.should.equal('Blink Token')
        })

        it('tracks the symbol', async () => {
            const symbol = await token.symbol()
            symbol.should.equal('BLINK')
        })

        it('tracks the eth decimals', async () => {
            const symbol = await token.eth_coefficient()
            symbol.toString().should.equal('16')
        })
    })

    describe('gets ether balance', () => {
        it('gets contract balance', async () => {
            const eth_balance = await token.getBalance(token.address)
            eth_balance.toString().should.equal('0')
        })
    })

    describe('gets blink balance', () => {
        it('gets user balance', async () => {
            const blk_balance = await token.balanceOf(user1)
            blk_balance.toString().should.equal('0')
        })
    })

    describe('withdraws blink', () => {
        describe('success', () => {
            let result

            beforeEach(async () => {
                result = await token.withdrawBlink({ from: user1, value: 3 * (10 ** eth_decimals) })
            })

            it('withdraws blink balance', async () => {
                const blk_balance = await token.balanceOf(user1)
                blk_balance.toString().should.equal('300')
            })

            it('emits a WithdrawBlink event', async () => {
                const log = result.logs[0]
                log.event.should.eq('WithdrawBlink')
                const event = log.args
                event.user.toString().should.equal(user1)
                event.value.toString().should.equal('3000000000000000000')
            })
        })

        describe('failure', () => {
            it('user does not have enough ether', async () => {
                await token.withdrawBlink({ from: user1, value: 200 * (10 ** eth_decimals) }).should.be.rejectedWith('user must have enough eth')
            })
        })
    })

    describe('deposits blink', () => {
        beforeEach(async () => {
            await token.withdrawBlink({ from: user1, value: 3 * (10 ** eth_decimals) })
        })

        describe('success', () => {
            let result

            beforeEach(async () => {
                result = await token.depositBlink(100, { from: user1 })
            })

            it('deposits blink balance', async () => {
                const blk_balance = await token.balanceOf(user1)
                blk_balance.toString().should.equal('200')
            })

            it('emits a DepositBlink event', async () => {
                const log = result.logs[0]
                log.event.should.eq('DepositBlink')
                const event = log.args
                event.user.toString().should.equal(user1)
                event.value.toString().should.equal('100')
            })
        })

        describe('failure', () => {
            it('user does not have enough blinkcoin', async () => {
                await token.depositBlink(500, { from: user1 }).should.be.rejectedWith('user must have enough blk')
            })
        })
    })

    describe('transfers blink', () => {
        beforeEach(async () => {
            await token.withdrawBlink({ from: user1, value: 3 * (10 ** eth_decimals) })
        })

        describe('success', () => {
            let result

            beforeEach(async () => {
                result = await token.transferBlink(user2, 50, { from: user1 })
            })

            it('transfers blink balance', async () => {
                let blk_balance = await token.balanceOf(user1)
                blk_balance.toString().should.equal('250')
                blk_balance = await token.balanceOf(user2)
                blk_balance.toString().should.equal('50')
            })

            it ('emits a TransferBlink event', async () => {
                const log = result.logs[0]
                log.event.should.eq('TransferBlink')
                const event = log.args
                event.from.toString().should.equal(user1)
                event.to.toString().should.equal(user2)
                event.value.toString().should.equal('50')
            })
        })

        describe('failure', () => {
            it('user does not have enough blinkcoin', async () => {
                await token.transferBlink(user2, 301, { from: user1 }).should.be.rejectedWith('user must have enough blk')
            })
        })
    })
})
