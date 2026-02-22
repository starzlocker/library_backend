type User = {
  name: string,
  age: number
}

enum Role {
  Admin,
  User
}

function sayHi(user: User) {
  return console.log(`Olá, ${user.name} tem ${user.age}`)
}

sayHi({name: 'adolfo', age: 27, height: 173});

