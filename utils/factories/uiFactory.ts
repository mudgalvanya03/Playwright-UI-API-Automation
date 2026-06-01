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
const STANDARD_USER_DEFAULTS = {
    username: 'standard_user',
    password: 'secret_sauce'
} satisfies UICredentials;

export const standardUserFactory = new DataFactory<UICredentials>(STANDARD_USER_DEFAULTS );

const ERROR_USER_DEFAULTS = {
    username: 'myerroruser',
    password: 'secret_sauce'
} satisfies UICredentials;

export const errorUserFactory = new DataFactory<UICredentials>(ERROR_USER_DEFAULTS);


const LOCKED_USER_DEFAULTS = {
    username: 'locked_out_user',
    password: 'secret_sauce'
} satisfies UICredentials;


export const lockedUserFactory = new DataFactory<UICredentials>(LOCKED_USER_DEFAULTS);


const CHECKOUT_INFO_DEFAULTS = {
    firstName: 'Vanya',
    lastName: 'Automation',
    postalCode: '560001'
} satisfies CheckoutInfo;

export const checkoutInfoFactory = new DataFactory<CheckoutInfo>(CHECKOUT_INFO_DEFAULTS);