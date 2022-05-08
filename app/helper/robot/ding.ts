const crypto = require("crypto");

import { DING_SEND_URL, DING_SECRET } from '../../config/default.config'
export default (app) => {
    return {
        async send(content) {
            const timestamp = Date.now();
            const str = crypto
                .createHmac("sha256", DING_SECRET)
                .update(timestamp + "\n" + DING_SECRET)
                .digest()
                .toString("base64", "UTF-8");
            try {
                const { res } = await app.curl(
                    `${DING_SEND_URL}&timestamp=${timestamp}&sign=${encodeURIComponent(str)}`,
                    {
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    method: "POST",
                    data: JSON.stringify(content),
                    }
                );
                return res;
            } catch (error) {
                return error;
            }
        },
        text({ content = {}, at }) {
            at = at || {};
            this.send({
                msgtype: "text",
                text: {
                    content,
                },
              at,
            });
        },
    }
}
