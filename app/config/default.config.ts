// 反向代理git url
const GIT_URL = 'http://127.0.0.1/';

// app 授权客户端id 与 秘钥
const CLIENT_ID = '7dec5c3228baccbd60853a3781b38cd868d3758408990c42fdbc0f7fcdeb7708'
const CLIENT_SECRET = '42952b0ca5d001405ffa5670cc3680ce33b533338f6bffdbf3d7e16af20a9d5d'

// 钉钉机器人


const DING_SECRET =
  "OP3YrowJjDCkZczvwumkmdaXQ_Z5lglG_t3AF6HpVSDcZq5aZUD9U6VVd7h6mbaJ";

const DING_SEND_URL =
  "https://oapi.dingtalk.com/robot/send?access_token=67f5ebf0a08fe19d537708c9fbe6f6644191a872f0d51e070360399cd55ff006";

// 邮箱配置
const MAIL_CONFIG = {
  user_email: '',
  service: '',
  port: '',
  auth_code: ''
}


export { GIT_URL, CLIENT_ID, CLIENT_SECRET, DING_SEND_URL, DING_SECRET, MAIL_CONFIG };