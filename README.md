# salud integral backend (A project for Universidad Politécnica de Aguascalientes)

Clone repository

```
git clone https://github.com/EsterUscanga/salud_integral_backend.git
```

Change configuration of the following part of `index.js`:
 - **host**: Custom IP Adreess
 - **user**: Custom user
 - **password**: Custom db password

```javascript
const mysql = require('mysql')
const conn = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: "db_salud_integral"
})
```

Install NPM dependencies

```
cd salud_integral_backend
npm install
```

Run the server

```
node index.js
```