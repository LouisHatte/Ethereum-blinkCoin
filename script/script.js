const Token = artifacts.require("Token")

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

async function displayBalance(users, idx, token) {
    let balance = await token.balanceOf(users[idx])
    console.log('user', idx, 'has', balance.toString(), 'blink')
}

module.exports = async function(callback) {
    try {
        let token = await Token.deployed()
        console.log('token address:', token.address, '\n')

        const users = await web3.eth.getAccounts()
        console.log('users:', users, '\n')

        const decimals = 18

        console.log('------ WITHDRAW BLINK ------\n')
        for (let i = 0; i < 10; i++) {
            let value = getRandomInt(5)

            await displayBalance(users, i, token)
            console.log('user', i, 'withdraws', value, 'blink')
            await token.withdrawBlink({ from: users[i], value: value * (10 ** decimals) })
            await displayBalance(users, i, token)
            console.log()
        }

        console.log('------ TRANSFER BLINK ------\n')
        for (let i = 0; i < 10; i++) {
            let value = getRandomInt(5)
            let receiver = getRandomInt(10)

            await displayBalance(users, i, token)
            await displayBalance(users, receiver, token)
            console.log('user', i, 'transfers', value, 'blink to user', receiver)

            try {
                await token.transferBlink(users[receiver], value, { from: users[i] })
                await displayBalance(users, i, token)
                await displayBalance(users, receiver, token)
                console.log()
            } catch (error) {
                console.log(error, '\n')
            }
        }

        console.log('------ DEPOSIT BLINK ------\n')
        for (let i = 0; i < 10; i++) {
            let value = getRandomInt(5)

            await displayBalance(users, i, token)
            console.log('user', i, 'deposits', value, 'blink')
            try {
                await token.depositBlink(value, { from: users[i] })
                await displayBalance(users, i, token)
                console.log()
            } catch (error) {
                console.log(error, '\n')
            }
        }
    } catch (error) {
        console.log(error)
    }
    callback()
}
