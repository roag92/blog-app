blog-app
=======

This project is a PoC for using resources from AWS such as EC2, RDS and S3.

# Requirements

 * node
 * yarn

# Installation

```bash
yarn install
# Set the right values to your .env file according to your AWS resources
cp .env.dist .env
# Load the database structure creating a new user from tools/db directory
yarn init:db
# Upload the posts files written in markdown which are into tools/s3 directory
yarn init:s3
# Build assets and transpile code
yarn build
# Start web server
yarn start
```
