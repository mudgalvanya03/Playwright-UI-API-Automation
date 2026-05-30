import { DataFactory } from '../DataFactory'

interface UICredentials {
    username: string
    password: string
}

interface CheckoutInfo {
    firstName: string
    lastName: string
    postalCode: string
}

export const standardUserFactory = new DataFactory<UICredentials>({
    username: 'standard_user',
    password: 'secret_sauce'
})

export const errorUserFactory = new DataFactory<UICredentials>({
        username: 'myerroruser',
    password: 'secret_sauce'
})
export const lockedUserFactory = new DataFactory<UICredentials>({
    username: 'locked_out_user',
    password: 'secret_sauce'
})

export const checkoutInfoFactory = new DataFactory<CheckoutInfo>({
    firstName: 'Vanya',
    lastName: 'Automation',
    postalCode: '560001'
})