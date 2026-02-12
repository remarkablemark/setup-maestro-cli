import { dirname, join } from 'node:path';

import { addPath, getInput, setFailed } from '@actions/core';
import { cacheFile, downloadTool, extractZip, find } from '@actions/tool-cache';

import { getDownloadUrl, getFilename } from './utils';

const TOOL_NAME = 'maestro';

export async function run() {
  try {
    // Get the version of the tool to be installed
    const cliVersion = getInput('version');
    const filename = getFilename(TOOL_NAME);

    // Find previously cached directory (if applicable)
    let binaryPath = find(TOOL_NAME, cliVersion);
    const isCached = Boolean(binaryPath);

    /* istanbul ignore else */
    if (!isCached) {
      // Download the specific version of the tool
      const pathToZipball = await downloadTool(getDownloadUrl(cliVersion));

      // Extract the zipball onto the host runner
      const extractDirectory = await extractZip(pathToZipball);

      // Get the binary
      binaryPath = join(extractDirectory, 'maestro', 'bin', filename);
    }

    // Expose the tool by adding it to the PATH
    addPath(dirname(binaryPath));

    // Cache the tool
    /* istanbul ignore else */
    if (!isCached) {
      await cacheFile(binaryPath, filename, TOOL_NAME, cliVersion);
    }
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message);
    }
  }
}

run();
