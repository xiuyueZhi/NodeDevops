import { MAIL_CONFIG } from '../../config/default.config'

const marked = require("marked"); // marked 转换
const nodemailer = require("nodemailer"); // 发送邮件
const nunjucks = require("nunjucks"); // 模板引擎
const path = require("path");

// 邮箱配置初始化
const transporter = nodemailer.createTransport({
    host: MAIL_CONFIG.service,
    secureConnection: true, // 使用 SSL 方式（安全方式，防止被窃取信息）
    port: MAIL_CONFIG.port,
    auth: {
        user: MAIL_CONFIG.user_email, // 账号
        pass: MAIL_CONFIG.auth_code, // 授权码
    },
});

const htmlModel = ({ storyMail, exitInfo, summitUser, iterationMail }) => {
    const html = nunjucks.render(path.join(__dirname, "./emailTpl/email.njk"), {
        storyMail,
        exitInfo,
        summitUser,
        iterationMail,
    });
    return html;
};

interface Mail {
    // 接收者,可以同时发送多个,以逗号隔开
    toEmail: string;
    // 标题
    subject: string;
    // 抄送
    cc?: string;
    // 文本
    text?: string;
    // titleList表头 conterFontList内容
    html?: any;
    // 附件
    attachments?: any;
    storyMail?: any;
    exitInfo?: any;
    summitUser?: String;
    iterationMail?: any;
}

const sendMail = async (mailOptions: Mail) => {
    const {
        toEmail,
        subject,
        cc,
        text,
        attachments,
        storyMail,
        exitInfo,
        summitUser,
        iterationMail,
    } = mailOptions;
    Object.keys(exitInfo).forEach((key) => {
      exitInfo[key] = marked(exitInfo[key]);
    });
    const html = htmlModel({ storyMail, exitInfo, summitUser, iterationMail });
    const mailOpts = {
        from: MAIL_CONFIG.user_email,
        to: toEmail,
        subject,
        cc,
        text,
        html,
        attachments,
    };
    try {
        transporter.sendMail(mailOpts);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
export default { sendMail };