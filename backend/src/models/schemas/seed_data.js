import db from '../../config/db_config.js';

class SeedData {
  static async createInitialWorkers() {
    try {
      await db.tx(async t => {
        const workersData = [
          {
            name: 'Juan Mecánico',
            email: 'juan@eurotaller.com',
            password: '$2a$12$Kyo9dZiB00bkn1u/9h2n0e9PI5KbpMGXByCKJWbCE2TEIVuhOe4dS', // admin123
            role: 'worker',
            worker_role: 'mecanico'
          },
          {
            name: 'Ana Técnico',
            email: 'ana@eurotaller.com',
            password: '$2a$12$Kyo9dZiB00bkn1u/9h2n0e9PI5KbpMGXByCKJWbCE2TEIVuhOe4dS',
            role: 'worker',
            worker_role: 'mecanico'
          },
          {
            name: 'María Administrativa',
            email: 'maria@eurotaller.com',
            password: '$2a$12$Kyo9dZiB00bkn1u/9h2n0e9PI5KbpMGXByCKJWbCE2TEIVuhOe4dS',
            role: 'worker',
            worker_role: 'administrativo'
          }
        ];

        for (const worker of workersData) {
          const exists = await t.oneOrNone('SELECT 1 FROM users WHERE email = $1', [worker.email]);
          
          if (!exists) {
            const userResult = await t.one(`
              INSERT INTO users (name, email, password, role)
              VALUES ($1, $2, $3, $4)
              RETURNING user_id
            `, [worker.name, worker.email, worker.password, worker.role]);
            
            await t.none(`
              INSERT INTO workers (user_id, role)
              VALUES ($1, $2)
            `, [userResult.user_id, worker.worker_role]);
          }
        }
      });
      console.log('Trabajadores iniciales creados con éxito');
    } catch (error) {
      console.error('Error al crear trabajadores iniciales:', error);
      throw error;
    }
  }

  static async createInitialClients() {
    try {
      await db.tx(async t => {
        const clientsData = [
          {
            name: 'Pedro Cliente',
            email: 'pedro@example.com',
            password: '$2a$12$Kyo9dZiB00bkn1u/9h2n0e9PI5KbpMGXByCKJWbCE2TEIVuhOe4dS',
            role: 'client',
            address: 'Calle Mayor 1',
            postal_code: '28001',
            city: 'Madrid',
            province: 'Madrid',
            country: 'España',
            nif: '12345678A',
            phone: '666111222'
          },
          {
            name: 'Laura Cliente',
            email: 'laura@example.com',
            password: '$2a$12$Kyo9dZiB00bkn1u/9h2n0e9PI5KbpMGXByCKJWbCE2TEIVuhOe4dS',
            role: 'client',
            address: 'Avenida Libertad 23',
            postal_code: '28002',
            city: 'Madrid',
            province: 'Madrid',
            country: 'España',
            nif: '87654321B',
            phone: '666333444'
          }
        ];

        for (const client of clientsData) {
          const exists = await t.oneOrNone('SELECT 1 FROM users WHERE email = $1', [client.email]);
          
          if (!exists) {
            const userResult = await t.one(`
              INSERT INTO users (name, email, password, role)
              VALUES ($1, $2, $3, $4)
              RETURNING user_id
            `, [client.name, client.email, client.password, client.role]);
            
            await t.none(`
              INSERT INTO clients (
                user_id, address, postal_code, city, province, 
                country, nif, phone
              )
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `, [
              userResult.user_id, client.address, client.postal_code,
              client.city, client.province, client.country,
              client.nif, client.phone
            ]);
          }
        }
      });
      console.log('Clientes iniciales creados con éxito');
    } catch (error) {
      console.error('Error al crear clientes iniciales:', error);
      throw error;
    }
  }

  static async createInitialAdmin() {
    try {
      await db.tx(async t => {
        const adminExists = await t.oneOrNone(
          'SELECT 1 FROM users WHERE email = $1',
          ['admin@eurotaller.com']
        );
        
        if (!adminExists) {
          // Hash de la contraseña (admin)
          const hashedPassword = '$2a$12$Kyo9dZiB00bkn1u/9h2n0e9PI5KbpMGXByCKJWbCE2TEIVuhOe4dS';
          
          const userResult = await t.one(`
            INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING user_id
          `, ['Administrador', 'admin@eurotaller.com', hashedPassword, 'admin']);
          
          await t.none(`
            INSERT INTO admin (user_id)
            VALUES ($1)
          `, [userResult.user_id]);
          
          console.log('Administrador inicial creado con éxito');
          return true;
        } else {
          console.log('El administrador ya existe, omitiendo creación');
          return false;
        }
      });
      
    } catch (error) {
      console.error('Error al crear administrador inicial:', error);
      throw error;
    }
  }
  
  static async createInitialData() {
    try {
      await this.createInitialAdmin();
      await this.createInitialWorkers();
      await this.createInitialClients();
      console.log('Todos los datos iniciales creados correctamente');
    } catch (error) {
      console.error('Error al crear datos iniciales:', error);
      throw error;
    }
  }
}

export default SeedData;