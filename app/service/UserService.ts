import { Service } from 'egg';
import { CLIENT_ID, CLIENT_SECRET } from '../config/default.config'


export default class UserService extends Service {
    public async getUserToken({ username, password }) {
        const {ctx: {helper: { utils }}} = this
        const { data: token } = await utils.http.post({
            url: '/oauth/token',
            params: {
                grant_type: 'password',
                username,
                password
            }
        })
        if(token && token.access_token) {
            return token;
        }
        return false;
    }

    public async getTokenByApplication({ code }) {
        const {ctx: {helper: { utils }}} = this
        const { data: token } = await utils.http.post({
            url: '/oauth/token',
            params: {
                grant_type: 'authorization_code',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code,
                redirect_uri: 'http://127.0.0.1:7001/user/getTokenByApplication',
            }
        })
        if(token && token.access_token) {
            return token;
        }
        return false;
    }

    public async getUserInfo({ accessToken }) {
        const {ctx: {helper: { api: {gitlab} }}} = this
        const userInfo = await gitlab.user.getUserInfo({
            accessToken
        });
        return userInfo;
    }

    public async saveUser({ userInfo }) {
        const { ctx } = this;
        const {
            id,
            name,
            username,
            email,
            avatar_url: avatarUrl,
            web_url: webUrl,
        } = userInfo;

        ctx.model.User.findOrCreate({
            where: {
                id,
            },
            defaults: {
                id,
                name,
                username,
                email,
                avatarUrl,
                webUrl,
            }
        }).then(([created]) => {
            debugger
            if (!created) {
                ctx.model.User.update({
                    name,
                    username,
                    email,
                    avatarUrl,
                    webUrl,
                 }, {
                where: {
                    id,
                }
              })
            }
        });
    }
}