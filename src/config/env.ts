import { z } from 'zod';

const envConfigSchema = z.object({
    SERVER_BASE_URL: z.string(),
});

const envConfig = envConfigSchema.parse({
    SERVER_BASE_URL: import.meta.env.VITE_SERVER_BASE_URL + '/' + import.meta.env.VITE_SERVER_VERSION_API,
});

export default envConfig;
