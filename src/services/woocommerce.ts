import axios, { type AxiosInstance } from 'axios';
import type { AuthCredentials } from '../types/auth';

export const createWooCommerceClient = ({ storeUrl, consumerKey, consumerSecret }: AuthCredentials): AxiosInstance => {
    // Ensure protocol
    let baseURL = storeUrl;
    if (!baseURL.startsWith('http://') && !baseURL.startsWith('https://')) {
        baseURL = `https://${baseURL}`;
    }
    // Remove trailing slash
    baseURL = baseURL.replace(/\/$/, '');

    // Append API root
    baseURL = `${baseURL}/wp-json/wc/v3`;

    // Base64 encode credentials
    const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;

    const client = axios.create({
        baseURL,
        headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json',
        },
    });

    return client;
};

// Helper to check connection
export const checkConnection = async (credentials: AuthCredentials): Promise<boolean> => {
    try {
        const client = createWooCommerceClient(credentials);
        // Fetch system status or just 1 product to verify
        await client.get('/products', { params: { per_page: 1 } });
        return true;
    } catch (error) {
        console.error('Connection check failed:', error);
        return false;
    }
};
