import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty, numberQuestions } = await req.json();

    if (!topic || !difficulty) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `You will receive ${difficulty} and ${topic}. ${difficulty} represents the difficulty level of the quiz. It has three difficulty levels: easy, medium, and hard. ${topic} represents the topic of the quiz. The topics are as follows:

1. **history**: 한국역사 (Korean history)
2. **people**: 한국 인물 대중적으로 유명한 사람들 (Famous Korean figures)
3. **geography**: 한국 지리 (Korean geography)
4. **sports**: 스포츠에 관한 질문들 (Questions about sports)
5. **world capitals**: 세계 각 나라 수도 (World capitals)
6. **Music**: 한국 음악 KPOP (Korean music KPOP)
7. **Politics**: 한국 정치 (Korean politics)
8. **Movies**: 한국 영화 (Korean movies)

Create ${numberQuestions} quiz questions about ${topic} at ${difficulty} difficulty level. All questions must consistently be at the ${difficulty} level. Return the results as an array of JSON objects with the following structure:

[
  {
    "question": "Question text in Korean",
    "questionEng": "Question text in English",
    "difficulty": "${difficulty}",
    "options": ["A. Korean Option 1", "B. Korean Option 2", "C. Korean Option 3", "D. Korean Option 4"],
    "optionsEng": ["A. English Option 1", "B. English Option 2", "C. English Option 3", "D. English Option 4"],
    "correctAnswer": "Correct option letter (A, B, C, or D)",
    "explanation": "Detailed explanation of the answer in Korean",
    "explanationEng": "Detailed explanation of the answer in English"
  }
]

Please maintain this JSON structure and ensure all questions, options, and explanations are in Korean and English. The response must be a valid JSON array that can be parsed directly. Return a JSON object with an "error" key and the error message as the value if ${topic} is a typo, missing word, unknown person, or unknown sport.

Important instructions:
1. All questions should be specific about ${topic} and focus on important events, achievements, and well-known facts about it. Do not include questions about other topics or people.
2. Keep the ${difficulty} level consistent for all questions.
3. Ensure all information provided in questions, options, and explanations is factual, accurate, and well-researched.
4. Double-check that the correct answer is indeed correct and that other options are plausible but clearly incorrect.
5. Provide detailed explanations in Korean for why the correct answer is correct, as well as why other options are incorrect, if applicable.
6. Ensure the correct answer and explanation for each generated question match exactly.
7. Maintain the requested difficulty level (${difficulty}) consistently across all questions.
8. Cover a broad range of aspects within ${topic} to ensure comprehensiveness.
9. Make sure the questions are interesting and challenging for the intended level of difficulty, avoiding overly vague details.

Example output for topic 'history':
[
  {
    "question": "세종대왕이 훈민정음을 창제한 해는?",
    "questionEng": "In what year did King Sejong create the Korean script, Hangul?",
    "difficulty": "medium",
    "options": ["A. 1433년", "B. 1443년", "C. 1453년", "D. 1463년"],
    "optionsEng": ["A. 1433", "B. 1443", "C. 1453", "D. 1463"],
    "correctAnswer": "B",
    "explanation": "세종대왕은 1443년에 훈민정음을 창제하여 1446년에 반포하였습니다.",
    "explanationEng": "King Sejong created Hangul in 1443 and promulgated it in 1446."
  }
]`;

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
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
