// const mysql2 = require('mysql2');
//
// const connection = mysql2.createConnection({
//     user: 'user',
//     password: 'user',
//     database: 'sep-2020',
//     host: 'localhost',
// });
//
// module.exports = connection.promise();
const { Sequilize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

module.exports = () => {
    let instance;

    // eslint-disable-next-line no-unused-vars
    const initConnection = () => {
        const client = new Sequilize('sep-2020', 'user', 'user', { dialect: 'mysql' });

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'MySQL', 'models');

        // eslint-disable-next-line no-unused-vars
        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    // eslint-disable-next-line import/no-dynamic-require
                    const modelFile = require(path.join(modelsPath, model));

                    models[model] = modelFile(client, DataTypes);
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelNmae]
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = 'XXX';
            }

            return instance;
        }
    };
};
