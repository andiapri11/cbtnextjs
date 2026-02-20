import { z } from 'zod';

export const schoolRegisterSchema = z.object({
    schoolName: z.string().min(3, 'School name must be at least 3 characters'),
    adminName: z.string().min(2, 'Admin name must be at least 2 characters'),
    adminEmail: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type SchoolRegisterValues = z.infer<typeof schoolRegisterSchema>;
