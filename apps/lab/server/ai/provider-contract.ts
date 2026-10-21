/**
 * VoßFit Lab — provider-neutral AI contract.
 *
 * Scaffold only: this file is not wired into the live Lab and deliberately
 * contains no provider SDK or credentials. Implement it in the actual
 * server/Worker after the current Sandbox source and backend are imported.
 */

export type AiTextPart = {
  type: "text";
  text: string;
};

export type AiRequest = {
  /** Constructed by trusted server code, never accepted as an arbitrary URL. */
  systemInstruction?: string;
  messages: Array<{
    role: "user" | "assistant";
    content: AiTextPart[];
  }>;
  maxOutputTokens: number;
};

export type AiResponse = {
  text: string;
  provider: "gemini";
  model: string;
  usage?: {
    inputTokens?: number;
    outputTokens?: number;
  };
};

export interface AiProvider {
  generate(request: AiRequest, signal?: AbortSignal): Promise<AiResponse>;
}

/**
 * Security requirements for the eventual Gemini implementation:
 * - Read GEMINI_API_KEY from server-side secret storage only.
 * - Read the model from server configuration and enforce an allowlist.
 * - Use Google's official Gemini API endpoint/SDK; never accept endpoint URLs
 *   or credentials from browser input.
 * - Apply authentication, project scoping, quotas, rate limits and timeouts
 *   before calling this adapter.
 * - Redact secrets and provider payloads from logs.
 * - Treat prompts, uploads and model output as untrusted data.
 */
