import { ethereumClientApp } from "src/lib/config"

function fibonacciListUntil(targetNumber: number): number[] {
  const fibonacciList = [0, 1]

  while (fibonacciList[fibonacciList.length - 1] < targetNumber) {
    const newNumber =
      fibonacciList[fibonacciList.length - 1] +
      fibonacciList[fibonacciList.length - 2]

    if (newNumber > targetNumber) {
      break
    } else {
      fibonacciList.push(newNumber)
    }
  }
  return fibonacciList
}

async function getBalance() {
  const balanceResponse = await ethereumClientApp.eth.getBalance(
    `${process.env.ACCOUNT_HASH}`
  )

  console.log(
    "balanceResponse, process.env.ACCOUNT_HASH",
    balanceResponse,
    process.env.ACCOUNT_HASH
  )
}

getBalance()
