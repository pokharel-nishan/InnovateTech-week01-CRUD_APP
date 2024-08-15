class User {
  constructor(id, username, password, firstname, lastname, role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.role = role;
  }
}

module.exports = User;