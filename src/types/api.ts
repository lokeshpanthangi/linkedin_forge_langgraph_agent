export interface StartGenerationRequest {
  user_input: string;
  evaluators: string[];
}

export interface Evaluations {
  [evaluator: string]: string;
}

export interface GenerationResponse {
  thread_id: string;
  current_post: string;
  evaluations: Evaluations;
  status?: "paused_for_review" | "finished";
}

export interface FeedbackRequest {
  thread_id: string;
  action: "approve" | "reject";
  reason?: string;
}

export type AppStage = "input" | "loading" | "review" | "success";

export interface AppState {
  stage: AppStage;
  threadId: string | null;
  currentPost: string;
  evaluations: Evaluations;
  userInput: string;
  selectedEvaluators: string[];
}
