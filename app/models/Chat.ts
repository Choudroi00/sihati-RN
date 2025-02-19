import { z } from "zod";

class Chat {
    static MessageSchema = z.object({
        sender: z.enum(['user', 'ai']),
        message: z.string()
    })

    static ChatSchema = z.array<typeof this.MessageSchema>(this.MessageSchema)

    
}


export default Chat