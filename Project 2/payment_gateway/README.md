# Prerequisite

- AWS SQS
  - Create Create AWS SQS fifo queue called "payment.fifo"
  - Set WaitTimeSeconds queue configuration attr to 10 sec to enable long polling
  - Add Queue url to the .env file
  
- Dynamodb 
  - Create table: "Buyers" with key : "oBuyerId" 
  - Create table: "Sellers" with key : "oSellerId" 
  - Create table: "Payments" with key : "orderId"
  
- Stripe Webhooks
  - Create new webhook endpoint from stripe dashboard
  - Set the endpointSecret variable in .env file ( endpointSecret is available in stripe dashbaord -> webhooks )
  
- Stripe API
  -  Set stripe private / public keys in .env file ( keys are available in stripe dashbaord )

# Setup

```
> npm i
```

# Run (development mode)
```
> npm run dev
```

# Debug
```
1. > npm run watch:debug
```
```
2. VSCode -> debug tab ->  run attach to process
```
