import { platform } from 'node:os';

/**
 * Gets download URL.
 *
 * @see {@link https://github.com/mobile-dev-inc/Maestro/releases}
 *
 * @param version - CLI version
 * @returns - Download URL
 */
export function getDownloadUrl(version: string) {
  return `https://github.com/mobile-dev-inc/Maestro/releases/download/cli-${version}/maestro.zip`;
}

/**
 * Gets filename.
 *
 * @param name - CLI name
 * @returns - Binary path
 */
export function getFilename(name: string) {
  return name + (platform() === 'win32' ? '.bat' : '');
}
