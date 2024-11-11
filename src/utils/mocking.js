import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generateMockUsers = (num) => {
  const users = [];
  for (let i = 0; i < num; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('coder123', 10), 
      role: faker.helpers.arrayElement(['user', 'admin']),
      pets: []  
    };
    users.push(user);
  }
  return users;
};

export const generateMockPets = (num) => {
  const pets = [];
  const petSpecies = ['dog', 'cat', 'rabbit', 'bird', 'hamster'];

  for (let i = 0; i < num; i++) {
    const specie = faker.helpers.arrayElement(petSpecies); 
    const pet = {
      name: faker.animal.petName(),
      specie,
      birthDate: faker.date.past(10),
      adopted: faker.datatype.boolean(),
      owner: null,
      image: faker.image.urlLoremFlickr({ category: specie})
    };
    pets.push(pet);
  }
  return pets;
};