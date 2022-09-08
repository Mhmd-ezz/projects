/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorCouponProductCategory } from '../models/VendorCouponProductCategory';

@EntityRepository(VendorCouponProductCategory)
export class VendorCouponProductCategoryRepository extends Repository<VendorCouponProductCategory>  {

}
