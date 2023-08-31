import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook"
// import GithubProvider from "next-auth/providers/github"
// import TwitterProvider from "next-auth/providers/twitter"
// import Auth0Provider from "next-auth/providers/auth0"
//import fetchJson from "../../../lib/fetchJson"
//import type { NextApiRequest, NextApiResp } from 'next'
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
/* export const config = {
  api: {
    bodyParser: false,
  },
} */
import axios from "axios"
axios.defaults.withCredentials=true
const nextAuthOptions = (req, res) => {
	return {
		//export default async function auth(req: NextApiRequest, resp: NextApiResp) {
		// https://next-auth.js.org/configuration/providers/oauth
		providers: [
			/* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains

    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
			/* FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }), */
			CredentialsProvider({
				// The name to display on the sign in form (e.g. "Sign in with...")
				name: "BGTW",
				type: "credentials",
				// `credentials` is used to generate a form on the sign in page.
				// You can specify which fields should be submitted, by adding keys to the `credentials` object.
				// e.g. domain, username, password, 2FA token, etc.
				// You can pass any HTML attribute to the <input> tag through the object.
				credentials: {
					username: { label: "Username", type: "text", placeholder: "jsmith" },
					password: { label: "Password", type: "password" },
				},
				async authorize(credentials) {
					// You need to provide your own logic here that takes the credentials
					// submitted and returns either a object representing a user or value
					// that is false/null if the credentials are invalid.
					// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
					// You can also use the `req` object to obtain additional parameters
					// (i.e., the request IP address)
					//console.log(credentials)
					const payload = {
						d_account: credentials.username,
						d_password: credentials.password,
						d_captcha: credentials.d_captcha
					}
					//console.log(payload)
					/* const response = await fetch(process.env.apiServer + "/api/auth/login/", {
						method: "POST",
						allowedHeaders: ['Cookie', 'Content-Type'],
						body: JSON.stringify(payload),
						headers: { "Content-Type": "application/json" },
						Accept: "application/json",
					}) */
					const response = await axios.post(process.env.apiServer + "/api/auth/login/", {
						d_account: credentials.username,
						d_password: credentials.password,
						//d_captcha:credentials.d_captcha
					})
					const cookies = response.headers["set-cookie"]
					// console.log(cookies)
					res.setHeader("set-cookie", cookies)
					//const resp = await response.json()
					//console.log(cookies)
					//resp.end()
					//console.log(response)
					const user = response.data
					// console.log(resp)
					//const user = { id: "1", name: "J Smith", email: "jsmith@example.com",isLoggedIn:true }
					// If no error and we have user data, return it
					if (response.isLoggedIn || user) {
						return user
					}
					// Return null if user data could not be retrieved
					return null
				},
			}),
		],
		session: {
			strategy: "jwt",
			maxAge: 1 * 24 * 60 * 60,
		},
		callbacks: {
			// 每次调用 getSession() 、useSession() 的时候 都会触发并将 token 存入 user 中
			// 上面登录成功后，jwt 回调会执行， user 中会拿到你 return 出来的数据， 注意： 仅在你调用 signin 接口的时候才会有值，之后都是在 cookie中读取
			jwt: async ({ token, user }) => {
				user && (token.user = user)
				return token
			},
			session: async ({ session, token }) => {
				session.user = token.user // Setting token in session
				return session
			},
		},
		events: {
			/*async signOut({ session }) {
				let headers = {"Content-Type" : "application/json"}
				 const cookieStore = cookies();
				const phpSessID = cookieStore.get('PHPSESSID');
				 */
				/* console.log(req.cookies)
				headers["Set-Cookie"] = req.cookies; 

				try {
					const response = await axios.put(
						process.env.apiServer + "/api/auth/logout/",
						/*{
							Headers:headers, 
							 withCredentials:true,
							method: "PUT",
							credentials:"include"
						},
					)
					//console.log(response)
					//const cookies = response.headers["set-cookie"]
					// console.log(cookies)
					// res.setHeader("set-cookie", cookies)
					//const cookies = APIKit.headers["set-cookie"]
					// console.log(cookies)
					//res.setHeader("set-cookie", cookies)
				} catch (e) {
					console.log(e.response)
				}
			},*/
		},
		pages: {
			signIn: "/account/",
			// signOut: '/auth/signout',
		},
		secret: process.env.NEXTAUTH_SECRET,
		debug: process.env.NODE_ENV === "development",
	}
}

export default (req, res) => {
	return NextAuth(req, res, nextAuthOptions(req, res))
}
