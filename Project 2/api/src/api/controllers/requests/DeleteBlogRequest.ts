/*
 * ocrafter marketplace API
 * version 2.2
 * http://api.ocrafter.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
export class DeleteBlog {

    @IsNotEmpty()
    public blogId: [];
}
