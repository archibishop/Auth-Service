import express from 'express';
import bodyParser from 'body-parser';


// Server
const app = express();

// Port 
const PORT =  process.env.Port || 3000;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
