function scan(map) {
  const visited = new Map();
  const res = {
    ceil: 0,
    floor: 0,
    both: 0,
  };

  const isOut = (i, j) =>
    i < 0 || i >= map.length || j < 0 || j >= map[0].length;

  const markAsVisited = (i, j) => visited.set(i + ',' + j);
  const isVisited = (i, j) => isOut(i, j) || visited.has(i + ',' + j);

  const isFloor = (i) => i === map.length - 1;
  const isCeil = (i) => i === 0;

  function scanOne(i, j, info, checkPlace) {
    if (!isVisited(i, j) && map[i][j]) {
      markAsVisited(i, j);

      if (checkPlace(i) && info.isBoth === false) {
        info.isBoth = true;
        res.both += 1;
      }

      scanOne(i - 1, j, info, checkPlace);
      scanOne(i + 1, j, info, checkPlace);
      scanOne(i, j - 1, info, checkPlace);
      scanOne(i, j + 1, info, checkPlace);
    }
  }

  // Начиная с потолка
  for (let j = 0; j < map[0].length; j++) {
    if (!isVisited(0, j) && map[0][j]) {
      const info = { isBoth: false };
      scanOne(0, j, info, isFloor);

      if (!info.isBoth) {
        res.ceil += 1;
      }
    }
  }

  // Начиная с пола
  for (let j = 0; j < map[0].length; j++) {
    if (!isVisited(map.length - 1, j) && map[map.length - 1][j]) {
      const info = { isBoth: false };
      scanOne(map.length - 1, j, info, isCeil);

      if (!info.isBoth) {
        res.floor += 1;
      }
    }
  }

  return res;
}

module.exports = { scan };
