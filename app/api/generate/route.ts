import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty, personName } = await req.json();

    if (!topic || !difficulty) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Create 10 quiz questions about ${topic} at the ${difficulty} difficulty level. If ${topic} is a person, create questions about ${personName}. All questions should be at the ${difficulty} level consistently. Return the results as a JSON array of objects with the following structure:

{
  "question": "Question text in Korean",
  "difficulty": "${difficulty}",
  "options": ["A. Option 1 in Korean", "B. Option 2 in Korean", "C. Option 3 in Korean", "D. Option 4 in Korean"],
  "correctAnswer": "Correct option letter (A, B, C, or D)",
  "explanation": "Detailed explanation of the answer in Korean"
}

Ensure all questions, options, and explanations are in Korean, while maintaining this JSON structure. The response must be a valid JSON array that can be parsed directly.

Important:
1. All questions must be specifically about ${topic} or ${personName}. Do not include questions about other subjects or people.
2. Maintain the ${difficulty} level consistently for all questions.
3. Ensure all information provided in questions, options, and explanations is factually accurate and well-researched.
4. For questions about a person, focus on significant events, achievements, and well-known facts about ${personName}'s life and career.
5. Double-check that the correct answer is indeed correct and that other options are plausible but clearly incorrect.
6. Provide detailed explanations in Korean that not only state why the correct answer is right but also why other options are wrong when relevant.
7. Verify that the correct answer and explanation match precisely for each generated question.

Please follow these instructions carefully to generate high-quality quiz questions in Korean.`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    if (!response) {
      throw new Error("Empty response from Gemini API");
    }
    const text = response.text();
    if (!text) {
      throw new Error("Empty text in Gemini API response");
    }
    return NextResponse.json({ quiz: text }, { status: 200 });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 });
  }
}