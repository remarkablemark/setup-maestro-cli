import { jest } from '@jest/globals';

const mockedOs = {
  platform: jest.fn<() => NodeJS.Platform>(),
};

jest.unstable_mockModule('node:os', () => mockedOs);

const { getDownloadUrl, getFilename } = await import('./utils');

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
    jest.clearAllMocks();
  });

  it.each(['darwin', 'linux'])('returns filename for %p', (platform) => {
    mockedOs.platform.mockReturnValue(platform as NodeJS.Platform);
    expect(getFilename(name)).toBe(name);
  });

  it('returns filename for win32', () => {
    mockedOs.platform.mockReturnValue('win32');
    const name = 'name';
    expect(getFilename(name)).toBe(`${name}.bat`);
  });
});
