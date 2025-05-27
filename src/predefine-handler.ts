export function predefinedNextActionFunction(result: any) {
  return {
    success: true,
    processedMessage: result.message,
  };
}
