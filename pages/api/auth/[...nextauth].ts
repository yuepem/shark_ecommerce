import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
// import GithubProvider from "next-auth/providers/github"
import { PrismaClient } from "@prisma/client"
import Stripe from "stripe"


const prisma = new PrismaClient()


export default NextAuth({

    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        // add github later
        /* GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }) */
    ],

    events: {
        createUser: async ({ user }) => {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
                apiVersion: "2024-06-20",
            })
            if (user.name && user.email) {
                const customer = await stripe.customers.create({
                    email: user.email,
                    name: user.name,
                })

                await prisma.user.update({
                    where: { id: user.id},
                    data: { stripeCustomerId: customer.id}
                })
            }
        }
    }
})
