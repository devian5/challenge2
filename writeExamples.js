const logger = (log) => { console.log(new Date,log) }

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
logger('require mongoose')
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_DBNAME = process.env.MONGO_DBNAME || 'practicas';
const MONGO_USER = process.env.MONGO_USER || null;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || null;

const QUERY_STRING = MONGO_USER ?
`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`
:
`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`

mongoose.connect(QUERY_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    logger('conected!')
}).catch((error) => console.log(error));

logger('creating schema!')

let schema = mongoose.Schema({
    
    id: {
        type: ObjectId,
        required: false
    },

    name: {
        type: String,
        required: true,
        default: 'pepe'
    },

    creationDate: {
        type: Date,
        default: new Date
    },

    breed: {
        type: String
    },

    sterilized: {
        type: Boolean,
        default: false
    }
});


logger('creatting  Cat model schema')
const Cat = mongoose.model('cat', schema);
logger('model created')

logger
logger('creatting  Dog model schema')
const Dog = mongoose.model('dog', schema);

logger('instance created')
const kitty = new Cat({
    name: 'Zildjian'
});

kitty.name = 'Stratocaster'


logger('saving!')
kitty.save()
.then(() => logger('saved'))
.catch((error) => console.log(error));
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     // we're connected!
// });

// const Schema = mongoose.Schema;
// const users_schema = new Schema({
// name: String,
//     email: String,
//     password: String
// });
