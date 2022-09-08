import { SellerAccountSettings } from './SellerAccountSettings';
/*
 * ocrafter marketplace API
 * version 4.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Customer } from './Customer';
import { VendorProducts } from './VendorProducts';
import { VendorOrders } from './VendorOrders';
import { VendorOrderLog } from './VendorOrderLog';
import { VendorOrderArchive } from './VendorOrderArchive';
import { VendorOrderArchiveLog } from './VendorOrderArchiveLog';
import { VendorPayment } from './VendorPayment';
import { VendorCoupon } from './VendorCoupon';

@Entity('vendor')
export class Vendor extends BaseModel {

    @PrimaryGeneratedColumn({ name: 'vendor_id' })
    public vendorId: number;

    @Column({ name: 'vendor_prefix_id' })
    public vendorPrefixId: string;

    @Column({ name: 'commission' })
    public commission: number;

    @Column({ name: 'contact_person_name' })
    public contactPersonName: string;

    @Column({ name: 'designation' })
    public designation: string;

    @Column({ name: 'company_name' })
    public companyName: string;

    @Column({ name: 'company_address1' })
    public companyAddress1: string;

    @Column({ name: 'company_address2' })
    public companyAddress2: string;

    @Column({ name: 'company_city' })
    public companyCity: string;

    @Column({ name: 'company_state' })
    public companyState: string;

    // @ Shipping

    // @ CompanyCountryId is depricated. switch to shippingCountryId
    // @ shippingCountryId is the default vendor address
    @Column({ name: 'shipping_address_country_id' })
    public shippingCountryId: number;

    @Column({ name: 'shipping_address_state', nullable: true })
    public shippingAddressState: string;

    @Column({ name: 'shipping_address_city', nullable: true })
    public shippingAddressCity: string;

    @Column({ name: 'shipping_address_line1', nullable: true })
    public shippingAddressLine1: string;

    @Column({ name: 'shipping_address_line2', nullable: true })
    public shippingAddressLine2: string;

    @Column({ name: 'shipping_address_street', nullable: true })
    public shippingAddressStreet: string;

    @Column({ name: 'shipping_address_notes', nullable: true })
    public shippingAddressNotes: string;

    // @ Billing
    @Column({ name: 'billing_address_country_id', nullable: true })
    public billingAddressCountryId: number;

    @Column({ name: 'billing_address_state', nullable: true })
    public billingAddressState: string;

    @Column({ name: 'billing_address_city', nullable: true })
    public billingAddressCity: string;

    @Column({ name: 'billing_address_line1', nullable: true })
    public billingAddressLine1: string;

    @Column({ name: 'billing_address_line2', nullable: true })
    public billingAddressLine2: string;

    @Column({ name: 'billing_address_street', nullable: true })
    public billingAddressStreet: string;

    @Column({ name: 'billing_address_notes', nullable: true })
    public billingAddressNotes: string;

    @Column({ name: 'iban', nullable: true })
    public iban: string;

    @Column({ name: 'currency', nullable: true })
    public currency: string;

    @Column({ name: 'pincode' })
    public pincode: string;

    @Column({ name: 'company_description' })
    public companyDescription: string;

    @Column({ name: 'company_mobile_number' })
    public companyMobileNumber: number;

    @Column({ name: 'company_email_id' })
    public companyEmailId: string;

    @Column({ name: 'company_website' })
    public companyWebsite: string;

    @Column({ name: 'company_gst_number' })
    public companyGstNumber: string;

    @Column({ name: 'company_pan_number' })
    public companyPanNumber: string;

    @Column({ name: 'company_logo' })
    public companyLogo: string;

    @Column({ name: 'company_logo_path' })
    public companyLogoPath: string;

    @Column({ name: 'payment_information' })
    public paymentInformation: string;

    @Column({ name: 'approval_flag' })
    public approvalFlag: number;

    @Column({ name: 'approved_by' })
    public approvedBy: number;

    @Column({ name: 'approved_date' })
    public approvalDate: string;

    @Column({ name: 'ambassador_code', nullable: true })
    public ambassadorCode: string;

    // (0 = standard, 1 = premium, 2 = Luxury)
    @Column({ name: 'account_type' })
    public accountType: number;

    @Column({ name: 'customer_id' })
    public customerId: number;

    @OneToOne(type => Customer)
    @JoinColumn({ name: 'customer_id' })
    public customer: Customer;

    @Column({ name: 'seller_account_settings_id' })
    public sellerAccountSettingsId: number;

    @ManyToOne(type => SellerAccountSettings, x => x.vendors)
    @JoinColumn({ name: 'seller_account_settings_id' })
    public sellerAccountSettings: SellerAccountSettings;

    @OneToMany(type => VendorProducts, vendorproducts => vendorproducts.product)
    public vendorProducts: VendorProducts[];

    @OneToMany(type => VendorOrders, vendororders => vendororders.vendor)
    public vendororder: VendorOrders[];

    @OneToMany(type => VendorOrderLog, vendororderlog => vendororderlog.vendor)
    public vendorOrderlog: VendorOrderLog[];

    @OneToMany(type => VendorOrderArchive, vendorOrderArchive => vendorOrderArchive.vendor)
    public vendorOrderArchive: VendorOrderArchive[];

    @OneToMany(type => VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.vendor)
    public vendorOrderArchiveLog: VendorOrderArchiveLog[];

    @OneToMany(type => VendorPayment, vendorPayment => vendorPayment.vendor)
    public vendorPayment: VendorPayment[];

    @OneToMany(type => VendorCoupon, vendorCoupon => vendorCoupon.vendor)
    public vendorCoupon: VendorCoupon[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
