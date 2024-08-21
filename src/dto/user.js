class User {
  constructor(userId, email, username, password, firstname, lastname, role) {
    this.userId = userId;
    this.email = email;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.role = role;
  }
}

module.exports = User;
