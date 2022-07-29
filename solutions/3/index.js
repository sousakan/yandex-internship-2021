module.exports = async function (input) {
  function readPromise(Folder, index) {
    return new Promise((res) => {
      Folder.read(index, (file) => res(file));
    });
  }

  function sizePromise(Folder) {
    return new Promise((res) => {
      Folder.size((size) => res(size));
    });
  }

  async function find(Folder, arr) {
    const size = await sizePromise(Folder);

    for (let i = 0; i < size; i++) {
      const file = await readPromise(Folder, i);

      if (file?.constructor.name === 'Folder') {
        await find(file, arr);
      }

      if (typeof file === 'string' && file !== 'file') {
        arr.push(file);
      }
    }
  }

  const arr = [];

  await find(input, arr);

  return arr.sort();
};
