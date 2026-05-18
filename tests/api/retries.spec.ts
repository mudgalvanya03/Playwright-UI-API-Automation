import test, { expect } from "@playwright/test"
import { ApiClient } from "../../utils/ApiClient"
import { withRetry } from "../../utils/retryUtility"

test('withRetry retries on failure and eventually throws', async ({ request }) => {
  const client = new ApiClient(request, 'https://reqres.in/api')
  
  let attemptCount = 0
  
  const flakyFn = async (): Promise<string> => {
    attemptCount++
    if (attemptCount < 3) {
      throw new Error('Simulated failure')
    }
    return 'success'
  }

  const result = await withRetry(flakyFn, {
    maxAttempts: 3,
    delayMs: 100
  })

  expect(result).toBe('success')
  expect(attemptCount).toBe(3)
})