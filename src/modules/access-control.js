import * as logger from '../helpers/logger';

const Address = require('ipaddr.js');

/* eslint-disable */

const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

const ipMatch = (clientIp, list) => {
    if (clientIp && Address.isValid(clientIp)) {
        // `Address.process` return the IP instance in IPv4 or IPv6 form.
        // It will return IPv4 instance if it's a IPv4 mapped IPv6 address
        clientIp = Address.process(clientIp);

        return list.some((e) => {
            // IPv6 address has 128 bits and IPv4 has 32 bits.
            // Setting the routing prefix to all bits in a CIDR address means only the specified address is allowed.
            e = e || '';
            e = e.indexOf('/') === -1 ? `${e}/128` : e;

            const range = e.split('/');
            if (range.length === 2 && Address.isValid(range[0]) && isNumeric(range[1])) {
                const ip = Address.process(range[0]);
                const bit = parseInt(range[1], 10);

                // `IP.kind()` return `'ipv4'` or `'ipv6'`. Only same type can be `match`.
                if (clientIp.kind() === ip.kind()) {
                    return clientIp.match(ip, bit);
                }
            }

            return false;
        });
    }

    return false;
};

const controller = (opts) => {
    const options = {
        // mode: `'deny'` or `'allow'`.
        mode: 'deny',
        // denys: The blacklist. Works differently in different `mode`.
        denys: [],
        // allows: The whitelist. Works differently in different `mode`.
        allows: [],
        // forceConnectionAddress: Use the connection address (`req.connection.remoteAddress`) even `express.set('trust proxy', [])` set the `req.ip`.
        forceConnectionAddress: false,
        // log: Pass a log function or `false` to disable log.
        // `Function(String clientIp, Boolean access)`
        log(clientIp, access, host) {
            access
                ? logger.accessControl({
                    ip: clientIp,
                    access: 'granted',
                    host: host,
                })
                : logger.accessControl({
                    ip: clientIp,
                    access: 'denied',
                    host: host,
                });
        },

        // statusCode: The HTTP status code sent when denied. Set to 301 or 302 means redirect to `redirectTo`.
        statusCode: 403,
        // redirectTo: The URL to redirect when denied and `statusCode` is set to redirect.
        redirectTo: '',
        // message: The message sent when denied and `statusCode` is not set to redirect.
        message: 'Forbidden',
    };

    // Override default options.
    opts = opts || {};
    for (const p in opts) if (opts.hasOwnProperty(p)) options[p] = opts[p];
    options.allowMode = options.mode === 'allow';
    options.statusCode = parseInt(options.statusCode, 10);
    options.forceConnectionAddress = !!options.forceConnectionAddress;

    // The middleware.
    return (req, res, next) => {
        const clientIp = options.forceConnectionAddress === true
            ? req.connection.remoteAddress
            : req.ip || req.connection.remoteAddress;
        const host = req.headers.host;
        const inAllows = ipMatch(clientIp, options.allows);
        const inDenys = ipMatch(clientIp, options.denys);

        // If it is `'allow'` mode, and the IP *IS NOT* in the whitelist (`allows`) list (or excluded by blacklist (`denys`)), deny it.
        // If it is `'deny'` mode, and the IP *IS* in the blacklist (`denys`) list (and not excluded by whitelist (`allows`)), deny it.
        const isDenied = (options.allowMode === true && (inAllows && !inDenys) === false) || (options.allowMode === false && (inDenys && !inAllows) === true);

        if (typeof options.log === 'function') {
            options.log.apply(null, [clientIp, !isDenied, host]);
        }

        if (isDenied) {
            if (options.statusCode === 301 || options.statusCode === 302) {
                res.redirect(options.statusCode, options.redirectTo);
            } else {
                res.status(options.statusCode).send(options.message);
            }
        } else {
            next();
        }
    };
};



class AccessControl extends Function {
    constructor(opts, iplist) {
        super()
        this.options = opts
        this.iplist = iplist
        const args = this.getParamNames(this.options) || []
        this.listArguments = args.indexOf('iplist') > -1 ? true : false
        if (this.listArguments) {
            if (this.iplist === undefined) {
                throw new Error('AccessControl: ip list is required / function must have ip list as argument')
            }
        }

        return new Proxy(this, {
            apply(target, thisArg, argumentsList) {
                return target.__call__(...argumentsList);
            }
        })
    }
    getParamNames(func) {
        var funStr = func.toString();
        return funStr.slice(funStr.indexOf('(') + 1, funStr.indexOf(')')).match(/([^\s,]+)/g);
    }

    async __call__(req, res, next) {

        let options;
        try {
            if (this.iplist && this.listArguments) {
                options = await this.options(this.iplist)
            } else {
                options = await this.options();
            }
        } catch (error) {
            options = {
                mode: 'deny',
            };
        }
        controller(options)(req, res, next);
    }
}

AccessControl.ipMatch = ipMatch;

export { AccessControl };