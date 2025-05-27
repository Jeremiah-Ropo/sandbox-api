import { VM } from 'vm2';

export const runSandboxedCode = async (
  code: string,
  payload: any,
): Promise<any> => {
  const vm = new VM({
    timeout: 100,
    sandbox: {
      data: {
        body: payload,
      },
    },
  });

  try {
    const result = vm.run(
      `const customValidation = ${code}; 
         customValidation(data);`,
    );
    if (typeof result !== 'object' || result === null) {
      throw new Error('Invalid validation result from the executed code');
    }
    return result;
  } catch (error) {
    // console.error('Error executing sandboxed code:', error);
    throw new Error(error.message || 'Sandboxed code execution failed');
  }
};
