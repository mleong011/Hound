"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {}

	User.init(
		{
			name: DataTypes.STRING,
			email: {
				type: DataTypes.STRING,
				unique: {
					args: true,
					msg: "Email already exists, enter another!",
				},
				validate: {
					isEmail: true,
				},
			},
			accessToken: DataTypes.STRING,
		},

		{
			sequelize,
			modelName: "User",
		}
	);

	User.associate = (models) => {
		// 1-Many: One User can have Many Orders
		// Creates userId on Order model and table
		models.User.hasMany(models.Order, {
			foreignKey: { name: "userId" },
			onDelete: "CASCADE",
			onUpdate: "CASCADE",
			hooks: true,
		});
	};

	return User;
};
