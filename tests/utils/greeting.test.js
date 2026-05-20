import { helloWorld } from '../../src/utils/greeting.js';

describe('helloWorld', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('logs default greeting when no name is provided', () => {
    helloWorld();
    expect(consoleSpy).toHaveBeenCalledWith('Hello, World!');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  test('logs personalized greeting when name is provided', () => {
    helloWorld('Warp');
    expect(consoleSpy).toHaveBeenCalledWith('Hello, Warp!');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });

  test('handles empty string name', () => {
    helloWorld('');
    expect(consoleSpy).toHaveBeenCalledWith('Hello, !');
  });

  test('handles special characters in name', () => {
    helloWorld('User@123');
    expect(consoleSpy).toHaveBeenCalledWith('Hello, User@123!');
  });
});
