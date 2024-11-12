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
    const users = parseInt(req.query.users) || 50;
    const pets = parseInt(req.query.pets) || 50;
    
    try {
      const mockUsers = generateMockUsers(users);
      const mockPets = generateMockPets(pets);
  
      const insertedUsers = await usersService.insertMany(mockUsers);
      const insertedPets = await petsService.insertMany(mockPets);
  
      res.status(201).json({
      message: `Datos generados e insertados exitosamente: ${insertedUsers.length} usuarios y ${insertedPets.length} mascotas.`,
      status: 'success',
      payload: {
          usersInserted: insertedUsers.length,
          petsInserted: insertedPets.length
      }
  });
    } catch (error) {
      res.status(500).json({ error: 'Error al generar los datos.' });
    }
  };