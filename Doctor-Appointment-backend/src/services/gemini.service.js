const httpStatus = require("http-status");
const { FAQ } = require("../models");
const ApiError = require("../utils/ApiError");
const mongoose = require("mongoose"); 
const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GOOGLE_GENAI_API_KEY) {
  console.error("ERROR: GOOGLE_GENAI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

const chartAI = async (modelName, contents) => {
  try {
    const model = genAI.getGenerativeModel({ model: modelName || "gemini-1.5-flash" });

    let requestContents;
    if (typeof contents === 'string') {
      requestContents = [{ role: "user", parts: [{ text: contents }] }];
    } else if (Array.isArray(contents)) {
      requestContents = contents;
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "Invalid 'contents' format for chartAI.");
    }

    const result = await model.generateContent({
      contents: requestContents, // Use the processed contents
      // You can add generationConfig here if needed
      // generationConfig: {
      //   maxOutputTokens: 2048,
      //   temperature: 0.9,
      //   topP: 1,
      // },
    });
    const response = result.response;
    return response; // Or response.text() if you just want the text
  } catch (error) {
    console.error("Error in chartAI:", error);
    if (error.message && error.message.includes("API key not valid")) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Google GenAI API key is not valid. Please check your API key.");
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to generate content from AI model: ${error.message || 'Unknown error'}`
    );
  }
};


const getAllModels = async () => {
  try {
    // --- DEBUG LOGS ---
    console.log("--- Debugging getAllModels ---");
    console.log("GOOGLE_GENAI_API_KEY is set:", !!process.env.GOOGLE_GENAI_API_KEY);
    console.log("Type of genAI:", typeof genAI);
    if (genAI && typeof genAI === 'object') {
        console.log("Is genAI an instance of GoogleGenerativeAI:", genAI instanceof GoogleGenerativeAI);
        // console.log("genAI object:", genAI); // Can be very verbose
        if (Object.getPrototypeOf(genAI)) {
             console.log("Methods on genAI prototype:", Object.getOwnPropertyNames(Object.getPrototypeOf(genAI)));
        } else {
            console.log("genAI has no prototype.");
        }
        console.log("Does genAI have listModels?", typeof genAI.listModels);
    }
    // --- END DEBUG LOGS ---

    const result = await genAI.listModels(); // This is the line causing the error
    const modelsArray = [];
    for await (const model of result) {
      modelsArray.push(model);
    }
    return modelsArray;
  } catch (error) {
    console.error("Error fetching models from Google GenAI:", error); // Original error log
    // Log the full error object for more details if it's not an ApiError
    if (!(error instanceof ApiError)) {
        console.error("Full error object:", error);
    }
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      `Failed to fetch models from Google GenAI. Original error: ${error.message}`
    );
  }
};


module.exports = {
  chartAI,
  getAllModels,
};