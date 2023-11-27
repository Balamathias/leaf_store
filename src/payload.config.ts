import { buildConfig } from "payload/config";
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [],
    routes: {
        admin: '/admin'
    },
    editor: slateEditor({}),
    admin: {
        bundler: webpackBundler(),
        meta: {
            titleSuffix: "- MStore",
            favicon: "favicon.ico",
            ogImage: "thumbnail.jpg",
        },
    },
    rateLimit: {
        max: 2500
    },
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts')
    },
    db: mongooseAdapter({
        url: process.env.MONGODB_URL!,
    }),
})