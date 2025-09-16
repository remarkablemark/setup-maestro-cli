import os from 'node:os';

import { getDownloadUrl, getFilename } from './utils';

jest.mock('node:os');
const mockedOs = jest.mocked(os);

describe('getDownloadUrl', () => {
  it('returns download url', () => {
    const version = '1.2.3';
    expect(getDownloadUrl(version)).toBe(
      `https://github.com/mobile-dev-inc/Maestro/releases/download/cli-${version}/maestro.zip`,
    );
  });
});

describe('getFilename', () => {
  const name = 'maestro';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it.each(['darwin', 'linux'])('returns filename for %p', (platform) => {
    mockedOs.platform.mockReturnValueOnce(platform as NodeJS.Platform);
    expect(getFilename(name)).toBe(name);
  });

  it('returns filename for win32', () => {
    mockedOs.platform.mockReturnValueOnce('win32');
    const name = 'name';
    expect(getFilename(name)).toBe(`${name}.bat`);
  });
});
