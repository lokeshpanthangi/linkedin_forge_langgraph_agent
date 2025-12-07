import { useState, useCallback } from "react";
import { AppState, AppStage, Evaluations, GeneratorCategory } from "@/types/api";

const AVAILABLE_EVALUATORS = [
  { id: "linkedin_expert_evaluation", label: "LinkedIn Expert", icon: "Linkedin" },
  { id: "devops_engineer_evaluation", label: "DevOps Engineer", icon: "Server" },
  { id: "genai_engineer_evaluation", label: "GenAI Engineer", icon: "Brain" },
  { id: "backend_engineer_evaluation", label: "Backend Engineer", icon: "Database" },
  { id: "hiring_manager_evaluation", label: "Hiring Manager", icon: "Users" },
] as const;

const GENERATOR_CATEGORIES: GeneratorCategory[] = ["ai", "ml", "devops", "backend", "fullstack", "blockchain"];

const DEFAULT_EVALUATORS = ["linkedin_expert_evaluation", "genai_engineer_evaluation"];

const initialState: AppState = {
  stage: "input",
  threadId: null,
  currentPost: "",
  evaluations: {},
  userInput: "",
  selectedEvaluators: DEFAULT_EVALUATORS,
  generatorCategory: "ai",
};

export function useAppState() {
  const [state, setState] = useState<AppState>(initialState);

  const setStage = useCallback((stage: AppStage) => {
    setState((prev) => ({ ...prev, stage }));
  }, []);

  const setUserInput = useCallback((userInput: string) => {
    setState((prev) => ({ ...prev, userInput }));
  }, []);

  const toggleEvaluator = useCallback((evaluatorId: string) => {
    setState((prev) => {
      const isSelected = prev.selectedEvaluators.includes(evaluatorId);
      const newEvaluators = isSelected
        ? prev.selectedEvaluators.filter((id) => id !== evaluatorId)
        : [...prev.selectedEvaluators, evaluatorId];
      return { ...prev, selectedEvaluators: newEvaluators };
    });
  }, []);

  const setGeneratorCategory = useCallback((generatorCategory: GeneratorCategory) => {
    setState((prev) => ({ ...prev, generatorCategory }));
  }, []);

  const setGenerationResult = useCallback(
    (threadId: string, currentPost: string, evaluations: Evaluations) => {
      setState((prev) => ({
        ...prev,
        threadId,
        currentPost,
        evaluations,
        stage: "review",
      }));
    },
    []
  );

  const updateReviewData = useCallback(
    (currentPost: string, evaluations: Evaluations) => {
      setState((prev) => ({
        ...prev,
        currentPost,
        evaluations,
      }));
    },
    []
  );

  const setSuccess = useCallback(() => {
    setState((prev) => ({ ...prev, stage: "success" }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    setStage,
    setUserInput,
    toggleEvaluator,
    setGeneratorCategory,
    setGenerationResult,
    updateReviewData,
    setSuccess,
    reset,
    availableEvaluators: AVAILABLE_EVALUATORS,
    generatorCategories: GENERATOR_CATEGORIES,
  };
}
