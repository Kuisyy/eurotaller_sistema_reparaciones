import db from '../../config/db_config.js';

class SeedData {
  
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
      console.log('Todos los datos iniciales creados correctamente');
    } catch (error) {
      console.error('Error al crear datos iniciales:', error);
      throw error;
    }
  }
}

export default SeedData;