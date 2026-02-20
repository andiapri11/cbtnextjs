INSERT INTO User (id, email, password, name, role, createdAt, updatedAt) 
VALUES (UUID(), 'superadmin@schola.id', '$2b$10$Kr4gJxM4KzQ9JLhMgJTFWetl2sDNOv89LbNoHMcgQtBDzPqCLimzC', 'Super Admin Schola', 'SUPER_ADMIN', NOW(), NOW())
ON DUPLICATE KEY UPDATE email=email;
