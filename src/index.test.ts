import { jest } from '@jest/globals';

const mockedOs = {
  platform: jest.fn<() => NodeJS.Platform>(),
};

const mockedCore = {
  getInput: jest.fn<(input: string) => string>(),
  addPath: jest.fn<(path: string) => void>(),
  info: jest.fn<(message: string) => void>(),
  setFailed: jest.fn<(message: string) => void>(),
};

const mockedTc = {
  downloadTool: jest.fn<() => Promise<string>>(),
  extractZip: jest.fn<() => Promise<string>>(),
  cacheFile: jest.fn(),
  find: jest.fn(),
};

jest.unstable_mockModule('node:os', () => mockedOs);
jest.unstable_mockModule('@actions/core', () => mockedCore);
jest.unstable_mockModule('@actions/tool-cache', () => mockedTc);

const { run } = await import('.');

beforeEach(() => {
  jest.clearAllMocks();
});

const TOOL_NAME = 'maestro';
const cliVersion = '1.2.3';
const pathToTarball = 'path/to/tarball';
const pathToCLI = 'path/to/cli';

describe.each(['darwin', 'win32', 'linux'])('when OS is %p', (os) => {
  beforeEach(() => {
    mockedOs.platform.mockReturnValueOnce(os as NodeJS.Platform);

    mockedCore.getInput.mockImplementation((input) => {
      switch (input) {
        case 'version':
          return cliVersion;
        default:
          throw Error(`Invalid input: ${input}`);
      }
    });
  });

  it('downloads, extracts, and adds CLI to PATH', async () => {
    mockedTc.downloadTool.mockResolvedValueOnce(pathToTarball);
    mockedTc.extractZip.mockResolvedValueOnce(pathToCLI);

    await run();

    expect(mockedTc.downloadTool).toHaveBeenCalledWith(
      `https://github.com/mobile-dev-inc/Maestro/releases/download/cli-${cliVersion}/maestro.zip`,
    );

    expect(mockedTc.extractZip).toHaveBeenCalledWith(pathToTarball);

    expect(mockedTc.cacheFile).toHaveBeenCalledWith(
      expect.stringContaining(`/bin/${TOOL_NAME}`),
      os === 'win32' ? `${TOOL_NAME}.bat` : TOOL_NAME,
      TOOL_NAME,
      cliVersion,
    );

    expect(mockedCore.addPath).toHaveBeenCalledWith(
      expect.stringContaining(pathToCLI),
    );
  });
});

describe('error', () => {
  it('throws error', async () => {
    const message = 'error';
    mockedCore.getInput.mockImplementationOnce(() => {
      throw new Error(message);
    });
    await run();
    expect(mockedCore.setFailed).toHaveBeenCalledWith(message);
  });
});
