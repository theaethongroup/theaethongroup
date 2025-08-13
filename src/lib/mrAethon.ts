import OpenAI from "openai";
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const AETHON_GROUP_CONTEXT = `
Aethon Group is a dynamic team of experts offering comprehensive solutions for business growth and digital transformation. Services include:
- Brand Building, Graphic Design, Business Strategy Development
- Management, Finance, End-to-End Operations
- Web and App Development with AI, Legalities
- SEO, Digital Marketing, Network Management
- Media, Events, Social Media Management
Known for:
- Cutting-edge strategies and creative solutions
- Expert guidance across multiple domains
- Building long-term client relationships
- Tailored services that exceed expectations
`;

const SYSTEM_PROMPT = `
You are Mr. Aethon — a professional, friendly AI assistant for The Aethon Group.
Tone:
- Professional yet approachable
- Knowledgeable about business solutions
- Concise and helpful
- Focus on how Aethon Group can help the client
Guidelines:
- Provide personalized advice based on the user's business type and selected services
- Highlight Aethon Group's expertise in the relevant areas
- Keep responses brief and to the point
- Always maintain a professional and helpful demeanor
`;

export async function getMrAethonReply(userMessage: string, userData: any) {
  const aiProvider = process.env.AI_PROVIDER || "groq";
  const normalized = userMessage.toLowerCase();
  
  // Check if user is asking about pricing or quotes
  const isPricingIntent = /price|cost|quote|estimate|budget|pricing/i.test(normalized);
  
  if (isPricingIntent) {
    return {
      text: `Thank you for your interest in Aethon Group! Our pricing varies based on your specific needs and the scope of the project. I'd be happy to arrange a consultation to provide you with a customized quote.`,
      suggestions: [
        'Schedule a consultation',
        'Request a callback',
        'Send an email inquiry'
      ],
    };
  }
  
  if (aiProvider === "groq") {
    const openai = new OpenAI({
      apiKey: process.env.GROQ_API_KEY!,
      baseURL: "https://api.groq.com/openai/v1",
    });
    
    // Create context based on user data
    let contextPrompt = AETHON_GROUP_CONTEXT;
    if (userData?.businessType) {
      contextPrompt += `\n\nUser's business type: ${userData.businessType}`;
    }
    if (userData?.services && userData.services.length > 0) {
      contextPrompt += `\n\nUser is interested in: ${userData.services.join(', ')}`;
    }
    
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `${SYSTEM_PROMPT}\n\n${contextPrompt}`,
      },
      {
        role: "user",
        content: userMessage,
      },
    ];
    
    try {
      const completion = await openai.chat.completions.create({
        model: "llama3-70b-8192", // Using Llama 3 model from Groq
        messages,
        temperature: 0.7,
        max_tokens: 300,
      });
      
      const reply = completion.choices[0]?.message?.content?.trim();
      return {
        text: reply || "I apologize, but I'm having trouble responding right now. Please try again later.",
        suggestions: [],
      };
    } catch (error) {
      console.error("Groq API error:", error);
      
      // Fallback response if API fails
      return {
        text: "I'm Mr. Aethon from Aethon Group. Thank you for your message. How can I assist you with your business needs today?",
        suggestions: []
      };
    }
  }
  
  // Fallback for other providers
  return {
    text: `I'm Mr. Aethon from Aethon Group. Thank you for your message. How can I assist you with your business needs today?`,
    suggestions: [],
  };
}