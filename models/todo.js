const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const Tasks = sequelize.define('Tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    tableName: 'tasks',
    timestamps: true
});

module.exports = Tasks