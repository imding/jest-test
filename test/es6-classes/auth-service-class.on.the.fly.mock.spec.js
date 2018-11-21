import AuthAgentClass from '@/es6-classes/auth-agent-class';
import AuthServiceClass from '@/es6-classes/auth-service-class';

// Create a manual mock of AuthAgentClass
const mockLogin = jest.fn();
jest.mock('@/es6-classes/auth-agent-class', () => {
  // This is the default mock implementation
  return jest.fn().mockImplementation(() => {
    return {
      login: mockLogin
    };
  });
});

describe('Testing mocking classes', () => {
  beforeEach(() => {
    // Clear all instances, calls to constructor and calls to all methods
    AuthAgentClass.mockClear();
    mockLogin.mockClear();
  });

  test('that the AuthAgentClass is called in the AuthServiceClass constructor', () => {
    const authServiceClass = new AuthServiceClass();
    expect(AuthAgentClass).toHaveBeenCalledTimes(1);
  });

  test('that the mock can be changed for a single test', () => {
    // This mock implementation will only be used for one call
    AuthAgentClass.mockImplementationOnce(() => {
      return {
        login: () => {
          throw new Error('Test error');
        },
      };
    });

    const authServiceClass = new AuthServiceClass();
    expect(AuthAgentClass).toHaveBeenCalledTimes(1);

    expect(() => authServiceClass.login()).toThrow();
  });

  test('that the AuthServiceClass called a method on the class and the value it was called with', () => {
    const authServiceClass = new AuthServiceClass();
    expect(AuthAgentClass).toHaveBeenCalledTimes(1);

    authServiceClass.login(false);

    expect(mockLogin).toHaveBeenCalledWith(false);
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  test('that the AuthServiceClass called a method on the class with the default value', () => {
    const authServiceClass = new AuthServiceClass();
    expect(AuthAgentClass).toHaveBeenCalledTimes(1);

    authServiceClass.login();

    expect(mockLogin).toHaveBeenCalledWith(true);
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});
