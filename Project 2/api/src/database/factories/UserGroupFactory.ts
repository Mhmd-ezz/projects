/*
 * ocrafter marketplace API
 * version 2.0.0
 * http://api.ocrafter.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { UserGroup } from '../../api/models/UserGroup';
define(UserGroup, (faker: typeof Faker, settings: { role: string []}) => {
    const usergroup = new UserGroup();
    return usergroup;
});
