/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorOrderArchiveLog } from '../models/VendorOrderArchiveLog';

@EntityRepository(VendorOrderArchiveLog)
export class VendorOrderArchiveLogRepository extends Repository<VendorOrderArchiveLog>  {

}
