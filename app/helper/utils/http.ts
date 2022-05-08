import Response from '../common/Response'
const qs = require('qs');

const baseUrl = 'http://gitlab.test.com';

export default (app) => {
    return {
        async post({url, params = {}, query = {}}): Promise<Response> {
            const sendUrl = `${baseUrl}${url}?${qs.stringify(query)}`;
            try {
                const { data, code } = await app.curl(sendUrl, {
                    dataType: 'json',
                    method: 'POST',
                    data: params
                });
                return { data, code };
            } catch(err) {
                return {
                    code: -1,
                    data: err
                }
            }
        },
        async methodV({url, method, params = {}, query = {}}): Promise<Response> {
            const sendUrl = `${baseUrl}/api/v4/${url}?${qs.stringify(query)}`;
            try {
                const { data, code } = await app.curl(sendUrl, {
                    dataType: 'json',
                    method,
                    data: params
                })
                return { data, code };
            } catch(err) {
                return {
                    code: -1,
                    data: err
                }
            }
        }
    }
}