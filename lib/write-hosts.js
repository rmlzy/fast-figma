const fs = require('fs-extra');
const { START_FLAG, END_FLAG } = require('./util');

const hostFilePath = '/etc/hosts';

const writeHosts = async (hosts) => {
  try {
    const file = await fs.readFile(hostFilePath, 'utf8');
    const lines = file.split('\n');

    // remove old hosts
    let startIdx = 0;
    let endIdx = 0;
    lines.forEach((line, idx) => {
      if (line.startsWith(START_FLAG)) {
        startIdx = idx;
      }
      if (line.startsWith(END_FLAG)) {
        endIdx = idx;
      }
    });

    const newFile = lines
      .filter((_, idx) => !(idx >= startIdx && idx <= endIdx))
      .join('\n');

    await fs.writeFile(hostFilePath, `${newFile}\n${hosts.join('\n')}`);
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = { writeHosts };