import z from "zod";


export const signUpInp = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})
// Type Infer in zod
export type SignUpInput = z.infer<typeof signUpInp>




export const signInInp = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})
// Type Infer in zod
export type SignInInput = z.infer<typeof signInInp>


 
export const createBlogInp = z.object({
    title: z.string(),
    content: z.string(),
})
// Type Infer in zod
export type CreateBlogInput = z.infer<typeof createBlogInp>




export const updateBlogInp = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})
// Type Infer in zod
export type UpdatelogInput = z.infer<typeof updateBlogInp>