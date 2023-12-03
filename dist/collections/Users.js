"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "\n                <h1 className=\"text-primary\">Hello!</h1>\n                <p>Welcome to Mstore!</p>\n                <p>Please click the link below to verify and activate your account</p>\n                <a href=\"".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, "\">Verify Email</a>\n                ");
            }
        }
    },
    access: {
        read: function () { return true; },
        create: function () { return true; }
    },
    fields: [
        {
            name: "role",
            type: "select",
            // admin: {
            //     condition: () => false
            // },
            required: true,
            defaultValue: "user",
            options: [
                {
                    label: "Admin",
                    value: "admin",
                },
                {
                    label: "User",
                    value: "user",
                }
            ],
        }
    ]
};
