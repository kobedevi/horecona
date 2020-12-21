/*
User object
*/

class User {
  constructor({
    name = null, surname = null, birth = null, phone = null, email, password,
  }) {
    this.name = name;
    this.surname = surname;
    this.birth = birth;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }

  setInfo() {
    // firebase opslag hier via uid
    this.name = 'Fons';
  }

  async register(formData) {
    this.email = formData.get('email');
  }
}

export default User;
