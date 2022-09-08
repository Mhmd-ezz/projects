define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "src/public/apidoc/main.js",
    "group": "/Users/jalal/Documents/Code/ocrafter/ocrafter-api/src/public/apidoc/main.js",
    "groupTitle": "/Users/jalal/Documents/Code/ocrafter/ocrafter-api/src/public/apidoc/main.js",
    "name": ""
  },
  {
    "type": "delete",
    "url": "/api/address/delete-address/:id",
    "title": "Delete Address API",
    "group": "Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"addressId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted address.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/delete-address/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "DeleteApiAddressDeleteAddressId"
  },
  {
    "type": "get",
    "url": "/api/address/addresslist",
    "title": "Address List API",
    "group": "Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get address list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/addresslist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "GetApiAddressAddresslist"
  },
  {
    "type": "get",
    "url": "/api/address/get-address-list/:id",
    "title": "Get Customer Address  API",
    "group": "Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer address list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/get-address-list/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "GetApiAddressGetAddressListId"
  },
  {
    "type": "post",
    "url": "/api/address/add-address",
    "title": "Add Customer Address API",
    "group": "Address",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "customerId",
            "description": "<p>customerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address1",
            "description": "<p>address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address2",
            "description": "<p>address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerId\" : \"\",\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"postcode\" : \"\",\n     \"addressType\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Address is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/add-address"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "addAddress error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "PostApiAddressAddAddress"
  },
  {
    "type": "put",
    "url": "/api/address/update-address/:id",
    "title": "Update Address API",
    "group": "Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerId",
            "description": "<p>customerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address1",
            "description": "<p>address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address2",
            "description": "<p>address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerId\" : \"\",\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"postcode\" : \"\",\n     \"addressType\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated address.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/update-address/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "PutApiAddressUpdateAddressId"
  },
  {
    "type": "get",
    "url": "/api/vendor-setting/get-vendor-settings",
    "title": "Get Vendor Setting API",
    "group": "Admin-Vendor-Setting",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get vendor settings\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-setting/get-vendor-settings"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "getSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorSettingController.ts",
    "groupTitle": "Admin-Vendor-Setting",
    "name": "GetApiVendorSettingGetVendorSettings"
  },
  {
    "type": "post",
    "url": "/api/vendor-setting/create-vendor-settings",
    "title": "Create Vendor Settings API",
    "group": "Admin-Vendor-Setting",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "defaultCommission",
            "description": "<p>default commission</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"defaultCommission\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Created Vendor Setting.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-setting/create-vendor-settings"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "addSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorSettingController.ts",
    "groupTitle": "Admin-Vendor-Setting",
    "name": "PostApiVendorSettingCreateVendorSettings"
  },
  {
    "type": "delete",
    "url": "/api/vendor-category/delete-vendor-category/:id",
    "title": "Delete Vendor Category API",
    "group": "Admin_Vendor_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted vendor category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-category/delete-vendor-category/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorCategoryController.ts",
    "groupTitle": "Admin_Vendor_Category",
    "name": "DeleteApiVendorCategoryDeleteVendorCategoryId"
  },
  {
    "type": "get",
    "url": "/api/vendor-category/vendorCategoryList/:id",
    "title": "Vendor Category List API",
    "group": "Admin_Vendor_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor category list\",\n     \"data\":{\n      \"vendorId\" : \"\",\n      \"vendorCategoryId\" : \"\",\n      \"categoryId\" : \"\",\n      \"commission\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-category/vendorCategoryList/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorCategoryController.ts",
    "groupTitle": "Admin_Vendor_Category",
    "name": "GetApiVendorCategoryVendorcategorylistId"
  },
  {
    "type": "post",
    "url": "/api/vendor-category/create-vendor-category",
    "title": "Create Vendor Category API",
    "group": "Admin_Vendor_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>commission</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorId\" : \"\",\n     \"categoryId\" : \"\",\n     \"commission\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully added category\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-category/create-vendor-category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor category  error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorCategoryController.ts",
    "groupTitle": "Admin_Vendor_Category",
    "name": "PostApiVendorCategoryCreateVendorCategory"
  },
  {
    "type": "put",
    "url": "/api/vendor-category/update-vendor-category",
    "title": "Update Vendor Category API",
    "group": "Admin_Vendor_Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>commission</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorId\" : \"\",\n     \"categoryId\" : \"\",\n     \"commission\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully update\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-category/update-vendor-category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor category  error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorCategoryController.ts",
    "groupTitle": "Admin_Vendor_Category",
    "name": "PutApiVendorCategoryUpdateVendorCategory"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-order/order-detail",
    "title": "Order Detail API",
    "group": "Admin_Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-order/order-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorOrderController.ts",
    "groupTitle": "Admin_Vendor_Order",
    "name": "GetApiAdminVendorOrderOrderDetail"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-order/order-list",
    "title": "Order List API",
    "group": "Admin_Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-order/order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorOrderController.ts",
    "groupTitle": "Admin_Vendor_Order",
    "name": "GetApiAdminVendorOrderOrderList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-order/vendor-order-log-list",
    "title": "Vendor Order Log List API",
    "group": "Admin_Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got vendor order log list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-order/vendor-order-log-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorOrderController.ts",
    "groupTitle": "Admin_Vendor_Order",
    "name": "GetApiAdminVendorOrderVendorOrderLogList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-order/vendor-order-log-list",
    "title": "Vendor Order Log List API",
    "group": "Admin_Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got vendor order log list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-order/vendor-order-log-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Order",
    "name": "GetApiAdminVendorOrderVendorOrderLogList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/export-bulk-order-payment-list",
    "title": "Export Bulk Order Payment List API",
    "group": "Admin_Vendor_Payment",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully export payment list\",\n     \"data\": \"{}\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/export-bulk-order-payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Export error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentExportBulkOrderPaymentList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/payment-dashboard-count",
    "title": "Payment Dashboard Count API",
    "group": "Admin_Vendor_Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Payment Dashboard..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/payment-dashboard-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentPaymentDashboardCount"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/payment-detail",
    "title": "Payment Detail API",
    "group": "Admin_Vendor_Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Payment Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/payment-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentPaymentDetail"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/payment-list",
    "title": "Payment List API",
    "group": "Admin_Vendor_Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentPaymentList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/payment-list-count",
    "title": "Payment List Count API",
    "group": "Admin_Vendor_Payment",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/payment-list-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentPaymentListCount"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-payment/vendor-order-payment-export",
    "title": "Admin vendor order payment export",
    "group": "Admin_Vendor_Payment",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the vendor order payment List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-payment/vendor-order-payment-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_Vendor_Payment",
    "name": "GetApiAdminVendorPaymentVendorOrderPaymentExport"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-product/bulk-vendor-product-excel-list",
    "title": "Bulk Vendor Product Excel sheet",
    "group": "Admin_Vendor_Product",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the All Vendor Product Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/bulk-vendor-product-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Allproduct Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "GetApiAdminVendorProductBulkVendorProductExcelList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-product/vendor-product-detail/:id",
    "title": "Vendor Product Detail API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/vendor-product-detail/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "GetApiAdminVendorProductVendorProductDetailId"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-product/vendor-product-excel-list",
    "title": "Vendor Product Excel sheet",
    "group": "Admin_Vendor_Product",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the All Vendor Product Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/vendor-product-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Allproduct Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "GetApiAdminVendorProductVendorProductExcelList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-product/vendor-product-list",
    "title": "Vendor Product List API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor product list\",\n     \"data\":{\n     \"vendorId\" : \"\",\n     \"vendorName\" : \"\",\n     \"productName\" : \"\",\n     \"sku\" : \"\",\n     \"model\" : \"\",\n     \"price\" : \"\",\n     \"quantity\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/vendor-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "GetApiAdminVendorProductVendorProductList"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/vendor-product-excel-list",
    "title": "Vendor Product Excel sheet",
    "group": "Admin_Vendor_Product",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the All Vendor Product Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/vendor-product-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Allproduct Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "GetApiVendorProductVendorProductExcelList"
  },
  {
    "type": "post",
    "url": "/api/admin-vendor-product/create-vendor-product",
    "title": "Create Vendor Product API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxType",
            "description": "<p>taxType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productOptions",
            "description": "<p>productOptions</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorProductCommission",
            "description": "<p>vendorProductCommission</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "productTranslation",
            "description": "<p>List of Product Translation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorId\" : \"\",\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"categoryId\" : \"\",\n     \"productSlug\" : \"\",\n     \"upc\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"taxType\" : \"\",\n     \"others\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"vendorProductCommission\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ]\n     \"productTranslation\":[\n       {\n          \"languageCode\":\"en\"\n          \"name\":\"\"\n          \"description\":\"\"\n       }\n     ]\n    \"relatedProductId\":[ ]\n    \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }]\n    \"productDiscount\":[\n     {\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }]\n    \"productOptions\":[\n     {\n      \"optionId\":\"\"\n      \"value\":\"\"\n      \"required\":\"\"\n          \"optionValue\":[\n           {\n              \"optionValueId\":\"\"\n              \"quantity\":\"\"\n              \"subtractStock\":\"\"\n              \"pricePrefix\":\"\"\n              \"price\":\"\"\n           }]\n     }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Vendor product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/create-vendor-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "PostApiAdminVendorProductCreateVendorProduct"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor-product/add-product-status/:id",
    "title": "Add Vendor Product Status API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>either should be 1 or 0</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/add-product-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "PutApiAdminVendorProductAddProductStatusId"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor-product/approve-product/:id",
    "title": "Product Approval API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "approvalFlag",
            "description": "<p>approval flag should be 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"approvalFlag\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully approved product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/approve-product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "PutApiAdminVendorProductApproveProductId"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor-product/update-vendor-product-commission",
    "title": "Update Vendor Product Commission",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "productId",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "commission",
            "description": "<p>Commission</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n     \"commission\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully update product commission.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/update-vendor-product-commission"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "PutApiAdminVendorProductUpdateVendorProductCommission"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor-product/update-vendor-product/:id",
    "title": "Update Vendor Product API",
    "group": "Admin_Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxType",
            "description": "<p>taxType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productOptions",
            "description": "<p>productOptions</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorProductCommission",
            "description": "<p>vendorProductCommission</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "productTranslation",
            "description": "<p>List of Product Translation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"categoryId\" : \"\",\n     \"upc\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"taxType\" : \"\",\n     \"others\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"vendorProductCommission\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ],\n     \"productTranslation\":[\n       {\n          \"languageCode\":\"en\"\n          \"name\":\"\"\n          \"description\":\"\"\n       }\n     ]\n      \"relatedProductId\":[ \"\", \"\"],\n     \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }],\n      \"productDiscount\":[\n     {\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }],\n    \"productOptions\":[\n     {\n      \"optionId\":\"\"\n      \"value\":\"\"\n      \"required\":\"\"\n          \"optionValue\":[\n           {\n              \"optionValueId\":\"\"\n              \"quantity\":\"\"\n              \"subtractStock\":\"\"\n              \"pricePrefix\":\"\"\n              \"price\":\"\"\n           }]\n     }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-product/update-vendor-product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateProduct error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorProductController.ts",
    "groupTitle": "Admin_Vendor_Product",
    "name": "PutApiAdminVendorProductUpdateVendorProductId"
  },
  {
    "type": "delete",
    "url": "/api/admin-ambassador/delete-ambassador/:id",
    "title": "Delete single Ambassador API",
    "group": "Admin_ambassador",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"ambassadorId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted ambassador.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-ambassador/delete-ambassador/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Ambassador error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ambassador/AmbassadorController.ts",
    "groupTitle": "Admin_ambassador",
    "name": "DeleteApiAdminAmbassadorDeleteAmbassadorId"
  },
  {
    "type": "get",
    "url": "/api/admin-ambassador/ambassador-details/:id",
    "title": "Ambassador Details API",
    "group": "Admin_ambassador",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get ambassador Details\",\n\"data\":{\n\"ambassadorId\" : \"\",\n\"firstName\" : \"\",\n\"lastName\" : \"\",\n\"email\" : \"\",\n\"mobileNumber\" : \"\",\n\"avatar\" : \"\",\n\"avatarPath\" : \"\",\n\"commission\" : \"\",\n\"status\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-ambassador/ambassador-details/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "ambassador error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ambassador/AmbassadorController.ts",
    "groupTitle": "Admin_ambassador",
    "name": "GetApiAdminAmbassadorAmbassadorDetailsId"
  },
  {
    "type": "get",
    "url": "/api/admin-ambassador/ambassador-excel-list",
    "title": "Ambassador Excel",
    "group": "Admin_ambassador",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "ambassadorId",
            "description": "<p>ambassadorId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Ambassador Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-ambassador/ambassador-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Ambassador Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ambassador/AmbassadorController.ts",
    "groupTitle": "Admin_ambassador",
    "name": "GetApiAdminAmbassadorAmbassadorExcelList"
  },
  {
    "type": "get",
    "url": "/api/admin-ambassador/ambassadorlist",
    "title": "Ambassador List API",
    "group": "Admin_ambassador",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>search by name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>search by email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get ambassador list\",\n     \"data\":{\n     \"customerGroupId\" : \"\",\n     \"username\" : \"\",\n     \"email\" : \"\",\n     \"mobileNUmber\" : \"\",\n     \"password\" : \"\",\n     \"avatar\" : \"\",\n     \"avatarPath\" : \"\",\n     \"status\" : \"\",\n     \"safe\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-ambassador/ambassadorlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "ambassador error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ambassador/AmbassadorController.ts",
    "groupTitle": "Admin_ambassador",
    "name": "GetApiAdminAmbassadorAmbassadorlist"
  },
  {
    "type": "post",
    "url": "/api/admin-ambassador/add-ambassador",
    "title": "Add Ambassador API",
    "group": "Admin_ambassador",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Ambassador firstName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Ambassador lastName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Ambassador email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Ambassador mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Ambassador password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Ambassador confirmPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Ambassador avatar</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>seller commission</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>companyName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyLogo",
            "description": "<p>company Logo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyDescription",
            "description": "<p>company description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress1",
            "description": "<p>company address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress2",
            "description": "<p>company address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyCity",
            "description": "<p>company city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyState",
            "description": "<p>company state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyCountryId",
            "description": "<p>company country id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pincode",
            "description": "<p>pincode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyMobileNumber",
            "description": "<p>company mobile number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyEmailId",
            "description": "<p>company email id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyWebsite",
            "description": "<p>company website</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyGstNumber",
            "description": "<p>company gst number</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyPanNumber",
            "description": "<p>company pan number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentInformation",
            "description": "<p>paymentInformation</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailStatus",
            "description": "<p>mailStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"email\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"avatar\" : \"\",\n     \"commission\" : \"\",\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"countryId\" : \"\",\n     \"pincode\" : \"\",\n     \"paymentInformation\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Ambassador Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-ambassador/add-ambassador"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Ambassador error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ambassador/AmbassadorController.ts",
    "groupTitle": "Admin_ambassador",
    "name": "PostApiAdminAmbassadorAddAmbassador"
  },
  {
    "type": "post",
    "url": "/api/admin-ambassador/delete-multiple-ambassador",
    "title": "Delete Multiple Ambassador API",
    "group": "Admin_ambassador",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "ambassadorId",
            "description": "<p>ambassadorId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"ambassadorId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted ambassadors.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-ambassador/delete-multiple-ambassador"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customerDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ambassador/AmbassadorController.ts",
    "groupTitle": "Admin_ambassador",
    "name": "PostApiAdminAmbassadorDeleteMultipleAmbassador"
  },
  {
    "type": "put",
    "url": "/api/admin-ambassador/update-ambassador-commission/:ambassadorId",
    "title": "Update Ambassador Commission API",
    "group": "Admin_ambassador",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "commission",
            "description": "<p>commission</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"commission\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated ambassador commission\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-ambassador/update-ambassador-commission/:ambassadorId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "ambassador approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ambassador/AmbassadorController.ts",
    "groupTitle": "Admin_ambassador",
    "name": "PutApiAdminAmbassadorUpdateAmbassadorCommissionAmbassadorid"
  },
  {
    "type": "put",
    "url": "/api/admin-ambassador/Update-Ambassador/:id",
    "title": "Update Ambassador API",
    "group": "Admin_ambassador",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Ambassador firstName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Ambassador lastName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Customer mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Customer avatar</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>seller commission</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>companyName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyLogo",
            "description": "<p>company Logo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyDescription",
            "description": "<p>company description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress1",
            "description": "<p>company address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress2",
            "description": "<p>company address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyCity",
            "description": "<p>company city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyState",
            "description": "<p>company state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyCountryId",
            "description": "<p>company country id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pincode",
            "description": "<p>pincode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyMobileNumber",
            "description": "<p>company mobile number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyEmailId",
            "description": "<p>company email id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyWebsite",
            "description": "<p>company website</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyGstNumber",
            "description": "<p>company gst number</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyPanNumber",
            "description": "<p>company pan number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentInformation",
            "description": "<p>paymentInformation</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailStatus",
            "description": "<p>mailStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"avatar\" : \"\",\n     \"commission\" : \"\",\n     \"companyName\" : \"\",\n     \"companyLogo\" : \"\",\n     \"companyDescription\" : \"\",\n     \"paymentInformation\" : \"\",\n     \"companyAddress1\" : \"\",\n     \"companyAddress2\" : \"\",\n     \"companyCity\" : \"\",\n     \"companyState\" : \"\",\n     \"companyCountryId\" : \"\",\n     \"pincode\" : \"\",\n     \"companyMobileNumber\" : \"\",\n     \"companyEmailId\" : \"\",\n     \"companyWebsite\" : \"\",\n     \"companyGstNumber\" : \"\",\n     \"companyPanNumber\" : \"\",\n     \"mailStatus\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Ambassador Updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-ambassador/Update-Ambassador/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Ambassador error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ambassador/AmbassadorController.ts",
    "groupTitle": "Admin_ambassador",
    "name": "PutApiAdminAmbassadorUpdateAmbassadorId"
  },
  {
    "type": "delete",
    "url": "/api/admin-vendor/delete-vendor/:id",
    "title": "Delete single Vendor API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted vendor.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/delete-vendor/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "DeleteApiAdminVendorDeleteVendorId"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor/customer-document-list",
    "title": "Get Customer Document List",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"search\" : \"\",\n     \"vendorId\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get customer document list\",\n\"data\":{},\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/customer-document-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "GetApiAdminVendorCustomerDocumentList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor/download-customer-document/:customerDocumentId",
    "title": "Download Customer Document API",
    "group": "Admin_vendor",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerDocumentId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully download customer document file.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/download-customer-document/:customerDocumentId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Download error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "GetApiAdminVendorDownloadCustomerDocumentCustomerdocumentid"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor/vendor-details/:id",
    "title": "Vendor Details API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get vendor Details\",\n\"data\":{\n\"vendorId\" : \"\",\n\"firstName\" : \"\",\n\"lastName\" : \"\",\n\"email\" : \"\",\n\"mobileNumber\" : \"\",\n\"avatar\" : \"\",\n\"avatarPath\" : \"\",\n\"commission\" : \"\",\n\"status\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/vendor-details/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "GetApiAdminVendorVendorDetailsId"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor/vendor-excel-list",
    "title": "Vendor Excel",
    "group": "Admin_vendor",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Vendor Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/vendor-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "GetApiAdminVendorVendorExcelList"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor/vendorlist",
    "title": "Vendor List API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>search by name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>search by email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor list\",\n     \"data\":{\n     \"customerGroupId\" : \"\",\n     \"username\" : \"\",\n     \"email\" : \"\",\n     \"mobileNUmber\" : \"\",\n     \"password\" : \"\",\n     \"avatar\" : \"\",\n     \"avatarPath\" : \"\",\n     \"status\" : \"\",\n     \"safe\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/vendorlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "GetApiAdminVendorVendorlist"
  },
  {
    "type": "post",
    "url": "/api/admin-vendor/add-vendor",
    "title": "Add Vendor API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Vendor firstName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Vendor lastName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Vendor email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Vendor mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Vendor password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Vendor confirmPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Vendor avatar</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sellerAccountSettingsId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>seller commission</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>companyName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyLogo",
            "description": "<p>company Logo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyDescription",
            "description": "<p>company description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress1",
            "description": "<p>company address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress2",
            "description": "<p>company address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyCity",
            "description": "<p>company city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyState",
            "description": "<p>company state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCountryId",
            "description": "<p>shipping country id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressState",
            "description": "<p>shipping country state</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressCity",
            "description": "<p>shipping address city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressLine1",
            "description": "<p>shipping address line1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressLine2",
            "description": "<p>shipping address line2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressStreet",
            "description": "<p>shipping address street</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressNotes",
            "description": "<p>shipping address notes</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "billingAddressCountryId",
            "description": "<p>billing address country id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "billingAddressState",
            "description": "<p>billing address state</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "billingAddressCity",
            "description": "<p>billing address city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "billingAddressLine1",
            "description": "<p>billing address line1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "billingAddressLine2",
            "description": "<p>billing address line2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "billingAddressStreet",
            "description": "<p>billing address street</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "billingAddressNotes",
            "description": "<p>billing address notes</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "iban",
            "description": "<p>vendor bank account</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>vendor currency</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pincode",
            "description": "<p>pincode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyMobileNumber",
            "description": "<p>company mobile number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyEmailId",
            "description": "<p>company email id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyWebsite",
            "description": "<p>company website</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyGstNumber",
            "description": "<p>company gst number</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyPanNumber",
            "description": "<p>company pan number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentInformation",
            "description": "<p>paymentInformation</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailStatus",
            "description": "<p>mailStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"email\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"avatar\" : \"\",\n     \"sellerAccountSettingsId\" : \"\",\n     \"commission\" : \"\",\n     \"companyName\" : \"\",\n     \"companyLogo\" : \"\",\n     \"companyDescription\" : \"\",\n     \"companyAddress1\" : \"\",\n     \"companyAddress2\" : \"\",\n     \"companyCity\" : \"\",\n     \"companyState\" : \"\",\n     \"shippingCountryId\" : \"\",\n     \"shippingAddressState\" : \"\",\n     \"shippingAddressCity\" : \"\",\n     \"shippingAddressLine1\" : \"\",\n     \"shippingAddressLine2\" : \"\",\n     \"shippingAddressStreet\" : \"\",\n     \"shippingAddressNotes\" : \"\",\n     \"billingAddressCountryId\" : \"\",\n     \"billingAddressState\" : \"\",\n     \"billingAddressCity\" : \"\",\n     \"billingAddressLine1\" : \"\",\n     \"billingAddressLine2\" : \"\",\n     \"billingAddressStreet\" : \"\",\n     \"billingAddressNotes\" : \"\",\n     \"currency\" : \"\",\n     \"pincode\" : \"\",\n     \"companyMobileNumber\" : \"\",\n     \"companyEmailId\" : \"\",\n     \"companyWebsite\" : \"\",\n     \"companyGstNumber\" : \"\",\n     \"companyPanNumber\" : \"\",\n     \"mailStatus\" : \"\",\n     \"paymentInformation\": \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Vendor Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/add-vendor"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PostApiAdminVendorAddVendor"
  },
  {
    "type": "post",
    "url": "/api/admin-vendor/delete-multiple-vendor",
    "title": "Delete Multiple Vendor API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"vendorId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted vendors.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/delete-multiple-vendor"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customerDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PostApiAdminVendorDeleteMultipleVendor"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor/approve-vendor/:id",
    "title": "Vendor Approval API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "approvalFlag",
            "description": "<p>approval flag should be 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"approvalFlag\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully approved vendor.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/approve-vendor/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PutApiAdminVendorApproveVendorId"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor-order/make-archive/:orderId",
    "title": "Make Archive/revoke API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "archiveFlag",
            "description": "<p>archive flag should should be 1 or 0</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"archiveFlag\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully .\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/make-archive/:orderId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PutApiAdminVendorOrderMakeArchiveOrderid"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor-order/make-archive/:orderId",
    "title": "Make Archive/revoke API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "archiveFlag",
            "description": "<p>archive flag should should be 1 or 0</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"archiveFlag\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully .\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/make-archive/:orderId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorOrderController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PutApiAdminVendorOrderMakeArchiveOrderid"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor/update-vendor-commission/:vendorId",
    "title": "Update Vendor Commission API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "commission",
            "description": "<p>commission</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"commission\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated vendor commission\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/update-vendor-commission/:vendorId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PutApiAdminVendorUpdateVendorCommissionVendorid"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor/Update-Vendor/:id",
    "title": "Update Vendor API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>Vendor firstName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Vendor lastName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Customer mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Customer avatar</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "commission",
            "description": "<p>seller commission</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sellerAccountSettingsId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>companyName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyLogo",
            "description": "<p>company Logo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyDescription",
            "description": "<p>company description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress1",
            "description": "<p>company address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress2",
            "description": "<p>company address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyCity",
            "description": "<p>company city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyState",
            "description": "<p>company state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCountryId",
            "description": "<p>company country id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressState",
            "description": "<p>shipping country state</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressCity",
            "description": "<p>shipping address city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressLine1",
            "description": "<p>shipping address line1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressLine2",
            "description": "<p>shipping address line2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressStreet",
            "description": "<p>shipping address street</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressNotes",
            "description": "<p>shipping address notes</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "billingAddressCountryId",
            "description": "<p>billing address country id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "billingAddressState",
            "description": "<p>billing address state</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "billingAddressCity",
            "description": "<p>billing address city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "billingAddressLine1",
            "description": "<p>billing address line1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "billingAddressLine2",
            "description": "<p>billing address line2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "billingAddressStreet",
            "description": "<p>billing address street</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "billingAddressNotes",
            "description": "<p>billing address notes</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "iban",
            "description": "<p>vendor bank account</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "currency",
            "description": "<p>vendor currency</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pincode",
            "description": "<p>pincode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyMobileNumber",
            "description": "<p>company mobile number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyEmailId",
            "description": "<p>company email id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyWebsite",
            "description": "<p>company website</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyGstNumber",
            "description": "<p>company gst number</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyPanNumber",
            "description": "<p>company pan number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentInformation",
            "description": "<p>paymentInformation</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailStatus",
            "description": "<p>mailStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"avatar\" : \"\",\n     \"sellerAccountSettingsId\" : \"\",\n     \"commission\" : \"\",\n     \"companyName\" : \"\",\n     \"companyLogo\" : \"\",\n     \"companyDescription\" : \"\",\n     \"paymentInformation\" : \"\",\n     \"companyAddress1\" : \"\",\n     \"companyAddress2\" : \"\",\n     \"companyCity\" : \"\",\n     \"companyState\" : \"\",\n     \"shippingCountryId\" : \"\",\n     \"shippingAddressState\" : \"\",\n     \"shippingAddressCity\" : \"\",\n     \"shippingAddressLine1\" : \"\",\n     \"shippingAddressLine2\" : \"\",\n     \"shippingAddressStreet\" : \"\",\n     \"shippingAddressNotes\" : \"\",\n     \"billingAddressCountryId\" : \"\",\n     \"billingAddressState\" : \"\",\n     \"billingAddressCity\" : \"\",\n     \"billingAddressLine1\" : \"\",\n     \"billingAddressLine2\" : \"\",\n     \"billingAddressStreet\" : \"\",\n     \"billingAddressNotes\" : \"\",\n     \"pincode\" : \"\",\n     \"companyMobileNumber\" : \"\",\n     \"companyEmailId\" : \"\",\n     \"companyWebsite\" : \"\",\n     \"companyGstNumber\" : \"\",\n     \"companyPanNumber\" : \"\",\n     \"mailStatus\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Vendor Updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/Update-Vendor/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PutApiAdminVendorUpdateVendorId"
  },
  {
    "type": "put",
    "url": "/api/admin-vendor/verify-customer-document/:customerDocumentId",
    "title": "Verify Customer Document API",
    "group": "Admin_vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "documentStatus",
            "description": "<p>documentStatus</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"documentStatus\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully verify customer document list\",\n\"data\":{},\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor/verify-customer-document/:customerDocumentId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorController.ts",
    "groupTitle": "Admin_vendor",
    "name": "PutApiAdminVendorVerifyCustomerDocumentCustomerdocumentid"
  },
  {
    "type": "delete",
    "url": "/api/auth/delete-user/:id",
    "title": "Delete User",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>UserId</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"User is deleted successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/delete-user/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateUser error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "DeleteApiAuthDeleteUserId"
  },
  {
    "type": "get",
    "url": "/api/auth/logout",
    "title": "Log Out API",
    "group": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully logout\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/logout"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Logout error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "GetApiAuthLogout"
  },
  {
    "type": "get",
    "url": "/api/auth/userlist",
    "title": "User List API",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get user list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/userlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User Profile error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "GetApiAuthUserlist"
  },
  {
    "type": "post",
    "url": "/api/auth/confirm-password",
    "title": "Confirm Password API",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "verificationCode",
            "description": "<p>Verification code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>New password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"verificationCode\": \"\",\n     \"newPassword\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you for confirming your new password\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/forgot-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthConfirmPassword"
  },
  {
    "type": "post",
    "url": "/api/auth/create-user",
    "title": "Create User API",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>userName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email-Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "userGroupId",
            "description": "<p>User GroupId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"password\" : \"\",\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"email\" : \"\",\n     \"userGroupId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New User is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/create-user"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createUser error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthCreateUser"
  },
  {
    "type": "post",
    "url": "/api/auth/edit-profile",
    "title": "Edit Profile API",
    "group": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User phoneNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>User address</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>User avatar</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"email\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"address\" : \"\",\n     \"avatar\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated User.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/edit-profile"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthEditProfile"
  },
  {
    "type": "post",
    "url": "/api/auth/forgot-password",
    "title": "Forgot Password API",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"email\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you. Your password send to your email\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/forgot-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthForgotPassword"
  },
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "Login",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User Username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"password\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthLogin"
  },
  {
    "type": "put",
    "url": "/api/auth/change-password",
    "title": "Change Password API",
    "group": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>User oldPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User newPassword</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"oldPassword\" : \"\",\n     \"newPassword\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Password changed\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/change-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PutApiAuthChangePassword"
  },
  {
    "type": "put",
    "url": "/api/auth/update-user/:id",
    "title": "Update User API",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>userName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email-Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "userGroupId",
            "description": "<p>User GroupId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"password\" : \"\",\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"email\" : \"\",\n     \"userGroupId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"User is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/update-user/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateUser error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PutApiAuthUpdateUserId"
  },
  {
    "type": "delete",
    "url": "/api/banner/delete-banner/:id",
    "title": "Delete Banner API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"bannerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Banner.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/delete-banner/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "DeleteApiBannerDeleteBannerId"
  },
  {
    "type": "get",
    "url": "/api/banner/bannerlist",
    "title": "Banner List API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got banner list\",\n     \"data\":\"{\n     \"bannerId\": \"\",\n     \"title\": \"\",\n     \"content\": \"\",\n     \"image\": \"\",\n     \"imagePath\": \"\",\n     \"link\": \"\",\n     \"position\": \"\",\n     }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/bannerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "GetApiBannerBannerlist"
  },
  {
    "type": "post",
    "url": "/api/banner/add-banner",
    "title": "Add Banner API",
    "group": "Banner",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>link</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "position",
            "description": "<p>position</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"image\" : \"\",\n     \"link\" : \"\",\n     \"position\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New banner is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/add-banner"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "PostApiBannerAddBanner"
  },
  {
    "type": "post",
    "url": "/api/banner/delete-banner",
    "title": "Delete Multiple Banner API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "bannerId",
            "description": "<p>bannerId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"bannerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Banner.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/delete-banner"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "bannerDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "PostApiBannerDeleteBanner"
  },
  {
    "type": "put",
    "url": "/api/banner/update-banner/:id",
    "title": "Update Banner API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "bannerId",
            "description": "<p>Banner bannerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Banner title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Banner image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Banner content</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>Banner link</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "position",
            "description": "<p>Banner position</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"bannerId\" : \"\",\n     \"title\" : \"\",\n     \"image\" : \"\",\n     \"content\" : \"\",\n     \"link\" : \"\",\n     \"position\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated banner.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/update-banner/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "PutApiBannerUpdateBannerId"
  },
  {
    "type": "delete",
    "url": "/api/delete-category/:id",
    "title": "Delete Category API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Category categoryId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"categoryId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delete-category/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "DeleteApiDeleteCategoryId"
  },
  {
    "type": "get",
    "url": "/api/category-count",
    "title": "Category Count API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the complete category count.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategoryCount"
  },
  {
    "type": "get",
    "url": "/api/category-list-intree",
    "title": "Category List InTree API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the complete category list.\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category-list-intree"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategoryListIntree"
  },
  {
    "type": "get",
    "url": "/api/categorylist",
    "title": "Category List API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the complete category list.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/categorylist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategorylist"
  },
  {
    "type": "post",
    "url": "/api/add-category",
    "title": "Add Category API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Category name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Category image</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "parentInt",
            "description": "<p>Category  parentInt</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Category sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>Category metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>Category metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>Category metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Category status 1-&gt; Active 0-&gt; inactive</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"parentInt\" : \"\",\n     \"sortOrder\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/add-category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "PostApiAddCategory"
  },
  {
    "type": "put",
    "url": "/api/update-category/:id",
    "title": "Update Category API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Category categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Category name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Category image</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "parentInt",
            "description": "<p>Category  parentInt</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Category sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>Category metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>Category metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>Category metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Category status 1-&gt; Active 0-&gt; inactive</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"categoryId\" : \"\",\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"parentInt\" : \"\",\n     \"sortOrder\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/update-category/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "PutApiUpdateCategoryId"
  },
  {
    "type": "put",
    "url": "/api/update-category-slug",
    "title": "Update Category Slug API",
    "group": "Category",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Category Slug.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/update-category-slug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "PutApiUpdateCategorySlug"
  },
  {
    "type": "delete",
    "url": "/api/country/delete-country/:id",
    "title": "Delete Country API",
    "group": "Country",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"countryId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Country.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/delete-country/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "DeleteApiCountryDeleteCountryId"
  },
  {
    "type": "get",
    "url": "/api/country/allowedCountries",
    "title": "Country List API",
    "group": "Country",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got allowed country list\",\n     \"data\":{\n     \"countryId\"\n     \"name\"\n     \"isoCode2\"\n     \"isoCode3\"\n     \"addressFormat\"\n     \"postcodeRequired\"\n     \"status\"\n     \"isAllowed\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/allowed-countries"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "GetApiCountryAllowedcountries"
  },
  {
    "type": "get",
    "url": "/api/country/countrylist",
    "title": "Country List API",
    "group": "Country",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got country list\",\n     \"data\":{\n     \"countryId\"\n     \"name\"\n     \"isoCode2\"\n     \"isoCode3\"\n     \"addressFormat\"\n     \"postcodeRequired\"\n     \"status\"\n     \"isAllowed\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/countrylist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "GetApiCountryCountrylist"
  },
  {
    "type": "post",
    "url": "/api/country/add-country",
    "title": "Add Country API",
    "group": "Country",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Country name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "isoCode2",
            "description": "<p>Country isoCode2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "isoCode3",
            "description": "<p>Country isoCode3</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "postcodeRequired",
            "description": "<p>Country postcodeRequired</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Country status field required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"isoCode2\" : \"\",\n     \"isoCode3\" : \"\",\n     \"addressFormat\" : \"\",\n     \"postcodeRequired\" : \"\",\n     \"status\" : \"\",\n     \"isAllowed\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Country.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/add-country"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "PostApiCountryAddCountry"
  },
  {
    "type": "put",
    "url": "/api/country/update-country/:id",
    "title": "Update Country API",
    "group": "Country",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>Country countryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Country name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "isoCode2",
            "description": "<p>Country isoCode2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "isoCode3",
            "description": "<p>Country isoCode3</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "postcodeRequired",
            "description": "<p>Country postcodeRequired</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"countryId\" : \"\",\n     \"name\" : \"\",\n     \"isoCode2\" : \"\",\n     \"isoCode3\" : \"\",\n     \"addressFormat\" : \"\",\n     \"postcodeRequired\" : \"\",\n     \"status\" : \"\",\n     \"isAllowed\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Country.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/update-country/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "PutApiCountryUpdateCountryId"
  },
  {
    "type": "delete",
    "url": "/api/currency/delete-currency/:id",
    "title": "Delete Currency API",
    "group": "Currency",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"currencyId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted currency.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/currency/delete-currency/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Currency error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CurrencyController.ts",
    "groupTitle": "Currency",
    "name": "DeleteApiCurrencyDeleteCurrencyId"
  },
  {
    "type": "get",
    "url": "/api/currency/currencylist",
    "title": "Currency List API",
    "group": "Currency",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get currency list\",\n     \"data\":{\n      \"currencyId\" : \"\",\n      \"title\" : \"\",\n      \"code\" : \"\",\n      \"value\" : \"\",\n      \"update\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/currency/currencylist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Currency error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CurrencyController.ts",
    "groupTitle": "Currency",
    "name": "GetApiCurrencyCurrencylist"
  },
  {
    "type": "post",
    "url": "/api/currency/add-currency",
    "title": "Add Currency API",
    "group": "Currency",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Currency title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Currency code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "symbolLeft",
            "description": "<p>Currency symbolLeft</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "symbolRight",
            "description": "<p>Currency  symbolRight</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Currency status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"code\" : \"\",\n     \"symbolLeft\" : \"\",\n     \"symbolRight\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Currency.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/currency/add-currency"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Currency error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CurrencyController.ts",
    "groupTitle": "Currency",
    "name": "PostApiCurrencyAddCurrency"
  },
  {
    "type": "put",
    "url": "/api/currency/update-currency/:id",
    "title": "Update Currency API",
    "group": "Currency",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "currencyId",
            "description": "<p>Currency currencyId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Currency title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Currency code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "symbolLeft",
            "description": "<p>Currency symbolLeft</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "symbolRight",
            "description": "<p>Currency  symbolRight</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Currency status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"currencyId\" : \"\",\n     \"title\" : \"\",\n     \"code\" : \"\",\n     \"symbolLeft\" : \"\",\n     \"symbolRight\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Currency.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/currency/update-currency/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Currency error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CurrencyController.ts",
    "groupTitle": "Currency",
    "name": "PutApiCurrencyUpdateCurrencyId"
  },
  {
    "type": "delete",
    "url": "/api/customer/delete-customer/:id",
    "title": "Delete Customer API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted customer.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/delete-customer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "DeleteApiCustomerDeleteCustomerId"
  },
  {
    "type": "get",
    "url": "/api/customer/allcustomer-excel-list",
    "title": "All Customer Excel",
    "group": "Customer",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the All Customer Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/allcustomer-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerAllcustomerExcelList"
  },
  {
    "type": "get",
    "url": "/api/customer/customer-details/:id",
    "title": "Customer Details API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get customer Details\",\n\"data\":{\n\"customerGroupId\" : \"\",\n\"username\" : \"\",\n\"email\" : \"\",\n\"mobileNumber\" : \"\",\n\"password\" : \"\",\n\"avatar\" : \"\",\n\"avatarPath\" : \"\",\n\"newsletter\" : \"\",\n\"status\" : \"\",\n\"safe\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/customer-details/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerCustomerDetailsId"
  },
  {
    "type": "get",
    "url": "/api/customer/customer-excel-list",
    "title": "Customer Excel",
    "group": "Customer",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerId",
            "description": "<p>customerId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Customer Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/customer-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerCustomerExcelList"
  },
  {
    "type": "get",
    "url": "/api/customer/customerlist",
    "title": "Customer List API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>search by name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>search by email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerGroup",
            "description": "<p>search by customerGroup</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>search by date</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer list\",\n     \"data\":{\n     \"customerGroupId\" : \"\",\n     \"username\" : \"\",\n     \"email\" : \"\",\n     \"mobileNUmber\" : \"\",\n     \"password\" : \"\",\n     \"avatar\" : \"\",\n     \"avatarPath\" : \"\",\n     \"status\" : \"\",\n     \"safe\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/customerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerCustomerlist"
  },
  {
    "type": "get",
    "url": "/api/customer/recent-customerlist",
    "title": "Recent Customer List API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get customer list\",\n     \"data\":{\n     \"location\" : \"\",\n     \"name\" : \"\",\n     \"created date\" : \"\",\n     \"isActive\" : \"\",\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/recent-customerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerRecentCustomerlist"
  },
  {
    "type": "get",
    "url": "/api/customer/today-customercount",
    "title": "Today Customer Count API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Today customer count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/today-customercount"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerTodayCustomercount"
  },
  {
    "type": "delete",
    "url": "/api/customer-group/delete-customer-group/:id",
    "title": "Delete Customer Group API",
    "group": "CustomerGroup",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "groupId",
            "description": "<p>groupId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"groupId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted customerGroup.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-group/delete-customer-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "CustomerGroup error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerGroupController.ts",
    "groupTitle": "CustomerGroup",
    "name": "DeleteApiCustomerGroupDeleteCustomerGroupId"
  },
  {
    "type": "get",
    "url": "/api/customer-group/customergroup-list",
    "title": "customergroup-list API",
    "group": "CustomerGroup",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully get customer group list\",\n   \"data\":\"{}\"\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-group/customergroup-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customergroup error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerGroupController.ts",
    "groupTitle": "CustomerGroup",
    "name": "GetApiCustomerGroupCustomergroupList"
  },
  {
    "type": "post",
    "url": "/api/customer-group/create-customer-group",
    "title": "Create customer group API",
    "group": "CustomerGroup",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>groupName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>groupDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "colorcode",
            "description": "<p>colorcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"description\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Customer group is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-group/create-customer-group"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createCustomer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerGroupController.ts",
    "groupTitle": "CustomerGroup",
    "name": "PostApiCustomerGroupCreateCustomerGroup"
  },
  {
    "type": "put",
    "url": "/api/customer-group/update-customer-group/:id",
    "title": "Update Customer Group API",
    "group": "CustomerGroup",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>groupName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>groupDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "colorcode",
            "description": "<p>colorcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"description\" : \"\",\n     \"colorcode\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Customer Group is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-group/update-customer-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "update-customer-group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerGroupController.ts",
    "groupTitle": "CustomerGroup",
    "name": "PutApiCustomerGroupUpdateCustomerGroupId"
  },
  {
    "type": "post",
    "url": "/api/customer/add-customer",
    "title": "Add Customer API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "customerGroupId",
            "description": "<p>Customer customerGroupId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Customer username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Customer mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Customer password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Customer confirmPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Customer avatar</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailStatus",
            "description": "<p>Customer mailStatus should be 1 or 0</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Customer status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerGroupId\" : \"\",\n     \"userName\" : \"\",\n     \"email\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"avatar\" : \"\",\n     \"mailStatus\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Customer Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/add-customer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "PostApiCustomerAddCustomer"
  },
  {
    "type": "post",
    "url": "/api/customer/delete-customer",
    "title": "Delete Multiple Customer API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "customerId",
            "description": "<p>customerId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"customerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted customer.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/delete-customer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customerDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "PostApiCustomerDeleteCustomer"
  },
  {
    "type": "put",
    "url": "/api/customer/update-customer/:id",
    "title": "Update Customer API",
    "group": "Customer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "customerGroupId",
            "description": "<p>Customer customerGroupId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Customer username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Customer mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Customer password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Customer confirmPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Customer avatar</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailStatus",
            "description": "<p>Customer mailStatus should be 1 or 0</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Customer status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerGroupId\" : \"\",\n     \"userName\" : \"\",\n     \"email\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"avatar\" : \"\",\n     \"mailStatus\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Customer is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/update-customer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateCustomer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "PutApiCustomerUpdateCustomerId"
  },
  {
    "type": "delete",
    "url": "/api/CustomerAddress/delete-address/:id",
    "title": "Delete Customer Address API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"addressId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted address.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/CustomerAddress/delete-address/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "DeleteApiCustomeraddressDeleteAddressId"
  },
  {
    "type": "get",
    "url": "/api/CustomerAddress/get-address-list",
    "title": "Get Customer Address List API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer address list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/CustomerAddress/get-address-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "GetApiCustomeraddressGetAddressList"
  },
  {
    "type": "post",
    "url": "/api/CustomerAddress/add-address",
    "title": "Add Customer Address API",
    "group": "Customer_Address",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address1",
            "description": "<p>address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address2",
            "description": "<p>address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"country\" : \"\",\n     \"postcode\" : \"\",\n     \"addressType\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Address is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/CustomerAddress/add-address"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "addAddress error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "PostApiCustomeraddressAddAddress"
  },
  {
    "type": "put",
    "url": "/api/CustomerAddress/update-address/:id",
    "title": "Update Customer Address API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address1",
            "description": "<p>address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address2",
            "description": "<p>address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>state</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"postcode\" : \"\",\n     \"addressType\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated  customer address.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/CustomerAddress/update-address/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "PutApiCustomeraddressUpdateAddressId"
  },
  {
    "type": "get",
    "url": "/api/customer-cart/customer-cart-list",
    "title": "Customer Cart List API",
    "group": "Customer_Cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Customer Cart List\",\n     \"data\":{\n      \"productId\" : \"\",\n      \"name\" : \"\",\n      \"quantity\" : \"\",\n      \"productPrice\" : \"\",\n      \"total\" : \"\",\n      \"image\" : \"\",\n      \"containerName\" : \"\",\n      \"optionName\" : \"\",\n      \"optionValueName\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-cart/customer-cart-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer Cart error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerCartController.ts",
    "groupTitle": "Customer_Cart",
    "name": "GetApiCustomerCartCustomerCartList"
  },
  {
    "type": "post",
    "url": "/api/customer-cart/add-cart",
    "title": "Add to cart API",
    "group": "Customer_Cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productPrice",
            "description": "<p>productPrice</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "optionName",
            "description": "<p>optionName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "optionValueName",
            "description": "<p>optionValueName</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n     \"productPrice\" : \"\",\n     \"quantity\" : \"\",\n     \"optionName\" : \"\",\n     \"optionValueName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully added product to cart\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-cart/add-cart"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor category  error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerCartController.ts",
    "groupTitle": "Customer_Cart",
    "name": "PostApiCustomerCartAddCart"
  },
  {
    "type": "post",
    "url": "/api/customer-cart/delete-cart-item",
    "title": "Delete Cart items API",
    "group": "Customer_Cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "cartId",
            "description": "<p>cartId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"cartId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted items.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-cart/delete-cart-item"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "cartDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerCartController.ts",
    "groupTitle": "Customer_Cart",
    "name": "PostApiCustomerCartDeleteCartItem"
  },
  {
    "type": "post",
    "url": "/api/customer-coupon/apply-coupon",
    "title": "Apply Coupon API",
    "group": "Customer_Coupon",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponCode",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "object",
            "optional": false,
            "field": "productDetail",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productDetail.productId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productDetail.productPrice",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productDetail.quantity",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productDetail.total",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"couponCode\":\"\";\n     \"emailId\":\"\";\n     \"productDetail\" : [\n     {\n     \"productId\" : \"\",\n     \"productPrice\" : \"\",\n     \"quantity\" : \"\",\n     \"total\" : \"\",\n     }\n     ],\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully added product to cart\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-coupon/apply-coupon"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer coupon  error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerCouponController.ts",
    "groupTitle": "Customer_Coupon",
    "name": "PostApiCustomerCouponApplyCoupon"
  },
  {
    "type": "delete",
    "url": "/api/delivery-location/delete-delivery-location/:deliveryLocationId",
    "title": "Delete Delivery Location API",
    "group": "Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"deliveryLocationId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted delivery location.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-location/delete-delivery-location/:deliveryLocationId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delete Delivery Location API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryLocationController.ts",
    "groupTitle": "Delivery_Location",
    "name": "DeleteApiDeliveryLocationDeleteDeliveryLocationDeliverylocationid"
  },
  {
    "type": "get",
    "url": "/api/delivery-location/delivery-location-list",
    "title": "Delivery Location List API",
    "group": "Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Enter delivery location</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"keyword\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Delivery Location List Successfully\"\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-location/delivery-location-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delivery Location List API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryLocationController.ts",
    "groupTitle": "Delivery_Location",
    "name": "GetApiDeliveryLocationDeliveryLocationList"
  },
  {
    "type": "get",
    "url": "/api/delivery-location/download-delivery-location",
    "title": "Download Delivery Location",
    "group": "Delivery_Location",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the file..!!\",\n     \"status\": \"1\",\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-location/download-delivery-location"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Download Location Data",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryLocationController.ts",
    "groupTitle": "Delivery_Location",
    "name": "GetApiDeliveryLocationDownloadDeliveryLocation"
  },
  {
    "type": "post",
    "url": "/api/delivery-location/add-delivery-location",
    "title": "Add Delivery Location API",
    "group": "Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>zipCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "locationName",
            "description": "<p>locationName</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"zipCode\" : \"\",\n     \"locationName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Delivery Location Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-location/add-delivery-location"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delivery Location error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryLocationController.ts",
    "groupTitle": "Delivery_Location",
    "name": "PostApiDeliveryLocationAddDeliveryLocation"
  },
  {
    "type": "post",
    "url": "/api/delivery-location/import-delivery-location",
    "title": "Import Delivery Location",
    "group": "Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "deliveryLocationData",
            "description": "<p>File</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully saved imported data..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-location/import-delivery-location"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Import Location Data",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryLocationController.ts",
    "groupTitle": "Delivery_Location",
    "name": "PostApiDeliveryLocationImportDeliveryLocation"
  },
  {
    "type": "put",
    "url": "/api/delivery-location/update-delivery-location/:deliveryLocationId",
    "title": "Update Delivery Location API",
    "group": "Delivery_Location",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "zipCode",
            "description": "<p>Zip Code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "locationName",
            "description": "<p>Location Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"zipCode\" : \"\",\n     \"locationName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Updated successfully\"\n     \"data\" : \"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-location/update-delivery-location/:deliveryLocationId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Update Delivery Location API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryLocationController.ts",
    "groupTitle": "Delivery_Location",
    "name": "PutApiDeliveryLocationUpdateDeliveryLocationDeliverylocationid"
  },
  {
    "type": "delete",
    "url": "/api/delivery-person/delete-delivery-person/:id",
    "title": "Delete Delivery Person API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted delivery person.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/delete-delivery-person/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delete Delivery Person API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "DeleteApiDeliveryPersonDeleteDeliveryPersonId"
  },
  {
    "type": "get",
    "url": "/api/delivery-person/delivery-person-list-delivery-allocation",
    "title": "List Delivery Person for delivery allocation API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>location</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"keyword\" : \"\",\n     \"status\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Delivery Person List Successfully\"\n     \"data\" : \"{\n     \"id\" : \"\",\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"email\" : \"\",\n     \"password\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"isActive\" : \"\",\n     }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/delivery-person-list-delivery-allocation"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "List Delivery Person API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "GetApiDeliveryPersonDeliveryPersonListDeliveryAllocation"
  },
  {
    "type": "get",
    "url": "/api/delivery-person/list-delivery-person",
    "title": "List Delivery Person API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"keyword\" : \"\",\n     \"status\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Delivery Person List Successfully\"\n     \"data\" : \"{\n     \"id\" : \"\",\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"email\" : \"\",\n     \"password\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"isActive\" : \"\",\n     }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/list-delivery-person"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "List Delivery Person API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "GetApiDeliveryPersonListDeliveryPerson"
  },
  {
    "type": "post",
    "url": "/api/delivery-person/add-delivery-allocation",
    "title": "Add Delivery Allocation API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deliveryPersonId",
            "description": "<p>deliveryPersonId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorOrderId\" : \"\",\n     \"deliveryPersonId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Delivery Allocation Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/add-delivery-allocation"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "PostApiDeliveryPersonAddDeliveryAllocation"
  },
  {
    "type": "post",
    "url": "/api/delivery-person/add-delivery-person",
    "title": "Add Delivery Person API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Delivery Person mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm Password</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "allLocation",
            "description": "<p>allLocation</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>Location</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Delivery Person Image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"allLocation\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"location\" : \"\",\n     \"image\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Delivery Person Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/add-delivery-person"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "PostApiDeliveryPersonAddDeliveryPerson"
  },
  {
    "type": "post",
    "url": "/api/delivery-person/login",
    "title": "Login",
    "group": "Delivery_Person",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User EmailId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"password\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "PostApiDeliveryPersonLogin"
  },
  {
    "type": "put",
    "url": "/api/delivery-person/update-delivery-person/:id",
    "title": "Update Delivery Person API",
    "group": "Delivery_Person",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>location</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "allLocation",
            "description": "<p>allLocation</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"location\" : \"\",\n     \"allLocation\" : \"\",\n     \"image\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Updated successfully\"\n     \"data\" : \"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-person/update-delivery-person/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Update Delivery Person API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/DeliveryPersonController.ts",
    "groupTitle": "Delivery_Person",
    "name": "PutApiDeliveryPersonUpdateDeliveryPersonId"
  },
  {
    "type": "get",
    "url": "/api/delivery-store/delivery-location-list",
    "title": "Delivery Location List API",
    "group": "Delivery_Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Enter delivery location</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"keyword\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Delivery Location List Successfully\"\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/delivery-store/delivery-location-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delivery Location List API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/DeliveryController.ts",
    "groupTitle": "Delivery_Store",
    "name": "GetApiDeliveryStoreDeliveryLocationList"
  },
  {
    "type": "delete",
    "url": "/api/email-template/delete-email-template/:id",
    "title": "Delete EmailTemplate API",
    "group": "EmailTemplate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailTemplateId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted emailTemplate.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/email-template/delete-email-template/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "EmailTemplate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "DeleteApiEmailTemplateDeleteEmailTemplateId"
  },
  {
    "type": "get",
    "url": "/api/email-template/email-templatelist",
    "title": "EmailTemplate List API",
    "group": "EmailTemplate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get emailTemplate list\",\n     \"data\":{\n     \"id\" : \"\",\n     \"title\" : \"\",\n     \"subject\" : \"\",\n     \"content\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/email-template/email-templatelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "EmailTemplate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "GetApiEmailTemplateEmailTemplatelist"
  },
  {
    "type": "post",
    "url": "/api/email-template/add-email-template",
    "title": "Add Email Template API",
    "group": "EmailTemplate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>EmailTemplate title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>EmailTemplate subject</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>EmailTemplate content</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>EmailTemplate status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"subject\" : \"\",\n     \"content\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new emailTemplate.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/email-template/add-email-template"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "EmailTemplate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "PostApiEmailTemplateAddEmailTemplate"
  },
  {
    "type": "put",
    "url": "/api/email-template/update-email-template/:id",
    "title": "Update EmailTemplate API",
    "group": "EmailTemplate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>EmailTemplate title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "subject",
            "description": "<p>EmailTemplate subject</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>EmailTemplate content</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>EmailTemplate status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"subject\" : \"\",\n     \"content\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated emailTemplate.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/email-template/update-email-template/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "emailTemplate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "PutApiEmailTemplateUpdateEmailTemplateId"
  },
  {
    "type": "delete",
    "url": "/api/language/delete-language/:id",
    "title": "Delete Language API",
    "group": "Language",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"languageId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted language.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/language/delete-language/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Language error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/LanguageController.ts",
    "groupTitle": "Language",
    "name": "DeleteApiLanguageDeleteLanguageId"
  },
  {
    "type": "get",
    "url": "/api/language/languageList",
    "title": "Language List API",
    "group": "Language",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>inactive-&gt; 0, active-&gt; 1</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get language list\",\n     \"data\":{\n     \"languageId\"\n     \"name\"\n     \"code\"\n     \"sortOrder\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/language/languagelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Language error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/LanguageController.ts",
    "groupTitle": "Language",
    "name": "GetApiLanguageLanguagelist"
  },
  {
    "type": "post",
    "url": "/api/language/add-language",
    "title": "Add Language API",
    "group": "Language",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Language name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Language code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Language image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Language sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Language status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"code\" : \"\",\n     \"image\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Language.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/language/add-language"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Language error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/LanguageController.ts",
    "groupTitle": "Language",
    "name": "PostApiLanguageAddLanguage"
  },
  {
    "type": "put",
    "url": "/api/language/update-language/:id",
    "title": "Update Language API",
    "group": "Language",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Language name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Language code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Language image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Language sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Language status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"code\" : \"\",\n     \"image\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated language.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/language/update-language/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "language error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/LanguageController.ts",
    "groupTitle": "Language",
    "name": "PutApiLanguageUpdateLanguageId"
  },
  {
    "type": "delete",
    "url": "/api/manufacturer/delete-manufacturer/:id",
    "title": "Delete Manufacturer API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"manufacturerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Manufacturer.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/delete-manufacturer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "DeleteApiManufacturerDeleteManufacturerId"
  },
  {
    "type": "get",
    "url": "/api/manufacturer/manufacturerlist",
    "title": "Manufacturer List API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;active 1-&gt;inactive</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get manufacturer list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/manufacturerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "GetApiManufacturerManufacturerlist"
  },
  {
    "type": "post",
    "url": "/api/manufacturer/create-manufacturer",
    "title": "Create Manufacturer API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Manufacturer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Manufacturer image</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Manufacturer sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Manufacturer.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/create-manufacturer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "PostApiManufacturerCreateManufacturer"
  },
  {
    "type": "post",
    "url": "/api/manufacturer/delete-manufacturer",
    "title": "Delete Multiple manufacturer API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"manufacturerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted manufacturer.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/delete-manufacturer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "manufacturerDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "PostApiManufacturerDeleteManufacturer"
  },
  {
    "type": "put",
    "url": "/api/manufacturer/update-manufacturer/:id",
    "title": "Update Manufacturer API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>Manufacturer manufacturerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Manufacturer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Manufacturer image</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Manufacturer sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>Manufacturer status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"manufacturerId\" : \"\",\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Manufacturer.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/update-manufacturer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "PutApiManufacturerUpdateManufacturerId"
  },
  {
    "type": "delete",
    "url": "/api/option/option-delete/:id",
    "title": "Option Delete API",
    "group": "Option",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "optionId",
            "description": "<p>optionId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"optionId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully Deleted Option.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/option/option-delete/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OptionController.ts",
    "groupTitle": "Option",
    "name": "DeleteApiOptionOptionDeleteId"
  },
  {
    "type": "get",
    "url": "/api/option/getting-option-value/:id",
    "title": "Getting Option Value API",
    "group": "Option",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Option got Successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/option/getting-option-value/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "gettingOption error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OptionController.ts",
    "groupTitle": "Option",
    "name": "GetApiOptionGettingOptionValueId"
  },
  {
    "type": "get",
    "url": "/api/option/option-list",
    "title": "Option List API",
    "group": "Option",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got option list\",\n     \"data\":{\n     \"name\" : \"\",\n     \"type\" : \"\",\n     \"sortOrder\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/option/option-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Option error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OptionController.ts",
    "groupTitle": "Option",
    "name": "GetApiOptionOptionList"
  },
  {
    "type": "get",
    "url": "/api/option/search-option",
    "title": "Search Option API",
    "group": "Option",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"keyword\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Option got Successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/option/search-option"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "searchOption error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OptionController.ts",
    "groupTitle": "Option",
    "name": "GetApiOptionSearchOption"
  },
  {
    "type": "post",
    "url": "/api/option/add-option",
    "title": "Add Option API",
    "group": "Option",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "object",
            "optional": false,
            "field": "optionValue",
            "description": "<p>optionValue</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "optionValue.name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "optionValue.image",
            "description": "<p>image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "optionValue.sortOrder",
            "description": "<p>sortOrder</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"type\" : \"\",\n     \"sortOrder\" : \"\",\n     \"optionValue\" : [{\n          \"name\" : \"\",\n          \"image\" : \"\",\n          \"sortOrder\" : \"\"\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New option is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/option/add-option"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "addOption error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OptionController.ts",
    "groupTitle": "Option",
    "name": "PostApiOptionAddOption"
  },
  {
    "type": "post",
    "url": "/api/option/update-option",
    "title": "Update Option API",
    "group": "Option",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "flag",
            "description": "<p>flag</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "optionId",
            "description": "<p>optionId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "object",
            "optional": false,
            "field": "optionValue",
            "description": "<p>optionValue</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "optionValue.optionValueId",
            "description": "<p>optionValueId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "optionValue.name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "optionValue.image",
            "description": "<p>image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "optionValue.sortOrder",
            "description": "<p>sortOrder</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"flag\" : \"\",\n     \"optionId\" : \"\",\n     \"name\" : \"\",\n     \"type\" : \"\",\n     \"sortOrder\" : \"\",\n     \"optionValue\" : [{\n          \"optionValueId\" : \"\",\n          \"name\" : \"\",\n          \"image\" : \"\",\n          \"sortOrder\" : \"\"\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Option Updated Successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/option/update-option"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateOption error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OptionController.ts",
    "groupTitle": "Option",
    "name": "PostApiOptionUpdateOption"
  },
  {
    "type": "delete",
    "url": "/api/order/delete-order/:id",
    "title": "Delete Single Order API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Order.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/delete-order/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "DeleteApiOrderDeleteOrderId"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-order/order-export-pdf",
    "title": "Order Export PDF API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-order/order-export-pdf"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorPaymentController.ts",
    "groupTitle": "Order",
    "name": "GetApiAdminVendorOrderOrderExportPdf"
  },
  {
    "type": "get",
    "url": "/api/admin-vendor-order/order-export-pdf",
    "title": "Order Export PDF API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-vendor-order/order-export-pdf"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/VendorOrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiAdminVendorOrderOrderExportPdf"
  },
  {
    "type": "get",
    "url": "/api/order/order-detail",
    "title": "Order Detail API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderDetail"
  },
  {
    "type": "get",
    "url": "/api/order/order-excel-list",
    "title": "Order Excel",
    "group": "Order",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Order Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderExcelList"
  },
  {
    "type": "get",
    "url": "/api/order/order-export-pdf",
    "title": "Order Export PDF API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-export-pdf"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderExportPdf"
  },
  {
    "type": "get",
    "url": "/api/order/order-product-log-list",
    "title": "Order Product Log List API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>orderProductId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got order product log list\",\n     \"data\":{\n     \"orderProductLogId\" : \"\",\n     \"orderProductId\" : \"\",\n     \"productId\" : \"\",\n     \"orderId\" : \"\",\n     \"name\" : \"\",\n     \"model\" : \"\",\n     \"quantity\" : \"\",\n     \"trace\" : \"\",\n     \"total\" : \"\",\n     \"tax\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"trackingUrl\" : \"\",\n     \"trackingNo\" : \"\",\n     \"isActive\" : \"\",\n     \"createdDate\" : \"\",\n     \"modifiedDate\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-product-log-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderProductLog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderProductLogList"
  },
  {
    "type": "get",
    "url": "/api/order/orderlist",
    "title": "Order List API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>search by orderId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderStatusId",
            "description": "<p>search by orderStatusId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "totalAmount",
            "description": "<p>search by totalAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "dateAdded",
            "description": "<p>search by dateAdded</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/orderlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderlist"
  },
  {
    "type": "get",
    "url": "/api/order/orderLoglist",
    "title": "Order Log List API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/orderLoglist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderloglist"
  },
  {
    "type": "get",
    "url": "/api/order/saleslist",
    "title": "Sales List API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get sales count list\",\n     \"data\":{\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/saleslist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "sales error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderSaleslist"
  },
  {
    "type": "get",
    "url": "/api/order/today-order-amount",
    "title": "today Order Amount API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get today order amount\",\n     \"data\":{\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/today-order-amount"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderTodayOrderAmount"
  },
  {
    "type": "get",
    "url": "/api/order/today-order-count",
    "title": "Today OrderCount API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Today order count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/today-order-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderTodayOrderCount"
  },
  {
    "type": "get",
    "url": "/api/order/total-order-amount",
    "title": "total Order Amount API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get total order amount\",\n     \"data\":{\n     \"count\" : \"\",\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/total-order-amount"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderTotalOrderAmount"
  },
  {
    "type": "post",
    "url": "/api/order/delete-order",
    "title": "Delete Order API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Order.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/delete-order"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderDeleteOrder"
  },
  {
    "type": "post",
    "url": "/api/order/order-change-status",
    "title": "Change Order Status API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderStatusId",
            "description": "<p>order Status Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderDetails\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated order change status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-change-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderOrderChangeStatus"
  },
  {
    "type": "post",
    "url": "/api/order/update-order-product-shipping-information",
    "title": "update order product shipping information API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>Order Product Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingUrl",
            "description": "<p>shipping tracking url</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingNo",
            "description": "<p>shipping tracking no</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderProductId\" : \"\",\n  \"trackingUrl\" : \"\",\n  \"trackingNo\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated shipping information.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-order-product-shipping-information"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderUpdateOrderProductShippingInformation"
  },
  {
    "type": "post",
    "url": "/api/order/update-payment-status",
    "title": "update payment Status API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentStatusId",
            "description": "<p>1-&gt;paid 2-&gt;fail 3-&gt; refund</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderId\" : \"\",\n  \"paymentStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated payment status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-payment-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderUpdatePaymentStatus"
  },
  {
    "type": "post",
    "url": "/api/order/update-shipping-information",
    "title": "update shipping information API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingUrl",
            "description": "<p>shipping tracking url</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingNo",
            "description": "<p>shipping tracking no</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderId\" : \"\",\n  \"trackingUrl\" : \"\",\n  \"trackingNo\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated shipping information.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-shipping-information"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderUpdateShippingInformation"
  },
  {
    "type": "put",
    "url": "/api/order/update-order-product-status/:orderProductId",
    "title": "Update Order Product Status API",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderStatusId",
            "description": "<p>OrderStatus orderStatusId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated orderProductStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-order-product-status/:orderProductId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PutApiOrderUpdateOrderProductStatusOrderproductid"
  },
  {
    "type": "delete",
    "url": "/api/order-status/delete-order-status/:id",
    "title": "Delete OrderStatus API",
    "group": "OrderStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted orderStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/delete-order-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "DeleteApiOrderStatusDeleteOrderStatusId"
  },
  {
    "type": "get",
    "url": "/api/order-status/order-status-list",
    "title": "OrderStatus List API",
    "group": "OrderStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get orderStatus list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/order-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "GetApiOrderStatusOrderStatusList"
  },
  {
    "type": "post",
    "url": "/api/order-status/create-order-status",
    "title": "Create OrderStatus API",
    "group": "OrderStatus",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "colorCode",
            "description": "<p>colorCode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priority",
            "description": "<p>priority</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"colorCode\" : \"\",\n     \"priority\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New OrderStatus is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/create-order-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createOrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "PostApiOrderStatusCreateOrderStatus"
  },
  {
    "type": "put",
    "url": "/api/order-status/update-order-status/:id",
    "title": "Update OrderStatus API",
    "group": "OrderStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>OrderStatus name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "colorCode",
            "description": "<p>colorCode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priority",
            "description": "<p>priority</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"colorCode\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated orderStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/update-order-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "PutApiOrderStatusUpdateOrderStatusId"
  },
  {
    "type": "delete",
    "url": "/api/page/delete-page/:id",
    "title": "Delete Page API",
    "group": "Page",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"pageId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted page.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/delete-page/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "DeleteApiPageDeletePageId"
  },
  {
    "type": "get",
    "url": "/api/page/pagelist",
    "title": "Page List API",
    "group": "Page",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page list\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"active\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/pagelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "GetApiPagePagelist"
  },
  {
    "type": "post",
    "url": "/api/page/add-page",
    "title": "Add Page API",
    "group": "Page",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagContent",
            "description": "<p>metaTagContent</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "active",
            "description": "<p>active</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"active\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New page is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/add-page"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "PostApiPageAddPage"
  },
  {
    "type": "post",
    "url": "/api/page/delete-page",
    "title": "Delete Multiple Page API",
    "group": "Page",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "pageId",
            "description": "<p>pageId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"pageId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Page.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/delete-page"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "pageDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "PostApiPageDeletePage"
  },
  {
    "type": "put",
    "url": "/api/page/update-page/:id",
    "title": "Update Page API",
    "group": "Page",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pageId",
            "description": "<p>pageId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "active",
            "description": "<p>active</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagContent",
            "description": "<p>metaTagContent</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"active\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Page is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/update-page/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updatePage error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "PutApiPageUpdatePageId"
  },
  {
    "type": "delete",
    "url": "/api/product/delete-product/:id",
    "title": "Delete Single Product API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Product.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/delete-product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "DeleteApiProductDeleteProductId"
  },
  {
    "type": "get",
    "url": "/api/product/allproduct-excel-list",
    "title": "AllProduct Excel sheet",
    "group": "Product",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the All Product Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/allproduct-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Allproduct Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductAllproductExcelList"
  },
  {
    "type": "get",
    "url": "/api/product/customerProductView-list/:id",
    "title": "Customer product View List",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Product view Log List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/customerProductView-list/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customerProductView List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductCustomerproductviewListId"
  },
  {
    "type": "get",
    "url": "/api/product/Get-Product-rating",
    "title": "Get product Rating API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the product rating and review.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/Get-Product-rating"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductGetProductRating"
  },
  {
    "type": "get",
    "url": "/api/product/product-detail/:id",
    "title": "Product Detail API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-detail/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductDetailId"
  },
  {
    "type": "get",
    "url": "/api/product/product-excel-list",
    "title": "Product Excel",
    "group": "Product",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Product Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductExcelList"
  },
  {
    "type": "get",
    "url": "/api/product/product-rating-list",
    "title": "Product Rating and review List API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limits</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productIds</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n      \"status\": \"1\"\n     \"message\": \"Successfully get product rating list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-rating-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productRatingList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductRatingList"
  },
  {
    "type": "get",
    "url": "/api/product/productlist",
    "title": "Product List API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>sku</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "defaultValue": "1/2",
            "description": "<p>if 1-&gt;asc 2-&gt;desc</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/productlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductlist"
  },
  {
    "type": "get",
    "url": "/api/product/recent-selling-product",
    "title": "Recent Selling Product List API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully listed recent product selling!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/recent-selling-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Selling Product List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductRecentSellingProduct"
  },
  {
    "type": "get",
    "url": "/api/product/top-selling-productlist",
    "title": "Top selling ProductList API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get top selling product..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/top-selling-productlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "top selling product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductTopSellingProductlist"
  },
  {
    "type": "get",
    "url": "/api/product/viewLog-list",
    "title": "Product View Log List",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Product view Log List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/viewLog-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "ViewLog List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductViewlogList"
  },
  {
    "type": "post",
    "url": "/api/product/add-product",
    "title": "Add Product API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxType",
            "description": "<p>taxType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productOptions",
            "description": "<p>productOptions</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "productTranslation",
            "description": "<p>List of Product Translation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"categoryId\" : \"\",\n     \"productSlug\" : \"\",\n     \"upc\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"taxType\" : \"\",\n     \"others\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"status\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ]\n     \"productTranslation\":[\n       {\n          \"languageCode\":\"en\"\n          \"name\":\"\"\n          \"description\":\"\"\n       }\n     ]\n    \"relatedProductId\":[ ]\n    \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }]\n    \"productDiscount\":[\n     {\n        \"discountQuantity\":\"\"\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }]\n    \"productOptions\":[\n     {\n      \"optionId\":\"\"\n      \"value\":\"\"\n      \"required\":\"\"\n          \"optionValue\":[\n           {\n              \"optionValueId\":\"\"\n              \"quantity\":\"\"\n              \"subtractStock\":\"\"\n              \"pricePrefix\":\"\"\n              \"price\":\"\"\n           }]\n     }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/add-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "AddProduct error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductAddProduct"
  },
  {
    "type": "post",
    "url": "/api/product/delete-product",
    "title": "Delete Product API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"productId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Product.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/delete-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductDeleteProduct"
  },
  {
    "type": "post",
    "url": "/api/product/update-product/:id",
    "title": "Update Product API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxType",
            "description": "<p>taxType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productOptions",
            "description": "<p>productOptions</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "productTranslation",
            "description": "<p>List of Product Translation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"categoryId\" : \"\",\n     \"upc\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"taxType\" : \"\",\n     \"others\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"status\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ],\n     \"productTranslation\":[\n       {\n          \"languageCode\":\"en\"\n          \"name\":\"\"\n          \"description\":\"\"\n       }\n     ]\n     \"relatedProductId\":[ \"\", \"\"],\n     \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }],\n      \"productDiscount\":[\n     {\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }],\n    \"productOptions\":[\n     {\n      \"optionId\":\"\"\n      \"value\":\"\"\n      \"required\":\"\"\n          \"optionValue\":[\n           {\n              \"optionValueId\":\"\"\n              \"quantity\":\"\"\n              \"subtractStock\":\"\"\n              \"pricePrefix\":\"\"\n              \"price\":\"\"\n           }]\n     }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateProduct error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductUpdateProductId"
  },
  {
    "type": "put",
    "url": "/api/product/Product-rating-status/:id",
    "title": "Product Rating Status API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status should be 0-&gt; In-Active or 1-&gt; Active</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully updated review status.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/Product-rating-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PutApiProductProductRatingStatusId"
  },
  {
    "type": "put",
    "url": "/api/product/update-product-slug",
    "title": "Update Product Slug API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Product Slug.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-product-slug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PutApiProductUpdateProductSlug"
  },
  {
    "type": "put",
    "url": "/api/product/update-todayDeals/:id",
    "title": "Update Today Deals API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "todayDeals",
            "description": "<p>TodayDeals should be 0 or 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"todayDeals\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated product to today Deals.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-todayDeals/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "todayDeals error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PutApiProductUpdateTodaydealsId"
  },
  {
    "type": "get",
    "url": "/api/media/image-resize",
    "title": "Resize Image On The Fly",
    "group": "Resize-Image",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "width",
            "description": "<p>width</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "height",
            "description": "<p>height</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>path</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Successfully resize image\",\n  \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/image-resize"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Unable to resize the image\",\n    \"status\": 0,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "Resize-Image",
    "name": "GetApiMediaImageResize"
  },
  {
    "type": "delete",
    "url": "/api/role/delete-role/:id",
    "title": "Delete Role API",
    "group": "Role",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "groupId",
            "description": "<p>groupId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"roleId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Role.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/role/delete-role/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Role error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "DeleteApiRoleDeleteRoleId"
  },
  {
    "type": "get",
    "url": "/api/role/rolelist",
    "title": "Role List API",
    "group": "Role",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully get role list\",\n   \"data\":\"{}\"\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/role/rolelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "role error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "GetApiRoleRolelist"
  },
  {
    "type": "post",
    "url": "/api/role/create-role",
    "title": "Create Role API",
    "group": "Role",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>roleName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Role is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/role/create-role"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createRole error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "PostApiRoleCreateRole"
  },
  {
    "type": "put",
    "url": "/api/role/update-role/:id",
    "title": "Update Role API",
    "group": "Role",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>roleName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"slug\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Role is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/role/update-role/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateRole error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "PutApiRoleUpdateRoleId"
  },
  {
    "type": "delete",
    "url": "/api/seller-account-settings/delete/:id",
    "title": "Delete Seller Acc. Settings API",
    "group": "SellerAccountSettings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Deleted successfully.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/seller-account-settings/delete/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Seller Acc. Settings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/SellerAccountSettingsController.ts",
    "groupTitle": "SellerAccountSettings",
    "name": "DeleteApiSellerAccountSettingsDeleteId"
  },
  {
    "type": "get",
    "url": "/api/seller-account-settings/list",
    "title": "Seller Acc. Settings List API",
    "group": "SellerAccountSettings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got seller acc. settings list\",\n     \"data\":{\n     \"sellerAccountSettingsId\"\n     \"accountType\"\n     \"fees\"\n     \"maxImages\"\n     \"maxVideos\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/seller-account-settings/list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/SellerAccountSettingsController.ts",
    "groupTitle": "SellerAccountSettings",
    "name": "GetApiSellerAccountSettingsList"
  },
  {
    "type": "post",
    "url": "/api/seller-account-settings/create",
    "title": "Create Seller Account Settings API",
    "group": "SellerAccountSettings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "accountType",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "fees",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maxImages",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maxVideos",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"accountType\" : 0,\n     \"fees\" : 0,\n     \"maxImages\" : 0,\n     \"maxVideos\" : 0,\n    \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new seller account settings.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/seller-account-settings/create"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "SellerAccountSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/SellerAccountSettingsController.ts",
    "groupTitle": "SellerAccountSettings",
    "name": "PostApiSellerAccountSettingsCreate"
  },
  {
    "type": "put",
    "url": "/api/seller-account-settings/update/:id",
    "title": "Update Seller Account Settings API",
    "group": "SellerAccountSettings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sellerAccountSettingsId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "accountType",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "fees",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maxImages",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maxVideos",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"sellerAccountSettingsId\" : 0,\n     \"accountType\" : 0,\n     \"fees\" : 0,\n     \"maxImages\" : 0,\n     \"maxVideos\" : 0,\n    \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Seller account settings updated successfully.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/seller-account-settings/update/1"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "SellerAccountSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/SellerAccountSettingsController.ts",
    "groupTitle": "SellerAccountSettings",
    "name": "PutApiSellerAccountSettingsUpdateId"
  },
  {
    "type": "get",
    "url": "/api/settings/get-settings",
    "title": "Get Setting API",
    "group": "Settings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get settings\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settings/get-settings"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "getSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/SettingController.ts",
    "groupTitle": "Settings",
    "name": "GetApiSettingsGetSettings"
  },
  {
    "type": "post",
    "url": "/api/settings/create-settings",
    "title": "Create Settings API",
    "group": "Settings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>store url</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeywords",
            "description": "<p>metaTagKeywords</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeName",
            "description": "<p>storeName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeOwner",
            "description": "<p>storeOwner</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeAddress",
            "description": "<p>storeAddress</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>countryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "zoneId",
            "description": "<p>zoneId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeEmail",
            "description": "<p>storeEmail</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeTelephone",
            "description": "<p>storeTelephone</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeFax",
            "description": "<p>storeFax</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeLogo",
            "description": "<p>storeLog</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maintenanceMode",
            "description": "<p>maintenanceMode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeLanguageName",
            "description": "<p>storeLanguageName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "storeCurrencyId",
            "description": "<p>storeCurrencyId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeImage",
            "description": "<p>storeImage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "invoicePrefix",
            "description": "<p>invoicePrefix</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderStatus",
            "description": "<p>orderStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "categoryProductCount",
            "description": "<p>productCount should be 0 or 1</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "itemsPerPage",
            "description": "<p>ItemsPerPage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "facebook",
            "description": "<p>facebook</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "twitter",
            "description": "<p>twitter</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "instagram",
            "description": "<p>instagram</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "google",
            "description": "<p>google</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"url\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeywords\" : \"\",\n     \"storeName\" : \"\",\n     \"storeOwner\" : \"\",\n     \"storeAddress\" : \"\",\n     \"countryId\" : \"\",\n     \"zoneId\" : \"\",\n     \"storeEmail\" : \"\",\n     \"storeTelephone\" : \"\",\n     \"storeFax\" : \"\",\n     \"storeLogo\" : \"\",\n     \"maintenanceMode\" : \"\",\n     \"storeLanguageName\" : \"\",\n     \"storeCurrencyId\" : \"\",\n     \"storeImage\" : \"\",\n     \"invoicePrefix\" : \"\",\n     \"orderStatus\" : \"\",\n     \"categoryProductCount\" : \"\",\n     \"itemsPerPage\" : \"\",\n     \"google\" : \"\",\n     \"instagram\" : \"\",\n     \"facebook\" : \"\",\n     \"twitter\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created setting.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settings/create-settings"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "addSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/SettingController.ts",
    "groupTitle": "Settings",
    "name": "PostApiSettingsCreateSettings"
  },
  {
    "type": "delete",
    "url": "/api/stock-status/delete-stock-status/:id",
    "title": "Delete Stock Status API",
    "group": "StockStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"stockStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted stockStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/stock-status/delete-stock-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "StockStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/StockStatusController.ts",
    "groupTitle": "StockStatus",
    "name": "DeleteApiStockStatusDeleteStockStatusId"
  },
  {
    "type": "get",
    "url": "/api/stock-status/stock-status-list",
    "title": "Stock Status List",
    "group": "StockStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get stockStatus list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/stock-status/stock-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "StockStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/StockStatusController.ts",
    "groupTitle": "StockStatus",
    "name": "GetApiStockStatusStockStatusList"
  },
  {
    "type": "post",
    "url": "/api/stock-status/create-stock-status",
    "title": "Create Stock Status API",
    "group": "StockStatus",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New StockStatus is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/stock-status/create-stock-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createStockStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/StockStatusController.ts",
    "groupTitle": "StockStatus",
    "name": "PostApiStockStatusCreateStockStatus"
  },
  {
    "type": "put",
    "url": "/api/stock-status/update-stock-status/:id",
    "title": "Update Stock Status API",
    "group": "StockStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>StockStatus name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>StockStatus status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated stockStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/stock-status/update-stock-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "StockStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/StockStatusController.ts",
    "groupTitle": "StockStatus",
    "name": "PutApiStockStatusUpdateStockStatusId"
  },
  {
    "type": "get",
    "url": "/api/customer/get-profile",
    "title": "Get Profile API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Get the Profile..!\",\n     \"status\": \"1\"\n      \"data\":{}\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/get-profile"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Get Profile error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "GetApiCustomerGetProfile"
  },
  {
    "type": "get",
    "url": "/api/customer/login-log-list",
    "title": "Login Log list API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get login log list\",\n     \"data\":{\n     \"id\"\n     \"customerId\"\n     \"emailId\"\n     \"firstName\"\n     \"ipAddress\"\n     \"createdDate\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/login-log-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Front error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "GetApiCustomerLoginLogList"
  },
  {
    "type": "get",
    "url": "/api/list/orderLoglist",
    "title": "Order Log List API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderPrefixId",
            "description": "<p>orderPrefixId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order log list\",\n     \"data\":{\n     \"orderStatus\" : \"\",\n     \"createdDate\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/orderLoglist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order log error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store",
    "name": "GetApiListOrderloglist"
  },
  {
    "type": "get",
    "url": "/api/manufacturers/manufacturerlist",
    "title": "Manufacturer List API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get manufacturer list\",\n     \"data\":\"{\n     \"manufacturerId\" : \"\",\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"sortOrder\" : \"\",\n     }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturers/manufacturerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/ManufacturerController.ts",
    "groupTitle": "Store",
    "name": "GetApiManufacturersManufacturerlist"
  },
  {
    "type": "get",
    "url": "/api/pages/get_pagedetails/:id",
    "title": "Page Details API",
    "group": "Store",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page Details\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/pages/get_pagedetails/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/PageController.ts",
    "groupTitle": "Store",
    "name": "GetApiPagesGet_pagedetailsId"
  },
  {
    "type": "get",
    "url": "/api/pages/pagelist",
    "title": "Page List API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page list\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"active\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/pages/pagelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "pageFront error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/PageController.ts",
    "groupTitle": "Store",
    "name": "GetApiPagesPagelist"
  },
  {
    "type": "get",
    "url": "/api/product-store/featureproduct-list",
    "title": "Feature Product List",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword search by name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sku",
            "description": "<p>search by sku</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get feature product List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/featureproduct-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "FeatureProduct List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreFeatureproductList"
  },
  {
    "type": "get",
    "url": "/api/product-store/Get-Category",
    "title": "Get Category API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "CategoryId",
            "description": "<p>categoryId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the category.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/Get-Category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreGetCategory"
  },
  {
    "type": "get",
    "url": "/api/product-store/Get-Product-rating",
    "title": "Get product Rating API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the product rating and review.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/Get-Product-rating"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreGetProductRating"
  },
  {
    "type": "get",
    "url": "/api/product-store/get-rating-statistics",
    "title": "Get Rating Statistics API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the product rating and review statistics.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/get-rating-statistics"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreGetRatingStatistics"
  },
  {
    "type": "get",
    "url": "/api/product-store/product-compare",
    "title": "Product Compare API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Product Compared\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/product-compare"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product compare error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreProductCompare"
  },
  {
    "type": "get",
    "url": "/api/product-store/productdetail/:productslug",
    "title": "Product Detail API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/productdetail/:productslug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreProductdetailProductslug"
  },
  {
    "type": "get",
    "url": "/api/product-store/todayDeals-list",
    "title": "Today Deals List",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword search by name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>search by sku</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get today deals product List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/todayDeals-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "TodayDeals List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreTodaydealsList"
  },
  {
    "type": "post",
    "url": "/api/customer/change-password",
    "title": "Change Password API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>Old Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>New Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "     \"oldPassword\" : \"\",\n     \"newPassword\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Your password changed successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/change-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Change Password error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerChangePassword"
  },
  {
    "type": "post",
    "url": "/api/customer/edit-profile",
    "title": "Edit Profile API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User Phone Number (Optional)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Customer Image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"password\" \"\",\n     \"emailId\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"image\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated your profile.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/edit-profile"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerEditProfile"
  },
  {
    "type": "post",
    "url": "/api/customer/forgot-password",
    "title": "Forgot Password API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailId\" : \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you,Your password send to your mail id please check your email.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/forgot-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Forgot Password error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerForgotPassword"
  },
  {
    "type": "post",
    "url": "/api/customer/login",
    "title": "login API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>send as normal | facebook | gmail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"type\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerLogin"
  },
  {
    "type": "post",
    "url": "/api/customer/Oauth-login",
    "title": "Oauth login API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "source",
            "description": "<p>source</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "oauthData",
            "description": "<p>oauthData</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailId\" : \"\",\n     \"source\" : \"\",\n     \"oauthData\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n        \"password\":''\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/Oauth-login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerOauthLogin"
  },
  {
    "type": "post",
    "url": "/api/customer/register",
    "title": "register API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User Phone Number (Optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"emailId\" : \"\",\n     \"phoneNumber\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you for registering with us and please check your email\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/register"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerRegister"
  },
  {
    "type": "put",
    "url": "/api/product-store/update-featureproduct/:id",
    "title": "Update Feature Product API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "isFeature",
            "description": "<p>product isFeature should be 0 or 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"isFeature\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated feature Product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/update-featureproduct/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "isFeature error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "PutApiProductStoreUpdateFeatureproductId"
  },
  {
    "type": "get",
    "url": "/api/list/banner-list",
    "title": "Banner List",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you Banner list show successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/banner-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListBannerList"
  },
  {
    "type": "get",
    "url": "/api/list/category-list",
    "title": "Category List Tree API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"keyorder\": \"\",\n     \"sortOrder\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"category list shown successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/category-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListCategoryList"
  },
  {
    "type": "get",
    "url": "/api/list/country-list",
    "title": "Country List API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get country list\",\n     \"data\":{\n     \"countryId\"\n     \"name\"\n     \"isoCode2\"\n     \"isoCode3\"\n     \"addressFormat\"\n     \"postcodeRequired\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/country-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "countryFront error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListCountryList"
  },
  {
    "type": "get",
    "url": "/api/list/custom-product-list",
    "title": "Custom Product List API",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryslug",
            "description": "<p>categoryslug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceFrom",
            "description": "<p>price from you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceTo",
            "description": "<p>price to you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>ASC OR DESC</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/custom-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListCustomProductList"
  },
  {
    "type": "get",
    "url": "/api/list/get-payment-setting",
    "title": "Get payment setting API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got payment setting\",\n     \"data\":{\n     \"plugin_name\"\n     \"plugin_avatar\"\n     \"plugin_avatar_path\"\n     \"plugin_type\"\n     \"plugin_status\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/get-payment-setting"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "get payment setting error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListGetPaymentSetting"
  },
  {
    "type": "get",
    "url": "/api/list/language-list",
    "title": "Language List API",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got language list\",\n     \"data\":{\n     \"languageId\"\n     \"name\"\n     \"status\"\n     \"code\"\n     \"sortOrder\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/language-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Language error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListLanguageList"
  },
  {
    "type": "get",
    "url": "/api/list/product-count",
    "title": "Product Count API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword for search</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryslug",
            "description": "<p>categoryslug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceFrom",
            "description": "<p>price from you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceTo",
            "description": "<p>price to you want to list</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Product Count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/product-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product count error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListProductCount"
  },
  {
    "type": "get",
    "url": "/api/list/productlist",
    "title": "Product List API",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceFrom",
            "description": "<p>price from you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceTo",
            "description": "<p>price to you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>orderBy 0-&gt;desc 1-&gt;asc</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "condition",
            "description": "<p>1-&gt;new 2-&gt;used</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in boolean or number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/productlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListProductlist"
  },
  {
    "type": "get",
    "url": "/api/list/related-product-list",
    "title": "Related Product List",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Related Product List Showing Successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/related-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Related Product List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListRelatedProductList"
  },
  {
    "type": "get",
    "url": "/api/list/specific-category-list",
    "title": "Specific Category List",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"parentInt\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Category listed successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/specific-category-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListSpecificCategoryList"
  },
  {
    "type": "get",
    "url": "/api/list/zone-list",
    "title": "Zone List API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get zone list\",\n     \"data\":{\n     \"countryId\"\n     \"code\"\n     \"name\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/zone-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListZoneList"
  },
  {
    "type": "post",
    "url": "/api/list/add-related-product",
    "title": "Add a Related Product",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>Related Product Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n     \"relatedProductId\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Related Product adding successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/add-related-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Related Product Adding error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "PostApiListAddRelatedProduct"
  },
  {
    "type": "post",
    "url": "/api/list/contact-us",
    "title": "Contact Us API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Phone Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"email\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"message\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Your mail send to admin..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/contact-us"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Contact error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "PostApiListContactUs"
  },
  {
    "type": "get",
    "url": "/api/orders/order-detail",
    "title": "My OrderDetail",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>orderProductId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderProductId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersOrderDetail"
  },
  {
    "type": "get",
    "url": "/api/orders/order-export-pdf",
    "title": "Order Export PDF API",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>Order Product Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderProductId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-export-pdf"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersOrderExportPdf"
  },
  {
    "type": "get",
    "url": "/api/orders/order-list",
    "title": "My Order List",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersOrderList"
  },
  {
    "type": "get",
    "url": "/api/orders/track-order-product",
    "title": "Track Order",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>Order Product Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderProductId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Track Order..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/track-order-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Track Order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersTrackOrderProduct"
  },
  {
    "type": "post",
    "url": "/api/orders/add-rating",
    "title": "Add Rating  API",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "reviews",
            "description": "<p>productReviews</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>productRatings</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated your reviews and ratings!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/add-rating"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "rating error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiOrdersAddRating"
  },
  {
    "type": "post",
    "url": "/api/orders/add-reviews",
    "title": "Add Reviews  API",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "reviews",
            "description": "<p>productReviews</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully added reviews!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/add-reviews"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "reviews error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiOrdersAddReviews"
  },
  {
    "type": "post",
    "url": "/api/orders/customer-checkout",
    "title": "Checkout",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDetail",
            "description": "<p>Product Details</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentMethod",
            "description": "<p>paymentMethod</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingFirstName",
            "description": "<p>Shipping First name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingLastName",
            "description": "<p>Shipping Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCompany",
            "description": "<p>Shipping Company</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddress_1",
            "description": "<p>Shipping Address 1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddress_2",
            "description": "<p>Shipping Address 2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCity",
            "description": "<p>Shipping City</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingPostCode",
            "description": "<p>Shipping PostCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCountry",
            "description": "<p>Shipping Country</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingZone",
            "description": "<p>Shipping Zone</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressFormat",
            "description": "<p>Shipping Address Format</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Customer Phone Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>Customer Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Customer password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponCode",
            "description": "<p>couponCode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponDiscountAmount",
            "description": "<p>couponDiscountAmount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponData",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productDetail\" :[\n     {\n     \"productId\" : \"\",\n     \"quantity\" : \"\",\n     \"price\" : \"\",\n     \"model\" : \"\",\n     \"name\" : \"\",\n     \"productOptions\":[\n     {\n      \"productOptionId\":\n      \"productOptionValueId\":\n      \"name\":\n      \"value\":\n      \"type\":\n     }]\n     }],\n     \"shippingFirstName\" : \"\",\n     \"shippingLastName\" : \"\",\n     \"shippingCompany\" : \"\",\n     \"shippingAddress_1\" : \"\",\n     \"shippingAddress_2\" : \"\",\n     \"shippingCity\" : \"\",\n     \"shippingPostCode\" : \"\",\n     \"shippingCountry\" : \"\",\n     \"shippingZone\" : \"\",\n     \"shippingAddressFormat\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"paymentMethod\" : \"\",\n     \"vendorId\" : \"\",\n     \"couponCode\" : \"\",\n     \"couponDiscountAmount\" : \"\",\n     \"couponData\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Check Out the product successfully And Send order detail in your mail ..!!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/customer-checkout"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Checkout error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiOrdersCustomerCheckout"
  },
  {
    "type": "delete",
    "url": "/api/customer/wishlist-product-delete/:id",
    "title": "Delete Product From Wishlist",
    "group": "Store_wishlist",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"wishlistProductId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you deleted the product from wishlist successfully.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/wishlist-product-delete/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Wishlist Product Delete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerWishListController.ts",
    "groupTitle": "Store_wishlist",
    "name": "DeleteApiCustomerWishlistProductDeleteId"
  },
  {
    "type": "get",
    "url": "/api/customer/wishlist-product-list",
    "title": "WishList Product List",
    "group": "Store_wishlist",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the wishlist Product List\",\n     \"status\": \"1\",\n     \"data\": \"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/wishlist-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Wishlist Product List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerWishListController.ts",
    "groupTitle": "Store_wishlist",
    "name": "GetApiCustomerWishlistProductList"
  },
  {
    "type": "post",
    "url": "/api/customer/add-product-to-wishlist",
    "title": "Add Product To Wishlist",
    "group": "Store_wishlist",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productOptionValueId",
            "description": "<p>Product Option Value Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n     \"ProductOptionValueId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you product added to the wishlist successfully.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/add-product-to-wishlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Add Product To Wishlist error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/CustomerWishListController.ts",
    "groupTitle": "Store_wishlist",
    "name": "PostApiCustomerAddProductToWishlist"
  },
  {
    "type": "delete",
    "url": "/api/tax/delete-tax/:taxId",
    "title": "Delete Tax API",
    "group": "Tax",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"taxId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Tax.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/tax/delete-tax/:taxId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Tax error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/TaxController.ts",
    "groupTitle": "Tax",
    "name": "DeleteApiTaxDeleteTaxTaxid"
  },
  {
    "type": "get",
    "url": "/api/tax/tax-list",
    "title": "Tax List API",
    "group": "Tax",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get tax list\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/tax/tax-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Tax error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/TaxController.ts",
    "groupTitle": "Tax",
    "name": "GetApiTaxTaxList"
  },
  {
    "type": "post",
    "url": "/api/tax/add-tax",
    "title": "Add Tax API",
    "group": "Tax",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "taxName",
            "description": "<p>Tax taxName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxPercentage",
            "description": "<p>Tax taxPercentage</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxStatus",
            "description": "<p>Tax taxStatus</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"taxName\" : \"\",\n     \"taxPercentage\" : \"\",\n     \"taxStatus\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new tax.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/tax/add-tax"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/TaxController.ts",
    "groupTitle": "Tax",
    "name": "PostApiTaxAddTax"
  },
  {
    "type": "put",
    "url": "/api/tax/update-tax/:taxId",
    "title": "Update Tax API",
    "group": "Tax",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "taxName",
            "description": "<p>Tax taxName</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "taxPercentage",
            "description": "<p>Tax taxPercentage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "taxStatus",
            "description": "<p>Tax taxStatus</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"taxName\" : \"\",\n     \"taxPercentage\" : \"\",\n     \"taxStatus\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Tax.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/tax/update-tax/:taxId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Tax error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/TaxController.ts",
    "groupTitle": "Tax",
    "name": "PutApiTaxUpdateTaxTaxid"
  },
  {
    "type": "get",
    "url": "/api/vendor/customer-document-list",
    "title": "Get Vendor Document List",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n'message': 'Successfully get customer document list',\n'data':{},\n'status': '1'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/customer-document-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorCustomerDocumentList"
  },
  {
    "type": "get",
    "url": "/api/vendor/download-customer-document/:customerDocumentId",
    "title": "Download Vendor Document API",
    "group": "Vendor",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     'customerDocumentId' : '',\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n'message': 'Successfully download customer document file.',\n'status': '1'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/download-customer-document/:customerDocumentId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Download error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorDownloadCustomerDocumentCustomerdocumentid"
  },
  {
    "type": "get",
    "url": "/api/vendor/order-graph",
    "title": "order graph API",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>1-&gt; thisWeek 2-&gt; thisMonth 3-&gt; thisYear</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     'message': 'Successfully get order statics..!!',\n     'status': '1',\n     'data': {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/order-graph"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order statics error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorOrderGraph"
  },
  {
    "type": "get",
    "url": "/api/vendor/total-Dashboard-counts",
    "title": "Total Dashboard Counts",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     'message': 'Successfully got total dashboard counts',\n     'data':{\n     }\n     'status': '1'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/total-Dashboard-counts"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorTotalDashboardCounts"
  },
  {
    "type": "get",
    "url": "/api/vendor/vendor-category-list",
    "title": "Vendor Category List API",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     'message': 'Successfully get vendor category list',\n     'data':{\n      'vendorId' : '',\n      'vendorCategoryId' : '',\n      'categoryId' : '',\n      'commission' : '',\n     }\n     'status': '1'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/vendor-category-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorVendorCategoryList"
  },
  {
    "type": "get",
    "url": "/api/vendor/vendor-profile",
    "title": "Vendor Get Profile  API",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n'message': 'Successfully got vendor Details',\n'data':{\n'vendorId' : '',\n'firstName' : '',\n'lastName' : '',\n'email' : '',\n'mobileNumber' : '',\n'avatar' : '',\n'avatarPath' : '',\n'commission' : '',\n'status' : '',\n}\n'status': '1'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/vendor-profile"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorVendorProfile"
  },
  {
    "type": "post",
    "url": "/api/vendor/confirm-password",
    "title": "Confirm Password API",
    "group": "Vendor",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "verificationCode",
            "description": "<p>Verification code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>New password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"verificationCode\": \"\",\n     \"newPassword\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you for confirming your new password\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/forgot-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PostApiVendorConfirmPassword"
  },
  {
    "type": "post",
    "url": "/api/vendor/forgot-password",
    "title": "Forgot Password API",
    "group": "Vendor",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     'email' : '',\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     'message': 'Thank you. Your password send to your email',\n     'status': '1'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/forgot-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PostApiVendorForgotPassword"
  },
  {
    "type": "post",
    "url": "/api/vendor/login",
    "title": "login API",
    "group": "Vendor",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     'emailId' : '',\n     'password' : '',\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     'data': '{\n        'token':''\n     }',\n     'message': 'Successfully loggedIn',\n     'status': '1'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PostApiVendorLogin"
  },
  {
    "type": "post",
    "url": "/api/vendor/register",
    "title": "register API",
    "group": "Vendor",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>first Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "contactPersonName",
            "description": "<p>contactPersonName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Vendor Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>Vendor Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User Phone Number (Optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     'firstName' : '',\n     'lastName' : '',\n     'contactPersonName' : '',\n     'password' : '',\n     'confirmPassword' : '',\n     'emailId' : '',\n     'phoneNumber' : '',\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     'message': 'Thank you for registering with us for selling your product and please check your email',\n     'status': '1'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/register"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PostApiVendorRegister"
  },
  {
    "type": "post",
    "url": "/api/vendor/upload-customer-document",
    "title": "Upload Vendor Document",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerData",
            "description": "<p>File</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     'message': 'Successfully saved imported data..!!',\n     'status': '1',\n     'data': {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/upload-customer-document"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Import Customer Data",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PostApiVendorUploadCustomerDocument"
  },
  {
    "type": "put",
    "url": "/api/vendor/change-password",
    "title": "Change Password API",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User newPassword</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     'newPassword' : '',\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     'message': 'Successfully Password changed',\n     'status': '1'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/change-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PutApiVendorChangePassword"
  },
  {
    "type": "put",
    "url": "/api/vendor/edit-vendor/:customerId",
    "title": "Edit Vendor API",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Avatar</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "designation",
            "description": "<p>Designation</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>Company Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyLogo",
            "description": "<p>Company Logo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress1",
            "description": "<p>Company Address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyAddress2",
            "description": "<p>Company Address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyCity",
            "description": "<p>Company City</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyState",
            "description": "<p>Company State</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCountryId",
            "description": "<p>Company Country Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pincode",
            "description": "<p>Pincode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "companyMobileNumber",
            "description": "<p>Company Mobile Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyEmailId",
            "description": "<p>Company Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyWebsite",
            "description": "<p>Company Website</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyGstNumber",
            "description": "<p>Company Gst Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "companyPanNumber",
            "description": "<p>Company Pan Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentInformation",
            "description": "<p>paymentInformation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     'firstName' : '',\n     'lastName' : '',\n     'avatar' : '',\n     'designation' : '',\n     'email' : '',\n     'mobileNumber' : '',\n     'companyName' : '',\n     'companyLogo' : '',\n     'companyAddress1' : '',\n     'companyAddress2' : '',\n     'companyCity' : '',\n     'companyState' : '',\n     'shippingCountryId' : '',\n     'pincode' : '',\n     'companyMobileNumber' : '',\n     'companyEmailId' : '',\n     'companyWebsite' : '',\n     'companyGstNumber' : '',\n     'companyPanNumber' : '',\n     'paymentInformation' : '',\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     'status': '1',\n     'message': 'Edited successfully'\n     'data' : '{}'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/edit-vendor/:customerId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Edit Vendor API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorController.ts",
    "groupTitle": "Vendor",
    "name": "PutApiVendorEditVendorCustomerid"
  },
  {
    "type": "delete",
    "url": "/api/vendor-order/delete-vendor-order/:id",
    "title": "Delete Vendor Order API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Vendor Order.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/delete-order/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "DeleteApiVendorOrderDeleteVendorOrderId"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/archive-order-list",
    "title": "Archive Order list API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search by orderId, customer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got archive order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/archive-order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderArchiveOrderList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/order-counts",
    "title": "order counts",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Today order count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/order-counts"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderOrderCounts"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/order-detail/:vendorOrderId",
    "title": "Order Detail API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/order-detail/:vendorOrderId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderOrderDetailVendororderid"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/order-export-pdf",
    "title": "Order Export PDF API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorOrderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/order-export-pdf"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderOrderExportPdf"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/order-list",
    "title": "Order list API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search by orderId, customer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deliverylist",
            "description": "<p>deliverylist</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderOrderList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/recent-order-list",
    "title": "Recent Vendor Order list API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get recent order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/recent-order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderRecentOrderList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/today-vendor-order-count",
    "title": "Today Vendor Order Count API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Today order count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/today-vendor-order-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderTodayVendorOrderCount"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/top-selling-productlist",
    "title": "Top selling ProductList API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>1-&gt; thisWeek 2-&gt; thisMonth 3-&gt; thisYear</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get top selling product..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/top-selling-productlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "top selling product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderTopSellingProductlist"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/vendor-order-status-list",
    "title": "OrderStatus List API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor order status list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/vendor-order-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderVendorOrderStatusList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/vendor-orders-based-status-list",
    "title": "Vendor order List based on order status API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor order list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/vendor-orders-based-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderVendorOrdersBasedStatusList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/vendorOrderLoglist",
    "title": "Vendor Order Log List API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get vendor order log list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/vendorOrderLoglist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderVendororderloglist"
  },
  {
    "type": "post",
    "url": "/api/vendor-order/make-vendor-order-archive",
    "title": "Make Vendor Order Archive API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>Vendor Order Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"vendorOrderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Archive\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/make-vendor-order-archive"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "PostApiVendorOrderMakeVendorOrderArchive"
  },
  {
    "type": "post",
    "url": "/api/vendor-order/revoke-vendor-order-archive",
    "title": "Revoke Vendor Order Archive API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderArchiveId",
            "description": "<p>Vendor Order Archive Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"vendorOrderArchiveId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Revoked Archive\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/revoke-vendor-order-archive"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "PostApiVendorOrderRevokeVendorOrderArchive"
  },
  {
    "type": "post",
    "url": "/api/vendor-order/update-shipping-information",
    "title": "update shipping information API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>VendorOrderId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingUrl",
            "description": "<p>shipping tracking url</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingNo",
            "description": "<p>shipping tracking no</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderId\" : \"\",\n  \"trackingUrl\" : \"\",\n  \"trackingNo\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated shipping information.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/update-shipping-information"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "PostApiVendorOrderUpdateShippingInformation"
  },
  {
    "type": "put",
    "url": "/api/vendor-order/update-order-status/:vendorOrderId",
    "title": "Update OrderStatus API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "subOrderStatusId",
            "description": "<p>OrderStatus subOrderStatusId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"subOrderStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated orderStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/update-order-status/:vendorOrderId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "PutApiVendorOrderUpdateOrderStatusVendororderid"
  },
  {
    "type": "delete",
    "url": "/api/vendor-product/delete-price-update-log/:id",
    "title": "Delete Price Update file log API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted price update log file.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/delete-price-update-log/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "DeleteApiVendorProductDeletePriceUpdateLogId"
  },
  {
    "type": "delete",
    "url": "/api/vendor-product/delete-product/:id",
    "title": "Delete Single Product API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted your product.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/delete-product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "DeleteApiVendorProductDeleteProductId"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/download-price-update-log/:id",
    "title": "Download Price Update file log API",
    "group": "Vendor_Product",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully download price update log file.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/download-price-update-log/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "GetApiVendorProductDownloadPriceUpdateLogId"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/price-update-file-log-list",
    "title": "price update file log list API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get price update file log list\",\n     \"data\":{\n     \"vendorId\" : \"\",\n     \"vendorName\" : \"\",\n     \"productName\" : \"\",\n     \"sku\" : \"\",\n     \"model\" : \"\",\n     \"price\" : \"\",\n     \"quantity\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/price-update-file-log-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "GetApiVendorProductPriceUpdateFileLogList"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/product-bulk-price-excel-list/:vendorId",
    "title": "Product Bulk Price Excel List for export",
    "group": "Vendor_Product",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Product price bulk List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/product-bulk-price-excel-list/:vendorId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product Bulk Price Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "GetApiVendorProductProductBulkPriceExcelListVendorid"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/product-counts",
    "title": "order counts",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Today order count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/product-counts"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "GetApiVendorProductProductCounts"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/product-price-log-list",
    "title": "product price log API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get your product price log list\",\n     \"data\":{\n     \"vendorId\" : \"\",\n     \"vendorName\" : \"\",\n     \"productName\" : \"\",\n     \"sku\" : \"\",\n     \"model\" : \"\",\n     \"price\" : \"\",\n     \"quantity\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/product-price-log-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "GetApiVendorProductProductPriceLogList"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/vendor-product-detail/:id",
    "title": "Vendor Product Detail API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/vendor-product-detail/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "GetApiVendorProductVendorProductDetailId"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/vendor-product-list",
    "title": "Vendor Product List API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get your product list\",\n     \"data\":{\n     \"vendorId\" : \"\",\n     \"vendorName\" : \"\",\n     \"productName\" : \"\",\n     \"sku\" : \"\",\n     \"model\" : \"\",\n     \"price\" : \"\",\n     \"quantity\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/vendor-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "GetApiVendorProductVendorProductList"
  },
  {
    "type": "post",
    "url": "/api/vendor-product/create-vendor-product",
    "title": "Create Vendor Product API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productOptions",
            "description": "<p>productOptions</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "productTranslation",
            "description": "<p>List of Product Translation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"productSlug\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"categoryId\" : \"\",\n     \"upc\" : \"\",\n     \"quantity\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"others\" : \"\",\n     \"productSlug\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ]\n     \"productTranslation\":[\n       {\n          \"languageCode\":\"en\"\n          \"name\":\"\"\n          \"description\":\"\"\n       }\n     ]\n    \"relatedProductId\":[ ]\n    \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }]\n    \"productDiscount\":[\n     {\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }]\n    \"productOptions\":[\n     {\n      \"optionId\":\"\"\n      \"value\":\"\"\n      \"required\":\"\"\n          \"optionValue\":[\n           {\n              \"optionValueId\":\"\"\n              \"quantity\":\"\"\n              \"subtractStock\":\"\"\n              \"pricePrefix\":\"\"\n              \"price\":\"\"\n           }]\n     }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Vendor product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/create-vendor-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "PostApiVendorProductCreateVendorProduct"
  },
  {
    "type": "post",
    "url": "/api/vendor-product/delete-product",
    "title": "Delete Multiple Products API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"productId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Product.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/delete-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "PostApiVendorProductDeleteProduct"
  },
  {
    "type": "post",
    "url": "/api/vendor-product/import-product-bulk-price-data",
    "title": "Import product bulk price Data",
    "group": "Vendor_Product",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productData",
            "description": "<p>File</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully saved imported data..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/import-product-bulk-price-data"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Import Customer Data",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "PostApiVendorProductImportProductBulkPriceData"
  },
  {
    "type": "put",
    "url": "/api/vendor-product/add-vendor-product-status/:id",
    "title": "Add Vendor Product Status API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>either should be 1 or 0</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/add-vendor-product-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product approval error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "PutApiVendorProductAddVendorProductStatusId"
  },
  {
    "type": "put",
    "url": "/api/vendor-product/update-vendor-product/:id",
    "title": "Update Vendor Product API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productOptions",
            "description": "<p>productOptions</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "productTranslation",
            "description": "<p>List of Product Translation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"categoryId\" : \"\",\n     \"upc\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"others\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ],\n     \"productTranslation\":[\n       {\n          \"languageCode\":\"en\"\n          \"name\":\"\"\n          \"description\":\"\"\n       }\n     ]\n      \"relatedProductId\":[ \"\", \"\"],\n     \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }],\n      \"productDiscount\":[\n     {\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }],\n    \"productOptions\":[\n     {\n      \"optionId\":\"\"\n      \"value\":\"\"\n      \"required\":\"\"\n          \"optionValue\":[\n           {\n              \"optionValueId\":\"\"\n              \"quantity\":\"\"\n              \"subtractStock\":\"\"\n              \"pricePrefix\":\"\"\n              \"price\":\"\"\n           }]\n     }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated vendor products.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/update-vendor-product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateProduct error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorProductController.ts",
    "groupTitle": "Vendor_Product",
    "name": "PutApiVendorProductUpdateVendorProductId"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/earning-export",
    "title": "Vendor Earning Export",
    "group": "Vendor_Sales",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the vendor earning List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/earning-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesEarningExport"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/payment-counts",
    "title": "payment counts",
    "group": "Vendor_Sales",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got payment counts\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/payment-counts"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesPaymentCounts"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/payment-list",
    "title": "Payment list API",
    "group": "Vendor_Sales",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>search by orderId, customer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesPaymentList"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/product-earning-export",
    "title": "Vendor Product Earning Export",
    "group": "Vendor_Sales",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the vendor product earning List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/product-earning-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesProductEarningExport"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/sales-export",
    "title": "Sales list Export",
    "group": "Vendor_Sales",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the vendor sales List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/sales-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesSalesExport"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/vendor-earning-list",
    "title": "Vendor Earning List API",
    "group": "Vendor_Sales",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get your product earnings list\",\n     \"data\":{\n     \"vendorId\" : \"\",\n     \"vendorName\" : \"\",\n     \"productName\" : \"\",\n     \"sku\" : \"\",\n     \"model\" : \"\",\n     \"price\" : \"\",\n     \"quantity\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/vendor-earning-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesVendorEarningList"
  },
  {
    "type": "get",
    "url": "/api/vendor-sales/vendor-sales-export",
    "title": "Vendor sales list Export",
    "group": "Vendor_Sales",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the vendor sales List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-sales/vendor-sales-export"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/VendorSalesController.ts",
    "groupTitle": "Vendor_Sales",
    "name": "GetApiVendorSalesVendorSalesExport"
  },
  {
    "type": "delete",
    "url": "/api/zone/delete-zone/:id",
    "title": "Delete Zone API",
    "group": "Zone",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"zoneId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Zone.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/zone/delete-zone/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "DeleteApiZoneDeleteZoneId"
  },
  {
    "type": "get",
    "url": "/api/zone/zone-list",
    "title": "Zone List API",
    "group": "Zone",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get zone list\",\n     \"data\":{\n     \"countryId\"\n     \"code\"\n     \"name\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/zone/zone-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "GetApiZoneZoneList"
  },
  {
    "type": "post",
    "url": "/api/zone/add-zone",
    "title": "Add Zone API",
    "group": "Zone",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>Zone countryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>Zone code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Zone name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Zone status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"countryId\" : \"\",\n     \"code\" : \"\",\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new zone.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/zone/add-zone"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "PostApiZoneAddZone"
  },
  {
    "type": "put",
    "url": "/api/zone/update-zone/:id",
    "title": "Update Zone API",
    "group": "Zone",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>Zone countryId</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>Zone code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Zone name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Zone status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"zoneId\" : \"\",\n     \"countryId\" : \"\",\n     \"code\" : \"\",\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Zone.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/zone/update-zone/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "PutApiZoneUpdateZoneId"
  },
  {
    "type": "get",
    "url": "/api/admin-ambassador/ambassador-details-by-code/:code",
    "title": "Ambassador Details By Code API",
    "group": "ambassador_store",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get ambassador Details\",\n\"data\":{\n\"ambassadorId\" : \"\",\n\"firstName\" : \"\",\n\"lastName\" : \"\",\n\"email\" : \"\",\n\"mobileNumber\" : \"\",\n\"avatar\" : \"\",\n\"avatarPath\" : \"\",\n\"commission\" : \"\",\n\"status\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-ambassador/ambassador-details-by-code/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "ambassador error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/AmbassadorController.ts",
    "groupTitle": "ambassador_store",
    "name": "GetApiAdminAmbassadorAmbassadorDetailsByCodeCode"
  },
  {
    "type": "get",
    "url": "/api/ambassador-store/ambassador-details/:id",
    "title": "Ambassador Details API",
    "group": "ambassador_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get ambassador Details\",\n\"data\":{\n\"ambassadorId\" : \"\",\n\"firstName\" : \"\",\n\"lastName\" : \"\",\n\"email\" : \"\",\n\"mobileNumber\" : \"\",\n\"avatar\" : \"\",\n\"avatarPath\" : \"\",\n\"commission\" : \"\",\n\"status\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/ambassador-store/ambassador-details/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "ambassador error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/AmbassadorController.ts",
    "groupTitle": "ambassador_store",
    "name": "GetApiAmbassadorStoreAmbassadorDetailsId"
  },
  {
    "type": "get",
    "url": "/api/media/bucket-object-list",
    "title": "bucket-object-list",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>list limit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get bucket object list!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/bucket-object-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaBucketObjectList"
  },
  {
    "type": "get",
    "url": "/api/media/delete-file",
    "title": "delete file API",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "fileName",
            "description": "<p>File Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"fileName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Deleted file!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/delete-file"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaDeleteFile"
  },
  {
    "type": "get",
    "url": "/api/media/search-folder",
    "title": "search Folder API",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>folderName</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"FolderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Folder!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/search-folder"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaSearchFolder"
  },
  {
    "type": "post",
    "url": "/api/media/create-folder",
    "title": "Create Folder",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Created folder!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/create-folder"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaCreateFolder"
  },
  {
    "type": "post",
    "url": "/api/media/delete-folder",
    "title": "delete folder API",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Deleted folder!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/delete-folder"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaDeleteFolder"
  },
  {
    "type": "post",
    "url": "/api/media/upload-file",
    "title": "Upload File",
    "group": "media",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>Directory Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"file\":\"\",\n  \"path\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Successfully upload file\",\n  \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/upload-file"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Unable to upload file\",\n    \"status\": 0,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaUploadFile"
  },
  {
    "type": "delete",
    "url": "/api/vendor-coupon/delete-vendor-coupon/:vendorCouponId",
    "title": "Delete Vendor Coupon API",
    "group": "vendor_coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorCouponId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted vendor coupon.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-coupon/delete-vendor-coupon/:vendorCouponId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Delete Vendor Coupon API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/CouponController.ts",
    "groupTitle": "vendor_coupon",
    "name": "DeleteApiVendorCouponDeleteVendorCouponVendorcouponid"
  },
  {
    "type": "get",
    "url": "/api/vendor-coupon/coupon-usage-list",
    "title": "Coupon Usage list API",
    "group": "vendor_coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponId",
            "description": "<p>couponId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"couponId\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"coupon usage List Successfully\"\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-coupon/coupon-usage-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Coupon List API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/CouponController.ts",
    "groupTitle": "vendor_coupon",
    "name": "GetApiVendorCouponCouponUsageList"
  },
  {
    "type": "get",
    "url": "/api/vendor-coupon/vendor-coupon-detail",
    "title": "Vendor Coupon Detail API",
    "group": "vendor_coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorCouponId",
            "description": "<p>VendorCouponId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorCouponId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Successfully got vendor coupon detail\",\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-coupon/vendor-coupon-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Coupon Detail API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/CouponController.ts",
    "groupTitle": "vendor_coupon",
    "name": "GetApiVendorCouponVendorCouponDetail"
  },
  {
    "type": "get",
    "url": "/api/vendor-coupon/vendor-coupon-list",
    "title": "Vendor Coupon List API",
    "group": "vendor_coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Enter Coupon Name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Count should be number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\" : \"\",\n     \"keyword\" : \"\",\n     \"count\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Vendor Coupon List Successfully\"\n     \"data\" : \"{ }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-coupon/vendor-coupon-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Coupon List API error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/CouponController.ts",
    "groupTitle": "vendor_coupon",
    "name": "GetApiVendorCouponVendorCouponList"
  },
  {
    "type": "post",
    "url": "/api/vendor-coupon/add-coupon",
    "title": "Add Vendor Coupon API",
    "group": "vendor_coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponName",
            "description": "<p>couponName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponCode",
            "description": "<p>couponCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponType",
            "description": "<p>couponType 1-&gt; percentage 2 -&gt; amount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "discount",
            "description": "<p>discount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "minimumPurchaseAmount",
            "description": "<p>minimumPurchaseAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maximumPurchaseAmount",
            "description": "<p>maximumPurchaseAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponConjunction",
            "description": "<p>couponConjunction 1-&gt;yes 0-&gt;no</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponAppliesSales",
            "description": "<p>couponAppliesSales 1-&gt;yes 0-&gt;no</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailRestrictions",
            "description": "<p>emailRestrictions</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "applicableFor",
            "description": "<p>applicableFor 1-&gt; loginUser</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "freeShipping",
            "description": "<p>freeShipping 1-&gt; yes 0 -&gt; no</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maxUserPerCoupon",
            "description": "<p>maximumUserPerCoupon</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "noOfTimeCouponValidPerUser",
            "description": "<p>noOfTimeCouponValidPerUser</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "allQualifyingItemsApply",
            "description": "<p>allQualifyingItemsApply</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "appliedCartItemsCount",
            "description": "<p>appliedCartItemsCount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productType",
            "description": "<p>productType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"couponName\" : \"\",\n     \"couponCode\" : \"\",\n     \"couponType\" : \"\",\n     \"discount\" : \"\",\n     \"minimumPurchaseAmount\" : \"\",\n     \"maximumPurchaseAmount\" : \"\",\n     \"couponConjunction\" : \"\",\n     \"couponAppliesSales\" : \"\",\n     \"emailRestrictions\" : \"\",\n     \"applicableFor\" : \"\",\n     \"freeShipping\" : \"\",\n     \"startDate\" : \"\",\n     \"endDate\" : \"\",\n     \"maxUserPerCoupon\" : \"\",\n     \"noOfTimeCouponValidPerUser\" : \"\",\n     \"allQualifyingItemsApply\" : \"\",\n     \"appliedCartItemsCount\" : \"\",\n     \"productType\" : [\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n             ],\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Coupon created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-coupon/add-coupon"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Coupon error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/CouponController.ts",
    "groupTitle": "vendor_coupon",
    "name": "PostApiVendorCouponAddCoupon"
  },
  {
    "type": "put",
    "url": "/api/vendor-coupon/update-vendor-coupon/:vendorCouponId",
    "title": "Edit Vendor Coupon API",
    "group": "vendor_coupon",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponName",
            "description": "<p>couponName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponCode",
            "description": "<p>couponCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponType",
            "description": "<p>couponType 1-&gt; percentage 2 -&gt; amount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "discount",
            "description": "<p>discount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "minimumPurchaseAmount",
            "description": "<p>minimumPurchaseAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maximumPurchaseAmount",
            "description": "<p>maximumPurchaseAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponConjunction",
            "description": "<p>couponConjunction 1-&gt;yes 0-&gt;no</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponAppliesSales",
            "description": "<p>couponAppliesSales 1-&gt;yes 0-&gt;no</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailRestrictions",
            "description": "<p>emailRestrictions</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "applicableFor",
            "description": "<p>applicableFor 1-&gt; loginUser</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "freeShipping",
            "description": "<p>freeShipping 1-&gt; yes 0 -&gt; no</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maxUserPerCoupon",
            "description": "<p>maximumUserPerCoupon</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "noOfTimeCouponValidPerUser",
            "description": "<p>noOfTimeCouponValidPerUser</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "allQualifyingItemsApply",
            "description": "<p>allQualifyingItemsApply</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "appliedCartItemsCount",
            "description": "<p>appliedCartItemsCount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productType",
            "description": "<p>productType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"couponName\" : \"\",\n     \"couponCode\" : \"\",\n     \"couponType\" : \"\",\n     \"discount\" : \"\",\n     \"minimumPurchaseAmount\" : \"\",\n     \"maximumPurchaseAmount\" : \"\",\n     \"couponConjunction\" : \"\",\n     \"couponAppliesSales\" : \"\",\n     \"emailRestrictions\" : \"\",\n     \"applicableFor\" : \"\",\n     \"freeShipping\" : \"\",\n     \"startDate\" : \"\",\n     \"endDate\" : \"\",\n     \"maxUserPerCoupon\" : \"\",\n     \"noOfTimeCouponValidPerUser\" : \"\",\n     \"allQualifyingItemsApply\" : \"\",\n     \"appliedCartItemsCount\" : \"\",\n     \"productType\" : [\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n               {\"type\": \"\",\"referenceId\":[\"\",\"\"]},\n             ],\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Coupon updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-coupon/update-vendor-coupon/:vendorCouponId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Coupon error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/vendor/vendorFront/CouponController.ts",
    "groupTitle": "vendor_coupon",
    "name": "PutApiVendorCouponUpdateVendorCouponVendorcouponid"
  },
  {
    "type": "get",
    "url": "/api/vendor-store/check-pincode-availability",
    "title": "check pincode availability API",
    "group": "vendor_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pincode",
            "description": "<p>pincode</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully checked availability\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/check-pincode-availability"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "check pincode availability error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/VendorController.ts",
    "groupTitle": "vendor_store",
    "name": "GetApiVendorStoreCheckPincodeAvailability"
  },
  {
    "type": "get",
    "url": "/api/vendor-store/vendor-details/:id",
    "title": "Vendor Details API",
    "group": "vendor_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get vendor Details\",\n\"data\":{\n\"vendorId\" : \"\",\n\"firstName\" : \"\",\n\"lastName\" : \"\",\n\"email\" : \"\",\n\"mobileNumber\" : \"\",\n\"avatar\" : \"\",\n\"avatarPath\" : \"\",\n\"commission\" : \"\",\n\"status\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/vendor-details/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/VendorController.ts",
    "groupTitle": "vendor_store",
    "name": "GetApiVendorStoreVendorDetailsId"
  },
  {
    "type": "get",
    "url": "/api/vendor-store/vendor-product-list/:id",
    "title": "Vendor Product list API",
    "group": "vendor_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Count",
            "optional": false,
            "field": "count",
            "description": "<p>should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get vendor product list\",\n\"data\":{\n\"productId\" : \"\",\n\"name\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/vendor-product-list/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.1.0",
    "filename": "src/api/controllers/store/VendorController.ts",
    "groupTitle": "vendor_store",
    "name": "GetApiVendorStoreVendorProductListId"
  }
] });
