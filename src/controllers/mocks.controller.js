import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import { petsService, usersService } from '../services/index.js';

export const getMockPets = (req, res) => {
    const pets = generateMockPets(50); 
    res.send({ status: 'success', payload: pets });
  };
  
  export const getMockUsers = (req, res) => {
    const users = generateMockUsers(50); 
    res.send({ status: 'success', payload: users });  };
  
  export const generateData = async (req, res) => {
    const { users, pets } = req.body;
    try {
      const mockUsers = generateMockUsers(users);
      const mockPets = generateMockPets(pets);
  
      await usersService.insertMany(mockUsers);
      await petsService.insertMany(mockPets);
  
      res.status(201).json({ message: 'Datos generados e insertados exitosamente.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al generar los datos.' });
    }
  };