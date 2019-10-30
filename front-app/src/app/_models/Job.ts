import { User } from './user';
import { Customer } from './customer';

export interface Job {
    id: number;
    hours: number;
    description: string;
    userId: string;
    user: User;
    customerId: number;
    customer: Customer;
}
