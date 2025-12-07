import { StartGenerationRequest, FeedbackRequest, GenerationResponse } from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function startGeneration(payload: StartGenerationRequest): Promise<GenerationResponse> {
  const response = await fetch(`${API_BASE_URL}/start_generation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function submitFeedback(payload: FeedbackRequest): Promise<GenerationResponse> {
  const response = await fetch(`${API_BASE_URL}/submit_feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
