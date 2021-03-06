'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Competicoes', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataInicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dataFim: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dataPrazoInscricoes: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Competicoes');
  }
};
