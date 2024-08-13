import { expect as baseExpect } from '@playwright/test'
import { GLOBAL_TIMEOUT } from './constants'

export const expect = baseExpect.configure(GLOBAL_TIMEOUT)
