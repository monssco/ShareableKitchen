// Kind of an ugly notation, but come back to this
import dbClient from '../../../postgres/client'

export const resolver = {
    Query: {
        getUser: async (obj: any, args: any, context: any, info: any) => {
            console.info("Obj", obj);
            console.log("context", context)
            console.log("info", info)
            const { id } = args;
            
            console.log("arg", args)

            const query = {
                // give the query a unique name
                name: 'fetch-user',
                text: 'SELECT * FROM public.user WHERE id = $1',
                values: [id],
                }

            const user = await dbClient.query(query)
            console.log("Found user", user.rows[0]);
            return user.rows[0];
        }
    },
    Mutation: {
        addUser: async (_: any, args: any) => {
            const { id, email, signup, active } = args;

            // return true;
            // try {

                console.log(args)

                const text = 'INSERT INTO public.user(id, email, first_name, last_name, signup, city, province, country, active, stripe_customer, stripe_account) VALUES($1, $2, NULL, NULL, $3, NULL, NULL, NULL, $4, NULL, NULL) RETURNING *'
                const values = [id ,email, signup, active]

                
                
                const result = await dbClient.query(text, values)

                console.log(result);

                return result.rows[0];
            // } catch (error) {
            //     console.log(error);
            //     return false;
            // }
        }
    }
}