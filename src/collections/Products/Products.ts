import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";
import { Product as TProduct } from "../../payload-types";
import { stripe } from "../../lib/stripe";


const addUser: BeforeChangeHook<TProduct> = async ({ data, req })  => {
    const { user } = req;
    if (user) {
        return {
            ...data,
            user: user.id
        }
    }
}

export const Product: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeChange: [addUser, async (args) => {
        if (args.operation === "create") {
            const data = args.data as TProduct

        const createdProduct = await stripe.products.create({
            name: data.name,
            description: data.description,
            default_price_data: {
                currency: "USD",        
                unit_amount: Math.round(data.price * 100),
            }
        })

        const updated: TProduct = {
            ...data,
            priceId: createdProduct.default_price as string,
            stripeId: createdProduct?.id as string
        }
        
        return updated

        } else if (args.operation === "update") {
            const data = args.data as TProduct

            const  updatedPriduct = await stripe.products.update(
                data.stripeId!,
                {
                    name: data.name,
                    description: data.description,
                    default_price: data.priceId!
                }
            )

            const updated: TProduct = {
                ...data,
                priceId:  updatedPriduct.default_price as string,
                stripeId:  updatedPriduct?.id as string
            }
            
            return updated
        }
        }],
    }, 
    fields: [
        {
            name: "user",
            label: "User",
            type: "relationship",
            relationTo: "users",
            hasMany: false,
            required: true,
            admin: {
                condition: () => false
            }
        },
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            label: "Product Description",
            type: "text",
            required: true,
        },
        {
            name: "price",
            label: "Price in USD",
            type: "number",
            required: true,
            min: 0,
            max: 100000,
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: PRODUCT_CATEGORIES.map(({label, value}) => ({
                label, value
            })),
            required: true

        },
        {
            name: 'product_files',
            label: 'Product file(s)',
            type: 'relationship',
            required: true,
            relationTo: 'product_files',
            hasMany: false,
          },
        {
            name: "approvedForSale",
            label: "Approved Product",
            type: "select",
            defaultValue: "pending",
            access: {
                read: ({req}) => req.user.role === 'admin',
                create: ({req}) => req.user.role === 'admin',
                update: ({req}) => req.user.role === 'admin'
            },
            options: [
                {
                    label: "Pending Verifiation",
                    value: "pending",
                },
                {
                    label: "Approved",
                    value: "approved",
                },
                {
                    label: "Denied",
                    value: "denied",
                },
            ]
        },
        {
            name: "priceId",
            type: "text",
            admin: {
                hidden: true
            },
            access: {
                read: () => false,
                update: () => false,
                create: () => false,
            }
        },
        {
            name: "stripeId",
            type: "text",
            admin: {
                hidden: true
            },
            access: {
                read: () => false,
                update: () => false,
                create: () => false,
            }
        },
        {
            name: "images",
            label: "Product Images",
            type: "array",
            labels: {
                singular: "Image",
                plural: "Images"
            },
            minRows: 1,
            maxRows: 4,
            required: true,
            fields: [
                {
                    name: "image",
                    relationTo: "media",
                    label: "image",
                    type: "upload"
                }
            ]
        }
    ]

}