import { z } from 'zod';

const envConfigSchema = z.object({
    SERVER_BASE_URL: z.string(),
    SERVER_DOMAIN_CDN_IMAGE: z.string(),
});

const envConfig = envConfigSchema.parse({
    SERVER_BASE_URL: import.meta.env.VITE_SERVER_BASE_URL + '/' + import.meta.env.VITE_SERVER_VERSION_API,
    SERVER_DOMAIN_CDN_IMAGE: import.meta.env.VITE_SERVER_DOMAIN_CDN_IMAGE,
});

export default envConfig;
