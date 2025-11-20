import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { exercise, category } = await request.json();

    if (!exercise) {
      return NextResponse.json(
        { error: "Nome do exercício é obrigatório" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Chave da OpenAI não configurada. Configure OPENAI_API_KEY no arquivo .env.local" },
        { status: 500 }
      );
    }

    // Generate description with GPT-4
    const descriptionResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Você é um personal trainer especializado. Descreva exercícios de forma clara, detalhada e profissional em português do Brasil. 

Estruture sua resposta em HTML com as seguintes seções:
- <h4>Como Fazer:</h4> (passo a passo detalhado)
- <h4>Músculos Trabalhados:</h4> (lista dos músculos principais e secundários)
- <h4>Dicas Importantes:</h4> (3-4 dicas práticas)
- <h4>Erros Comuns:</h4> (3-4 erros a evitar)

Use tags HTML como <p>, <ul>, <li>, <strong> para formatar o texto.`,
        },
        {
          role: "user",
          content: `Descreva o exercício "${exercise}" da categoria "${category}". Seja detalhado e profissional.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const description = descriptionResponse.choices[0]?.message?.content || "Descrição não disponível";

    // Generate image with DALL-E 3
    let imageUrl = "";
    try {
      const imageResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: `Professional fitness illustration showing proper form for the exercise: ${exercise}. Clean, educational style with clear body positioning. Anatomical accuracy. White background. High quality fitness demonstration.`,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });

      imageUrl = imageResponse.data[0]?.url || "";
    } catch (imageError) {
      console.error("Error generating image:", imageError);
      // Continue without image if generation fails
    }

    return NextResponse.json({
      description,
      imageUrl,
    });
  } catch (error) {
    console.error("Error in exercise API:", error);
    return NextResponse.json(
      { error: "Erro ao processar solicitação" },
      { status: 500 }
    );
  }
}
