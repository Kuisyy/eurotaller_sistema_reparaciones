DO $$
DECLARE
    user_id_var INTEGER;
BEGIN
    -- Verificar si ya existe un administrador
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@eurotaller.com') THEN
        -- Insertar el usuario admin (password: admin123)
        INSERT INTO users (
            name,
            email,
            password,
            role
        ) VALUES (
            'Administrador',
            'admin@eurotaller.com',
            '$2a$12$zf/y6lUSxFaHtMv5izmXOO58RLS.z/2.Mj2/P39DxWbIjS8B1/ALK',
            'admin'
        ) RETURNING user_id INTO user_id_var;

        -- Insertar en la tabla admin
        INSERT INTO admin (user_id)
        VALUES (user_id_var);
        
        RAISE NOTICE 'Administrador inicial creado con éxito';
    END IF;
END $$;