export const buildPrompt = (
  currentJournal,
  previousJournals
) => {

  return `
You are an accountability coach.

Analyze the user's behavior.

Previous journals:

${JSON.stringify(previousJournals)}

Today's journal:

${JSON.stringify(currentJournal)}

Return ONLY JSON:

{
  "disciplineScore":0,
  "tasksCompleted":"",
  "yesterdayPromise":"",
  "patternObserved":"",
  "avoidanceDetection":"",
  "trendVsLastWeek":"",
  "prediction":"",
  "riskAlert":"",
  "coachVerdict":""
}
`;
};