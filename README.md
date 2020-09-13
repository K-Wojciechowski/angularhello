# HelloAngular

A simple Angular + Express app with user login and messaging features. It uses a MySQL database to store information.

(This project is not maintained since 2019. Most dependencies need an upgrade to work in modern versions.)

## Usage

1\. Install all dependencies:

    npm install
    cd backend
    npm install

2\. Make sure that `dev.local` is configured and points to 127.0.0.1 in `/etc/hosts`.

3\. Write a `backend/local-config` file:

    export DB_URL='mysql://user:pass@localhost:3306/helloangular'
    export TOKEN_KEY='put a random key here'

3\. Run both apps with `dev.local` as the host:

    npx ng serve --host dev.local
    cd backend; source local-config; npm run watch-node
    cd backend; source local-config; npm run watch-ts

