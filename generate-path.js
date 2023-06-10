const fs = require("fs");
const path = require("path");

function getDirectoryStructure(startPath, depth = 0) {
  let result = "";
  const files = fs.readdirSync(startPath);

  for (let file of files) {
    const filePath = path.join(startPath, file);
    const stats = fs.statSync(filePath);

    result += " ".repeat(depth * 2) + file + "\n";

    if (stats.isDirectory()) {
      result += getDirectoryStructure(filePath, depth + 1);
    }
  }

  return result;
}

fs.writeFileSync("structure.txt", getDirectoryStructure("./"));
