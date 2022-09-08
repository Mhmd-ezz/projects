/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { VendorGlobalSetting } from '../models/VendorGlobalSettings';

@EntityRepository(VendorGlobalSetting)
export class VendorGlobalSettingRepository extends Repository<VendorGlobalSetting>  {

}
