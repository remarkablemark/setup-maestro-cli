import os from 'node:os';

import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';

import { run } from '.';

jest.mock('@actions/core');
jest.mock('@actions/tool-cache');
jest.mock('node:os');

const mockedCore = jest.mocked(core);
const mockedTc = jest.mocked(tc);
const mockedOs = jest.mocked(os);

beforeEach(() => {
  jest.resetAllMocks();
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
      expect.stringContaining(TOOL_NAME),
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
