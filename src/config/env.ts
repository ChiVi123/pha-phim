import { z } from 'zod';

const envConfigSchema = z.object({
    SERVER_BASE_URL: z.string(),
    SERVER_DOMAIN_CDN_IMAGE: z.string(),
    ENV_NODE: z.string(),
    DEV_MODE: z.boolean(),
});

const envConfig = envConfigSchema.parse({
    SERVER_BASE_URL: import.meta.env.VITE_SERVER_BASE_URL + '/' + import.meta.env.VITE_SERVER_VERSION_API,
    SERVER_DOMAIN_CDN_IMAGE: import.meta.env.VITE_SERVER_DOMAIN_CDN_IMAGE,
    ENV_NODE: import.meta.env.MODE,
    DEV_MODE: import.meta.env.DEV,
});

export default envConfig;
