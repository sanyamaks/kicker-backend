"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          updatedAt: new Date(),
          createdAt: new Date(),
          name: "Ivan Ivanov",
          photoUrl: null,
          email: "test1@test.com"
        },
        {
          updatedAt: new Date(),
          createdAt: new Date(),
          name: "Petr Petrov",
          photoUrl: null,
          email: "test2@test.com"
        },
        {
          updatedAt: new Date(),
          createdAt: new Date(),
          name: "Sergey Sergeev",
          photoUrl: null,
          email: "test3@test.com"
        },
        {
          updatedAt: new Date(),
          createdAt: new Date(),
          name: "Anton Antonov",
          photoUrl: null,
          email: "test4@test.com"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
