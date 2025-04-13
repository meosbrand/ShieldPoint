'use server';
/**
 * @fileOverview Analyzes a URL and page content for potential threats using an AI model.
 *
 * - analyzeUrlForThreats - A function that analyzes a URL for threats.
 * - AnalyzeUrlForThreatsInput - The input type for the analyzeUrlForThreats function.
 * - AnalyzeUrlForThreatsOutput - The return type for the analyzeUrlForThreats function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeUrlForThreatsInputSchema = z.object({
  url: z.string().url().describe('The URL to analyze.'),
  pageContent: z.string().describe('The content of the page at the URL.'),
});
export type AnalyzeUrlForThreatsInput = z.infer<typeof AnalyzeUrlForThreatsInputSchema>;

const AnalyzeUrlForThreatsOutputSchema = z.object({
  isThreat: z.boolean().describe('Whether the URL and page content are determined to be a threat.'),
  threatType: z.string().optional().describe('The type of threat detected, if any.'),
  confidenceScore: z.number().optional().describe('A score indicating the confidence level of the threat detection.'),
  reason: z.string().optional().describe('Reasoning behind the threat assessment.'),
});
export type AnalyzeUrlForThreatsOutput = z.infer<typeof AnalyzeUrlForThreatsOutputSchema>;

export async function analyzeUrlForThreats(input: AnalyzeUrlForThreatsInput): Promise<AnalyzeUrlForThreatsOutput> {
  return analyzeUrlForThreatsFlow(input);
}

const analyzeUrlPrompt = ai.definePrompt({
  name: 'analyzeUrlPrompt',
  input: {
    schema: z.object({
      url: z.string().url().describe('The URL to analyze.'),
      pageContent: z.string().describe('The content of the page at the URL.'),
    }),
  },
  output: {
    schema: z.object({
      isThreat: z.boolean().describe('Whether the URL and page content are determined to be a threat.'),
      threatType: z.string().optional().describe('The type of threat detected, if any.'),
      confidenceScore: z.number().optional().describe('A score indicating the confidence level of the threat detection.'),
      reason: z.string().optional().describe('Reasoning behind the threat assessment.'),
    }),
  },
  prompt: `You are an AI-powered threat analyzer. You are given a URL and the content of the page at that URL.
Your task is to analyze the URL and content to determine if it is a potential threat, such as a phishing attempt or malware distribution site.

URL: {{{url}}}
Page Content: {{{pageContent}}}

Based on your analysis, determine if the URL and content are a threat. If it is a threat, specify the type of threat and a confidence score.
Provide a reason for your assessment.
`,
});

const analyzeUrlForThreatsFlow = ai.defineFlow<
  typeof AnalyzeUrlForThreatsInputSchema,
  typeof AnalyzeUrlForThreatsOutputSchema
>({
  name: 'analyzeUrlForThreatsFlow',
  inputSchema: AnalyzeUrlForThreatsInputSchema,
  outputSchema: AnalyzeUrlForThreatsOutputSchema,
}, async input => {
  const {output} = await analyzeUrlPrompt(input);
  return output!;
});

