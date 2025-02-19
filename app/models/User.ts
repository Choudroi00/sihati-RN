import { z, ZodObject } from "zod";

class User {
    static UserState = z.object({
        pk: z.number(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        token: z.string(),

        isAuthenticated: z.boolean(),
        loading: z.boolean(),
        error: z.string().nullable(),
    })

    static BaseSchema = z.object({
        pk: z.number(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
    })

    static UserProfileSchema = (minim: boolean) => z.object({
        id: minim ? z.null() : z.number(),
        body_mass_index: minim ? z.null() : z.number(),
        body_surface_area: minim ? z.null() : z.number(),
        heart_rate: z.number(),
        blood_pressure: z.string(),
        weight: z.number(),
        height: z.number(),
        blood_sugar_level: z.number(),
        oxygen_saturation: z.number(),
        respiratory_rate: z.number(),
        notes: z.string(),
        created_at: minim ? z.null() : z.string().datetime(),
        updated_at: minim ? z.null() : z.string().datetime(),

    })

    static UserProfile = User.UserProfileSchema(false)
    static minUserProfile = User.UserProfileSchema(true)

     

}



export default User;