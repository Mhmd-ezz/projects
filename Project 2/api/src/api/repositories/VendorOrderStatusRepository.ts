/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorOrderStatus } from '../models/VendorOrderStatus';

@EntityRepository(VendorOrderStatus)
export class VendorOrderStatusRepository extends Repository<VendorOrderStatus>  {

}
