import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: ({token}) => {
                return `
                <h1 className="text-primary">Hello!</h1>
                <p>Welcome to Mstore!</p>
                <p>Please click the link below to verify and activate your account</p>
                <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}">Verify Email</a>
                `
            }

        }
    },
    access: {
        read: () => true,
        create: () => true
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
}