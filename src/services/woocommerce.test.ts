import { describe, it, expect } from 'vitest';
import { createWooCommerceClient } from './woocommerce';

describe('createWooCommerceClient', () => {
    it('should create an axios instance with correct baseURL', () => {
        const credentials = {
            storeUrl: 'example.com',
            consumerKey: 'ck_123',
            consumerSecret: 'cs_123',
        };
        const client = createWooCommerceClient(credentials);
        expect(client.defaults.baseURL).toBe('https://example.com/wp-json/wc/v3');
    });

    it('should handle storeUrl with http protocol', () => {
        const credentials = {
            storeUrl: 'http://local.test',
            consumerKey: 'ck_123',
            consumerSecret: 'cs_123',
        };
        const client = createWooCommerceClient(credentials);
        expect(client.defaults.baseURL).toBe('http://local.test/wp-json/wc/v3');
    });

    it('should correctly encode headers', () => {
        const credentials = {
            storeUrl: 'example.com',
            consumerKey: 'ck_123',
            consumerSecret: 'cs_123',
        };
        const client = createWooCommerceClient(credentials);
        // btoa('ck_123:cs_123') -> 'Y2tfMTIzOmNzXzEyMw=='
        expect(client.defaults.headers.Authorization).toContain('Basic Y2tfMTIzOmNzXzEyMw==');
    });
});
