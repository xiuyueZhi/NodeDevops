module.exports = (app) => {
    const { STRING, INTEGER } = app.Sequelize;
  
    const User = app.model.define('user', {
        id: { type: INTEGER, primaryKey: true },
        name: STRING(30),
        username: STRING(30),
        email: STRING(100),
        avatarUrl: STRING(200),
        webUrl: STRING(200)
    });
  
    return User;
  };