const app = require('./index');
require('dotenv').config();

const PORT = process.env.PORT || 8002;

app.listen(PORT, () =>  {
    console.log(`Listening to request http://localhost:${PORT}`);
});
