/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

// import * as express from 'express';
// import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../api/models/User';
import { UserRepository } from '../api/repositories/UserRepository';
import { CustomerRepository } from '../api/repositories/CustomerRepository';
import { VendorRepository } from '../api/repositories/VendorRepository';
// import { Logger, LoggerInterface } from '../decorators/Logger';
import { AmbassadorRepository } from '../api/repositories/AmbassadorRepository';

@Service()
export class AuthService {

    constructor(
        // @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private userRepository: UserRepository,
        @OrmRepository() private customerRepository: CustomerRepository,
        @OrmRepository() private vendorRepository: VendorRepository,
        @OrmRepository() private ambassadorRepository: AmbassadorRepository
    ) { }

    // public async parseBasicAuthFromRequest(req: express.Request): Promise<number> {
    //     const authorization = req.header('authorization');

    //     console.log(authorization);
    //     // console.log(authorization.split(' ')[0]);
    //     if (!authorization) {
    //         return undefined;
    //     }
    //     if (authorization && authorization.split(' ')[0] === 'Bearer') {
    //         console.log('Credentials provided by the client');
    //         this.log.info('Credentials provided by the client');
    //         console.log(authorization.split(' ')[1]);

    //         const UserId = await this.decryptToken(authorization.split(' ')[1]);

    //         return UserId;
    //         console.log('I m here');
    //     }

    //     this.log.info('No credentials provided by the client');
    //     return undefined;
    // }

    // public async decryptToken(encryptString: string): Promise<number> {
    //     return new Promise<number>((subresolve, subreject) => {
    //         jwt.verify(encryptString, '123##$$)(***&', { ignoreExpiration: true }, (err, decoded) => {
    //             if (err) {
    //                 console.log(err);
    //                 return subresolve(undefined);
    //             }
    //             console.log(decoded);
    //             return subresolve((decoded as any).id);
    //         });
    //     });
    // }

    public async validateUser(username: string): Promise<User> {
        // console.log('userId' + userId);
        const user = await this.userRepository.findOne({
            where: {
                username,
            },
        });
        // console.log(user);

        // if (user) {
        return user;
        // }
        // return undefined;
    }

    public async validateCustomer(username: string): Promise<any> {
        // console.log('customerId' + userId);
        const customer = await this.customerRepository.findOne({
            where: {
                username,
                isActive: 1,
                deleteFlag: 0,
            },
        });
        // console.log(customer);

        // if (customer && customer.isActive === 1 && customer.deleteFlag === 0) {
        return customer;
        // }
        // return undefined;
    }

    public async validateVendor(username: string): Promise<any> {
        // console.log('vendorId' + userId);

        const vendor = await this.vendorRepository.getByUsername(username, true, false);
        //     {
        //     where: {
        //         vendorId: userId,
        //     }, relations: ['customer'],
        // });
        console.log(vendor);
        // if (vendor) {
        //     if (vendor.customer.isActive === 1 && vendor.customer.deleteFlag === 0) {
        //         console.log('working.......');
        //         return vendor;
        //     }
        // }
        // return undefined;
        return vendor;
    }

    public async validateAmbassador(username: string): Promise<any> {
        // console.log('ambassadorId' + userId);
        const ambassador = await this.ambassadorRepository.getByUsername(username, true, false);
        // findOne({
        //     where: {
        //         ambassadorId: userId,
        //     }, relations: ['customer'],
        // });
        // console.log(ambassador);
        // if (ambassador) {
        //     if (ambassador.customer.isActive === 1 && ambassador.customer.deleteFlag === 0) {
        //         console.log('working.......');
        //         return ambassador;
        //     }
        // }
        // return undefined;
        return ambassador;
    }
}
